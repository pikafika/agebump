---
name: 2026-05-09 세션 작업 내용
description: 메인 페이지 전면 리디자인 — 노화방지턱 브랜딩, 배스킨라빈스체, Hugeicons, 칼로리 게이지 카드
type: project
---

# 2026-05-09 작업 내역

## 1. 메인 페이지 전면 리디자인
**파일:** `app/(tabs)/index.tsx`

### 핵심 컨셉
- 칼로리 수치를 화면 중앙에 거대 텍스트(128pt)로 강조
- 단일 액션 흐름: 큰 "식단 찍기" 버튼 → 카메라 → AI 분석
- 바텀 내비게이션 제거, 히스토리/계정은 Top bar 아이콘으로 이동

### 구조
```
SafeAreaView
├─ Top bar: 앱 이름(노화방지턱) + 시계/계정 아이콘
├─ Hero (flex:1): GaugeCard 배경 + heroContent (날짜 라벨 → 칼로리 → 메타카드)
└─ CTA: 식단 찍기 (primary blue, radius 29)
```

### GaugeCard
- 민트 파스텔 카드 (`#F0F8F1` empty / `#B8E6C1` fill, opacity 0.55)
- `Animated.timing` 1.4s `Easing.out(cubic)`로 fill height `0% → ratio*100%` 보간
- 우측 11개 tick 컬럼, 위/아래 끝 tick은 더 길고 진하게
- 다크 pill (`#1B2A1F`)이 현재 % 위치에 슬라이드 — `bottom: '6%~94%'` 클램프 보간 + `marginBottom: -PILL_HEIGHT/2`로 카드 밖 클리핑 방지
- 0% 라벨은 tick 컬럼과 분리해 `bottom:14, right:16`에 별도 배치 (이전 버전에서 카드 끝에 잘리던 문제 해결)
- 좌상단 노란 blob (`rgba(255,236,179,0.55)`) + 우하단 민트 blob → 부드러운 backdrop
- Hugeicons `SparklesIcon` 2개 (좌상/좌하)로 친근한 포인트

## 2. 바텀 내비게이션 제거
**파일:** `app/(tabs)/_layout.tsx`

- `Tabs` → `Stack`으로 변경 (한 줄짜리 레이아웃)
- 기존 `FloatingTabButton`, `CenterCameraButton` 코드 전부 삭제
- `app/camera-tab.tsx`는 그대로(`/camera` redirect) — 라우팅 호환

## 3. 배스킨라빈스체(BR Baskin Robbins) 적용
**파일:** `app/_layout.tsx`, `src/constants/theme.ts`

- noonnu CDN(jsdelivr) 사용
  - Bold: `https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/BRBA_B.woff` → `font-family: 'BRBA_B'`
  - Regular: `BRRA_R.woff` → `font-family: 'BRRA_R'`
- `injectWebFontOnce()`: `Platform.OS === 'web'` 가드 + `document.head` 1회 주입(중복 방지 id `br-font-faces`)
- `theme.ts`에 `FONT_FAMILY = { brand: 'BRBA_B', brandRegular: 'BRRA_R' }` 토큰 추가
- 적용: 앱 이름, 칼로리 숫자/kcal, CTA 라벨

**왜:** 사용자 요청. 일반 텍스트는 시스템/Pretendard 유지, 브랜드 텍스트만 BR로 강조.
**Native 미적용:** 웹 한정 (iOS/Android는 `expo-font` + 폰트 파일 번들링 필요).

## 4. Huge Icons 도입
**설치:** `@hugeicons/core-free-icons` (4.1.2) + `@hugeicons/react-native` (1.0.13)

- 사용 패턴:
  ```tsx
  import { Camera01Icon } from '@hugeicons/core-free-icons';
  import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
  <HugeiconsIcon icon={Camera01Icon} size={22} color="#FFF" strokeWidth={1.8} />
  ```
- `IconSvgElement` 타입은 **`@hugeicons/react-native`** 에서 export됨 (core-free-icons에는 없음)
- 적용 아이콘: `Clock01Icon` (히스토리), `UserCircleIcon` (계정), `Camera01Icon` (CTA), `SparklesIcon` (장식)
- `react-native-svg` 의존 — 이미 설치되어 있음

## 5. 새 색상 / 디자인 토큰
- 카드 BG: `#F0F8F1` (empty) / `#B8E6C1` (fill, 0.55 opacity)
- 카드 보더: `rgba(70,180,110,0.20)`
- 텍스트 짙은 그린: `#0F3F1A`
- Pill 다크: `#1B2A1F`
- CTA radius: 29 (기존 32 대비 ≈10% 축소)
- 메타 카드: paddingHorizontal 24, item paddingHorizontal 16, minWidth 280 (≈ +20%)

## 6. 디버깅 노트
- 패키지 신규 설치 후 Metro는 `--clear`로 재시작 필요. HMR만으로는 새 모듈을 못 묶을 수 있음.
- 노화방지턱 텍스트의 descender(ㅇ/ㅂ 받침)가 잘리지 않도록 `appName`에 `paddingVertical: 2` 추가.

## Why / How to apply
**왜:** 사용자가 "심플하게 사진 찍어 칼로리 기록"이라는 핵심 가치를 우선 검증하고자 함. 기존 도넛 차트 + 타임라인 + 탭바 구조는 정보가 분산되어 있었음.

**다음에 적용할 때:**
- 새 화면을 만들 때 BR 폰트는 강조 텍스트만 사용 (본문은 가독성 위해 Pretendard 유지)
- Hugeicons 아이콘 추가는 `@hugeicons/core-free-icons` 의 named export 검색으로 진행
- 게이지/프로그레스 모션은 `Animated.Value` + `interpolate('0%', '100%')` 패턴으로 RN/Web 호환 가능
