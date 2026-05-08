---
name: 2026-05-07 세션 작업 내용
description: 도넛 차트 구현, 탭바 중앙 버튼 이동, 식사 유형 선택 기능 추가
type: project
originSessionId: 4204259e-b6ad-4832-bfff-894f5d4aafc5
---
## 오늘 완료한 작업 (2026-05-07)

### 1. CalorieDonut 컴포넌트 구현
**파일:** `src/components/food/CalorieDonut.tsx`

- `react-native-svg` 기반 SVG 도넛 차트 신규 구현
- 식사 유형(아침/점심/저녁/간식)별 컬러 아크 세그먼트 (`strokeLinecap="round"` 둥근 끝 처리)
- 아크 위에 플로팅 pill 라벨 (RN View, 절대 위치) — SVG 텍스트 대신
- 중앙: 섭취 칼로리 + 목표 kcal 표시
- 하단: GI 배지 + 남은 칼로리 텍스트
- 100% 기준 = 하루 권장 칼로리 (여성 2000 kcal, 사용자 프로필 연동 전 기본값)
- `SEG_GAP=26` (STROKE=20보다 커야 둥근 끝 겹침 방지)

**주요 수치:** SIZE=200, R=76, STROKE=20, C≈477.5, SEG_GAP=26, PILL_W=34, PILL_H=18

### 2. 홈 화면 정리
**파일:** `app/(tabs)/index.tsx`

- `mealCalories` prop 추가 (sumMealCal 함수로 4개 식사 유형별 칼로리 집계)
- `TARGET_CALORIES = 2000` 설정 (한국 영양섭취기준 여성 기준)
- 중복 import 제거, 사용하지 않는 StyleSheet 항목 삭제
- 카드 하단 식사 상세 행(mealRow) 제거 — 도넛 pill 라벨로 대체

### 3. 탭바 중앙 카메라 버튼
**파일:** `app/(tabs)/_layout.tsx`, `app/camera-tab.tsx`

- 우측 하단 FAB(+) 제거 → 탭바 중앙 돌출 원형 버튼으로 이동
- `CenterCameraButton` 컴포넌트: 탭바 위로 돌출(`marginBottom: 24`), 라벤더 배경, 그림자
- `camera-tab.tsx`: `/camera`로 Redirect 처리 (실제 화면 없는 더미 탭)
- 탭 구성: Home | History | [+카메라] | Profile

### 4. 식사 유형 선택 기능
**파일:** `app/analysis.tsx`

- `detectMealType()`: 시간대 기반 자동 추천 (5-10시=아침, 10-14시=점심, 14-19시=저녁, 기타=간식)
- `MealTypePicker` 컴포넌트: 4개 칩(아침/점심/저녁/간식) 수평 배열, 선택 시 라벤더 강조
- 결과 화면 disclaimer 아래 배치
- `handleSave()`가 `mealType` state를 사용하도록 수정

**Why:** 사용자 요청 — 시간 기반 자동 추천 + 수동 변경 가능한 UX 개선

**How to apply:** 식사 유형 관련 신규 기능 작업 시 이 구조를 참고할 것
