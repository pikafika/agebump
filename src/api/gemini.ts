import { Platform } from 'react-native';

import { type AIGuide, type FoodAnalysisResult, type FoodRecord, type GlycemicLevel } from '../types/food';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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

/**
 * HTTP 응답은 받았지만 4xx/5xx로 실패한 경우. fetch 자체가 실패한 진짜 네트워크 오류와 구분된다.
 * 화면 분기를 위해 GeminiNetworkError를 상속한다.
 */
export class GeminiHttpError extends GeminiNetworkError {
  constructor(
    status: number,
    public readonly apiMessage: string,
    public readonly rawBody: string,
    public readonly retryDelaySec?: number,
  ) {
    super(status, `Gemini API HTTP ${status}: ${apiMessage}`);
    this.name = 'GeminiHttpError';
  }
}

interface ParsedErrorInfo {
  message: string;
  retryDelaySec?: number;
}

function extractGeminiErrorInfo(body: string): ParsedErrorInfo {
  try {
    const parsed = JSON.parse(body) as {
      error?: {
        message?: string;
        details?: Array<{ '@type'?: string; retryDelay?: string }>;
      };
    };
    const message = parsed?.error?.message ?? body.slice(0, 200);
    const retryDetail = parsed?.error?.details?.find((d) => d?.['@type']?.includes('RetryInfo'));
    const delayMatch = retryDetail?.retryDelay?.match(/^(\d+(?:\.\d+)?)s$/);
    const retryDelaySec = delayMatch ? Math.ceil(Number(delayMatch[1])) : undefined;
    return { message, retryDelaySec };
  } catch {
    return { message: body.slice(0, 200) };
  }
}

export class GeminiParseError extends Error {
  constructor(public readonly raw: string) {
    super('Gemini 응답을 JSON으로 파싱하는 데 실패했습니다.');
    this.name = 'GeminiParseError';
  }
}

// ─── 프롬프트 ──────────────────────────────────────────────────────────────────

const FOOD_ANALYSIS_PROMPT = `당신은 한국 음식과 가공식품(특히 라면·컵라면)을 정확히 식별하는 영양 전문가입니다.
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 절대 포함하지 마세요.

식별 우선순위:
1. 패키지/용기에 보이는 한글·영문 브랜드 텍스트(예: "농심", "오뚜기", "삼양", "Nongshim")와 제품명을 최우선 단서로 사용.
2. 포장 색상과 디자인 — 한국 라면 SKU는 색으로 거의 결정됨.
3. 용기 형태(컵 vs 봉지 vs 사발 vs 즉석조리)를 구분해서 같은 브랜드라도 정확한 SKU를 식별.
4. 위 단서가 부족하면 국물 색·건더기·면 두께 등으로 보조 판단.

한국 컵·봉지 라면 색상 가이드(참고):
- 육개장 사발면(농심): 빨강·노랑 사발형, 둥근 컵, 한글 "육개장사발면" 표기.
- 신라면(농심): 진한 빨강 봉지/컵, "辛" 한자.
- 진라면(오뚜기): 매운맛은 빨강, 순한맛은 초록 봉지. "JIN" 영문.
- 짜파게티(농심): 검정·노랑 봉지, 짜장 소스.
- 삼양라면(삼양): 주황 봉지, 클래식 디자인.
- 너구리(농심): 빨강·다시마 그림.
- 안성탕면(농심): 갈색·노랑 봉지.

식별 확신이 낮으면 단정하지 말고 confidence를 0.6 이하로 낮추고, alternateNames에 가능성 높은 후보 2~3개를 나열하세요.

출력 JSON 스키마:
{
  "foods": [{
    "name": "string (한국어, 가장 가능성 높은 정확한 제품명)",
    "calories": number,
    "carbs": number,
    "protein": number,
    "fat": number,
    "sugar": number,
    "gi": number (0-100),
    "giLevel": "low" | "moderate" | "high" | "veryHigh",
    "spikeRisk": number (0-100),
    "confidence": number (0-1, 식별 확신도),
    "alternateNames": ["string", ...] (확신도가 낮을 때 후보 2~3개, 확신이 높으면 빈 배열)
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

// 429(quota/rate limit)는 일반적으로 30초+ 대기가 필요해서 자동 재시도가 무의미하고
// 오히려 quota를 더 빠르게 소진한다. 5xx만 자동 재시도한다.
const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);
const MAX_RETRIES = 3;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGeminiApiOnce(
  parts: GeminiPart[],
  generationConfig: Record<string, unknown>,
): Promise<string> {
  let url: string;
  if (Platform.OS === 'web') {
    url = '/api/gemini-proxy';
  } else {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey.startsWith('your_')) throw new GeminiApiKeyError();
    url = `${GEMINI_API_URL}?key=${apiKey}`;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig,
      }),
    });
  } catch (err) {
    throw new GeminiNetworkError(undefined, (err as Error).message);
  }

  if (!response.ok) {
    const rawBody = await response.text();
    const { message, retryDelaySec } = extractGeminiErrorInfo(rawBody);
    throw new GeminiHttpError(response.status, message, rawBody, retryDelaySec);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new GeminiParseError('');
  return text;
}

/**
 * Gemini API를 호출하되, 일시적 과부하(429/5xx)에 대해 지수 백오프로 재시도한다.
 * 재시도 가능한 상태가 아닌 에러는 즉시 던진다.
 */
async function callGeminiApi(
  parts: GeminiPart[],
  generationConfig: Record<string, unknown> = {
    temperature: 0.2,
    topP: 0.8,
    topK: 32,
    responseMimeType: 'application/json',
  },
): Promise<string> {
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    try {
      return await callGeminiApiOnce(parts, generationConfig);
    } catch (err) {
      lastErr = err;
      // 재시도 대상:
      //  - HTTP 429/5xx (서버 일시 과부하)
      //  - raw fetch 실패 (GeminiNetworkError 본체, 즉 GeminiHttpError가 아닌 경우)
      //    → Gemini가 과부하 시 연결 자체를 끊는 경우가 있어 RN에서 'Network request failed'로 나타남
      const isHttp = err instanceof GeminiHttpError;
      const isRetryable = isHttp
        ? RETRYABLE_STATUS.has(err.status ?? 0)
        : err instanceof GeminiNetworkError;
      const hasMoreAttempts = attempt < MAX_RETRIES - 1;
      if (!isRetryable || !hasMoreAttempts) throw err;
      const backoffMs = 800 * Math.pow(2, attempt) + Math.floor(Math.random() * 300);
      const reason = isHttp ? `status=${(err as GeminiHttpError).status}` : 'fetch-failed';
      console.warn(
        `[gemini] retry ${attempt + 1}/${MAX_RETRIES - 1} after ${backoffMs}ms (${reason})`,
      );
      await delay(backoffMs);
    }
  }
  throw lastErr ?? new GeminiNetworkError(undefined, 'Gemini API 호출에 실패했습니다.');
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
 * 식사 기록을 기반으로 Gemini API에서 AI 가이드를 생성한다.
 * React Native fetch가 SSE/스트리밍을 안정적으로 지원하지 않아
 * 비-스트리밍(generateContent) 경로만 사용한다. 타이핑 애니메이션은
 * 호출 측(guide.tsx의 startTyping)에서 처리한다.
 */
export async function generateGuide(records: FoodRecord[]): Promise<AIGuide> {
  const allFoods = records.flatMap((r) =>
    r.foods.map((f) => ({ name: f.name, calories: f.calories, giLevel: f.giLevel })),
  );
  const totalCalories = records.reduce(
    (sum, r) => sum + r.foods.reduce((s, f) => s + f.calories, 0),
    0,
  );
  const allGiValues = records.flatMap((r) => r.foods.map((f) => f.gi));
  const avgGi =
    allGiValues.length > 0
      ? allGiValues.reduce((a, b) => a + b, 0) / allGiValues.length
      : 0;
  const overallGiLevel: GlycemicLevel = computeGiLevel(avgGi);

  const dataSummary = JSON.stringify({ foods: allFoods, totalCalories, overallGiLevel }, null, 2);
  const prompt = `${GUIDE_PROMPT}\n\n데이터:\n${dataSummary}`;

  const text = await callGeminiApi([{ text: prompt }], {
    temperature: 0.4,
    topP: 0.9,
    topK: 32,
    responseMimeType: 'application/json',
  });
  return parseGuideResponse(text);
}
