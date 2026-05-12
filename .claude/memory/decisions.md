
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
