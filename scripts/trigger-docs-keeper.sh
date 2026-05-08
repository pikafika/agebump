#!/usr/bin/env bash
# Stop 훅: 세션 종료 시 변경 파일 목록과 커밋 메시지를 decisions.md에 기록

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DECISIONS_FILE="$PROJECT_ROOT/.claude/memory/decisions.md"

# git 저장소 확인
if ! git -C "$PROJECT_ROOT" rev-parse --git-dir &>/dev/null; then
  echo "[docs-keeper] git 저장소가 없어 기록을 건너뜁니다." >&2
  exit 0
fi

# 변경 파일 목록
CHANGED_FILES="$(git -C "$PROJECT_ROOT" diff --name-only HEAD 2>/dev/null || true)"
[[ -z "$CHANGED_FILES" ]] && CHANGED_FILES="(변경 파일 없음)"

# 마지막 커밋 메시지
LAST_COMMIT="$(git -C "$PROJECT_ROOT" log -1 --pretty=%B 2>/dev/null || true)"
LAST_COMMIT="$(echo "$LAST_COMMIT" | tr -d '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
[[ -z "$LAST_COMMIT" ]] && LAST_COMMIT="(커밋 없음)"

TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

cat >> "$DECISIONS_FILE" <<EOF

## [$TIMESTAMP]
변경 파일: $CHANGED_FILES
작업 요약: $LAST_COMMIT
EOF

echo "[docs-keeper] decisions.md 기록 완료: $TIMESTAMP" >&2
