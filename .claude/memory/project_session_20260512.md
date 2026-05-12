---
name: 2026-05-12 세션 작업 내용
description: 식단 일기 리디자인, AI 가이드 버그 수정·미리보기·재생성, 분석/계정 헤더 통일, 폰트 name 테이블 패치, 메인 게이지 모션 + 상태 컬러 테마
type: project
---

# 2026-05-12 작업 내역

## 1. 응답 톤 규칙 추가
**파일:** `.claude/memory/feedback_tone.md` (신규), `MEMORY.md` 색인 갱신

사용자가 "표현은 존댓말로, 친절하게 대답해 줘" 요청 → feedback 메모리에 영구 저장. 기존 `feedback_language.md`(한국어 답변)와 함께 적용.

## 2. 기록 페이지(식단 일기) 전면 리디자인
**계기:** 사용자가 첨부 이미지(우측 칼로리 강조형 + 영문 주간 캘린더) 기준으로 보완 요청. 어떤 디자인/규칙으로 갈지 plan mode + AskUserQuestion 4문항으로 사전 확정.

**확정 사항**
- 카드 스타일: 우측(칼로리 강조형) — 식사명 헤더 + 큰 칼로리(식사색) + 음식 설명 + 영양 태그 + 우측 상단 아바타/하단 썸네일
- 캘린더: 이미지 그대로 + 도트 — `M T W T F S S` 영문 요일, 선택일 파란 원, 기록 있는 날 식사색 도트
- 영양 태그: 영양소 비율 자동 (단백/탄수/지방 비율, GI, sugar, total kcal 기반)
- 헤더: `식단 일기` + 그룹 헤더 제거

**Plan 파일:** `/Users/mozzierose/.claude/plans/sprightly-fluttering-reddy.md`

### 2-1. `src/utils/dateUtils.ts` 헬퍼 추가
- `WEEKDAY_INITIALS_EN = ['M','T','W','T','F','S','S']` — 월요일 시작 영문 1글자
- `thisWeekDates()` — 이번 주 월~일 7개 `YYYY-MM-DD` 배열. `(getDay()+6)%7` 오프셋으로 월요일 산출, 로컬 시간 기준(기존 `toDateString` 재사용)
- `formatTimeAMPM(timestamp)` — `오전 08:00am` / `오후 01:00pm` 한·영 혼합 표기 (이미지 디자인 그대로)
- 기존 `formatTime`(24시간제)은 유지 — 다른 곳 영향 없도록 함수 신설

### 2-2. `src/utils/nutritionTags.ts` 신규
`FoodRecord` → 자동 태그 최대 3개. 음식 0개 또는 totalCalories ≤ 0이면 빈 배열.

**비율 계산**
```
protein_ratio = sum(food.protein * 4) / total_kcal
carbs_ratio   = sum(food.carbs   * 4) / total_kcal
fat_ratio     = sum(food.fat     * 9) / total_kcal
avg_gi        = sum(food.gi) / count(foods)
```

**우선순위 (위에서 매칭 순으로 최대 3개)**
1. `protein_ratio > 0.25` → `#고단백`
2. `carbs_ratio < 0.30` → `#저탄수화물`
3. `avg_gi > 0 && avg_gi <= 55` → `#저GI`
4. `fat_ratio > 0.40` → `#고지방`
5. `sugar_total < 5` → `#저당`
6. `total_kcal > 700` → `#든든한`
7. `total_kcal < 400` → `#가벼운`

### 2-3. `src/store/foodStore.ts` 확장
신규 export `fetchMealTypesForDates(dates: string[]): Promise<Record<string, MealType[]>>`
- 캘린더 도트용. 기존 `fetchRecordsByDate`를 `Promise.all`로 묶고 `mealType`만 distinct 추출
- 별도 키 패턴이 아닌 기존 함수 재사용 — 인터페이스 추가만, 기존 코드 영향 없음
- 신규 import: `MealType`

### 2-4. `app/(tabs)/history.tsx` 전면 리디자인
**제거된 항목**
- 가로 스크롤 날짜 칩(`ScrollView horizontal` 캘린더) → 한 줄 7칸 균등 배치
- 식사 유형 그룹 헤더(`🌅 아침 N개`) — 카드 자체에 식사명이 있어 중복 제거
- `MontageBadge` GI 배지(카드 안에서 직접 안 씀), `avgGiLevel`/`GI_BADGE` 로컬 유틸 제거
- 24시간제 `formatTime` 사용 — `formatTimeAMPM`으로 교체

**신규 컴포넌트/로직**
- `DateCell` — 영문 요일 + 숫자 + 선택 시 파란 원(36×36, radius 18) + 식사색 도트 최대 4개(4×4px)
- `RecordCard` — 칼로리 강조형 2열 레이아웃
  - 좌측(flex 1): 식사명(`{MEAL_LABEL} 식사`) → 시간(AMPM) → 큰 칼로리(28px, 식사색) → 음식 설명(`representativeFoodLabel`: 대표 음식 + ` 외 N건`) → 태그 줄
  - 우측: 32×32 원형 아바타(식사색 33% opacity 배경 + 이모지) + 88×88 음식 썸네일
  - 태그 chip: `paddingHorizontal pt08`, `paddingVertical 3`, `borderRadius pill`, 배경 `mealColor + '22'`, 텍스트 `mealColor`
- `weekMealTypes` state + `useEffect` — 마운트 시 1회 + `todayRecords.length` 변경 시 재로딩(오늘 새 기록 추가 직후 도트 반영)
- `orderedRecords` — `MEAL_ORDER.flatMap`으로 식사 유형 순서 유지하되 그룹 헤더 없이 카드만 평탄 나열, 각 그룹 내 시간 오름차순

**상수 (로컬)**
- `MEAL_LABEL`: 아침/점심/저녁/간식 (한글 라벨)
- `MEAL_EMOJI`: 🌅/☀️/🌙/🍎
- `MEAL_COLORS`: `#FBBF24`/`#34D399`/`#818CF8`/`#FB7185` (CalorieDonut.tsx에서 복제 — 컴포넌트 export 없어서)

**유지된 동작**
- 카드 탭 → `/analysis?recordId=...`
- 카드 길게 누름(오늘 한정) → 삭제 Alert (`deleteRecord`)
- 과거 날짜 비동기 로딩 + cancellation 가드 + 스켈레톤 3개(높이 140으로 확대)
- 빈 상태 + `+ 식사 추가하기` 버튼(오늘만)

## 3. 검증
- `npx tsc --noEmit --pretty false` ✅ 무에러
- Expo 웹 dev 서버는 세션 시작 시 기동 후 그대로 실행 중(background ID `bl546m0ub`) — 브라우저 시각 검증은 사용자에게 인계

## 결정/주의 사항
- `MEAL_COLORS`는 history.tsx와 CalorieDonut.tsx 양쪽에 중복 존재. 향후 `src/constants/meal.ts`로 추출 고려 (이번 스코프 밖)
- `recentDates(n)`은 어디서도 더 안 쓰이면 제거 가능. 현재는 `dateUtils.ts`에 그대로 두었음(다른 곳 사용처 미확인)
- foodStore의 AsyncStorage 키는 `toISOString().slice(0,10)`(UTC), dateUtils의 `todayString()`은 로컬 — 자정 직후 KST/UTC 차이로 키 mismatch 가능성은 기존부터 있는 이슈. 본 작업에서 해결하지 않음
- 헤더 우측 ⋮ 버튼은 자리 확보용. 정렬/필터 메뉴는 후속 작업
- 영양 태그는 AI가 추정한 영양 수치에 의존 → 라면 등 가공식품에서 수치 부정확하면 태그도 빗나갈 수 있음

## 알려진 한계
- 캘린더 도트는 mealType 종류만 표시(최대 4개) — 식사별 횟수 표시는 없음
- 캘린더가 이번 주 고정 → 지난 주/다음 주 네비게이션 없음(이미지 디자인에 페이저 없어서 단순화)
- 영양 태그 임계값(25%/30%/40%, 55GI, 5g, 400/700kcal)은 휴리스틱. 사용자 피드백으로 조정 여지

---

## 4. AI 가이드 기능 버그 수정 + 저장된 가이드 미리보기/재생성

### 4-1. 식단 일기 상세 → 가이드 페이지 컨텍스트 누락 (핵심 버그)
**파일:** `app/analysis.tsx`, `app/guide.tsx`, `src/store/foodStore.ts`

기존: `router.push('/guide')` 만 호출 → guide.tsx가 `getTodayRecords()`로 오늘 기록만 컨텍스트 사용 → 과거 기록 가이드 시 빈 화면 또는 엉뚱한 가이드.

수정:
- `analysis.tsx`: 가이드 버튼에서 `recordId`, `ts`(timestamp) query 전달
- `guide.tsx`: `useLocalSearchParams<{ recordId?, ts?, regenerate? }>` 추가, 인메모리에서 우선 검색하고 없으면 `fetchRecordsByDate(date)`로 비동기 로드. 단건 컨텍스트 사용.
- 요약 카드(혈당 영향도, 칼로리)와 타이틀(`AI 가이드` / `오늘의 혈당 리포트`)도 컨텍스트에 맞게 분기
- `foodStore.ts`에 `persistUpdateRecord(id, timestamp, updates)` 신규 — 과거 기록의 AsyncStorage 데이터를 안전하게 부분 업데이트(인메모리 무관)

### 4-2. SSE → 비-스트리밍 전환 ("AI 가이드를 생성할 수 없었습니다" 에러 해결)
**파일:** `src/api/gemini.ts`

원인: `generateGuide`만 `streamGenerateContent?alt=sse` 엔드포인트 사용. RN 의 fetch는 `response.body` ReadableStream 미지원 → SSE 본문이 JSON 파싱 실패 → `GeminiParseError` → fallback 메시지.

수정:
- `generateGuide`를 일반 `generateContent` 엔드포인트로 통일 (`analyzeFood`/`analyzeFoodText`와 동일 패턴)
- `responseMimeType: 'application/json'` 명시
- 미사용 `GEMINI_STREAM_URL` 제거, `onChunk` 인자 제거(타이핑 애니메이션은 클라이언트 `startTyping`에서 처리)
- `guide.tsx`의 catch에서 `GeminiParseError` 별도 분기 + status 노출 + `console.warn`으로 실제 에러 디버그용 출력

### 4-3. 저장된 가이드 미리보기 + 재생성 플로우
**파일:** `app/analysis.tsx`, `app/guide.tsx`

기존: `aiGuide`가 저장되긴 하지만 어디에도 표시되지 않음. 가이드 페이지에 재진입할 때마다 새 API 호출.

수정:
- `analysis.tsx`: `savedRecord.aiGuide`가 있으면 메모 아래에 가이드 3장 카드(⚡지금 바로 / 🥗다음 식사 / ✨오늘의 총평) 미리보기. 버튼 라벨도 `🤖 AI 가이드 받기` → `🔄 AI 가이드 다시 생성`으로 분기
- `guide.tsx`: 단건 컨텍스트에 `aiGuide`가 있으면 새 API 호출 없이 즉시 표시(`startTyping`만 재생). 저장 버튼은 `저장됨`으로 disabled 처리
- `regenerate=1` 쿼리가 있으면 캐시 무시하고 새로 생성 (`runGuide` 호출). 저장 시 기존 `aiGuide` 덮어쓰기. 인메모리(`updateRecord`) + AsyncStorage(`persistUpdateRecord`) 양쪽 갱신

## 5. 분석/계정 Top Bar 통일
**파일:** `app/analysis.tsx`, `app/(tabs)/profile.tsx`

식단 일기 헤더 패턴(`[ ← ]   타이틀   [ ⋮ ]`)으로 통일.

- 분석: ScrollView 안의 `← 돌아가기` 버튼 제거, SafeAreaView 바로 아래 별도 헤더 추가. 타이틀은 `isViewingSaved`이면 `식사 상세`, 새 분석이면 `음식 분석`. `Pressable` import 추가, 사용 안 하는 `backBtn`/`backLabel` 스타일 제거
- 계정: 좌측 `← 돌아가기` 텍스트 → `←` 화살표만, 우측 빈 placeholder → `⋮` Pressable
- 공통 스타일: `headerSide`(width 32), `headerArrow`/`headerDots`(fontSize 22), 타이틀(`TYPOGRAPHY.heading2 + bold`)

## 6. 배스킨라빈스체 폰트 name 테이블 패치 (시스템 폰트 폴백 해결)
**파일:** `assets/fonts/BRBA_B.otf`, `assets/fonts/BRRA_R.otf`, `app.json`, `app/_layout.tsx`

### 원인
폰트 파일 내부 `name` 테이블에 **Family Name(nameID 1)이 없음** + PostScript Name(nameID 6)만 `BRBA`/`BRRA`로 등록 → 우리가 코드에서 `fontFamily: 'BRBA_B'`/`'BRRA_R'`로 참조하는 이름과 일치하지 않아 iOS가 system 폰트로 폴백.

### 진단 과정
- `app.json`에 `expo-font` 플러그인 추가 시도 → Expo Go는 prebuilt 앱이라 plugin 무효 (5월 11일 메모에 기록된 "useFonts만으로도 동작" 부분의 맥락 보완 필요)
- fontTools로 폰트 내부 name 테이블 조회 → 문제 발견

### 수정
- fontTools로 두 폰트의 nameID 1(Family)/2(Subfamily: Bold/Regular)/4(Full)/6(PostScript)를 모두 `BRBA_B`/`BRRA_R`로 설정. Mac(plat 1) + Windows(plat 3) 양쪽 platform 등록
- `app.json`의 `expo-font` 플러그인 엔트리는 5월 11일 메모대로 다시 제거 (Expo Go에선 무의미)
- `app/_layout.tsx`에 `fontError`/`fontsLoaded` 콘솔 로그 추가(`[fonts] BRBA_B, BRRA_R loaded` 또는 `BR load error: ...`)
- Metro 캐시 클리어 후 `--clear` 재시작 필수

## 7. 메인 페이지 게이지 모션 (물결 + 카운트업)
**파일:** `app/(tabs)/index.tsx`

게이지 카드에 단순 height 채움만 있던 것을 풀 워터 트래커 스타일로 보강. 여러 차례 사용자 피드백을 반영해 점진 조정.

### 7-1. SVG sin 곡선 wave (react-native-svg 활용, 추가 의존성 없음)
- `buildWavePath(totalHeight)`로 cubic bezier 4~5 사이클 sin 곡선 + 그 아래로 단색 fill까지 한 path. `WaveSvg`에 `full?: boolean` prop으로 표면 띠/풀 채움 분기
- 두 wave 띠 어긋난 페이즈로 위·아래 출렁 (`translateX` 좌우 이동은 사용자 요청으로 제거됨)

### 7-2. 칼로리 카운트업
- `Animated.Value` + listener로 0 → totalCalories 까지 1.6초 증가, `Easing.out(Easing.cubic)` — 게이지 차오름과 동일 곡선으로 동시 정착

### 7-3. 점진 튜닝 (사용자 피드백 기반)
- "출렁임 약함" → 진폭 ±12 → ±22 / 속도 1.4s → 1.1s, AMP 14 → 18
- "물결 외 레이어 제거" → fill 그라데이션 SVG·bob 출렁임·bubble 3개 모두 제거. 좌우 흐름은 상하 흔들림으로 전환
- "wave 하단까지 풀로 채움" → `WAVE_FILL_DEPTH 800` 도입, sin 표면 + 그 아래 단색을 한 path로
- "투명도 낮춰 카드 정보 가시성" → waveBack 0.55 → 0.12, waveFront 0.85 → 0.18, stroke 0.95 → 0.55
- "교차 효과 강화" → 진폭 ±22/±20, sin 진폭 18, 속도 1.1s/1.9s로 비대칭 1:1.73
- "하단 wave 30% 좌측 이동" → `WAVE_BACK_OFFSET = -WAVE_WIDTH * 0.3 ≈ -246`. WAVE_WIDTH 640 → 820, WAVE_CYCLES 4 → 5(사이클 폭 유지). `waveBack.left`만 다르게 줘 phase 어긋남

## 8. 메인 페이지 상태별 컬러 테마
**파일:** `app/(tabs)/index.tsx`

진행률 4단계로 카드/wave/텍스트 색을 동시 변경 → 사용자가 오늘 상태를 한눈에 파악.

### 임계값
```
start    < 30%   Cool / Sky / Navy
progress 30~80%  Mint (기존 톤 유지)
near     80~105% Amber (주의)
over     ≥ 105%  Coral (경고)
```

### 구현
- `CalorieState` 타입 + `getCalorieState(ratio)` 함수 + `CalorieTheme` 인터페이스 + `THEME_BY_STATE` 4세트 매핑
- `GaugeCard`에 `theme: CalorieTheme` prop 추가 — 카드 배경/border, blob ×2, wave 두 겹 fill/stroke 모두 인라인 적용
- `HomeScreen` 본문 — 칼로리 숫자/`kcal` 단위/`목표`·`남은 칼로리` value+label/date badge dot 인라인 색 적용
- 기존 정적 상수 `CARD_BG_EMPTY`/`CARD_BORDER`/`CARD_HALO_1`/`CARD_HALO_2` 모두 제거. styles 정의에서도 backgroundColor/borderColor 제거 (인라인 덮어쓰기 전용)

### 제외 (브랜드 일관성)
- 상단 헤더(앱 제목 `노화방지턱`, 아이콘 버튼)
- CTA `식단 찍기` 버튼
- sparkle 노랑 액센트

## 검증 (오늘 통합)
- `npx tsc --noEmit --pretty false` ✅ 모든 수정 통과
- Expo dev 서버: `--tunnel` 모드로 핫리로드 유지 (background task ID 여러 차례 재시작)
- 시각 검증은 사용자 측 Expo Go에서 직접 확인

## 결정 / 주의
- generateGuide의 스트리밍 모드는 RN 환경에서 안정적으로 동작하지 않으므로 사용 금지. 모든 Gemini 호출은 일반 generateContent 사용
- 폰트 파일 작업 시 폰트 내부 nameID 1/4/6 일치를 우선 확인 (RN useFonts 키와 일치해야 함)
- Expo Go에서는 `app.json`의 `expo-font` 플러그인이 효과 없음 (prebuilt 앱). dev client 빌드/EAS 빌드 시에는 명시 필요
- 상태 테마 임계값(0.30/0.80/1.05)은 휴리스틱. 사용자 피드백으로 조정 가능
- 가이드 페이지 단건 컨텍스트의 캐시 재사용 시 `regenerate=1` 쿼리로 우회 가능

## 후속 / 미정
- 상태 테마 전환 시 색 페이드 애니메이션 (현재 즉시 변경)
- 다크 모드 / 색약 접근성 대응
- 메인 게이지의 0% 상태에서 wave가 안 보이는 점 (의도된 동작이지만 첫 진입 시 cue 부족할 수 있음)
- 분석 페이지의 사용 안 되는 `GLYCEMIC_COLOR` import 경고 (기존부터 존재)
