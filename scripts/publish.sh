#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
NAME="${1:-jre-study-hub}"
gh auth status
# create if missing
if ! gh repo view "anclh/$NAME" >/dev/null 2>&1; then
  gh repo create "anclh/$NAME" --public --source=. --remote=origin --push
else
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/anclh/${NAME}.git"
  git push -u origin main
fi
gh api -X POST "repos/anclh/$NAME/pages" \
  -f "build_type=legacy" \
  -f "source[branch]=main" \
  -f "source[path]=/docs" 2>/dev/null \
  || gh api -X PUT "repos/anclh/$NAME/pages" \
       -f "build_type=legacy" \
       -f "source[branch]=main" \
       -f "source[path]=/docs" 2>/dev/null \
  || gh pages --help >/dev/null
# Prefer official pages command if available
gh api "repos/anclh/$NAME/pages" 2>/dev/null || true
echo "Expected live URL: https://anclh.github.io/${NAME}/"
