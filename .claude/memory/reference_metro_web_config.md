---
name: Metro Web 번들 설정 (zustand v5 등 ESM 패키지 호환)
description: agebump 프로젝트의 metro.config.js — 패키지 exports 조건 해석 비활성화로 ESM-only 빌드 회피
type: reference
---

# Metro Web 번들 설정

**파일:** `/Users/mozzierose/Desktop/AIDev/agebump/metro.config.js`

**핵심 설정:** `config.resolver.unstable_enablePackageExports = false`

## 용도

Expo SDK 54의 web 번들러는 패키지 exports의 `import` condition을 우선 매칭해 ESM 빌드를 선택한다. 그러나 web HTML 템플릿은 `<script>`를 클래식 모드로 로드하므로, ESM 빌드에 포함된 `import.meta.env`/`import.meta.url`가 파서 에러를 일으킨다(`Uncaught SyntaxError: Cannot use 'import.meta' outside a module`).

이 설정을 비활성화하면 Metro가 `main` 필드(CJS)로 fallback하여 문제 회피.

## 이 설정이 영향을 주는 패키지 (현재 알려진 것)

- **zustand v5** (`zustand/esm/middleware.mjs`에 `import.meta.env.MODE`)

## 이 설정 변경 시 주의

새 패키지 도입 시 ESM-only인 경우(없는 `main` 필드, exports만 정의) 이 설정으로는 해결 불가. 그 경우 대안:
1. 해당 패키지에 한해 `resolver.resolveRequest`로 surrogate 경로 강제
2. babel 플러그인으로 `import.meta.env` 치환
3. CJS 호환 버전으로 다운그레이드

native(ios/android)는 이미 `react-native` condition으로 CJS를 쓰므로 이 설정 영향 없음.
