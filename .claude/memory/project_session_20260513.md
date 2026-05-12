---
name: project-session-20260513
description: 2026-05-13 — 카메라 분석 연결 실패 디버깅, 식단 일기 수정 모드/확장 캘린더, AI 가이드 헤더 통일, 로컬 저장/보안 P0+P1-2 수정
metadata:
  type: project
---

## 한 줄 요약

음식 분석 "연결 실패" 화면이 사실은 Gemini quota 초과(HTTP 429)임을 밝혀내 분기·재시도 로직을 다시 짰고, 식단 일기를 편집 모드 + 접기/펼치기 월 그리드로 확장했다. 또한 시간대 키 불일치 버그와 메모 평문 저장 이슈를 잡았다.

## 주요 작업

### 1. 음식 분석 / AI 가이드 에러 핸들링 재정비 (`src/api/gemini.ts`, `app/analysis.tsx`, `app/guide.tsx`)
- `GeminiHttpError`(`GeminiNetworkError` 상속) 신설 — fetch 실패 vs HTTP 에러를 구분, `apiMessage`/`rawBody`/`retryDelaySec` 보존
- 응답 본문에서 Google `RetryInfo.retryDelay` 파싱 → UI에 "약 N초 뒤 다시 시도해주세요" 표시
- 재시도 정책: 5xx(500/502/503/504) + raw fetch 실패만 자동 재시도(지수 백오프 3회). **429는 자동 재시도 제거** — quota 에러는 30초+ 대기 필요해 백오프가 quota만 더 빨리 소진
- `generateGuide`도 동일 재시도 경로로 통합 (중복 fetch 코드 제거)
- analysis/guide 화면 모두 `describeError()` 헬퍼로 분기(인증/사용량/서버오류/일반 HTTP/네트워크) → 사용자 메시지 + HTTP 디테일 별도 노출
- `imageUtils.ts`: base64 결과 길이 검증(빈 결과 조용한 실패 방지)
- `guide.tsx`: `inFlightRef`로 동시 호출 차단(React 이펙트 더블 파이어 시 quota 2배 소진하던 문제 해결)

### 2. 식단 일기 편집 모드 (`app/(tabs)/history.tsx`, `src/store/foodStore.ts`)
- Top Bar `⋮` → 수정 모드 토글, "완료" 텍스트로 변환. 기록 0건이면 비활성화
- 수정 모드 진입 시 각 카드 우상단에 **빨간 원형 × 배지** 표시 (`top: -10, right: -10`, `zIndex: 50`, `elevation: 20`, 흰색 테두리)
- 캘린더가 카드의 X 배지를 잘라내던 문제 → 캘린더를 ScrollView 안으로 이동해 동일 스택 컨텍스트로 통일
- 오늘 기록: zustand store에서 삭제 / 과거 기록: `persistDeleteRecord(id, timestamp)`로 AsyncStorage 직접 삭제(해당 날짜 키가 비면 키 제거)
- 수정 모드에서는 카드 press/long-press 비활성화 → 실수 방지

### 3. 캘린더 확장 — 접기/펼치기 월 그리드 (`app/(tabs)/history.tsx`)
- 가로 스크롤 1주 → **접힘: 주 스트립 / 펼침: 월 그리드** 토글 패턴 (iOS 캘린더/Apple Health 스타일)
- 월 라벨(`⌄/⌃ YYYY년 M월`) 탭하면 7×N 그리드로 전체 달 표시
- 펼침 모드 하단: `← 이전 월 / 이번 주로 (강조) / 다음 월 →`
- 요일 헤더(M T W T F S S)는 한 번만 표시 — DateCell에서 요일 텍스트 제거
- 신규 dateUtils 헬퍼: `weekContaining`, `datesInMonth`, `firstWeekdayOffset`, `addMonthsClamped`, `formatMonthLabelKO`, `weekdayInitialEN`
- 1일 위치 자동 패딩(`gridCell`)으로 그리드 정렬 보정. 월 이동 시 같은 일이 새 달에 없으면 말일로 clamp (1/31 → 2/28)

### 4. AI 가이드 헤더 분석/상세 페이지와 통일 (`app/guide.tsx`)
- 헤더를 ScrollView 바깥으로 이동(고정), `flexDirection: row + space-between` + 동일 패딩
- 좌측 `←` → **`×`(headerClose)** 닫기 버튼으로 교체
- 우측 `⋮` 제거, 동일 너비 빈 View로 타이틀 중앙 정렬 유지

### 5. P0 시간대 키 일원화 (`src/store/foodStore.ts`, `src/store/migrations.ts`, `app/_layout.tsx`)
- **버그 원인:** `foodStore.ts` 내부 `toDateString/todayString`이 `toISOString().slice(0,10)` (UTC) 사용. `dateUtils`는 로컬 기준. KST 00:00–09:00 저장분이 UTC상 "어제" 키에 저장돼 다음날 식단 일기에서 사라져 보임. `persistUpdateRecord`/`persistDeleteRecord`도 영향
- 수정: foodStore의 자체 UTC 함수 제거 → `dateUtils`의 로컬 함수만 사용. `STORAGE_KEY_PREFIX` export
- `migrations.ts` 신설: `migrateLegacyUtcKeys()` — 모든 `food-records-*` 키 스캔, 각 record.timestamp 기준 로컬 날짜로 재그룹핑·재저장. 영구 플래그(`agebump.migration.utcKeysToLocal.v1`)로 1회만 실행
- `app/_layout.tsx` 부팅 시 비차단 실행

### 6. P1-2(a) 메모 secure-store 분리 (`src/store/memoStore.ts`, `src/types/food.ts`, `app/analysis.tsx`, 마이그레이션)
- `expo-secure-store` 설치 (config plugin 자동 추가)
- `memoStore.ts` 신설: iOS Keychain / Android Keystore에 메모 본문 암호화 저장. 키 prefix `memo-`. 빈 텍스트는 자동 삭제. Web에서는 no-op
- `FoodRecord.memo`를 `@deprecated`로 표시(레거시 호환). 신규 코드는 `memoStore.getMemo/setMemo` 사용
- `migrations.ts`에 `migrateMemosToSecureStore()` 추가: 기존 `record.memo`를 secure-store로 옮기고 record envelope에서 평문 제거(`agebump.migration.memosToSecureStore.v1` 플래그)
- `analysis.tsx`: 저장 기록 로드 시 secure-store에서 비동기 로드(레거시 record.memo fallback). 신규 저장 시 record엔 memo 없이 `persistMemo(newId, memo)` 별도 호출. 기존 기록 편집은 TextInput `onBlur`에서 즉시 반영

### 7. P1-1(a) API 키 제한 가이드 문서 (`docs/security/api-key-restrictions.md`)
- 코드 변경 없이 Google Cloud Console에서 직접 적용하는 단계 가이드 (iOS Bundle ID `com.agebump.app`, Android Package + SHA-1, Generative Language API restriction)
- 사용자가 추후 직접 적용 예정 (이번 세션에선 보류)

### 8. 부수 — UX 워크플로 메모리 (`.claude/memory/feedback_app_run_workflow.md`)
- 앞으로 "앱 실행해 줘" 요청 시 항상 **QR PNG 이미지 생성 + 로컬 웹 접속 URL 두 가지**를 함께 제공하기로 합의 (터미널 ANSI QR이 잘려서 스캔 안 되던 이슈)

## 보류된 항목 (사용자 결정으로 이번 세션 제외)
- P1-1(a) 콘솔 작업: 가이드 문서대로 사용자가 직접 적용 예정
- P1-1(b) 백엔드 프록시 구축
- P2-1 이미지 documentDirectory 영구화
- P2-2 JSON 백업/복원 UI
- P2-3 딥링크 search params 검증
- P2-4 프로덕션 빌드 콘솔 로그 차단

## 파일 변경 요약
- 신규: `src/store/memoStore.ts`, `src/store/migrations.ts`, `docs/security/api-key-restrictions.md`, `.claude/memory/feedback_app_run_workflow.md`
- 주요 수정: `app/(tabs)/history.tsx` (+340/-... 340줄), `src/api/gemini.ts` (+141/-...), `app/analysis.tsx`, `app/guide.tsx`, `src/store/foodStore.ts`, `src/utils/dateUtils.ts` (+91), `app/_layout.tsx`, `app.json`(config plugin), `package.json/lock`
- 타입 체크 전부 통과, 핫리로드 정상 (iOS Bundled 565ms)
