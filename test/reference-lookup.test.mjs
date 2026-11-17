import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(path.join(root, "docs/shared/reference-lookup.js"), "utf8");
const pack = JSON.parse(readFileSync(path.join(root, "docs/bureaux/data/bureaux.json"), "utf8"));
const lexicon = JSON.parse(readFileSync(path.join(root, "docs/vocab/data/lexicon.json"), "utf8"));
const sandbox = {};
runInContext(src, createContext(sandbox));
const api = sandbox.JreReferenceLookup;

test("lookup data is the existing 15 bureaux plus issue cards", () => {
  assert.equal(pack.bureaux.length, 15);
  assert.equal(pack.issues.length, 24);
  assert.ok(pack.bureaux.every((row) => row.zh && row.en && row.abbr));
  assert.ok(pack.bureaux.some((row) => row.id === "cmab"));
});

test("bureau search finds 託兒 under HYAB / LWB issue, not an invented bureau", () => {
  const issues = api.filterIssues(pack.issues, "託兒");
  assert.ok(issues.some((row) => row.id === "issue-childcare"));
  assert.ok(issues[0].lead.includes("勞工及福利局"));
  const housing = api.filterBureaux(pack.bureaux, "Housing Bureau");
  assert.equal(housing.length, 1);
  assert.equal(housing[0].id, "hb");
});

test("vocab search uses hub lexicon and collocation stays an external URL", () => {
  const hits = api.filterVocab(lexicon, "alleviate");
  assert.ok(hits.some((row) => row.term === "alleviate"));
  assert.equal(api.COLLOCATION_URL, "https://anclh.github.io/collocation-bank/");
  assert.equal(api.joinUrl("../", "bureaux/data/bureaux.json"), "../bureaux/data/bureaux.json");
});

test("AND tokens: both words required", () => {
  assert.equal(api.matchesHay("勞工及福利局 託兒", "託兒 房屋"), false);
  assert.equal(api.matchesHay("房屋局 公屋 輪候", "房屋 公屋"), true);
});
