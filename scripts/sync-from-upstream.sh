#!/usr/bin/env bash
# Re-copy module docs from sibling upstream folders, then re-inject hub shell tags.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UP_POLICY="${UP_POLICY:-$ROOT/../jre-policy-bank/docs}"
UP_VOCAB="${UP_VOCAB:-$ROOT/../jre-vocab-bank/docs}"
UP_COLLOC="${UP_COLLOC:-$ROOT/../collocation-bank/docs}"

rsync -a --delete "$UP_POLICY/" "$ROOT/docs/policy/"
rsync -a --delete --exclude README.md "$UP_VOCAB/" "$ROOT/docs/vocab/"
rsync -a --delete "$UP_COLLOC/" "$ROOT/docs/collocation/"

export ROOT
python3 <<'PY'
import os
from pathlib import Path
root = Path(os.environ["ROOT"])
LINK = '  <link rel="stylesheet" href="../shell/tabbar.css" />\n'
SCRIPT = '  <script src="../shell/tabbar.js"></script>\n'
for p in [
    root/"docs/policy/index.html",
    root/"docs/vocab/index.html",
    root/"docs/collocation/index.html",
    root/"docs/collocation/study.html",
]:
    text = p.read_text(encoding="utf-8")
    if "shell/tabbar.css" not in text:
        text = text.replace("</head>", LINK + "</head>", 1)
    if "shell/tabbar.js" not in text:
        text = text.replace("</body>", SCRIPT + "</body>", 1)
    p.write_text(text, encoding="utf-8")
    print("ensured shell on", p.relative_to(root))
PY
echo "Synced. Review git diff, commit, push."
