# Manual backups v1 — Q1 and 我的生字 (Stage 2)

Stamp: `20261117c`. Only docs/q1/ and docs/vocab/ changed.

## UI and persistence

- Q1: lookup access in header and beside the running practice timer. Uses Stage 1 shared lookup unchanged (`20261117ref`). Drawer stays in-page. Collocation Bank remains a labelled external link.
- Q1 自評清單: existing `jre-q1-marks-v1` object with boolean keys `opening`, `problems`, `options`, `recommend`, `dfcite`, `tone`, `concise`. Existing persistence retained, no new key. Restore uses boolean union; existing true ticks survive incoming false. UI score refreshes immediately.
- Vocab 我的生字: existing `jre-vocab-saved-v1`, object with existing term keys (and legacy `q1:<phraseId>` keys), values full saved card objects. Existing keys are preserved; newly imported words use trimmed lower-case terms, and legacy phrase cards use `q1:<phraseId>`. Import merges case-insensitively with outer whitespace ignored. Existing card wins conflicts; new duplicate terms appear once. Empty import never clears data. Saved cards and flip-card details use DOM text nodes for restored content, preserving the existing expand/collapse, star and study controls/classes.
- Backup handles these two feature keys only. No answer, theme, policy, Q2, entire-origin storage, timer or study-session data is exported/imported. `jre-q1-answer-v1` is untouched by backups. Q1 checklist is global, not per prompt (existing behaviour).
- Manual file downloads, not account/cloud sync. Moving devices requires importing the saved file. Existing explicit clear controls remain available; import never replaces destructively.

## JSON core restore format

```json
{
  "format": "jre-study-backup",
  "version": 1,
  "kind": "vocab",
  "exportedAt": "2026-11-17T00:00:00.000Z",
  "data": [{"term": "alleviate", "zh": "紓緩", "examples": [{"en": "Example", "zh": "例句"}]}]
}
```

`kind: "q1-checklist"` uses a boolean object in `data` instead. Only the seven stable keys above are accepted. Old unversioned JSON exports are rejected clearly, as are other feature kinds and future/unknown versions. Card metadata is retained as JSON; schema checks constrain text, lists, examples and source; source links must be HTTP(S). Dangerous object keys, non-JSON types and excessive nesting are rejected.

## CSV v1

UTF-8 with BOM, CRLF row endings; all cells quoted, double quotes escaped by doubling. Chinese, commas, quotes and multiline fields round-trip.

- Vocab exact header: `format,version,kind,term,zh,card_json`. Every row starts `jre-study-backup,1,vocab`. `card_json` contains the full card to avoid losing examples/synonyms/source/metadata; term/zh preview columns must agree with it. To edit terms or meanings externally, update both the preview and card_json fields. JSON is recommended for full restore.
- Q1 exact header: `format,version,kind,key,checked`. Rows start `jre-study-backup,1,q1-checklist`; checked is `true` or `false`. Duplicate checklist keys are rejected.
- Empty list exports a header-only vocabulary CSV and imports as a no-op merge.

## Validation and atomicity

2 MiB (2,097,152 bytes) max input/output; max 10,000 cards. Extension .json/.csv selects parser. Entire incoming file and current feature data validate before one localStorage write; UI updates after successful write. Malformed JSON/CSV, wrong schema/version/kind, oversize and quota/security failures show bilingual status without replacing stored data. Cancel performs no write. Import input clears after every attempt to permit retry. Downloads revoke object URLs.

## Q2 handoff

`../vocab/backup.js?v=20261117c` exposes `JreBackup.{encode,decode,merge,mount}`. `mount({root,kind,key,get,refresh})` binds buttons `[data-backup-export=json|csv]`, a file input and `[data-backup-status]`. **Current checklist kind is Q1-specific and deliberately rejects Q2 keys.** Q2 owner should use the same envelope/CSV columns with a distinct `kind: "q2-checklist"`, its actual stable key set and its own storage key; extend explicitly rather than passing Q2 data as Q1. Drawer can use the Stage 1 contract directly; call mount after dynamically rendering launch buttons.

## Verification

`node docs/vocab/tests/backup.test.cjs` covers full 444-entry lexicon, Unicode/quotes/multiline JSON and CSV roundtrips, empty imports, conflict preservation, checklist union, invalid schema/version/size/CSV/prototype/URL rejection, write failure, cancel and no unrelated-key writes.

Built-in browser on isolated localhost storage: actual JSON and CSV export handlers captured as Blobs and fed through file inputs; roundtrip succeeded, immediate cards and study rendering succeeded, HTML-looking text stayed text. Q1 file import restored 2/7 immediately, invalid file left data unchanged and answer untouched. Started drill lookup + Escape retained selection, draft, marks, page scroll and running timer; focus returned to launch. Narrow embedded viewport (386 × 840 CSS px) fit the bottom sheet and backup controls without horizontal overflow; lookup showed 15 bureaux / 24 issues and 40 of 444 vocab entries. This is a Chromium viewport check, not a physical iPhone/Safari test. Static localhost API fallbacks report expected /api/* 404 before loading static data.
