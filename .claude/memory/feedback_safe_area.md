---
name: full-screen modal에서 SafeAreaView 금지
description: camera.tsx처럼 fullScreenModal로 열리는 화면에서 SafeAreaView 대신 useSafeAreaInsets() 사용
type: feedback
originSessionId: 2b9bd9d6-38e7-4e1f-a55f-c355f05850cf
---
full-screen modal 환경에서 `SafeAreaView`는 top inset을 잘못 계산해 상단 UI가 노치/다이나믹 아일랜드 뒤로 밀린다. X 버튼 등 상단 컨트롤이 눌리지 않게 된다.

**Why:** `app/camera.tsx`에서 실제로 발생한 버그 — topBar 전체가 화면 위로 잘려 닫기 버튼이 동작하지 않았다.

**How to apply:** `presentation: 'fullScreenModal'`로 열리는 화면은 반드시 `useSafeAreaInsets()`를 사용하고 `paddingTop: insets.top + offset`을 최상단 컨테이너 View에 직접 적용한다. 아울러 중요한 버튼에는 `hitSlop`을 추가해 터치 영역을 확보한다.
