---
name: feedback-app-run-workflow
description: agebump 앱 실행 요청 시 QR 이미지(PNG) 생성 + 로컬 웹 접속 두 가지를 항상 함께 제공
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b868929a-41d6-4148-a86c-d31e044cb2fb
---

agebump 프로젝트에서 사용자가 "앱 실행해 줘", "프로젝트 실행해 줘" 등을 요청하면, 다음 두 가지를 **모두** 제공한다.

1. **QR 이미지 파일 생성** (터미널 ANSI 렌더링은 잘림/스캔 실패가 발생하므로 사용하지 않는다)
   - `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=20&data=<URL-encoded exp:// URL>` 로 PNG 다운로드
   - 저장 위치: `/Users/mozzierose/Desktop/AIDev/agebump/.claude/tmp/expo-qr.png`
   - `open` 명령으로 macOS 기본 뷰어에 띄워준다
   - LAN IP는 `ipconfig getifaddr en0` (없으면 en1)로 조회

2. **로컬 웹 접속**
   - `npx expo start --web` 또는 동시 LAN 모드로 `http://localhost:8081`에서 웹 미리보기도 가능하게 둔다
   - 사용자가 PC 브라우저에서도 동작 확인 가능해야 함

**Why:** 2026-05-12 사용자 요청. 터미널 QR이 셀 너비/줄바꿈 이슈로 짤려 스캔이 안 되는 사례가 있었음. 그리고 PC와 모바일 양쪽에서 확인하는 워크플로를 선호.

**How to apply:** [[agebump-local-run]] 스킬 실행 시 항상 QR PNG 생성 + 웹 접속 URL을 함께 출력한다. LAN 모드 단일 실행이 기본이지만, 같은 dev 서버로 웹과 Expo Go 둘 다 접근 가능하므로 별도 프로세스를 둘 필요는 없다 (필요 시 `--web` 플래그 없이 `npx expo start`로 시작하면 둘 다 동작).
