# JRE Study Hub

One mobile-first GitHub Pages site behind a shared iPhone bottom tab bar:

| Tab | Module | Notes |
|-----|--------|--------|
| 政策 Policy | `/docs/policy/` | Policy Bank (canonical in this hub) |
| 英文Q1 English | `/docs/q1/` | Owned by **JRE English** — framework, phrase bank, mini-drill, Data File practice pack |
| 中文Q2 Chinese | `/docs/q2/` | Owned by **JRE Chinese** — 議題思維框架 stub；links to Policy briefs |
| 詞彙 Vocab | `/docs/vocab/` | Upstream [`anclh/jre-vocab-bank`](https://github.com/anclh/jre-vocab-bank) → `docs/` |

**Live:** https://anclh.github.io/jre-study-hub/

Collocation Bank is **not** included. Shared shell: `docs/shell/tabbar.*`.

## Layout

```
docs/
  index.html          # redirects to policy/
  shell/tabbar.css    # bottom tab bar (4 tabs)
  shell/tabbar.js
  policy/             # Policy Bank
  q1/                 # English Q1 (JRE English) — framework + case pack
  q2/                 # Chinese Q2 stub (JRE Chinese)
  vocab/              # Vocab Bank snapshot
```

GitHub Pages is served from `/docs` on branch `main`. Project base path: `/jre-study-hub/`.

## How to update content

- **Policy / Q1 / Q2**: edit under this hub (`docs/policy/`, `docs/q1/`, `docs/q2/`).
- **Vocab**: sync from upstream with `./scripts/sync-from-upstream.sh` (policy rsync path may be empty if standalone repo gone — script still re-injects shell tags on policy + vocab).

Do **not** delete `docs/shell/`, `docs/q1/`, or `docs/q2/` when syncing.

## Local preview

```bash
cd docs && python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

## Notes

- localStorage keys for policy/vocab are unchanged.
- Root `/` meta-refreshes to `/policy/`; bottom tabs switch modules on the same origin.
