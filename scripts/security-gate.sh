#!/usr/bin/env bash
# PreToolUse 훅: Bash 명령 실행 전 보안 검사
# stdin으로 JSON을 받아 tool_input.command를 추출하여 검사

set -euo pipefail

# stdin에서 JSON 전체를 읽음
INPUT="$(cat)"

# jq 존재 여부 확인
if ! command -v jq &>/dev/null; then
  echo "[security-gate] jq가 설치되어 있지 않아 검사를 건너뜁니다." >&2
  exit 0
fi

# tool_input.command 추출 (없으면 빈 문자열)
CMD="$(echo "$INPUT" | jq -r '.tool_input.command // ""')"

if [[ -z "$CMD" ]]; then
  exit 0
fi

# 1. API 키 하드코딩 탐지
if echo "$CMD" | grep -qE 'AIza[0-9A-Za-z_-]{35}|sk-[A-Za-z0-9]{20,}|EXPO_PUBLIC_[A-Z0-9_]+=\S+'; then
  echo "[security-gate] 차단: 명령어에 API 키가 하드코딩되어 있습니다. (AIza / sk- / EXPO_PUBLIC_ 패턴 감지)" >&2
  exit 2
fi

# 2. Google 외 AI API 호출 차단
if echo "$CMD" | grep -qE 'curl[^|&;]*\s+(openai\.com|api\.anthropic\.com|cohere\.ai)'; then
  echo "[security-gate] 차단: 허용되지 않은 외부 AI API 호출이 감지되었습니다. (openai.com / api.anthropic.com / cohere.ai)" >&2
  exit 2
fi

# 3. 위험 파일 삭제 명령 차단
if echo "$CMD" | grep -qE 'rm\s+-[a-zA-Z]*rf?\s+(\/|~|/root|/home)\b|rm\s+-[a-zA-Z]*f?r?\s+(\/|~|/root|/home)\b'; then
  echo "[security-gate] 차단: 루트 또는 홈 디렉터리 전체를 삭제하는 위험한 명령이 감지되었습니다. (rm -rf / 또는 rm -rf ~)" >&2
  exit 2
fi

exit 0
