# JreReferenceLookup — Stage 1 integration contract

Reusable in-page drawer for **15 Policy Bureaux** and the hub **vocab lexicon**. Policy Bank owns this file. Q1 / Q2 / vocab pages were **not** edited in Stage 1.

Live stamp: **`?v=20261117ref`**

## URLs (GitHub Pages, `docs/` root)

| Asset | URL from a `docs/q1/` or `docs/q2/` page |
|---|---|
| CSS | `../shared/reference-lookup.css?v=20261117ref` |
| JS | `../shared/reference-lookup.js?v=20261117ref` |
| Bureau JSON | `../bureaux/data/bureaux.json` (15 bureaux + 24 issue cards, extracted from `docs/bureaux/index.html`) |
| Vocab JSON | `../vocab/data/lexicon.json` (existing hub lexicon; do not copy) |
| Full bureaux page | `../bureaux/` |
| Full vocab page | `../vocab/` |
| Collocation Bank | `https://anclh.github.io/collocation-bank/` (separate app; **not** in this hub) |

Policy browse also loads the same assets as a live host: `https://anclh.github.io/jre-study-hub/policy/?v=20261117ref`

## Minimal host snippet (Q1 / Q2)

Do **not** wrap the drill textarea in this markup. Opening and closing the drawer does not reload the page and does not read or write `localStorage` (drafts, 我的生字, checklists stay untouched).

```html
<link rel="stylesheet" href="../shared/reference-lookup.css?v=20261117ref" />
<script src="../shared/reference-lookup.js?v=20261117ref"></script>
<button type="button"
        class="jre-ref-launch"
        data-jre-lookup
        data-jre-lookup-tab="bureaux"
        aria-haspopup="dialog"
        aria-controls="jre-ref-dialog">查局／詞彙</button>
<script>
  JreReferenceLookup.mount({ base: "../" });
</script>
```

`base` is the hub `docs/` root relative to the host page (`../` from `q1/` or `q2/`).

Optional: `data-jre-lookup-tab="vocab"` or `data-jre-lookup-query="託兒"`.

## JS API

```js
JreReferenceLookup.mount({
  base: "../",
  lang: "zh",                 // optional; else <html lang>
  defaultTab: "bureaux",      // or "vocab"
  collocationUrl: "https://anclh.github.io/collocation-bank/",
  bureauxUrl: "../bureaux/data/bureaux.json",  // optional override
  vocabUrl: "../vocab/data/lexicon.json"
});
JreReferenceLookup.open({ tab: "bureaux", query: "", trigger: buttonEl });
JreReferenceLookup.close();   // restores focus to `trigger`
JreReferenceLookup.isOpen();
```

`mount` is idempotent and auto-binds `[data-jre-lookup]`.

Keyboard: `Escape` closes; Tab cycles inside the dialog; focus returns to the launch control.

Mobile: bottom sheet, inner pane scrolls. Desktop: right-hand drawer. `z-index` sits above the hub tab bar (90).

## Data rules / limits

- **Bureaux:** 15 HKSAR policy bureaux from the existing hub page. Issue cards reuse the same page’s 「按議題搵局」 copy. Unknown bureau is omitted, never invented.
- **Vocab:** live fetch of hub `lexicon.json`. Results capped at 40 rows in the drawer (status shows matched total).
- **Collocation Bank:** **not** shipped in this hub (see README). Same GitHub-Pages host, different app. Stage 1 does **not** fetch or iframe it. The drawer footer is a labelled external link plus a one-line note. Do not change the Collocation Bank app.
- Drawer close does not navigate, does not reset host forms, and does not touch checklist / 我的生字 keys.

## Out of scope (later owners)

- Wiring the launch button into Q1 / Q2 drill chrome (JRE English, then JRE Chinese).
- JSON/CSV backup of 我的生字 or Q2 self-checklists.
- Homepage / tabbar / `docs/q1/` / `docs/q2/` / `docs/vocab/` edits.
