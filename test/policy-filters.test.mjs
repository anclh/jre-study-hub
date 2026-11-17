import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const filtersSrc = readFileSync(path.join(root, "docs/policy/js/filters.js"), "utf8");
const policies = JSON.parse(readFileSync(path.join(root, "docs/policy/data/policies.json"), "utf8"));
const sandbox = {};
runInContext(filtersSrc, createContext(sandbox));
const { itemYear, matchesItem, uniqueYears } = sandbox.JrePolicySearch;

const labels = {
  deptLabel: (id) => {
    const row = policies.departments.find((d) => d.id === id);
    return row ? `${row.zh} ${row.en}` : id;
  },
  themeLabel: (id) => {
    const row = policies.themes.find((t) => t.id === id);
    return row ? `${row.zh} ${row.en}` : id;
  },
};

function run(filters) {
  return policies.items.filter((item) => matchesItem(item, filters, labels));
}

test("dataset still has 182 dated cards and both 2025 and 2026", () => {
  assert.equal(policies.items.length, 182);
  assert.equal(uniqueYears(policies.items).join(","), "2026,2025");
  assert.equal(policies.items.filter((item) => itemYear(item) === "2025").length, 6);
  assert.ok(policies.items.every((item) => Array.isArray(item.departments) && item.departments.length));
});

test("text search matches title and leaves other cards out", () => {
  const hit = run({ query: "離岸人民幣債券指數" });
  assert.equal(hit.length, 1);
  assert.equal(hit[0].id, "20261116-offshore-rmb-bond-index");
});

test("bureau, year and theme combine with AND; multi-value cards match any selected id", () => {
  const yearOnly = run({ years: new Set(["2025"]) });
  assert.equal(yearOnly.length, 6);

  const combo = run({
    years: new Set(["2025"]),
    departments: new Set(["lwb"]),
    themes: new Set(["labour"]),
  });
  assert.ok(combo.length >= 1);
  assert.ok(combo.every((item) => item.date.startsWith("2025")));
  assert.ok(combo.every((item) => item.departments.includes("lwb")));
  assert.ok(combo.every((item) => item.themes.includes("labour")));
  assert.ok(combo.some((item) => item.id === "20250501-mpf-offset-abolition"));
  assert.ok(combo.some((item) => item.themes.length > 1), "MPF card keeps multiple themes");
});

test("selecting two bureaux is OR within the bureau dimension", () => {
  const rows = run({ departments: new Set(["fso", "lwb"]), years: new Set(["2026"]) });
  assert.ok(rows.some((item) => item.departments.includes("fso")));
  assert.ok(rows.some((item) => item.departments.includes("lwb")));
  assert.ok(rows.every((item) => item.departments.includes("fso") || item.departments.includes("lwb")));
});

test("unknown year is excluded when a year filter is on, and kept when it is not", () => {
  const undated = {
    id: "undated",
    title: "undated",
    date: "",
    departments: ["lwb"],
    themes: ["labour"],
    summary: "",
  };
  assert.equal(itemYear(undated), "");
  assert.equal(matchesItem(undated, { years: new Set(["2026"]) }, labels), false);
  assert.equal(matchesItem(undated, { departments: new Set(["lwb"]) }, labels), true);
});

test("impossible combo yields an empty list", () => {
  const rows = run({ years: new Set(["2025"]), themes: new Set(["sports"]) });
  assert.equal(rows.length, 0);
});
