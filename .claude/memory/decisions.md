
## [2026-05-09 01:04:37]
변경 파일: (변경 파일 없음)
작업 요약: (커밋 없음)

## [2026-05-09 01:10:54]
변경 파일: (변경 파일 없음)
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-09 01:14:10]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:15:15]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:27:28]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:35:46]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:42:25]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:44:33]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:46:30]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:49:11]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 14:51:42]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 15:08:32]
변경 파일: .claude/memory/decisions.md
package-lock.json
package.json
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 15:46:37]
변경 파일: .claude/memory/decisions.md
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 16:24:50]
변경 파일: .claude/memory/decisions.md
app.json
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 16:42:21]
변경 파일: .claude/memory/decisions.md
app.json
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 17:00:22]
변경 파일: .claude/memory/decisions.md
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 17:53:18]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-11 17:56:22]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 00:09:21]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 00:10:32]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 00:11:15]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 00:34:30]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 00:36:43]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 07:34:17]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 12:22:44]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 12:23:31]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 14:12:42]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 14:22:48]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 14:35:06]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 14:45:21]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 15:07:07]
변경 파일: .claude/memory/decisions.md
app.json
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 15:21:13]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 15:21:50]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 15:31:19]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 15:49:12]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 15:57:26]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 16:04:59]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 16:25:17]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 16:36:14]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 16:40:20]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 16:51:31]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 17:01:28]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 17:03:49]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 17:05:39]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 17:11:00]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 17:24:34]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/(tabs)/index.tsx
app/(tabs)/profile.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
작업 요약: feat: 노화방지턱 메인 페이지 리디자인 / agebump home redesign[한글]- 앱 이름을 '노화방지턱'으로 변경하고 Top bar를 시계/계정 아이콘 구성으로 재배치- 바텀 내비게이션 제거 (Tabs → Stack), 단일 액션(식단 찍기) 흐름으로 단순화- 칼로리 수치를 화면 중앙 거대 텍스트(128pt)로 강조, 배스킨라빈스체(BRBA_B / BRRA_R) 적용- 게이지 카드 배경: 민트 파스텔, 우측 11개 tick 눈금자 + 다크 % pill 슬라이드 모션- 0% 라벨이 카드 외곽에 잘리지 않도록 위치 보완, pill bottom 6%~94%로 클램프- 좌상단/우하단 blob과 sparkle 아이콘으로 부드러운 분위기 연출- 날짜 라벨을 '5월 9일 섭취 칼로리' 라벨(pill 배지)로 변경- 식단 찍기 CTA 단순화 (카메라 아이콘 + 텍스트), 라운드 32 → 29- 메타 카드(목표/남은 칼로리) 가로 폭 약 20% 확대- Hugeicons 도입 (Camera01 / Clock01 / UserCircle / Sparkles)[English]- Renamed app to '노화방지턱' and rebuilt the top bar with clock + account icons- Removed bottom navigation (Tabs → Stack), simplified to a single-action flow- Hero calorie display at 128pt with BR Baskin Robbins font (BRBA_B / BRRA_R)- Gauge card background: mint pastel, 11-tick right scale + animated dark % pill- Fixed 0% label clipping; pill bottom clamped between 6%~94%- Soft yellow / mint blobs + sparkle icons for a friendlier vibe- Date label converted to a pill badge ('5월 9일 섭취 칼로리')- Simplified primary CTA (camera icon + text), corner radius 32 → 29- Increased meta card width ~20% (target / remaining calories)- Adopted Hugeicons (Camera01 / Clock01 / UserCircle / Sparkles)[Files]- app/_layout.tsx: BR font @font-face injection on web- app/(tabs)/_layout.tsx: Tabs → Stack- app/(tabs)/index.tsx: full redesign- src/constants/theme.ts: FONT_FAMILY token- package.json: +@hugeicons/core-free-icons, +@hugeicons/react-native

## [2026-05-12 17:30:46]
변경 파일: (변경 파일 없음)
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 21:45:07]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 21:46:25]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 21:47:53]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 21:50:07]
변경 파일: .claude/memory/decisions.md
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 22:15:42]
변경 파일: .claude/memory/decisions.md
app/analysis.tsx
src/api/gemini.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 22:32:40]
변경 파일: .claude/memory/decisions.md
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 23:20:16]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/store/foodStore.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 23:23:31]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/store/foodStore.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 23:27:25]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/store/foodStore.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 23:30:57]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/store/foodStore.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 23:35:58]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/store/foodStore.ts
src/utils/dateUtils.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-12 23:58:37]
변경 파일: .claude/memory/decisions.md
app/(tabs)/history.tsx
app/analysis.tsx
app/guide.tsx
src/api/gemini.ts
src/store/foodStore.ts
src/utils/dateUtils.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-13 00:15:30]
변경 파일: .claude/memory/decisions.md
app.json
app/(tabs)/history.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
src/utils/dateUtils.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-13 00:17:12]
변경 파일: .claude/memory/decisions.md
app.json
app/(tabs)/history.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
src/utils/dateUtils.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-13 00:20:01]
변경 파일: .claude/memory/decisions.md
app.json
app/(tabs)/history.tsx
app/_layout.tsx
app/analysis.tsx
app/guide.tsx
package-lock.json
package.json
src/api/gemini.ts
src/store/foodStore.ts
src/types/food.ts
src/utils/dateUtils.ts
src/utils/imageUtils.ts
작업 요약: feat: 식단 일기 리디자인, AI 가이드 보기/재생성, 게이지 상태 테마- 기록(식단 일기) 페이지 전면 리디자인: 칼로리 강조형 카드 + 영문 주간 캘린더(식사색 도트) + 영양 태그 자동 생성(nutritionTags 유틸) + 그룹 헤더 제거- AI 가이드 기능 수정:  - 식단 일기 상세에서 recordId+ts를 가이드 페이지에 전달, 단건/과거 기록 컨텍스트 처리 (foodStore.persistUpdateRecord, fetchMealTypesForDates 추가)  - generateGuide를 SSE 스트리밍→일반 generateContent 엔드포인트로 전환 (RN fetch ReadableStream 미지원 회피)  - 분석 페이지에 저장된 가이드 미리보기(3장 카드) + "다시 생성" 플로우(regenerate=1)- 분석/계정 페이지 Top Bar를 식단 일기 패턴(← 타이틀 ⋮)으로 통일- 배스킨라빈스체 폰트 name 테이블 패치 — Family Name(nameID 1/2/4/6) 명시로 iOS 시스템 폰트 폴백 해결- 메인 페이지 게이지 모션: SVG sin 곡선 wave 2겹 위·아래 출렁 + 칼로리 카운트업, waveBack 30% 좌측 이동으로 phase 교차- 메인 페이지 상태별 컬러 테마(start/progress/near/over): 진행률 기반 카드/wave/텍스트 색 동시 변경, 상단 헤더·CTA·sparkle 제외- 신규: src/store/userProfileStore.ts, src/utils/{dateUtils,nutritionTags}.ts, assets/fonts/{BRBA_B,BRRA_R}.otf

## [2026-05-13 00:23:25]
변경 파일: (변경 파일 없음)
작업 요약: feat: 분석 에러 핸들링·식단 일기 편집·확장 캘린더 + 시간대/메모 보안 보강Gemini API:- GeminiHttpError로 HTTP 에러와 raw fetch 실패 분리, retryDelay 파싱- 429는 자동 재시도 제거(quota 소진 방지), 5xx + fetch 실패만 백오프 재시도- analysis/guide에 describeError() 추가로 인증/사용량/서버오류/네트워크 메시지 분기- generateGuide도 동일 재시도 경로로 통합, 동시 호출 차단(inFlightRef)- imageUtils base64 빈 결과 검증식단 일기:- Top Bar ⋮로 편집 모드 토글, 각 카드 우상단 빨간 × 배지(zIndex 보장)- 캘린더를 ScrollView 내부로 이동해 z-order 자연화- 가로 1주 스트립 → 접기/펼치기 월 그리드(iOS 캘린더 패턴)- dateUtils: weekContaining/datesInMonth/firstWeekdayOffset/addMonthsClamped/formatMonthLabelKO/weekdayInitialEN 추가- foodStore에 persistDeleteRecord 추가 (과거 기록 영구 삭제)AI 가이드 헤더:- 분석/상세와 동일한 row 헤더로 통일, 좌측 × 닫기 버튼, 우측 더보기 hideP0 시간대 키 일원화:- foodStore의 UTC 기반 toDateString/todayString 제거, dateUtils의 로컬 함수로 일원화- migrations.ts: migrateLegacyUtcKeys()로 UTC 키 기록을 timestamp 기준 로컬 키로 재그룹핑- app/_layout에서 부팅 시 비차단 실행P1-2(a) 메모 secure-store 분리:- expo-secure-store 설치(config plugin)- memoStore.ts: iOS Keychain / Android Keystore 암호화 저장, 빈 텍스트 자동 삭제- migrateMemosToSecureStore(): 기존 record.memo 이전 후 record envelope에서 평문 제거- FoodRecord.memo는 @deprecated로 표시(레거시 호환), analysis는 secure-store 비동기 로드/blur 시 저장문서:- docs/security/api-key-restrictions.md: Cloud Console API 키 제한 적용 단계 가이드

## [2026-05-13 20:55:59]
변경 파일: .claude/memory/decisions.md
.claude/settings.local.json
작업 요약: feat: 분석 에러 핸들링·식단 일기 편집·확장 캘린더 + 시간대/메모 보안 보강Gemini API:- GeminiHttpError로 HTTP 에러와 raw fetch 실패 분리, retryDelay 파싱- 429는 자동 재시도 제거(quota 소진 방지), 5xx + fetch 실패만 백오프 재시도- analysis/guide에 describeError() 추가로 인증/사용량/서버오류/네트워크 메시지 분기- generateGuide도 동일 재시도 경로로 통합, 동시 호출 차단(inFlightRef)- imageUtils base64 빈 결과 검증식단 일기:- Top Bar ⋮로 편집 모드 토글, 각 카드 우상단 빨간 × 배지(zIndex 보장)- 캘린더를 ScrollView 내부로 이동해 z-order 자연화- 가로 1주 스트립 → 접기/펼치기 월 그리드(iOS 캘린더 패턴)- dateUtils: weekContaining/datesInMonth/firstWeekdayOffset/addMonthsClamped/formatMonthLabelKO/weekdayInitialEN 추가- foodStore에 persistDeleteRecord 추가 (과거 기록 영구 삭제)AI 가이드 헤더:- 분석/상세와 동일한 row 헤더로 통일, 좌측 × 닫기 버튼, 우측 더보기 hideP0 시간대 키 일원화:- foodStore의 UTC 기반 toDateString/todayString 제거, dateUtils의 로컬 함수로 일원화- migrations.ts: migrateLegacyUtcKeys()로 UTC 키 기록을 timestamp 기준 로컬 키로 재그룹핑- app/_layout에서 부팅 시 비차단 실행P1-2(a) 메모 secure-store 분리:- expo-secure-store 설치(config plugin)- memoStore.ts: iOS Keychain / Android Keystore 암호화 저장, 빈 텍스트 자동 삭제- migrateMemosToSecureStore(): 기존 record.memo 이전 후 record envelope에서 평문 제거- FoodRecord.memo는 @deprecated로 표시(레거시 호환), analysis는 secure-store 비동기 로드/blur 시 저장문서:- docs/security/api-key-restrictions.md: Cloud Console API 키 제한 적용 단계 가이드

## [2026-05-13 21:37:45]
변경 파일: .claude/memory/decisions.md
.claude/settings.local.json
.env.example
app.json
app/camera.tsx
src/api/gemini.ts
src/utils/imageUtils.ts
작업 요약: feat: 분석 에러 핸들링·식단 일기 편집·확장 캘린더 + 시간대/메모 보안 보강Gemini API:- GeminiHttpError로 HTTP 에러와 raw fetch 실패 분리, retryDelay 파싱- 429는 자동 재시도 제거(quota 소진 방지), 5xx + fetch 실패만 백오프 재시도- analysis/guide에 describeError() 추가로 인증/사용량/서버오류/네트워크 메시지 분기- generateGuide도 동일 재시도 경로로 통합, 동시 호출 차단(inFlightRef)- imageUtils base64 빈 결과 검증식단 일기:- Top Bar ⋮로 편집 모드 토글, 각 카드 우상단 빨간 × 배지(zIndex 보장)- 캘린더를 ScrollView 내부로 이동해 z-order 자연화- 가로 1주 스트립 → 접기/펼치기 월 그리드(iOS 캘린더 패턴)- dateUtils: weekContaining/datesInMonth/firstWeekdayOffset/addMonthsClamped/formatMonthLabelKO/weekdayInitialEN 추가- foodStore에 persistDeleteRecord 추가 (과거 기록 영구 삭제)AI 가이드 헤더:- 분석/상세와 동일한 row 헤더로 통일, 좌측 × 닫기 버튼, 우측 더보기 hideP0 시간대 키 일원화:- foodStore의 UTC 기반 toDateString/todayString 제거, dateUtils의 로컬 함수로 일원화- migrations.ts: migrateLegacyUtcKeys()로 UTC 키 기록을 timestamp 기준 로컬 키로 재그룹핑- app/_layout에서 부팅 시 비차단 실행P1-2(a) 메모 secure-store 분리:- expo-secure-store 설치(config plugin)- memoStore.ts: iOS Keychain / Android Keystore 암호화 저장, 빈 텍스트 자동 삭제- migrateMemosToSecureStore(): 기존 record.memo 이전 후 record envelope에서 평문 제거- FoodRecord.memo는 @deprecated로 표시(레거시 호환), analysis는 secure-store 비동기 로드/blur 시 저장문서:- docs/security/api-key-restrictions.md: Cloud Console API 키 제한 적용 단계 가이드

## [2026-05-13 21:46:03]
변경 파일: .claude/memory/decisions.md
.claude/settings.local.json
.env.example
app.json
app/camera.tsx
src/api/gemini.ts
src/utils/imageUtils.ts
작업 요약: feat: 분석 에러 핸들링·식단 일기 편집·확장 캘린더 + 시간대/메모 보안 보강Gemini API:- GeminiHttpError로 HTTP 에러와 raw fetch 실패 분리, retryDelay 파싱- 429는 자동 재시도 제거(quota 소진 방지), 5xx + fetch 실패만 백오프 재시도- analysis/guide에 describeError() 추가로 인증/사용량/서버오류/네트워크 메시지 분기- generateGuide도 동일 재시도 경로로 통합, 동시 호출 차단(inFlightRef)- imageUtils base64 빈 결과 검증식단 일기:- Top Bar ⋮로 편집 모드 토글, 각 카드 우상단 빨간 × 배지(zIndex 보장)- 캘린더를 ScrollView 내부로 이동해 z-order 자연화- 가로 1주 스트립 → 접기/펼치기 월 그리드(iOS 캘린더 패턴)- dateUtils: weekContaining/datesInMonth/firstWeekdayOffset/addMonthsClamped/formatMonthLabelKO/weekdayInitialEN 추가- foodStore에 persistDeleteRecord 추가 (과거 기록 영구 삭제)AI 가이드 헤더:- 분석/상세와 동일한 row 헤더로 통일, 좌측 × 닫기 버튼, 우측 더보기 hideP0 시간대 키 일원화:- foodStore의 UTC 기반 toDateString/todayString 제거, dateUtils의 로컬 함수로 일원화- migrations.ts: migrateLegacyUtcKeys()로 UTC 키 기록을 timestamp 기준 로컬 키로 재그룹핑- app/_layout에서 부팅 시 비차단 실행P1-2(a) 메모 secure-store 분리:- expo-secure-store 설치(config plugin)- memoStore.ts: iOS Keychain / Android Keystore 암호화 저장, 빈 텍스트 자동 삭제- migrateMemosToSecureStore(): 기존 record.memo 이전 후 record envelope에서 평문 제거- FoodRecord.memo는 @deprecated로 표시(레거시 호환), analysis는 secure-store 비동기 로드/blur 시 저장문서:- docs/security/api-key-restrictions.md: Cloud Console API 키 제한 적용 단계 가이드

## [2026-05-13 21:51:17]
변경 파일: .claude/memory/decisions.md
.claude/settings.local.json
.env.example
app.json
app/camera.tsx
src/api/gemini.ts
src/utils/imageUtils.ts
작업 요약: feat: 분석 에러 핸들링·식단 일기 편집·확장 캘린더 + 시간대/메모 보안 보강Gemini API:- GeminiHttpError로 HTTP 에러와 raw fetch 실패 분리, retryDelay 파싱- 429는 자동 재시도 제거(quota 소진 방지), 5xx + fetch 실패만 백오프 재시도- analysis/guide에 describeError() 추가로 인증/사용량/서버오류/네트워크 메시지 분기- generateGuide도 동일 재시도 경로로 통합, 동시 호출 차단(inFlightRef)- imageUtils base64 빈 결과 검증식단 일기:- Top Bar ⋮로 편집 모드 토글, 각 카드 우상단 빨간 × 배지(zIndex 보장)- 캘린더를 ScrollView 내부로 이동해 z-order 자연화- 가로 1주 스트립 → 접기/펼치기 월 그리드(iOS 캘린더 패턴)- dateUtils: weekContaining/datesInMonth/firstWeekdayOffset/addMonthsClamped/formatMonthLabelKO/weekdayInitialEN 추가- foodStore에 persistDeleteRecord 추가 (과거 기록 영구 삭제)AI 가이드 헤더:- 분석/상세와 동일한 row 헤더로 통일, 좌측 × 닫기 버튼, 우측 더보기 hideP0 시간대 키 일원화:- foodStore의 UTC 기반 toDateString/todayString 제거, dateUtils의 로컬 함수로 일원화- migrations.ts: migrateLegacyUtcKeys()로 UTC 키 기록을 timestamp 기준 로컬 키로 재그룹핑- app/_layout에서 부팅 시 비차단 실행P1-2(a) 메모 secure-store 분리:- expo-secure-store 설치(config plugin)- memoStore.ts: iOS Keychain / Android Keystore 암호화 저장, 빈 텍스트 자동 삭제- migrateMemosToSecureStore(): 기존 record.memo 이전 후 record envelope에서 평문 제거- FoodRecord.memo는 @deprecated로 표시(레거시 호환), analysis는 secure-store 비동기 로드/blur 시 저장문서:- docs/security/api-key-restrictions.md: Cloud Console API 키 제한 적용 단계 가이드

## [2026-05-13 21:52:24]
변경 파일: .claude/memory/decisions.md
.claude/settings.local.json
작업 요약: feat: Vercel 웹 배포 — API 프록시·플랫폼 분기·카메라 web 지원- api/gemini-proxy.ts: Edge Function으로 GEMINI_API_KEY 서버 보관- vercel.json: Expo static export 빌드 설정 + SPA rewrite- app.json: web output static 추가- src/api/gemini.ts: 웹에서 /api/gemini-proxy 경유, 키 클라이언트 미노출- src/utils/imageUtils.ts: expo-file-system/legacy + FileReader 분기- app/camera.tsx: 웹에서 launchCameraAsync 사용, CameraView 비노출

## [2026-05-13 22:06:41]
변경 파일: .claude/memory/decisions.md
.claude/settings.local.json
작업 요약: fix: 프록시 Origin 체크로 외부 quota 남용 방어

## [2026-05-13 22:15:16]
변경 파일: (변경 파일 없음)
작업 요약: chore: .claude/tmp/ gitignore 추가임시 QR 코드 등 세션성 파일이 추적되지 않도록 제외

## [2026-05-13 22:20:01]
변경 파일: .claude/memory/decisions.md
작업 요약: chore: .claude/tmp/ gitignore 추가임시 QR 코드 등 세션성 파일이 추적되지 않도록 제외

## [2026-05-13 22:33:08]
변경 파일: .claude/memory/decisions.md
app/(tabs)/index.tsx
작업 요약: chore: .claude/tmp/ gitignore 추가임시 QR 코드 등 세션성 파일이 추적되지 않도록 제외

## [2026-05-13 22:34:29]
변경 파일: .claude/memory/decisions.md
app/(tabs)/index.tsx
작업 요약: chore: .claude/tmp/ gitignore 추가임시 QR 코드 등 세션성 파일이 추적되지 않도록 제외

## [2026-05-13 22:48:24]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: chore: .claude/tmp/ gitignore 추가임시 QR 코드 등 세션성 파일이 추적되지 않도록 제외

## [2026-05-13 23:25:37]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
app/analysis.tsx
app/camera.tsx
작업 요약: chore: .claude/tmp/ gitignore 추가임시 QR 코드 등 세션성 파일이 추적되지 않도록 제외

## [2026-05-13 23:28:45]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-13 23:40:47]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-13 23:45:20]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-13 23:51:38]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-13 23:55:21]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-13 23:58:05]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-14 00:00:25]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-14 00:04:03]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-14 08:37:57]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행

## [2026-05-14 08:45:52]
변경 파일: .claude/memory/MEMORY.md
.claude/memory/decisions.md
.claude/memory/project_session_20260513.md
app/(tabs)/index.tsx
작업 요약: fix: 카메라 검정 화면 및 갤러리 이미지 AI 분석 오류 수정- camera.tsx: useCameraPermissions() 초기 null 반환 시 검정 화면 제거,  canAskAgain=false일 때 Linking.openSettings()로 설정 화면 안내- pendingImageStore.ts: 웹에서 data URI를 URL 파라미터 대신 모듈 변수로 전달- camera.tsx: 웹 갤러리 이미지를 pendingImageStore에 저장 후 /analysis 이동- analysis.tsx: 마운트 시 pendingImageStore에서 URI 읽어 분석 실행
