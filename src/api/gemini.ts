import { type AIGuide, type FoodAnalysisResult, type FoodRecord, type GlycemicLevel } from '../types/food';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const GEMINI_STREAM_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent';

// ─── 커스텀 에러 ───────────────────────────────────────────────────────────────

export class GeminiApiKeyError extends Error {
  constructor() {
    super('EXPO_PUBLIC_GEMINI_API_KEY가 설정되지 않았습니다.');
    this.name = 'GeminiApiKeyError';
  }
}

export class GeminiNetworkError extends Error {
  constructor(public readonly status?: number, message?: string) {
    super(message ?? `Gemini API 네트워크 오류 (status: ${status ?? 'unknown'})`);
    this.name = 'GeminiNetworkError';
  }
}

export class GeminiParseError extends Error {
  constructor(public readonly raw: string) {
    super('Gemini 응답을 JSON으로 파싱하는 데 실패했습니다.');
    this.name = 'GeminiParseError';
  }
}

// ─── 프롬프트 ──────────────────────────────────────────────────────────────────

const FOOD_ANALYSIS_PROMPT = `당신은 한국 음식 영양 전문가입니다.
이미지 속 음식을 분석해서 반드시 아래 JSON 형식으로만 응답하세요.
다른 텍스트는 절대 포함하지 마세요.

{
  "foods": [{
    "name": "string (한국어)",
    "calories": number,
    "carbs": number,
    "protein": number,
    "fat": number,
    "sugar": number,
    "gi": number (0-100),
    "giLevel": "low" | "moderate" | "high" | "veryHigh",
    "spikeRisk": number (0-100)
  }],
  "totalCalories": number,
  "overallGiLevel": "low" | "moderate" | "high" | "veryHigh",
  "disclaimer": "이 정보는 AI 추정값으로 참고용입니다."
}

음식 인식 불가 시: { "error": "음식을 인식할 수 없습니다." }`;

// ─── 내부 타입 ─────────────────────────────────────────────────────────────────

interface GeminiPart {
  text?: string;
  inline_data?: {
    mime_type: string;
    data: string;
  };
}

// ─── 내부 유틸 ─────────────────────────────────────────────────────────────────

function extractJson(text: string): string {
  // ```json ... ``` 블록 우선 추출
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  // 순수 JSON 객체
  const braceStart = text.indexOf('{');
  const braceEnd = text.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd !== -1) {
    return text.slice(braceStart, braceEnd + 1);
  }
  return text.trim();
}

function parseGeminiResponse(text: string): FoodAnalysisResult {
  const jsonStr = extractJson(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new GeminiParseError(text);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new GeminiParseError(text);
  }

  const obj = parsed as Record<string, unknown>;

  if (typeof obj['error'] === 'string') {
    return {
      foods: [],
      totalCalories: 0,
      overallGiLevel: 'low',
      disclaimer: 'AI 추정값으로 참고용입니다.',
      error: obj['error'],
    };
  }

  // 필수 필드 런타임 검증
  if (!Array.isArray(obj['foods']) || typeof obj['totalCalories'] !== 'number' || typeof obj['overallGiLevel'] !== 'string') {
    throw new GeminiParseError(text);
  }

  return obj as unknown as FoodAnalysisResult;
}

async function callGeminiApi(parts: GeminiPart[]): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith('your_')) throw new GeminiApiKeyError();

  let response: Response;
  try {
    response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }] }),
    });
  } catch (err) {
    throw new GeminiNetworkError(undefined, (err as Error).message);
  }

  if (!response.ok) {
    throw new GeminiNetworkError(response.status, await response.text());
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new GeminiParseError('');
  return text;
}

// ─── 공개 API ──────────────────────────────────────────────────────────────────

/**
 * 음식 이미지를 base64로 받아 Gemini API로 영양 정보를 분석한다.
 * JSON 파싱 실패 시 1회 재시도하고, 재시도 후도 실패 시 GeminiParseError를 throw한다.
 */
export async function analyzeFood(imageBase64: string): Promise<FoodAnalysisResult> {
  const parts: GeminiPart[] = [
    { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
    { text: FOOD_ANALYSIS_PROMPT },
  ];

  const attempt = async (): Promise<FoodAnalysisResult> => {
    const text = await callGeminiApi(parts);
    return parseGeminiResponse(text);
  };

  try {
    return await attempt();
  } catch (err) {
    if (err instanceof GeminiParseError) {
      return await attempt();
    }
    throw err;
  }
}

/**
 * 음식 이름(텍스트)만으로 Gemini API에 영양 정보를 요청한다.
 * JSON 파싱 실패 시 1회 재시도하고, 재시도 후도 실패 시 GeminiParseError를 throw한다.
 */
export async function analyzeFoodText(foodName: string): Promise<FoodAnalysisResult> {
  const parts: GeminiPart[] = [
    { text: `${FOOD_ANALYSIS_PROMPT}\n분석할 음식: ${foodName}` },
  ];

  const attempt = async (): Promise<FoodAnalysisResult> => {
    const text = await callGeminiApi(parts);
    return parseGeminiResponse(text);
  };

  try {
    return await attempt();
  } catch (err) {
    if (err instanceof GeminiParseError) {
      return await attempt();
    }
    throw err;
  }
}

// ─── AI 가이드 생성 (스트리밍) ────────────────────────────────────────────────

const GUIDE_PROMPT = `당신은 저속노화 전문 건강 코치입니다.
오늘 먹은 음식 데이터를 분석해서 반드시 아래 JSON 형식으로만 응답하세요.
다른 텍스트는 절대 포함하지 마세요.

{
  "immediateAction": "string (지금 당장 할 수 있는 것, 1~2문장)",
  "nextMealSuggestion": "string (다음 식사 제안, 2~3문장)",
  "dailySummary": "string (오늘 하루 총평, 친근하고 긍정적으로)"
}

톤 규칙:
- '하지 마세요' 대신 '이렇게 하면 더 좋아요' 형식
- 저속노화, 혈당 스파이크 등 키워드 자연스럽게 사용
- 마지막 문장에 '전문의 상담을 권장합니다' 포함
- 의학적 단정 표현 절대 금지`;

function computeGiLevel(gi: number): GlycemicLevel {
  if (gi <= 55) return 'low';
  if (gi <= 69) return 'moderate';
  if (gi <= 89) return 'high';
  return 'veryHigh';
}

function parseGuideResponse(text: string): AIGuide {
  const jsonStr = extractJson(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new GeminiParseError(text);
  }
  const obj = parsed as Record<string, unknown>;
  if (
    typeof obj['immediateAction'] !== 'string' ||
    typeof obj['nextMealSuggestion'] !== 'string' ||
    typeof obj['dailySummary'] !== 'string'
  ) {
    throw new GeminiParseError(text);
  }
  return {
    immediateAction: obj['immediateAction'],
    nextMealSuggestion: obj['nextMealSuggestion'],
    dailySummary: obj['dailySummary'],
  };
}

/**
 * 오늘 식사 기록을 기반으로 Gemini 스트리밍 API에서 AI 가이드를 생성한다.
 * onChunk가 제공되면 텍스트 청크마다 호출되어 UI 실시간 업데이트에 사용된다.
 * 스트리밍 미지원 환경에서는 일반 응답으로 자동 대체된다.
 */
export async function generateGuide(
  todayRecords: FoodRecord[],
  onChunk?: (text: string) => void,
): Promise<AIGuide> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith('your_')) throw new GeminiApiKeyError();

  const allFoods = todayRecords.flatMap((r: FoodRecord) =>
    r.foods.map((f) => ({ name: f.name, calories: f.calories, giLevel: f.giLevel })),
  );
  const totalCalories = todayRecords.reduce(
    (sum: number, r: FoodRecord) => sum + r.foods.reduce((s: number, f) => s + f.calories, 0),
    0,
  );
  const allGiValues = todayRecords.flatMap((r: FoodRecord) => r.foods.map((f) => f.gi));
  const avgGi =
    allGiValues.length > 0
      ? allGiValues.reduce((a: number, b: number) => a + b, 0) / allGiValues.length
      : 0;
  const overallGiLevel: GlycemicLevel = computeGiLevel(avgGi);

  const dataSummary = JSON.stringify({ foods: allFoods, totalCalories, overallGiLevel }, null, 2);
  const prompt = `${GUIDE_PROMPT}\n\n데이터:\n${dataSummary}`;

  let response: Response;
  try {
    response = await fetch(`${GEMINI_STREAM_URL}?alt=sse&key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
  } catch (err) {
    throw new GeminiNetworkError(undefined, (err as Error).message);
  }

  if (!response.ok) {
    throw new GeminiNetworkError(response.status, await response.text());
  }

  // 스트리밍 미지원 환경 대체 처리
  if (!response.body) {
    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const fallbackText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return parseGuideResponse(fallbackText);
  }

  // SSE 스트림 읽기
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulated = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ') || line === 'data: [DONE]') continue;
      try {
        const json = JSON.parse(line.slice(6)) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        const chunk = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        if (chunk) {
          accumulated += chunk;
          onChunk?.(chunk);
        }
      } catch {
        // 불완전한 SSE 청크 무시
      }
    }
  }

  return parseGuideResponse(accumulated);
}
