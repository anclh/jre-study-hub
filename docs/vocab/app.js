/* JRE Vocab Bank — frontend (API + static GitHub Pages) */
(() => {
  const STORAGE_KEY = "jre-vocab-saved-v1";
  const THEME_KEY = "jre-vocab-theme-v2";

  /** @type {{ mode: 'auto' | 'api' | 'static' }} */
  const CONFIG = { mode: "auto" };

  const state = {
    feed: null,
    programmes: null,
    q1: null,
    saved: loadSaved(),
    lexicon: [],
    progCategory: "all",
    q1Category: "all",
    dataMode: null, // 'api' | 'static' once resolved
    drillSeed: Date.now(),
  };

  /** Quizlet-style study round */
  const study = {
    active: false,
    source: "filtered",
    shuffle: true,
    deck: [],
    queue: [],
    known: [],
    learning: [],
    everLearning: [],
    total: 0,
    flipped: false,
    touch: null,
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  function loadSaved() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function persistSaved() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved));
    $("#statSaved").textContent = String(Object.keys(state.saved).length);
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlightExample(example, span) {
    const safe = escapeHtml(example);
    if (!span) return safe;
    const re = new RegExp(`(${escapeRegExp(span)})`, "i");
    return safe.replace(re, "<mark>$1</mark>");
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function formatDate(pubDate, iso) {
    try {
      const d = iso ? new Date(iso) : new Date(pubDate);
      if (Number.isNaN(d.getTime())) return pubDate || "";
      return (
        d.toLocaleString("zh-HK", {
          timeZone: "Asia/Hong_Kong",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) + " (香港時間)"
      );
    } catch {
      return pubDate || "";
    }
  }

  function isSaved(term) {
    return Boolean(state.saved[term.toLowerCase()]);
  }

  function toggleSave(card) {
    const key = card.term.toLowerCase();
    if (state.saved[key]) {
      delete state.saved[key];
      toast(`已取消收藏 · Unsaved: ${card.term}`);
    } else {
      state.saved[key] = {
        ...card,
        savedAt: new Date().toISOString(),
      };
      toast(`已收藏 · Saved: ${card.term}`);
    }
    persistSaved();
    renderAllCards();
  }

function chipRow(label, items, cls) {
    const list = (items || []).filter(Boolean);
    if (!list.length) return "";
    const chips = list.map((r) => `<span class="chip ${cls || ""}">${escapeHtml(r)}</span>`).join("");
    return `<div class="lex-block"><div class="lex-label">${label}</div><div class="related">${chips}</div></div>`;
  }

  function examplesHTML(card) {
    const examples = Array.isArray(card.examples) && card.examples.length
      ? card.examples
      : card.example
        ? [{ en: card.example, zh: "" }]
        : [];
    if (!examples.length) return "";
    const items = examples
      .map((ex) => {
        const en = typeof ex === "string" ? ex : ex.en || "";
        const zh = typeof ex === "string" ? "" : ex.zh || "";
        return `<li class="example-item">
  <p class="example">${highlightExample(en, card.matchedSpan)}</p>
  ${zh ? `<p class="example-zh">${escapeHtml(zh)}</p>` : ""}
</li>`;
      })
      .join("");
    return `<div class="lex-block"><div class="lex-label">例句</div><ol class="example-list">${items}</ol></div>`;
  }

  function vocabCardHTML(card) {
    const saved = isSaved(card.term);
    const synonyms = card.synonyms || card.related || [];
    const antonyms = card.antonyms || [];
    const src = card.source || {};
    return `
<article class="vocab-card ${saved ? "saved" : ""}" data-term="${escapeHtml(card.term)}">
  <div class="card-top">
    <h4 class="term">${escapeHtml(card.term)}<span class="pos">${escapeHtml(card.pos || "")}</span></h4>
  </div>
  <div class="zh">${escapeHtml(card.zh || "")}</div>
  ${card.note ? `<div class="meta-line">${escapeHtml(card.note)}</div>` : ""}
  ${chipRow("同義詞", synonyms, "chip-syn")}
  ${chipRow("反義詞", antonyms, "chip-ant")}
  ${examplesHTML(card)}
  ${
    src.link
      ? `<div class="source-link">
          <a href="${escapeHtml(src.link)}" target="_blank" rel="noopener">${escapeHtml(src.title || "來源新聞稿")}</a>
          <span class="date">${escapeHtml(formatDate(src.pubDate, src.pubDateIso))}</span>
        </div>`
      : ""
  }
  <div class="card-actions">
    <button type="button" class="btn ${saved ? "" : "primary"} btn-save">${saved ? "★ 已收藏" : "☆ 收藏"}</button>
    ${src.link ? `<a class="btn" href="${escapeHtml(src.link)}" target="_blank" rel="noopener">原文</a>` : ""}
  </div>
</article>`;
  }

  function bindCardActions(container) {
    container.querySelectorAll(".vocab-card").forEach((el) => {
      const term = el.dataset.term;
      const card = findCard(term) || state.saved[term.toLowerCase()];
      const btn = el.querySelector(".btn-save");
      if (btn && card) {
        btn.addEventListener("click", () => toggleSave(card));
      }
    });
  }

  function findCard(term) {
    const key = (term || "").toLowerCase();
    const feed = state.feed;
    const fromFeed = feed
      ? [...(feed.todaysPicks || []), ...(feed.matches || [])].find((c) => c.term.toLowerCase() === key)
      : null;
    const fromLex = (state.lexicon || []).find((c) => c.term.toLowerCase() === key);
    if (fromFeed && fromLex) return enrichFromLexicon(fromFeed);
    return fromFeed || fromLex || null;
  }

  const Q1_CAT_LABELS = {
    all: "全部",
    implications: "影響／後果",
    assessment: "評估／分析",
    recommend: "建議措施",
    monitor: "監察／檢討",
    specificity: "負責方／時限／資源",
    discourse: "論述銜接",
  };

  function phraseCardHTML(item) {
    const key = `q1:${item.id}`;
    const saved = Boolean(state.saved[key.toLowerCase()]);
    const cat = Q1_CAT_LABELS[item.category] || item.category;
    return `
<article class="vocab-card phrase-card ${saved ? "saved" : ""}" data-phrase-id="${escapeHtml(item.id)}">
  <div class="card-top">
    <h4 class="term">${escapeHtml(item.en)}</h4>
    <span class="cat-pill">${escapeHtml(cat)}</span>
  </div>
  <div class="zh">${escapeHtml(item.zh || "")}</div>
  ${item.note ? `<div class="meta-line">${escapeHtml(item.note)}</div>` : ""}
  ${item.example ? `<p class="example">${escapeHtml(item.example)}</p>` : ""}
  <div class="card-actions">
    <button type="button" class="btn ${saved ? "" : "primary"} btn-save-phrase">${saved ? "★ 已收藏" : "☆ 收藏"}</button>
    <button type="button" class="btn btn-copy-phrase">複製句式</button>
  </div>
</article>`;
  }

  function toggleSavePhrase(item) {
    const key = `q1:${item.id}`.toLowerCase();
    if (state.saved[key]) {
      delete state.saved[key];
      toast(`已取消收藏 · ${item.en.slice(0, 40)}`);
    } else {
      state.saved[key] = {
        term: item.en,
        zh: item.zh,
        pos: "Q1 phrase",
        note: item.note || "",
        example: item.example || "",
        related: [item.category],
        phraseId: item.id,
        savedAt: new Date().toISOString(),
      };
      toast(`已收藏句式`);
    }
    persistSaved();
    renderQ1();
    renderSaved();
  }

  function bindPhraseActions(container) {
    container.querySelectorAll(".phrase-card").forEach((el) => {
      const id = el.dataset.phraseId;
      const item = (state.q1?.items || []).find((x) => x.id === id);
      if (!item) return;
      const saveBtn = el.querySelector(".btn-save-phrase");
      const copyBtn = el.querySelector(".btn-copy-phrase");
      if (saveBtn) saveBtn.addEventListener("click", () => toggleSavePhrase(item));
      if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
          const text = `${item.en}\n${item.zh || ""}`.trim();
          try {
            await navigator.clipboard.writeText(text);
            toast("已複製句式");
          } catch {
            toast("複製失敗 — 請手動選取");
          }
        });
      }
    });
  }

  function renderQ1Filters() {
    const cats = ["all", ...((state.q1?.categories || []).map((c) => c.id))];
    const wrap = $("#q1Filters");
    if (!wrap) return;
    wrap.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" data-cat="${c}" class="${state.q1Category === c ? "active" : ""}">${Q1_CAT_LABELS[c] || c}</button>`
      )
      .join("");
    wrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.q1Category = btn.dataset.cat;
        renderQ1Filters();
        renderQ1();
      });
    });
  }

  function renderQ1() {
    if (!$("#q1Grid")) return;
    const q = ($("#q1Search")?.value || "").trim().toLowerCase();
    let list = state.q1?.items || [];
    if (state.q1Category !== "all") {
      list = list.filter((i) => i.category === state.q1Category);
    }
    if (q) {
      list = list.filter((i) =>
        `${i.en} ${i.zh} ${i.category} ${i.note || ""} ${i.example || ""}`.toLowerCase().includes(q)
      );
    }
    const countEl = $("#q1Count");
    if (countEl) countEl.textContent = `${list.length} 句`;
    const disc = $("#q1Disclaimer");
    if (disc) disc.textContent = state.q1?.disclaimer || "";
    const grid = $("#q1Grid");
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="empty">沒有符合的句式。</div>`;
      return;
    }
    grid.innerHTML = list.map(phraseCardHTML).join("");
    bindPhraseActions(grid);
  }

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickN(arr, n, rand) {
    const copy = [...arr];
    const out = [];
    while (copy.length && out.length < n) {
      const i = Math.floor(rand() * copy.length);
      out.push(copy.splice(i, 1)[0]);
    }
    return out;
  }

  function weekKey(d = new Date()) {
    // ISO-ish week label in HK
    const hk = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
    const onejan = new Date(hk.getFullYear(), 0, 1);
    const week = Math.ceil(((hk - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return `${hk.getFullYear()}-W${String(week).padStart(2, "0")}`;
  }

  const DRILL_SCENARIOS = [
    {
      title: "Specialist outpatient waiting times",
      para: "Waiting times for certain specialist outpatient clinics have lengthened. Some patients report delayed follow-up, while NGOs highlight uneven district capacity. The Hospital Authority notes manpower strain; LegCo members have asked whether a short-term package is feasible without crowding out other services.",
    },
    {
      title: "Uptake of a means-tested living subsidy",
      para: "A recently enhanced means-tested living subsidy shows subdued uptake among eligible households. Frontline staff cite complex forms and stigma; the bureau cites fiscal prudence. Media coverage has focused on the gap between announced coverage and actual applications.",
    },
    {
      title: "Pilot transitional housing sites",
      para: "Two pilot transitional housing sites are near capacity, while three planned sites face local objection and utility delays. Demand from families on the PRH waiting list remains high. The department must advise on whether to scale up, redesign eligibility, or pause further sites.",
    },
    {
      title: "Cross-bureau digital service bottleneck",
      para: "A one-stop digital portal for licence renewals has uneven uptake. Some departments still require paper originals; SMEs report duplicated uploads. An interdepartmental working group exists but lacks a clear lead and timeline for closing the enforcement and process gaps.",
    },
    {
      title: "Elderly community care shortfall",
      para: "District-based community care places fall short of projected need. Carers report long waiting lists; operators cite recruitment difficulties. A stopgap purchase-of-service arrangement is under discussion, with concern over recurrent cost and quality oversight.",
    },
  ];

  function buildDrillPrompt() {
    const rand = mulberry32(state.drillSeed >>> 0);
    const scenario = DRILL_SCENARIOS[Math.floor(rand() * DRILL_SCENARIOS.length)];
    const picks = state.feed?.todaysPicks || [];
    const matches = state.feed?.matches || [];
    const pool = picks.length ? picks : matches;
    const words = pickN(pool, 5, rand).map((c) => c.term);
    // top up from lexicon-ish match list if short
    while (words.length < 4 && matches.length) {
      const extra = matches[Math.floor(rand() * matches.length)];
      if (extra && !words.includes(extra.term)) words.push(extra.term);
      else break;
    }
    const phrases = pickN(state.q1?.items || [], 3, rand);
    const phraseLines = phrases.map((p) => `• ${p.en}`).join("\n");
    const wordLine = words.length ? words.map((w) => `「${w}」`).join(" · ") : "（詞庫配對載入後會出現）";

    const text = `JRE English Q1 — MINI-DRILL (20–25 minutes)
Week: ${weekKey()} · NOT a full case pack

SCENARIO — ${scenario.title}
${scenario.para}

TASK (internal discussion paper style)
1. Identify TWO problems.
2. State TWO implications (knock-on / fiscal / public confidence / service capacity, etc.).
3. Propose TWO feasible measures — each with WHO (lead dept/officer), WHEN (timeframe), and RESOURCES (manpower/funding) where possible.
4. Use at least FOUR bank items below (mix of words + phrases). Underline or bold them in your draft.

BANK WORDS (from today’s picks / matches)
${wordLine}

BANK PHRASES (Q1句式)
${phraseLines || "• (Q1 phrase bank loading…)"}

LENGTH GUIDE: ~350–500 words. Formal civil-service tone.

AFTERWARDS
• Self-check: problems → implications → measures chain; specificity of who/when/resources.
• Full timed drills: log under Obsidian Personal/Learning/JRE 2026/05-English-Drills/ (Drill log.md).
• This mini-drill is practice only — no need to submit here.`;

    return { text, scenario: scenario.title, wordCount: words.length, phraseCount: phrases.length };
  }

  function renderDrill() {
    if (!$("#drillPrompt")) return;
    const meta = $("#drillMeta");
    const pre = $("#drillPrompt");
    if (!pre) return;
    const d = buildDrillPrompt();
    pre.textContent = d.text;
    if (meta) {
      meta.innerHTML = `<span class="chip">${escapeHtml(weekKey())}</span>
        <span class="chip">${escapeHtml(d.scenario)}</span>
        <span class="chip">${d.wordCount} words · ${d.phraseCount} phrases</span>`;
    }
  }


  function enrichFromLexicon(card) {
    const entry = (state.lexicon || []).find((e) => e.term.toLowerCase() === (card.term || "").toLowerCase());
    if (!entry) return card;
    return {
      ...entry,
      ...card,
      synonyms: entry.synonyms || card.synonyms,
      antonyms: entry.antonyms || card.antonyms,
      examples: entry.examples || card.examples,
      related: entry.related || entry.synonyms || card.related,
      note: entry.note || card.note,
      zh: entry.zh || card.zh,
      pos: entry.pos || card.pos,
    };
  }

  function renderPicks() {
    const grid = $("#picksGrid");
    const picks = state.feed?.todaysPicks || [];
    if (!picks.length) {
      grid.innerHTML = `<div class="empty">暫無今日精選 — 請稍後重新擷取，或查看「詞彙卡」全部詞庫。</div>`;
      return;
    }
    grid.innerHTML = picks.map((c) => vocabCardHTML(enrichFromLexicon(c))).join("");
    bindCardActions(grid);
  }

  function lexiconBlob(c) {
    return `${c.term} ${c.zh} ${c.pos} ${(c.synonyms || c.related || []).join(" ")} ${(c.antonyms || []).join(" ")} ${c.note || ""} ${(c.examples || []).map((x) => (typeof x === "string" ? x : `${x.en || ""} ${x.zh || ""}`)).join(" ")} ${c.example || ""}`.toLowerCase();
  }

  function vocabBankList() {
    const matches = state.feed?.matches || [];
    const byTerm = Object.fromEntries(matches.map((c) => [c.term.toLowerCase(), c]));
    const bank = state.lexicon.length ? state.lexicon : matches;
    return bank.map((entry) => {
      const hit = byTerm[entry.term.toLowerCase()];
      if (!hit) return entry;
      return {
        ...entry,
        example: hit.example || entry.example,
        matchedSpan: hit.matchedSpan,
        source: hit.source || entry.source,
      };
    });
  }

  function renderVocab() {
    const q = ($("#vocabSearch").value || "").trim().toLowerCase();
    let list = vocabBankList();
    if (q) {
      list = list.filter((c) => lexiconBlob(c).includes(q));
    }
    $("#vocabCount").textContent = `${list.length} 張卡`;
    const grid = $("#vocabGrid");
    if (!list.length) {
      grid.innerHTML = `<div class="empty">沒有符合的詞彙卡。</div>`;
      return;
    }
    grid.innerHTML = list.map(vocabCardHTML).join("");
    bindCardActions(grid);
  }

  function renderFeed() {
    if (!$("#feedList")) return;
    const q = (($("#feedSearch") && $("#feedSearch").value) || "").trim().toLowerCase();
    let items = state.feed?.items || [];
    if (q) {
      items = items.filter((it) =>
        `${it.title} ${it.description}`.toLowerCase().includes(q)
      );
    }
    const list = $("#feedList");
    if (!items.length) {
      list.innerHTML = `<div class="empty">沒有新聞稿。</div>`;
      return;
    }
    list.innerHTML = items
      .map(
        (it) => `
<article class="feed-item">
  <h4><a href="${escapeHtml(it.link)}" target="_blank" rel="noopener">${escapeHtml(it.title)}</a></h4>
  <p class="desc">${escapeHtml(it.description)}</p>
  <div class="meta">${escapeHtml(formatDate(it.pubDate, it.pubDateIso))}</div>
</article>`
      )
      .join("");
  }

  const CAT_LABELS = {
    all: "全部",
    housing: "房屋",
    welfare: "福利",
    education: "教育",
    health: "衞生",
    economy: "經濟",
    security: "保安",
    environment: "環境",
  };

  function renderProgFilters() {
    const cats = ["all", ...new Set((state.programmes?.items || []).map((i) => i.category))];
    const wrap = $("#progFilters");
    wrap.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" data-cat="${c}" class="${state.progCategory === c ? "active" : ""}">${CAT_LABELS[c] || c}</button>`
      )
      .join("");
    wrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.progCategory = btn.dataset.cat;
        renderProgFilters();
        renderProgrammes();
      });
    });
  }

  function renderProgrammes() {
    if (!$("#progBody")) return;
    const q = ($("#progSearch").value || "").trim().toLowerCase();
    let items = state.programmes?.items || [];
    if (state.progCategory !== "all") {
      items = items.filter((i) => i.category === state.progCategory);
    }
    if (q) {
      items = items.filter((i) =>
        `${i.en} ${i.zh} ${i.abbr} ${i.category}`.toLowerCase().includes(q)
      );
    }
    $("#progCount").textContent = `${items.length} 項`;
    $("#progDisclaimer").textContent =
      state.programmes?.disclaimer ||
      "Starter bank — expand as you revise.";
    const body = $("#progBody");
    body.innerHTML = items
      .map(
        (i) => `
<tr>
  <td><strong>${escapeHtml(i.en)}</strong></td>
  <td>${escapeHtml(i.zh)}</td>
  <td class="abbr">${escapeHtml(i.abbr || "—")}</td>
  <td><span class="cat-pill">${escapeHtml(CAT_LABELS[i.category] || i.category)}</span></td>
</tr>`
      )
      .join("");
  }

  function renderSaved() {
    const list = Object.values(state.saved).sort((a, b) =>
      (a.term || "").localeCompare(b.term || "")
    );
    const grid = $("#savedGrid");
    if (!list.length) {
      grid.innerHTML = `<div class="empty">尚未收藏生字。在詞彙卡按「☆ 收藏」即可。</div>`;
      return;
    }
    grid.innerHTML = list.map(vocabCardHTML).join("");
    bindCardActions(grid);
  }

  function renderAllCards() {
    renderPicks();
    renderVocab();
    renderSaved();
  }

  function updateStats() {
    const f = state.feed;
    $("#statItems").textContent = f ? String(f.itemCount ?? 0) : "—";
    $("#statMatches").textContent = f ? String(f.matchCount ?? 0) : "—";
    $("#statLexicon").textContent = f ? String(f.lexiconSize ?? 0) : "—";
    $("#statSaved").textContent = String(Object.keys(state.saved).length);
    const bar = $("#statusBar");
    if (!f) {
      bar.innerHTML = `<span>載入中…</span>`;
      return;
    }
    const parts = [];
    if (state.dataMode === "static") {
      parts.push("靜態快照 · GitHub Pages");
    } else if (state.dataMode === "api") {
      parts.push("即時 API");
    }
    if (f.fetchedAt) {
      try {
        const d = new Date(f.fetchedAt);
        parts.push(
          `擷取：${d.toLocaleString("zh-HK", { timeZone: "Asia/Hong_Kong" })} (香港時間)`
        );
      } catch {
        parts.push(`擷取：${f.fetchedAt}`);
      }
    }
    if (f.cached) parts.push("快取資料");
    if (f.error) parts.push(`<span class="err">${escapeHtml(f.error)}</span>`);
    else parts.push(`來源：${escapeHtml(f.source || "")}`);
    bar.innerHTML = parts.map((p) => `<span>${p}</span>`).join("");
  }

  async function tryFetch(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    return res.json();
  }

  /**
   * Prefer /api/* when available (local serve.py); fall back to relative data/*.json for Pages.
   */
  async function loadJson(apiPath, staticPath) {
    const mode = CONFIG.mode;
    if (mode === "static") {
      state.dataMode = "static";
      return tryFetch(staticPath);
    }
    if (mode === "api") {
      state.dataMode = "api";
      return tryFetch(apiPath);
    }
    // auto
    try {
      const data = await tryFetch(apiPath);
      state.dataMode = "api";
      return data;
    } catch {
      const data = await tryFetch(staticPath);
      state.dataMode = "static";
      return data;
    }
  }

  async function loadFeed(refresh = false) {
    $("#statusBar").innerHTML = `<span>正在載入…</span>`;
    try {
      if (refresh && state.dataMode === "api") {
        state.feed = await tryFetch("/api/feed?refresh=1");
        state.dataMode = "api";
        toast("已更新新聞稿");
      } else if (refresh && state.dataMode === "static") {
        // Re-read snapshot (Pages has no live RSS proxy)
        state.feed = await tryFetch("data/feed.json");
        toast("已重新載入靜態快照（每日 Actions 更新）");
      } else {
        state.feed = await loadJson(
          refresh ? "/api/feed?refresh=1" : "/api/feed",
          "data/feed.json"
        );
        if (refresh && state.dataMode === "api") toast("已更新新聞稿");
      }
      updateStats();
      renderAllCards();
      renderFeed();
    } catch (e) {
      $("#statusBar").innerHTML = `<span class="err">載入失敗：${escapeHtml(e.message)}</span>`;
    }
  }


  async function loadLexicon() {
    try {
      const data = await loadJson("/api/lexicon", "data/lexicon.json");
      // API: { ok, items } ; static: bare array
      state.lexicon = Array.isArray(data) ? data : data.items || [];
    } catch (e) {
      state.lexicon = [];
      console.warn("lexicon load failed", e);
    }
  }

  async function loadProgrammes() {
    const data = await loadJson("/api/programmes", "data/programmes.json");
    // API wraps with { ok, disclaimer, items }; static file is { disclaimer, items }
    state.programmes = data;
    renderProgFilters();
    renderProgrammes();
  }

  async function loadQ1() {
    try {
      const data = await loadJson("/api/q1-phrases", "data/q1_phrases.json");
      state.q1 = {
        disclaimer: data.disclaimer || "",
        categories: data.categories || [],
        items: data.items || [],
      };
      renderQ1Filters();
      renderQ1();
      renderDrill();
    } catch (e) {
      console.warn("Q1 phrases failed", e);
      const grid = $("#q1Grid");
      if (grid) grid.innerHTML = `<div class="empty">未能載入 Q1 句式庫。</div>`;
    }
  }


  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function filteredVocabList() {
    const q = ($("#vocabSearch")?.value || "").trim().toLowerCase();
    let list = vocabBankList();
    if (q) list = list.filter((c) => lexiconBlob(c).includes(q));
    return list;
  }

  function savedVocabList() {
    return Object.values(state.saved)
      .filter((c) => c && c.term && !c.phraseId && (c.pos || "") !== "Q1 phrase")
      .sort((a, b) => (a.term || "").localeCompare(b.term || ""));
  }

  function getStudyDeck(source) {
    let list;
    switch (source) {
      case "all":
        list = vocabBankList();
        break;
      case "today":
        list = (state.feed?.todaysPicks || []).map(enrichFromLexicon);
        break;
      case "saved":
        list = savedVocabList();
        break;
      case "filtered":
      default:
        list = filteredVocabList();
        break;
    }
    // de-dupe by term
    const seen = new Set();
    return list.filter((c) => {
      const key = (c.term || "").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function studyBackExtraHTML(card) {
    const synonyms = (card.synonyms || card.related || []).filter(Boolean).slice(0, 6);
    const antonyms = (card.antonyms || []).filter(Boolean).slice(0, 4);
    let examples = Array.isArray(card.examples) && card.examples.length
      ? card.examples
      : card.example
        ? [{ en: card.example, zh: "" }]
        : [];
    examples = examples.slice(0, 2);
    const parts = [];
    if (synonyms.length) {
      parts.push(
        `<div class="lex-block"><div class="lex-label">同義詞</div><div class="related">${synonyms
          .map((r) => `<span class="chip chip-syn">${escapeHtml(r)}</span>`)
          .join("")}</div></div>`
      );
    }
    if (antonyms.length) {
      parts.push(
        `<div class="lex-block"><div class="lex-label">反義詞</div><div class="related">${antonyms
          .map((r) => `<span class="chip chip-ant">${escapeHtml(r)}</span>`)
          .join("")}</div></div>`
      );
    }
    if (examples.length) {
      const items = examples
        .map((ex) => {
          const en = typeof ex === "string" ? ex : ex.en || "";
          const zh = typeof ex === "string" ? "" : ex.zh || "";
          return `<li class="example-item">
  <p class="example">${highlightExample(en, card.matchedSpan)}</p>
  ${zh ? `<p class="example-zh">${escapeHtml(zh)}</p>` : ""}
</li>`;
        })
        .join("");
      parts.push(
        `<div class="lex-block"><div class="lex-label">例句</div><ol class="example-list">${items}</ol></div>`
      );
    }
    return parts.join("");
  }

  function updateStudyProgress() {
    const known = study.known.length;
    const total = study.total || 1;
    const remaining = study.queue.length;
    // Quizlet-ish: show known progress; label is position among remaining+known
    const pos = remaining ? known + 1 : total;
    const el = $("#studyProgressLabel");
    if (el) el.textContent = `${Math.min(pos, total)} / ${total}`;
    const bar = $("#studyProgressBar");
    if (bar) bar.style.width = `${Math.min(100, (known / total) * 100)}%`;
    const pill = $("#studyKnownPill");
    if (pill) pill.textContent = `識 ${known}`;
  }

  function renderStudyCard() {
    const card = study.queue[0];
    const flip = $("#flipCard");
    const stage = $("#studyStage");
    const summary = $("#studySummary");
    if (!card) {
      showStudySummary();
      return;
    }
    if (stage) stage.hidden = false;
    if (summary) summary.hidden = true;
    study.flipped = false;
    if (flip) {
      flip.classList.remove("is-flipped", "is-swipe-left", "is-swipe-right");
      flip.style.transform = "";
      flip.style.opacity = "";
    }
    $("#flipTerm").textContent = card.term || "";
    $("#flipPos").textContent = card.pos || "";
    $("#flipZh").textContent = card.zh || "（暫無中文）";
    $("#flipExtra").innerHTML = studyBackExtraHTML(card);
    updateStudyProgress();
  }

  function showStudySummary() {
    const stage = $("#studyStage");
    const summary = $("#studySummary");
    if (stage) stage.hidden = true;
    if (summary) summary.hidden = false;
    const known = study.known.length;
    const learning = study.everLearning.length;
    const stats = $("#studySummaryStats");
    if (stats) {
      stats.innerHTML = `本輪<strong>${known}</strong> 個已識<br>其中曾標記未懂：<strong>${learning}</strong> 個`;
    }
    const retry = $("#btnRetryLearning");
    if (retry) retry.disabled = learning === 0;
    updateStudyProgress();
  }

  function openStudyOverlay() {
    const overlay = $("#studyOverlay");
    if (!overlay) return;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("study-active");
    study.active = true;
  }

  function closeStudyOverlay() {
    const overlay = $("#studyOverlay");
    if (overlay) {
      overlay.hidden = true;
      overlay.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("study-active");
    study.active = false;
    study.queue = [];
    study.deck = [];
    study.known = [];
    study.learning = [];
    study.everLearning = [];
    study.flipped = false;
    study.touch = null;
  }

  function startStudy(sourceOverride) {
    const source =
      sourceOverride ||
      $("#studyDeckSource")?.value ||
      study.source ||
      "filtered";
    const shuffle = $("#studyShuffle") ? $("#studyShuffle").checked : study.shuffle;
    study.source = source;
    study.shuffle = shuffle;
    if ($("#studyDeckSource") && sourceOverride) {
      $("#studyDeckSource").value = source;
    }
    let deck = getStudyDeck(source);
    if (!deck.length) {
      toast("這個詞庫暫時沒有詞卡可學");
      return;
    }
    if (shuffle) deck = shuffleInPlace([...deck]);
    else deck = [...deck];
    study.deck = deck;
    study.queue = [...deck];
    study.known = [];
    study.learning = [];
    study.everLearning = [];
    study.total = deck.length;
    study.flipped = false;
    openStudyOverlay();
    renderStudyCard();
  }

  function flipStudyCard() {
    if (!study.active || !study.queue.length) return;
    study.flipped = !study.flipped;
    $("#flipCard")?.classList.toggle("is-flipped", study.flipped);
  }

  function trackEverLearning(card) {
    const key = (card.term || "").toLowerCase();
    if (!study.everLearning.some((c) => (c.term || "").toLowerCase() === key)) {
      study.everLearning.push(card);
    }
  }

  function markStillLearning() {
    if (!study.active || !study.queue.length) return;
    const card = study.queue.shift();
    trackEverLearning(card);
    // Recycle to end of remaining queue (Quizlet-style)
    study.queue.push(card);
    study.learning = [...study.queue]; // currently remaining = still learning
    study.flipped = false;
    // If only 1 left, stay on it (re-render) until Know
    renderStudyCard();
  }

  function markKnow() {
    if (!study.active || !study.queue.length) return;
    const card = study.queue.shift();
    study.known.push(card);
    study.learning = [...study.queue];
    study.flipped = false;
    if (!study.queue.length) showStudySummary();
    else renderStudyCard();
  }

  function retryLearning() {
    if (!study.everLearning.length) {
      toast("沒有曾標記未懂的詞");
      return;
    }
    let deck = [...study.everLearning];
    if (study.shuffle) deck = shuffleInPlace(deck);
    study.deck = deck;
    study.queue = [...deck];
    study.known = [];
    study.learning = [];
    study.everLearning = [];
    study.total = deck.length;
    study.flipped = false;
    renderStudyCard();
  }

  function restartAll() {
    let deck = getStudyDeck(study.source);
    if (!deck.length) {
      toast("詞庫是空的");
      return;
    }
    if (study.shuffle) deck = shuffleInPlace([...deck]);
    else deck = [...deck];
    study.deck = deck;
    study.queue = [...deck];
    study.known = [];
    study.learning = [];
    study.everLearning = [];
    study.total = deck.length;
    study.flipped = false;
    renderStudyCard();
  }

  function onStudyKeydown(e) {
    if (!study.active) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.code === "Space" || e.key === "Enter") {
      e.preventDefault();
      if ($("#studySummary") && !$("#studySummary").hidden) return;
      flipStudyCard();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if ($("#studySummary") && !$("#studySummary").hidden) return;
      markStillLearning();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if ($("#studySummary") && !$("#studySummary").hidden) return;
      markKnow();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeStudyOverlay();
    }
  }

  function initStudyGestures() {
    const card = $("#flipCard");
    if (!card) return;
    const THRESH = 72;

    card.addEventListener("click", (e) => {
      // ignore if this was a swipe
      if (study.touch && study.touch.swiped) return;
      flipStudyCard();
    });

    card.addEventListener(
      "touchstart",
      (e) => {
        if (!study.active || !study.queue.length) return;
        const t = e.changedTouches[0];
        study.touch = { x: t.clientX, y: t.clientY, swiped: false };
        card.classList.remove("is-swipe-left", "is-swipe-right");
      },
      { passive: true }
    );

    card.addEventListener(
      "touchmove",
      (e) => {
        if (!study.touch) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - study.touch.x;
        const dy = t.clientY - study.touch.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
          e.preventDefault();
          card.style.transform = `translateX(${dx * 0.35}px) rotate(${dx * 0.03}deg)`;
          card.style.opacity = String(Math.max(0.55, 1 - Math.abs(dx) / 420));
          card.classList.toggle("is-swipe-left", dx < -24);
          card.classList.toggle("is-swipe-right", dx > 24);
        }
      },
      { passive: false }
    );

    const endTouch = (e) => {
      if (!study.touch) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - study.touch.x;
      const dy = t.clientY - study.touch.y;
      card.style.transform = "";
      card.style.opacity = "";
      card.classList.remove("is-swipe-left", "is-swipe-right");
      if (Math.abs(dx) > THRESH && Math.abs(dx) > Math.abs(dy)) {
        study.touch.swiped = true;
        if (dx < 0) markStillLearning();
        else markKnow();
      }
      // clear after click handler may run
      setTimeout(() => {
        study.touch = null;
      }, 50);
    };

    card.addEventListener("touchend", endTouch, { passive: true });
    card.addEventListener("touchcancel", () => {
      card.style.transform = "";
      card.style.opacity = "";
      card.classList.remove("is-swipe-left", "is-swipe-right");
      study.touch = null;
    });
  }

  function initStudy() {
    $("#btnStartStudy")?.addEventListener("click", () => startStudy());
    $("#btnStartStudyToday")?.addEventListener("click", () => startStudy("today"));
    $("#btnStartStudySaved")?.addEventListener("click", () => startStudy("saved"));
    $("#btnStudyClose")?.addEventListener("click", closeStudyOverlay);
    $("#btnStillLearning")?.addEventListener("click", markStillLearning);
    $("#btnKnow")?.addEventListener("click", markKnow);
    $("#btnRetryLearning")?.addEventListener("click", retryLearning);
    $("#btnRestartAll")?.addEventListener("click", restartAll);
    $("#btnExitStudy")?.addEventListener("click", closeStudyOverlay);
    document.addEventListener("keydown", onStudyKeydown);
    initStudyGestures();
  }

  function initNav() {
    $$("#nav button").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("#nav button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        $$(".panel").forEach((p) => p.classList.remove("active"));
        $(`#panel-${btn.dataset.panel}`).classList.add("active");
      });
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    // Default: Policy light green (not system dark / blue)
    document.documentElement.setAttribute("data-theme", saved || "light");
    $("#btnTheme").addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  function initEvents() {
    $("#btnRefresh").addEventListener("click", () => loadFeed(true));
    $("#vocabSearch").addEventListener("input", renderVocab);
    const feedSearch = $("#feedSearch");
    if (feedSearch) feedSearch.addEventListener("input", renderFeed);
    const progSearch = $("#progSearch");
    if (progSearch) progSearch.addEventListener("input", renderProgrammes);
    $("#btnExport").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state.saved, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `jre-vocab-saved-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      toast("已匯出收藏");
    });
    $("#btnClearSaved").addEventListener("click", () => {
      if (!Object.keys(state.saved).length) return;
      if (!confirm("確定清空全部收藏？")) return;
      state.saved = {};
      persistSaved();
      renderSaved();
      renderAllCards();
      toast("已清空收藏");
    });
    const q1Search = $("#q1Search");
    if (q1Search) q1Search.addEventListener("input", renderQ1);
    const btnCopy = $("#btnCopyDrill");
    if (btnCopy) {
      btnCopy.addEventListener("click", async () => {
        const text = $("#drillPrompt")?.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          toast("已複製迷你練習提示");
        } catch {
          toast("複製失敗 — 請手動選取文字");
        }
      });
    }
    const btnRegen = $("#btnRegenDrill");
    if (btnRegen) {
      btnRegen.addEventListener("click", () => {
        state.drillSeed = (state.drillSeed + 0x9e3779b9) >>> 0;
        renderDrill();
        toast("已重新抽題");
      });
    }
  }

  async function boot() {
    initNav();
    initTheme();
    initEvents();
    initStudy();
    persistSaved();
    await loadLexicon();
    await loadFeed(false);
  }

  boot();
})();
