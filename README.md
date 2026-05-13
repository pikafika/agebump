# 노화방지턱 (AgeBump)

> AI 기반 혈당 스파이크 분석 & 저속노화 식단 관리 앱

[![Expo](https://img.shields.io/badge/Expo-54.0-000020?logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react)](https://reactnative.dev)
[![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-4285F4?logo=google)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel)](https://vercel.com)

---

## 소개

음식 사진 한 장으로 혈당 스파이크 위험도를 즉시 분석하고, AI가 저속노화 식단 가이드를 제공하는 앱입니다. iOS · Android · 웹(Vercel) 동시 지원합니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **📷 음식 사진 분석** | 카메라 촬영 또는 갤러리 이미지를 Gemini Vision으로 분석 |
| **✏️ 텍스트 분석** | 음식 이름 직접 입력으로도 분석 가능 |
| **🩸 혈당 스파이크 위험도** | GI 지수 · 스파이크 위험 점수 · 4단계 등급 표시 |
| **📊 칼로리 게이지** | 일일 목표 대비 섭취 칼로리 실시간 시각화 |
| **📅 식단 일기** | 월별 캘린더 · 기록 편집 · 메모 기능 |
| **🤖 AI 가이드** | 하루 식사 기록 기반 저속노화 맞춤 식단 조언 생성 |
| **🔒 보안 메모** | SecureStore 기반 암호화 메모 저장 |

---

## 스크린샷

> 스크린샷 추가 예정

---

## 기술 스택

```
Frontend       Expo 54 · React Native 0.81 · TypeScript · Expo Router
State          Zustand 5
AI             Google Gemini 2.5 Flash API
Animation      React Native SVG · Animated API
Storage        AsyncStorage · expo-secure-store
Web Deploy     Vercel (Edge Function API Proxy)
```

---

## 프로젝트 구조

```
agebump/
├── app/                    # Expo Router 화면
│   ├── (tabs)/             # 탭 레이아웃 (홈·기록·계정)
│   ├── camera.tsx          # 카메라 · 갤러리 · 텍스트 입력
│   ├── analysis.tsx        # 분석 결과 화면
│   └── guide.tsx           # AI 가이드 화면
├── src/
│   ├── api/
│   │   └── gemini.ts       # Gemini API 호출 (재시도·에러 분류)
│   ├── components/
│   │   └── montage/        # 디자인 시스템 컴포넌트
│   ├── store/              # Zustand 상태 관리
│   ├── types/              # TypeScript 타입 정의
│   └── utils/
│       └── imageUtils.ts   # 이미지 리사이즈 · base64 변환 (플랫폼 분기)
├── api/
│   └── gemini-proxy.ts     # Vercel Edge Function (API 키 서버 보관)
└── vercel.json             # Vercel 빌드 설정
```

---

## 시작하기

### 사전 준비

- Node.js 20+
- Expo CLI (`npm install -g expo-cli`)
- [Google AI Studio](https://aistudio.google.com) API 키

### 설치

```bash
git clone https://github.com/pikafika/agebump.git
cd agebump
npm install
```

### 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일에 API 키를 입력합니다:

```env
EXPO_PUBLIC_GEMINI_API_KEY=여기에_Gemini_API_키_입력
```

### 실행

```bash
# 개발 서버 시작 (QR 코드로 실기기 테스트)
npm start

# iOS 시뮬레이터
npm run ios

# Android 에뮬레이터
npm run android

# 웹 브라우저
npm run web
```

---

## 웹 배포 (Vercel)

이 앱은 Vercel에 정적 웹 앱으로 배포됩니다. API 키는 클라이언트 번들에 포함되지 않고, Vercel Edge Function이 서버에서 안전하게 관리합니다.

### 배포 방법

1. [Vercel](https://vercel.com)에서 이 저장소 Import
2. Environment Variables에 아래 값 설정:

   | 변수명 | 설명 |
   |--------|------|
   | `GEMINI_API_KEY` | Gemini API 키 (서버 전용) |
   | `ALLOWED_ORIGIN` | 배포 URL (예: `https://your-app.vercel.app`) |

3. Deploy — `vercel.json` 설정이 자동 적용됩니다.

### 보안 구조

```
브라우저 → POST /api/gemini-proxy (같은 도메인)
           → Vercel Edge Function (GEMINI_API_KEY 서버에서 읽음)
             → Gemini API
```

---

## API 기능 상세

### 음식 분석 (`analyzeFood`)

- 이미지 base64 → Gemini Vision 분석
- 반환값: 음식명, 칼로리, 탄수화물, 단백질, 지방, 당류, GI 지수, 스파이크 위험도
- 5xx 오류 시 지수 백오프 자동 재시도 (최대 3회)
- 429 (quota 초과) 시 즉시 사용자 안내

### AI 가이드 (`generateGuide`)

- 하루 식사 기록 전체를 분석
- 즉각 실천 가이드 · 다음 식사 제안 · 하루 총평 생성
- 저속노화 키워드 중심, 의학적 단정 표현 제외

---

## 타입 체크 · 린트

```bash
npm run typecheck   # TypeScript 타입 검사
npm run lint        # ESLint 검사
```

---

## 라이선스

MIT
