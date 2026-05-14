import type { FoodTypeCategory } from '../types/food';
import { imageToBase64, resizeImage } from './imageUtils';
import { calculateScore, getScoreLabel } from './scoreCalculator';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SCORE_PROMPT = `당신은 혈당 친화도 분석 전문가입니다.
음식 이미지를 보고 반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 절대 포함하지 마세요.

{
  "gi_index": number (식사 전체 평균 GI, 0-100),
  "carbs_g": number (탄수화물 합계, g),
  "fiber_g": number (식이섬유 합계, g),
  "food_types": ["vegetable" | "protein" | "carb" | "fermented"] (음식 유형 카테고리, 중복 없이),
  "comment": "string (혈당 친화도 한 줄 코멘트, 20자 이내)"
}

food_types 분류 기준:
- vegetable: 채소류 (샐러드, 나물, 브로콜리 등)
- protein: 고단백류 (육류, 생선, 계란, 두부 등)
- carb: 탄수화물 주식 (밥, 빵, 국수, 라면 등)
- fermented: 발효식품 (김치, 요거트, 된장, 낫토 등)

음식 인식 불가 시: { "error": "음식을 인식할 수 없습니다." }`;

export interface AnalyzeFoodResult {
  gi_index: number;
  carbs_g: number;
  fiber_g: number;
  food_types: FoodTypeCategory[];
  comment: string;
  score: number;
  scoreLabel: { label: string; color: string };
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const braceStart = text.indexOf('{');
  const braceEnd = text.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd !== -1) return text.slice(braceStart, braceEnd + 1);
  return text.trim();
}

async function callGeminiScore(
  parts: { text?: string; inline_data?: { mime_type: string; data: string } }[],
): Promise<string> {
  const { Platform } = await import('react-native');
  const publicApiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  let url: string;
  if (Platform.OS === 'web') {
    url =
      publicApiKey && !publicApiKey.startsWith('your_')
        ? `${GEMINI_API_URL}?key=${publicApiKey}`
        : '/api/gemini-proxy';
  } else {
    if (!publicApiKey || publicApiKey.startsWith('your_')) {
      throw new Error('EXPO_PUBLIC_GEMINI_API_KEY가 설정되지 않았습니다.');
    }
    url = `${GEMINI_API_URL}?key=${publicApiKey}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        topK: 32,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini API 오류 (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini 응답이 비어 있습니다.');
  return text;
}

/**
 * 이미지 URI를 받아 혈당 친화도 점수를 분석한다.
 * 리사이즈(800px) → base64 변환 → Gemini 호출 → 점수 계산까지 한 번에 처리한다.
 * 실패 시 null을 반환한다.
 */
export async function analyzeFoodScore(imageUri: string): Promise<AnalyzeFoodResult | null> {
  try {
    const resized = await resizeImage(imageUri);
    const base64 = await imageToBase64(resized);

    const text = await callGeminiScore([
      { inline_data: { mime_type: 'image/jpeg', data: base64 } },
      { text: SCORE_PROMPT },
    ]);

    const jsonStr = extractJson(text);
    const obj = JSON.parse(jsonStr) as Record<string, unknown>;

    if (typeof obj['error'] === 'string') return null;

    const gi_index = Number(obj['gi_index'] ?? 55);
    const carbs_g = Number(obj['carbs_g'] ?? 30);
    const fiber_g = Number(obj['fiber_g'] ?? 2);
    const food_types = (obj['food_types'] as FoodTypeCategory[]) ?? [];
    const comment = String(obj['comment'] ?? '');

    const score = calculateScore({ gi: gi_index, carbs: carbs_g, fiber: fiber_g, foods: food_types });
    const scoreLabel = getScoreLabel(score);

    return { gi_index, carbs_g, fiber_g, food_types, comment, score, scoreLabel };
  } catch {
    return null;
  }
}

/**
 * 텍스트(음식 이름)로 혈당 친화도 점수를 분석한다.
 * 실패 시 null을 반환한다.
 */
export async function analyzeFoodTextScore(foodName: string): Promise<AnalyzeFoodResult | null> {
  try {
    const text = await callGeminiScore([
      { text: `${SCORE_PROMPT}\n분석할 음식: ${foodName}` },
    ]);

    const jsonStr = extractJson(text);
    const obj = JSON.parse(jsonStr) as Record<string, unknown>;

    if (typeof obj['error'] === 'string') return null;

    const gi_index = Number(obj['gi_index'] ?? 55);
    const carbs_g = Number(obj['carbs_g'] ?? 30);
    const fiber_g = Number(obj['fiber_g'] ?? 2);
    const food_types = (obj['food_types'] as FoodTypeCategory[]) ?? [];
    const comment = String(obj['comment'] ?? '');

    const score = calculateScore({ gi: gi_index, carbs: carbs_g, fiber: fiber_g, foods: food_types });
    const scoreLabel = getScoreLabel(score);

    return { gi_index, carbs_g, fiber_g, food_types, comment, score, scoreLabel };
  } catch {
    return null;
  }
}
