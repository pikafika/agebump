# Gemini API 키 제한 설정 가이드 (P1-1(a))

`EXPO_PUBLIC_GEMINI_API_KEY`는 Expo 빌드 시 클라이언트 번들에 인라인되어 디컴파일로 추출 가능하다. 키 자체를 숨길 수는 없으므로, **Google Cloud Console에서 키 사용처를 제한**해 유출된 키가 다른 환경에서 사용되지 않도록 막는다.

> 이 작업은 **코드 변경 없이 콘솔 설정만**으로 진행한다. 작업 시간: 약 30분 (DNS/캐시 전파 포함).

---

## 사전 정보

- iOS Bundle ID / Android Package: `com.agebump.app`
- 사용 중인 API: Generative Language API (Gemini)
- 키 위치: Google AI Studio (https://aistudio.google.com) 또는 Google Cloud Console의 API 키 페이지

---

## 단계 1 — Android SHA-1 지문 확보

Android 제한은 패키지명 + 인증서 SHA-1 fingerprint 조합으로 동작한다. EAS Build 사용 중이라면:

```bash
# EAS에서 빌드 자격증명 조회
eas credentials --platform android
```

선택지에서 `Production`(또는 사용 중인 환경) → `Keystore` → `View existing keystore` → SHA-1 값을 복사.

로컬 keystore가 따로 있다면:
```bash
keytool -list -v -keystore <경로>/release.keystore -alias <alias>
```

`SHA1: AB:CD:...` 형식의 값을 모두 복사해 둔다.

---

## 단계 2 — iOS 정보 확인

- iOS는 Bundle ID만으로 제한 가능
- Bundle ID: `com.agebump.app` (app.json:ios.bundleIdentifier)

---

## 단계 3 — Google Cloud Console에서 키 제한 적용

1. https://console.cloud.google.com/apis/credentials 접속 (Gemini 키가 발급된 프로젝트 선택)
2. 사용 중인 API 키(`AIza...`)를 클릭
3. **Application restrictions** 섹션
   - 두 플랫폼을 모두 지원하려면 키를 두 개로 분리하거나, 둘 중 하나만 제한 후 다른 플랫폼용 키를 별도 발급한다 (한 키는 한 플랫폼만 가능). 권장: **iOS용 키 1개 + Android용 키 1개**로 분리.
   - **iOS 키**:
     - Application restrictions → `iOS apps`
     - "ADD" → Bundle ID `com.agebump.app` 입력 → 저장
   - **Android 키**:
     - Application restrictions → `Android apps`
     - "ADD" → Package name `com.agebump.app` + SHA-1 지문 입력 → 저장
4. **API restrictions** 섹션
   - `Restrict key` 선택 → `Generative Language API`만 체크 → 저장

---

## 단계 4 — 환경변수에 키 분리 (선택)

iOS와 Android에서 서로 다른 키를 쓰려면 클라이언트에서도 분기 필요:

```ts
// 예시 — 추후 구현 시 적용
import { Platform } from 'react-native';

const apiKey =
  Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_GEMINI_API_KEY_IOS
    : process.env.EXPO_PUBLIC_GEMINI_API_KEY_ANDROID;
```

`.env`에 두 값을 모두 두고 `gemini.ts`에서 Platform 분기. 단일 키로 시작하려면 이번 단계는 생략 가능.

---

## 단계 5 — 검증

설정 후 5~10분 대기 (전파 시간).

**정상 동작 확인 (앱)**
1. 새 빌드를 EAS로 만들거나 Expo Go에서 실행
2. 음식 분석 1회 수행 → 성공해야 함

**유출 시뮬레이션 (curl)**
```bash
# 다른 origin/패키지명 헤더로 호출 → 403 PERMISSION_DENIED 기대
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=<발급된_키>" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"ping"}]}]}'
```
- 응답 본문에 `"status": "PERMISSION_DENIED"` 또는 `"reason": "API_KEY_HTTP_REFERRER_BLOCKED"` 같은 메시지가 보이면 정상 차단됨

---

## 한계와 다음 단계

- 클라이언트 측 제한은 키 노출 자체를 막을 수는 없다. 결제를 활성화한다면 **반드시 백엔드 프록시(P1-1(b))**로 전환할 것
- 키 제한은 의도하지 않은 사용을 막을 뿐, 정상 패키지명을 위조한 공격에는 약함 (SHA-1까지 함께 검증되는 Android는 비교적 안전)
- 향후 Cloudflare Worker / Vercel Edge / Firebase Functions 같은 프록시로 옮기면 키를 완전 비공개로 유지하고 사용량 제한·인증·rate limit도 부착 가능

---

## 참고 링크

- https://cloud.google.com/docs/authentication/api-keys#restrictions
- https://ai.google.dev/gemini-api/docs/api-key (Gemini API key 발급/관리)
