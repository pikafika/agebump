---
name: 2026-05-11 세션 작업 내용
description: Expo Go 실행 환경 정비, 음식 분석 정확도/UX 개선, 네이티브 폰트 로딩 복구, 기록·계정 페이지 MVP 구현
type: project
---

# 2026-05-11 작업 내역

## 1. Expo Go 실행 환경 정비
**관련:** dev 서버 워크플로, ngrok 터널

### 발견된 이슈
- 폰이 Mac LAN IP(`192.168.219.105`)에 도달 불가 — Mac에 `utun0~3` VPN 인터페이스가 다수 활성, 또는 공유기 AP isolation 의심
- `--tunnel` 옵션은 `@expo/ngrok` 패키지가 필요한데 비대화형 모드라 자동 설치 프롬프트에 응답 못 함
- 백그라운드 실행 시 Expo가 ASCII QR을 출력하지 않음 (TTY 아님)

### 해결
- `npm install --save-dev @expo/ngrok@^4.1.0` 한 번 설치 → 이후 `--tunnel` 동작
- 백그라운드 모드에서는 매니페스트 엔드포인트(`curl localhost:8081/` + Expo-Platform 헤더)로 `hostUri` 추출 후 `npx qrcode <url> -o /tmp/expo-qr.png && open` 으로 QR 이미지 생성
- 운영 중 `cd` 잔여로 cwd가 `assets/fonts/`에 묶이면 Expo가 그 경로를 프로젝트 루트로 오해(`ConfigError: assets/fonts/package.json does not exist`) — 명령 실행 전 `pwd` 또는 절대 경로 사용 필수

### 신규 스킬
**경로:** `/Users/mozzierose/.claude/skills/agebump-local-run/SKILL.md`
- 트리거: "프로젝트 로컬 실행해", "expo 시작해", "노화방지턱 앱 띄워", "dev 서버 켜"
- 플랫폼 선택, 백그라운드 실행 + 번들 신호 확인, 환경 메모(metro 설정, simctl 경고 정상) 포함

## 2. 음식 분석 정확도 + UX 개선
**파일:** `src/api/gemini.ts`, `src/types/food.ts`, `app/analysis.tsx`

### 계기
사용자가 "육개장 사발면"을 촬영했는데 Gemini가 "진라면"으로 오인식. 결과 화면에서 음식명을 정정할 UI도 없었음.

### 프롬프트 강화 — `src/api/gemini.ts:34-69`
- 한국 컵·봉지 라면 식별 가이드 추가: 브랜드 텍스트/포장 색상 우선순위, 컵/봉지/즉석조리 구분, 국물색·건더기 보조 단서
- SKU 매핑 예시 6개 명시(육개장 사발면, 신라면, 진라면, 짜파게티, 삼양라면, 너구리, 안성탕면)
- `confidence: number (0-1)`, `alternateNames: string[]` 출력 필드 추가
- 확신 낮을 때 단정 금지 + 후보 2~3개 나열 지시

### generationConfig 추가 — `src/api/gemini.ts:121-133`
```ts
generationConfig: {
  temperature: 0.2,
  topP: 0.8,
  topK: 32,
  responseMimeType: 'application/json',
}
```
이미지/텍스트 분석 양쪽 모두 `callGeminiApi` 공유라 자동 적용.

### 타입 확장 — `src/types/food.ts:27-31`
`FoodItem`에 `confidence?: number`, `alternateNames?: string[]` 옵셔널 추가(백워드 호환).

### 사용자 수정 UI — `app/analysis.tsx`
- HeroCard의 음식명 Text를 TouchableOpacity로 감싸 탭 시 `TextInput`으로 인라인 전환
- `handleNameSubmit(name)` → `analyzeFoodText(name)` 재호출 → 결과 교체
- AI 확신도 낮을 때 `AlternateChips`(가로 스크롤 후보 칩) 노출 — 칩 탭 시 같은 핸들러 재사용

## 3. 결과 화면 키보드 회피
**파일:** `app/analysis.tsx`

- 기존: `SafeAreaView > ScrollView` (KeyboardAvoidingView 없음). 메모 입력 시 키보드가 입력 필드 가림
- 적용: `KeyboardAvoidingView` 래핑 (iOS `padding`, Android `height`), `keyboardShouldPersistTaps="handled"`, `keyboardDismissMode="on-drag"`
- `SafeAreaView edges={['top']}`로 변경 — bottom inset은 ScrollView paddingBottom이 담당해서 키보드 높이 오계산 방지

## 4. 네이티브 폰트 로딩 복구 (배스킨라빈스체)
**파일:** `app/_layout.tsx`, `app.json`, `assets/fonts/`, `package.json`

### 원인
이전 세션(5월 9일)의 `_layout.tsx` 폰트 적용은 **웹 `@font-face` 주입만** — `useFonts` 등 네이티브 로딩 부재. iOS Expo Go에서는 system 폴백되어 "폰트 풀린 듯" 보임.

### 처리 절차
1. `npx expo install expo-font` (~14.0.11)
2. CDN(`projectnoonnu/noonfonts_seven`)에서 WOFF 다운로드 → `python3 fontTools.ttLib.TTFont(...).flavor=None`로 OTF 데이터 추출
3. 처음 `.ttf` 확장자로 저장했지만 실제 데이터가 OTF(CFF)였음 → 폰트 로더가 실패 → `.otf`로 rename + `require` 경로 업데이트
4. `useFonts({ BRBA_B, BRRA_R })` 훅 추가, 게이트는 `!isReady || (!fontsLoaded && !fontError)` — 폰트 에러 시 폴백 진행해 흰 화면 방지
5. `app.json`의 `expo-font` 플러그인 엔트리는 **반드시 제거**해야 함. 빈 옵션으로 두면 Expo Config가 `assets/fonts/`를 패키지로 해석해 `ConfigError` 발생. `useFonts`는 런타임 훅이라 플러그인 불필요

### 저장 위치
- `assets/fonts/BRBA_B.otf` (845KB, bold)
- `assets/fonts/BRRA_R.otf` (839KB, regular)
- family name은 웹/네이티브 동일(`BRBA_B`, `BRRA_R`) → 스타일 코드 변경 없음

## 5. 기록(History) 페이지 MVP
**파일:** `app/(tabs)/history.tsx` (전면 구현, 이전엔 stub)

### 구성
- 헤더: 돌아가기 + "기록"
- **날짜 스트립**(가로 ScrollView, 최근 7일): 요일·일·오늘 점 표식. primary 배경으로 선택일 강조
- **데이터 로딩 분기**:
  - 오늘 → `useFoodStore(s => s.records)` 즉시
  - 과거 → `useEffect`에서 `fetchRecordsByDate(iso)` 비동기, 스켈레톤 3개 표시, cancellation 가드
- **식사 유형별 그룹화**: 아침/점심/저녁/간식 순서. 데이터 있는 그룹만 노출. 그룹 헤더에 이모지+라벨+개수
- **레코드 카드**: 썸네일 64×64, 음식명(2줄), `formatTime(timestamp)`, GI 배지(`MontageBadge` color: positive/cautionary/negative), 합산 칼로리 큰 숫자
  - 탭 → `/analysis?recordId={id}` (analysis가 read-only 모드로 표시)
  - 길게 누름(오늘 한정) → Alert 확인 후 `deleteRecord(id)`
- **빈 상태**: 이모지 + 안내 + (오늘이면) "+ 식사 추가하기" → `/camera`

### 디자인 메모
- 모든 카드 `MontageCard` 재사용
- 색은 `COLORS.primary.normal`(스트립 선택, 칼로리 숫자), GI 배지는 `MontageBadge` fill variant
- 카드 길게 누름 `delayLongPress={400}`

## 6. 계정(Profile) 페이지 MVP
**파일:** `app/(tabs)/profile.tsx` (전면 구현, 이전엔 stub)

### 구성 (3섹션)
**내 정보**
- 닉네임 (최대 20자)
- 일일 칼로리 목표 (1000~5000, `keyboardType="number-pad"`)
- 행 탭 → 인라인 `TextInput` 토글, `onSubmitEditing`/`onBlur`로 저장

**설정**
- 오늘 기록 초기화 — `useFoodStore.setState({ records: [] })` (2단 Alert)
- 모든 기록 초기화 — `clearAllRecords()` 호출 (`food-records-` prefix 키 일괄 삭제) (2단 Alert, destructive)
- 온보딩 다시 보기 — `AsyncStorage.removeItem(ONBOARDING_KEY)` + `router.replace('/onboarding')`

**정보**
- 앱 버전 (정적 `1.0.0`)
- 면책 고지 (Alert 다이얼로그)
- 개인정보 처리방침 (Alert 다이얼로그)

### 키보드 회피
`KeyboardAvoidingView` (iOS padding / Android height) + `keyboardShouldPersistTaps="handled"`.

## 7. 지원 인프라
### 신규 파일
- **`src/utils/dateUtils.ts`** — `toDateString(ts)`, `todayString()`, `recentDates(n)`, `formatDateLabel(iso)` (요일·일·isToday), `formatTime(ts)` ('HH:mm')
- **`src/store/userProfileStore.ts`** — zustand+persist (`AsyncStorage`, 단일 키 `user-profile`)
  - 상태: `nickname` (기본 ''), `dailyCalorieGoal` (기본 `DAILY_CALORIE_GOAL_DEFAULT=2000`)
  - 액션: `setNickname`(trim), `setDailyCalorieGoal`(Math.round + clamp 1000~5000), `reset`
  - 상수 export: `DAILY_CALORIE_GOAL_MIN/MAX/DEFAULT`

### foodStore 확장 — `src/store/foodStore.ts`
- `getRecordById(id): FoodRecord | undefined`
- `clearAllRecords(): Promise<void>` — `AsyncStorage.getAllKeys` + prefix 필터 + `multiRemove` + 인메모리 `records=[]`

### 홈 게이지 연동 — `app/(tabs)/index.tsx`
- 하드코딩 `TARGET_CALORIES = 2000` 제거
- `useUserProfileStore(s => s.dailyCalorieGoal)` 구독 → 게이지 max + "목표" 텍스트 즉시 반영

### analysis.tsx `recordId` 모드 — `app/analysis.tsx`
- `useLocalSearchParams<{ imageUri?, foodName?, recordId? }>` 확장
- `runAnalysis`에서 `recordId` 우선 분기: `getRecordById(recordId)` 결과를 `FoodAnalysisResult` 형태로 변환(`levelFromGi` 헬퍼) → AI 호출 **없이** 즉시 표시. `memo`, `mealType`도 복원
- `decodedUri`: `imageUri` 없으면 `savedRecord.imageUri` 폴백
- `isViewingSaved = Boolean(recordId)` 분기:
  - 음식명 편집 UI 숨김 → 단순 Text만
  - "저장하기" 버튼 숨김 → "목록으로 돌아가기"(`variant="text"`) 추가
  - "AI 가이드 받기"는 유지

## 8. 검증
- `npm run typecheck` ✅
- `npm run lint` ⚠️ 사전 존재 2건 (`analysis.tsx:25 GLYCEMIC_COLOR`, `MontageButton.tsx:1 View`) — 모두 이번 변경 무관, 추후 정리 필요
- Dev 서버: 터널 모드로 정상 기동, 핫리로드 확인

## 알려진 한계
- ngrok 프리 티어는 일시적 "remote gone away" 발생 가능 — 잠시 후 재시도하면 복구
- 다른 ngrok 인스턴스(예: localhost:5173 Vite)가 떠 있으면 `localhost:4040` API를 점유해서 Expo 터널 URL 직접 조회 불가 — 매니페스트 엔드포인트의 `hostUri`로 추출하는 게 안정적
- 음식 분석 영양 수치(칼로리/탄단지/GI)는 여전히 AI 추정값
- 계정 페이지의 개인정보 처리방침/면책은 Alert 텍스트만 — 외부 URL 정해지면 `Linking.openURL` 연결 필요
- 사용 통계(총 분석 횟수 등), 캘린더, 주간 차트, 알림은 MVP 범위 밖
