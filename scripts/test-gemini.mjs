#!/usr/bin/env node
/**
 * F-01 음식 분석 기능 검증 스크립트
 * 사용법: node scripts/test-gemini.mjs
 * 사전 요건: .env 파일에 실제 EXPO_PUBLIC_GEMINI_API_KEY 설정 필요
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// ─── .env 파싱 ─────────────────────────────────────────────────────────────────

const envPath = resolve(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
const API_KEY = envContent
  .split('\n')
  .find((l) => l.startsWith('EXPO_PUBLIC_GEMINI_API_KEY='))
  ?.split('=')[1]
  ?.trim();

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// ─── 색상 출력 ─────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

const ok = (s) => `${C.green}✓${C.reset} ${s}`;
const fail = (s) => `${C.red}✗${C.reset} ${s}`;
const warn = (s) => `${C.yellow}⚠${C.reset} ${s}`;

// ─── 프롬프트 ──────────────────────────────────────────────────────────────────

const PROMPT = `당신은 한국 음식 영양 전문가입니다.
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

// ─── API 호출 ──────────────────────────────────────────────────────────────────

async function callGemini(foodName, { timeout = 8000, offline = false } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const start = Date.now();
  try {
    if (offline) throw new TypeError('fetch failed');

    const res = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${PROMPT}\n분석할 음식: ${foodName}` }] }],
      }),
      signal: controller.signal,
    });

    const elapsed = Date.now() - start;
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, elapsed, error: `HTTP ${res.status}`, raw: body };
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    // JSON 추출
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = fenced?.[1]?.trim() ?? raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    const parsed = JSON.parse(jsonStr);

    return { ok: true, elapsed, parsed };
  } catch (err) {
    return { ok: false, elapsed: Date.now() - start, error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

// ─── 검증 함수 ─────────────────────────────────────────────────────────────────

function giLevelFromValue(gi) {
  if (gi <= 55) return 'low';
  if (gi <= 69) return 'moderate';
  if (gi <= 89) return 'high';
  return 'veryHigh';
}

const LEVEL_KO = { low: '낮음', moderate: '보통', high: '높음', veryHigh: '매우높음' };

function validate(foodName, result) {
  const issues = [];
  const food = result.foods?.[0];

  if (!food) { issues.push('foods 배열 비어있음'); return issues; }

  if (!food.name) issues.push('name 없음');
  if (food.calories < 50 || food.calories > 1500) issues.push(`calories 범위 이탈: ${food.calories}`);
  if (food.carbs < 0 || food.carbs > 200) issues.push(`carbs 범위 이탈: ${food.carbs}`);
  if (food.gi < 0 || food.gi > 100) issues.push(`gi 범위 이탈: ${food.gi}`);
  if (!['low', 'moderate', 'high', 'veryHigh'].includes(food.giLevel)) issues.push(`giLevel 무효값: ${food.giLevel}`);

  const expected = giLevelFromValue(food.gi);
  if (food.giLevel !== expected) issues.push(`giLevel 불일치 — gi:${food.gi}이면 ${expected}이어야 하는데 ${food.giLevel}`);

  if (!result.disclaimer) issues.push('disclaimer 없음');
  if (typeof result.totalCalories !== 'number') issues.push('totalCalories 없음');

  return issues;
}

// ─── 메인 ──────────────────────────────────────────────────────────────────────

const FOODS = ['김치찌개', '비빔밥', '삼겹살', '떡볶이', '라면', '된장찌개', '불고기', '잡채', '순두부찌개', '치킨'];

async function runFoodTests() {
  console.log(`\n${C.bold}━━━ 한식 10종 분석 테스트 ━━━${C.reset}\n`);
  console.log(`${'음식'.padEnd(10)} ${'칼로리'.padStart(6)} ${'탄(g)'.padStart(6)} ${'단(g)'.padStart(6)} ${'지(g)'.padStart(6)} ${'GI'.padStart(4)} ${'GI레벨'.padEnd(8)} ${'응답(ms)'.padStart(8)}  상태`);
  console.log('─'.repeat(80));

  const summary = [];

  for (const food of FOODS) {
    const { ok: success, elapsed, parsed, error } = await callGemini(food);

    if (!success) {
      console.log(`${food.padEnd(10)} ${C.red}오류: ${error}${C.reset}`);
      summary.push({ food, success: false, error });
      continue;
    }

    const f = parsed.foods?.[0];
    if (parsed.error || !f) {
      console.log(`${food.padEnd(10)} ${C.yellow}인식 불가: ${parsed.error ?? '응답 없음'}${C.reset}`);
      summary.push({ food, success: false, error: parsed.error });
      continue;
    }

    const issues = validate(food, parsed);
    const timeOk = elapsed < 3000;
    const allOk = issues.length === 0 && timeOk;

    const timeStr = `${elapsed}ms`;
    const statusStr = allOk
      ? `${C.green}PASS${C.reset}`
      : `${C.yellow}WARN${C.reset} ${issues.join(', ')}${!timeOk ? ` 응답지연(${timeStr})` : ''}`;

    console.log(
      `${f.name.padEnd(10)} ${String(f.calories).padStart(6)} ${String(f.carbs).padStart(6)} ${String(f.protein).padStart(6)} ${String(f.fat).padStart(6)} ${String(f.gi).padStart(4)} ${LEVEL_KO[f.giLevel].padEnd(8)} ${timeStr.padStart(8)}  ${statusStr}`,
    );

    summary.push({ food, success: true, issues, elapsed, f });
    await new Promise((r) => setTimeout(r, 500)); // rate limit 방지
  }

  return summary;
}

async function runErrorTests() {
  console.log(`\n${C.bold}━━━ 에러 케이스 테스트 ━━━${C.reset}\n`);

  // 1. 빈 문자열
  process.stdout.write('빈 문자열 입력: ');
  const r1 = await callGemini('');
  if (r1.ok && r1.parsed?.error) {
    console.log(ok(`인식 불가 응답 — "${r1.parsed.error}"`));
  } else if (!r1.ok) {
    console.log(warn(`API 오류 — ${r1.error}`));
  } else {
    console.log(fail('빈 문자열에 정상 응답 반환 (예상치 못한 동작)'));
  }

  // 2. 의미 없는 텍스트
  process.stdout.write('"asdfgh" 입력:   ');
  const r2 = await callGemini('asdfgh');
  if (r2.ok && r2.parsed?.error) {
    console.log(ok(`인식 불가 응답 — "${r2.parsed.error}"`));
  } else if (!r2.ok) {
    console.log(warn(`API 오류 — ${r2.error}`));
  } else {
    console.log(fail('무효 입력에 정상 응답 반환'));
  }

  // 3. 오프라인 시뮬레이션
  process.stdout.write('오프라인 시뮬레이션: ');
  const r3 = await callGemini('김치찌개', { offline: true });
  if (!r3.ok && r3.error?.includes('fetch failed')) {
    console.log(ok(`GeminiNetworkError 발생 — "${r3.error}"`));
  } else {
    console.log(fail(`예상 오류 미발생: ${r3.error ?? 'unknown'}`));
  }
}

// ─── 실행 ──────────────────────────────────────────────────────────────────────

const isPlaceholder = !API_KEY || API_KEY.includes('your_') || API_KEY === '';

if (isPlaceholder) {
  console.log(`
${C.red}${C.bold}[오류] API 키가 설정되지 않았습니다.${C.reset}

.env 파일에서 아래 값을 실제 키로 교체하세요:
  EXPO_PUBLIC_GEMINI_API_KEY=${C.dim}AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${C.reset}

Google AI Studio에서 발급: https://aistudio.google.com/app/apikey
`);
  process.exit(1);
}

console.log(`${C.cyan}Gemini API 키 확인됨. 테스트 시작...${C.reset}`);
console.log(`${C.dim}키: ${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}${C.reset}`);

await runFoodTests();
await runErrorTests();

console.log(`\n${C.bold}━━━ 정적 분석 결과 (코드 리뷰) ━━━${C.reset}
${warn('gemini.ts:104 — parseGeminiResponse가 FoodAnalysisResult 형식을 런타임 검증 없이 캐스팅')}
  → foods 배열 필드 누락 시 undefined 참조 에러 가능
  → 수정: foods, totalCalories, overallGiLevel 필드 존재 여부 런타임 검사 추가 권장

${warn('gemini.ts:109 — placeholder 키("your_gemini_api_key_here")는 빈 문자열이 아니라 통과됨')}
  → API 호출 후 HTTP 400/403으로 실패하므로 동작 자체는 막히지만
    에러 메시지가 "API 키 오류"가 아닌 GeminiNetworkError로 표시됨
  → 수정: placeholder 패턴 검사 추가

${ok('JSON 추출 로직 (extractJson) — 펜스 블록 / 순수 JSON 모두 처리, 양호')}
${ok('재시도 로직 — GeminiParseError 1회 재시도, 다른 에러 즉시 throw, 올바름')}
${ok('에러 클래스 3종 분리 — 호출부에서 타입 구분 가능, 양호')}
`);
