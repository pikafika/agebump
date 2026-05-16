---
name: 2026-05-08 세션 기록
description: PC 웹 미리보기 환경 구축 + zustand v5 import.meta 에러 해결 + 모델 설정 변경 이력(Opus 4.7 → Sonnet 4.6)
type: project
---

# 2026-05-08 작업 내역

## 1. PC(웹) 미리보기 환경 구축

**왜:** 모바일 디바이스 빌드 전 PC 브라우저에서 핫리로드로 UI 변경을 빠르게 검증하기 위함.

**한 일:**
- Expo SDK 54 호환 웹 의존성 설치: `react-native-web`, `react-dom`, `@expo/metro-runtime`
- 설치 명령: `npx expo install react-native-web react-dom @expo/metro-runtime` (자동 호환 버전 픽)
- 실행: `npm run web` → `http://localhost:8081`

**제약:** `app/camera.tsx`, `app/camera-tab.tsx`는 `expo-camera`의 `CameraView`에 의존 — 웹에서 실제 촬영 불가. 카메라 흐름은 시뮬레이터/실기기에서 검증.

## 2. zustand v5 + Metro Web `import.meta` 파서 에러 해결

**증상:** `npm run web` 후 브라우저에서 완전 흰 화면. DevTools 콘솔에 `Uncaught SyntaxError: Cannot use 'import.meta' outside a module`.

**원인:** zustand 5.0.13의 ESM 빌드(`node_modules/zustand/esm/middleware.mjs`)에 `import.meta.env.MODE` 사용. zustand v5의 `package.json` exports 필드는 web 번들 시 `import` condition을 매칭해 ESM 빌드를 선택. Expo의 web HTML 템플릿은 `<script>`를 클래식 모드(`type="module"` 없음)로 로드하므로 `import.meta` 파서 에러 발생.

**해결:** `metro.config.js` 신규 생성 — `resolver.unstable_enablePackageExports = false`로 패키지 exports 조건 해석을 끄고 `main` 필드(CJS, `import.meta` 없음)로 fallback.

**파일:** `/Users/mozzierose/Desktop/AIDev/agebump/metro.config.js`

```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;
module.exports = config;
```

**부수 효과:** ios/android는 이미 `react-native` condition으로 CJS를 쓰고 있어 영향 없음. 다른 ESM-only 패키지를 도입하려 할 때만 재고 필요.

## 3. 디폴트 모델 설정 이력

- 2026-05-08: `"model": "claude-opus-4-7"` 로 최초 고정
- 2026-05-16: `"model": "claude-sonnet-4-6"` 로 변경 (사용자 요청)

**설정 위치:** `/Users/mozzierose/.claude/settings.json` (최상단 `"model"` 키)
