import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appPath = path.join(root, "docs/vocab/app.js");
const htmlPath = path.join(root, "docs/vocab/index.html");

function loadApi(savedJson) {
  const store = new Map();
  if (savedJson) store.set("jre-vocab-saved-v1", savedJson);
  const sandbox = {
    console,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
    document: {
      querySelectorAll: () => [],
      querySelector: () => null,
      addEventListener() {},
      documentElement: {
        setAttribute() {},
        getAttribute: () => "light",
      },
    },
    JRE_VOCAB_TEST: true,
  };
  const context = createContext(sandbox);
  runInContext(readFileSync(appPath, "utf8"), context, { filename: appPath });
  const api = sandbox.JRE_VOCAB_TEST_API;
  assert.ok(api && typeof api.vocabCardHTML === "function", "vocab card API exported for tests");
  return api;
}

const sample = {
  term: "alleviate",
  zh: "紓緩；減輕",
  pos: "v.",
  topic: "governance",
  note: "常見於房屋、貧窮、交通擠塞政策",
  synonyms: ["ease", "relieve"],
  antonyms: ["worsen"],
  examples: [{ en: "aim to alleviate the shortage", zh: "旨在紓緩短缺" }],
  source: {
    link: "https://example.com/pr",
    title: "Press release",
    pubDate: "Mon, 01 Jan 2024 00:00:00 GMT",
    pubDateIso: "2024-01-01T00:00:00Z",
  },
};

function collapsedHtml(html) {
  const at = html.indexOf('<div class="card-details"');
  const actions = html.indexOf('<div class="card-actions"');
  assert.ok(at > 0 && actions > at, "detail region sits ahead of the save row");
  return html.slice(0, at) + html.slice(actions);
}

function detailsHtml(html) {
  const at = html.indexOf('class="card-details"');
  const actions = html.indexOf('class="card-actions"');
  assert.ok(at > 0 && actions > at);
  return html.slice(at, actions);
}

test("collapsed browse card shows term, pos, zh, topic, and save only", () => {
  const html = loadApi().vocabCardHTML(sample);
  const summary = collapsedHtml(html);
  assert.match(summary, />alleviate<span class="pos">v\.<\/span>/);
  assert.match(summary, /紓緩；減輕/);
  assert.match(summary, /管治用語/);
  assert.match(summary, /☆ 收藏/);
  for (const hidden of [
    "常見於房屋",
    "同義詞",
    "反義詞",
    "例句",
    "ease",
    "worsen",
    "aim to alleviate",
    "Press release",
    "原文",
    "收起",
  ]) {
    assert.equal(summary.includes(hidden), false, `collapsed preview leaked: ${hidden}`);
  }
  const details = detailsHtml(html);
  for (const shown of ["常見於房屋", "同義詞", "反義詞", "例句", "ease", "worsen", "Press release", "原文", "收起"]) {
    assert.ok(details.includes(shown), `expanded region missing: ${shown}`);
  }
  assert.match(details, /hidden/);
  assert.doesNotMatch(html, /is-expanded/);
  const actions = html.slice(html.indexOf('class="card-actions"'));
  assert.match(actions, /btn-save/);
  assert.equal(actions.includes("原文"), false);
  assert.equal(actions.includes("同義詞"), false);
});

test("expanding one card collapses the previous card", () => {
  const api = loadApi();
  api.toggleCardExpand("alleviate");
  const open = api.vocabCardHTML(sample);
  assert.match(open, /is-expanded/);
  assert.match(open, /aria-expanded="true"/);
  assert.doesNotMatch(detailsHtml(open), /\shidden/);

  api.toggleCardExpand("streamline");
  assert.equal(api.state.expandedTerm, "streamline");
  const closed = api.vocabCardHTML(sample);
  assert.doesNotMatch(closed, /is-expanded/);
  assert.match(detailsHtml(closed), /\shidden/);
  const other = api.vocabCardHTML({ ...sample, term: "streamline", zh: "精簡" });
  assert.match(other, /is-expanded/);
});

test("tapping the expanded term again collapses it", () => {
  const api = loadApi();
  api.toggleCardExpand("alleviate");
  api.toggleCardExpand("alleviate");
  assert.equal(api.state.expandedTerm, null);
  const html = api.vocabCardHTML(sample);
  assert.doesNotMatch(html, /is-expanded/);
  assert.match(detailsHtml(html), /\shidden/);
});

test("saved flag still uses jre-vocab-saved-v1 and stays outside the detail block", () => {
  const api = loadApi(JSON.stringify({ alleviate: { term: "alleviate" } }));
  const html = api.vocabCardHTML(sample);
  assert.match(html, /vocab-card saved/);
  assert.match(html, /★ 已收藏/);
  assert.equal(collapsedHtml(html).includes("★ 已收藏"), true);
  assert.equal(api.state.saved.alleviate.term, "alleviate");
});

test("phrase paper chips stay in vocab app beside browse expand", () => {
  const src = readFileSync(appPath, "utf8");
  assert.match(src, /function q1PaperLabel/);
  assert.match(src, /Q1_PAPER_CHIPS/);
  assert.match(src, /function renderQ1PaperFilters/);
  assert.match(src, /class="card-details"/);
  assert.match(src, /function toggleCardExpand/);
});

test("cache-bust stamp on vocab stylesheet and script is 20261027n", () => {
  const html = readFileSync(htmlPath, "utf8");
  assert.match(html, /href="styles\.css\?v=20261027n"/);
  assert.match(html, /src="app\.js\?v=20261027n"/);
  assert.doesNotMatch(html, /styles\.css\?v=20261027[klm]/);
  assert.doesNotMatch(html, /app\.js\?v=20261027[klm]/);
});
