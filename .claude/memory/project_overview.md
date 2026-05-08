---
name: agebump 프로젝트 개요
description: 앱 목적, 기술 스택, 주요 파일 구조 요약
type: project
originSessionId: 2b9bd9d6-38e7-4e1f-a55f-c355f05850cf
---
혈당 스파이크 위험을 AI(Gemini)로 분석하는 저속노화 식단 관리 Expo React Native 앱.

**Why:** 사용자가 음식을 촬영하면 Gemini Vision API가 혈당 영향도·영양 정보를 반환하고, 일별 리포트와 AI 가이드를 제공한다.

**How to apply:** 기능 추가 시 기존 Gemini API 패턴(`src/api/gemini.ts`)과 Zustand 스토어(`src/store/foodStore.ts`)를 먼저 확인할 것.

## 기술 스택
- Expo SDK (expo-router v6, file-based routing)
- React Native + TypeScript
- Gemini 2.0 Flash (`gemini-2.0-flash`) — Vision + Text 분석, 스트리밍 가이드 생성
- Zustand (`src/store/foodStore.ts`) — 식사 기록 상태
- Montage iOS 디자인 시스템 (수동 포팅, `src/constants/theme.ts`)

## 주요 파일
- `src/constants/theme.ts` — Montage 디자인 토큰 전체 (COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW, SQUIRCLE)
- `src/components/montage/` — MontageButton, MontageCard, MontageBadge
- `src/components/food/` — NutritionBar, GlycemicGauge
- `app/(tabs)/` — index(홈), history(기록), profile(프로필)
- `app/camera.tsx` — 음식 촬영/갤러리/직접입력
- `app/analysis.tsx` — Gemini 분석 결과
- `app/guide.tsx` — AI 일별 가이드
- `app/onboarding.tsx` — 최초 실행 온보딩

## Gemini API
- `src/api/gemini.ts` — analyzeFood(base64), analyzeFoodText(name), generateGuide(records)
- 모델: `gemini-2.0-flash` (gemini-1.5-flash는 2025년 이후 deprecated)
- API 키: `.env`의 `EXPO_PUBLIC_GEMINI_API_KEY`
