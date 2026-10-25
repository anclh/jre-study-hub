# JRE Study Hub

One mobile-first GitHub Pages site that combines two study apps behind a shared iPhone bottom tab bar:

| Tab | Module | Upstream (source of truth) |
|-----|--------|----------------------------|
| 政策 Policy | `/docs/policy/` | [`anclh/jre-policy-bank`](https://github.com/anclh/jre-policy-bank) → `docs/` |
| 詞彙 Vocab | `/docs/vocab/` | [`anclh/jre-vocab-bank`](https://github.com/anclh/jre-vocab-bank) → `docs/` |

**Live:** https://anclh.github.io/jre-study-hub/

The standalone Policy Bank and Vocab Bank sites keep working independently. This hub is a published snapshot plus a shared shell (`docs/shell/tabbar.*`). Collocation Bank is **not** included.

## Layout

```
docs/
  index.html          # redirects to policy/
  shell/tabbar.css    # bottom tab bar only
  shell/tabbar.js
  policy/             # copy of jre-policy-bank/docs
  vocab/              # copy of jre-vocab-bank/docs
```

GitHub Pages is served from `/docs` on branch `main`. Project base path: `/jre-study-hub/`.

## How to update content

Individual repos remain the sources of truth. After updating an upstream `docs/` tree:

```bash
./scripts/sync-from-upstream.sh
# or manually:
rsync -a --delete ../jre-policy-bank/docs/ docs/policy/
rsync -a --delete --exclude README.md ../jre-vocab-bank/docs/ docs/vocab/

# ensure each module HTML still includes:
#   <link rel="stylesheet" href="../shell/tabbar.css" />
#   <script src="../shell/tabbar.js"></script>

git add docs && git commit -m "Sync modules from upstream docs" && git push
```

Do **not** delete `docs/shell/` when syncing.

## Local preview

```bash
cd docs && python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

## Notes

- localStorage keys are unchanged (`jre-lang`, `jre-filters-open`, `jre-vocab-saved-v1`, `jre-vocab-theme`, …) so progress carries over when browsing the same origin path family; standalone sites use different origins and keep their own storage.
- Root `/` meta-refreshes to `/policy/`; bottom tabs switch between Policy and Vocab without leaving the hub origin.
