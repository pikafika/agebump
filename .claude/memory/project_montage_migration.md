---
name: Montage 디자인 토큰 마이그레이션 완료
description: 구 iOS 18 HIG 토큰 → Montage 토큰 전환 완료 상태 및 매핑 기록
type: project
originSessionId: 2b9bd9d6-38e7-4e1f-a55f-c355f05850cf
---
Wanted Lab Montage iOS 디자인 시스템을 React Native로 수동 포팅 완료(2026-05-06).
`src/constants/theme.ts`가 단일 진실 소스. DynamicColorIOS로 라이트/다크 모드 지원.

**Why:** 사용자가 Montage iOS(https://github.com/wanteddev/montage-ios) 디자인 시스템 적용을 요청함.

**How to apply:** 새 컴포넌트 작성 시 아래 토큰만 사용. 구 토큰(`FONT_SIZE`, `COLORS.system.*` 등)은 더 이상 존재하지 않음.

## 현재 테마 익스포트 목록
- `COLORS` — primary, label, background, line, fill, interaction, status, static, inverse, inverse.label
- `GLYCEMIC_COLOR` — low(green), moderate(yellow), high(orange), veryHigh(red)
- `TYPOGRAPHY` — display1/2, title1/2/3, heading1/2, body1/2, label1/2, caption1/2
- `FONT_WEIGHT` — regular/medium/semiBold/bold
- `SPACING` — pt01~pt80 (4pt 그리드)
- `RADIUS` — small(8)/medium(10)/large(12)/extraLarge(16)/pill(99)
- `SHADOW` — xsmall/small/medium/large
- `SQUIRCLE` — `{ borderCurve: 'continuous' }` (iOS squircle 코너)

## 구→신 토큰 매핑
| 구 토큰 | 신 토큰 |
|---------|---------|
| `COLORS.system.green` | `COLORS.status.positive` |
| `COLORS.system.orange` | `COLORS.status.cautionary` |
| `COLORS.system.red` | `COLORS.status.negative` |
| `COLORS.background.primary` | `COLORS.background.elevated` |
| `COLORS.background.groupedPrimary` | `COLORS.background.normalAlternative` |
| `COLORS.background.secondary` | `COLORS.fill.alternative` |
| `COLORS.label.primary` | `COLORS.label.normal` |
| `COLORS.label.secondary` | `COLORS.label.alternative` |
| `COLORS.separator.opaque` | `COLORS.line.solidNormal` |
| `FONT_SIZE.*` | `TYPOGRAPHY.*` spread |
| `SPACING.xl` | `SPACING.pt24` |
| `SPACING.lg` | `SPACING.pt16` |
| `RADIUS.md` | `RADIUS.medium` |
| `RADIUS.lg` | `RADIUS.large` |

## 마이그레이션 완료 파일
모든 파일 완료. `npx tsc --noEmit` 0 errors 확인됨.
