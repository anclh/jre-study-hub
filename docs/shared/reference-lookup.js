(() => {
  const root = typeof globalThis !== "undefined" ? globalThis : window;
  const copy = {
    zh: {
      title: "查局／詞彙",
      tabBureaux: "決策局",
      tabVocab: "詞彙",
      searchBureaux: "搜尋決策局、職責或議題（如託兒、房屋）",
      searchVocab: "搜尋英文、中文或同義詞",
      close: "關閉",
      empty: "沒有符合的項目。試試較短關鍵詞。",
      loading: "載入中…",
      error: "無法載入資料。可改開完整頁面。",
      issues: "按議題搵局",
      bureaux: "15 個決策局",
      lead: "主責／統籌",
      duties: "主要職責",
      focus: "政策焦點",
      depts: "執行署／機構",
      collab: "協作",
      execute: "執行",
      example: "答題例句",
      fullBureaux: "完整決策局頁",
      fullVocab: "詞彙庫",
      shown: "顯示",
      of: "／",
    },
    en: {
      title: "Bureaux / vocab",
      tabBureaux: "Bureaux",
      tabVocab: "Vocab",
      searchBureaux: "Search bureaux, duties or issues (e.g. childcare, housing)",
      searchVocab: "Search English, Chinese or synonyms",
      close: "Close",
      empty: "No matches. Try a shorter keyword.",
      loading: "Loading…",
      error: "Could not load data. Open the full page instead.",
      issues: "Find the bureau by issue",
      bureaux: "15 policy bureaux",
      lead: "Lead / coordinate",
      duties: "Main duties",
      focus: "Policy focus",
      depts: "Executive departments",
      collab: "Collaborate",
      execute: "Deliver",
      example: "Answer line",
      fullBureaux: "Full bureaux page",
      fullVocab: "Vocab bank",
      shown: "Showing",
      of: " of ",
    },
  };

  function joinUrl(base, path) {
    const prefix = String(base || "./").replace(/\/?$/, "/");
    return prefix + String(path || "").replace(/^\//, "");
  }

  function tokens(query) {
    return String(query || "")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function matchesHay(haystack, query) {
    const parts = tokens(query);
    if (!parts.length) return true;
    const hay = String(haystack || "").toLowerCase();
    return parts.every((part) => hay.includes(part));
  }

  function bureauHay(bureau) {
    const focus = (bureau.policyFocus || []).map((row) => `${row.title || ""} ${row.text || ""}`);
    return [
      bureau.zh,
      bureau.en,
      bureau.abbr,
      bureau.keywords,
      bureau.departments,
      ...(bureau.responsibilities || []),
      ...focus,
    ].join(" ");
  }

  function issueHay(issue) {
    return [
      issue.zh,
      issue.en,
      issue.lead,
      issue.keywords,
      issue.owner,
      issue.collaborate,
      issue.execute,
      issue.example,
    ].join(" ");
  }

  function vocabHay(entry) {
    const examples = (entry.examples || []).map((ex) => `${ex.en || ""} ${ex.zh || ""}`);
    return [
      entry.term,
      entry.zh,
      entry.pos,
      entry.topic,
      entry.note,
      ...(entry.synonyms || []),
      ...(entry.antonyms || []),
      ...(entry.related || []),
      entry.example || "",
      ...examples,
    ].join(" ");
  }

  function filterBureaux(list, query) {
    return (list || []).filter((row) => matchesHay(bureauHay(row), query));
  }

  function filterIssues(list, query) {
    return (list || []).filter((row) => matchesHay(issueHay(row), query));
  }

  function filterVocab(list, query) {
    return (list || []).filter((row) => matchesHay(vocabHay(row), query));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function t(lang, key) {
    return (copy[lang] || copy.zh)[key] || key;
  }

  function detectLang(options) {
    if (options && options.lang) return options.lang;
    const htmlLang = typeof document !== "undefined" ? document.documentElement.lang : "";
    return String(htmlLang).toLowerCase().startsWith("en") ? "en" : "zh";
  }

  const state = {
    mounted: false,
    open: false,
    tab: "bureaux",
    query: "",
    options: null,
    trigger: null,
    data: { bureaux: null, vocab: null },
    dialog: null,
    search: null,
    body: null,
    status: null,
    tabs: null,
  };

  function ensureDom() {
    if (typeof document === "undefined") return;
    if (state.dialog) return;
    const dialog = document.createElement("dialog");
    dialog.id = "jre-ref-dialog";
    dialog.className = "jre-ref-dialog";
    dialog.setAttribute("aria-labelledby", "jre-ref-title");
    dialog.innerHTML = `
      <div class="jre-ref-panel">
        <header class="jre-ref-head">
          <h2 class="jre-ref-title" id="jre-ref-title"></h2>
          <button type="button" class="jre-ref-close" data-ref="close" aria-label=""></button>
          <div class="jre-ref-tabs" role="tablist">
            <button type="button" class="jre-ref-tab" role="tab" id="jre-ref-tab-bureaux" data-tab="bureaux" aria-controls="jre-ref-body"></button>
            <button type="button" class="jre-ref-tab" role="tab" id="jre-ref-tab-vocab" data-tab="vocab" aria-controls="jre-ref-body"></button>
          </div>
        </header>
        <div class="jre-ref-search">
          <input type="search" id="jre-ref-search" enterkeyhint="search" autocomplete="off" spellcheck="false" />
        </div>
        <p class="jre-ref-status" id="jre-ref-status" role="status"></p>
        <div class="jre-ref-body" id="jre-ref-body" role="tabpanel"></div>
        <footer class="jre-ref-foot" id="jre-ref-foot"></footer>
      </div>`;
    document.body.appendChild(dialog);
    state.dialog = dialog;
    state.search = dialog.querySelector("#jre-ref-search");
    state.body = dialog.querySelector("#jre-ref-body");
    state.status = dialog.querySelector("#jre-ref-status");
    state.tabs = dialog.querySelectorAll(".jre-ref-tab");
    dialog.querySelector("[data-ref=close]").addEventListener("click", () => api.close());
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      api.close();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) api.close();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab" || !dialog.open) return;
      const nodes = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
        (node) => !node.disabled && node.offsetParent !== null
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    state.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        state.tab = tab.dataset.tab;
        state.query = "";
        state.search.value = "";
        paintChrome();
        render();
        state.search.focus();
      });
    });
    state.search.addEventListener("input", () => {
      state.query = state.search.value;
      render();
    });
    state.search.addEventListener("keydown", (event) => {
      if (event.key === "Escape") api.close();
    });
  }

  function paintChrome() {
    const lang = detectLang(state.options);
    const dialog = state.dialog;
    dialog.querySelector("#jre-ref-title").textContent = t(lang, "title");
    const closeBtn = dialog.querySelector("[data-ref=close]");
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", t(lang, "close"));
    state.tabs.forEach((tab) => {
      const selected = tab.dataset.tab === state.tab;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
      tab.textContent = t(lang, tab.dataset.tab === "vocab" ? "tabVocab" : "tabBureaux");
    });
    state.search.placeholder = t(lang, state.tab === "vocab" ? "searchVocab" : "searchBureaux");
    state.search.setAttribute("aria-label", state.search.placeholder);
    const base = state.options.base;
    const foot = dialog.querySelector("#jre-ref-foot");
    foot.innerHTML = `
      <a href="${escapeHtml(joinUrl(base, "bureaux/"))}">${escapeHtml(t(lang, "fullBureaux"))}</a>
      <a href="${escapeHtml(joinUrl(base, "vocab/"))}">${escapeHtml(t(lang, "fullVocab"))}</a>`;
  }

  async function loadBureaux() {
    if (state.data.bureaux) return state.data.bureaux;
    const url = state.options.bureauxUrl || joinUrl(state.options.base, "bureaux/data/bureaux.json");
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("bureaux " + res.status);
    state.data.bureaux = await res.json();
    return state.data.bureaux;
  }

  async function loadVocab() {
    if (state.data.vocab) return state.data.vocab;
    const url = state.options.vocabUrl || joinUrl(state.options.base, "vocab/data/lexicon.json");
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("vocab " + res.status);
    const json = await res.json();
    state.data.vocab = Array.isArray(json) ? json : json.items || [];
    return state.data.vocab;
  }

  function renderBureauCard(bureau, lang) {
    const duties = (bureau.responsibilities || []).map((row) => `<li>${escapeHtml(row)}</li>`).join("");
    const focus = (bureau.policyFocus || [])
      .map((row) => `<li><strong>${escapeHtml(row.title || "")}</strong> ${escapeHtml(row.text || "")}</li>`)
      .join("");
    const name = lang === "en" ? bureau.en : bureau.zh;
    const alt = lang === "en" ? bureau.zh : bureau.en;
    return `<details class="jre-ref-card">
      <summary><span class="jre-ref-name">${escapeHtml(name)}</span>
        <span class="jre-ref-en">${escapeHtml(alt)}</span>
        <span class="jre-ref-abbr">${escapeHtml(bureau.abbr || "")}</span></summary>
      <div class="jre-ref-card-body">
        <dl>
          <dt>${escapeHtml(t(lang, "duties"))}</dt>
          <dd><ul>${duties}</ul></dd>
          <dt>${escapeHtml(t(lang, "focus"))}</dt>
          <dd><ul>${focus}</ul></dd>
          <dt>${escapeHtml(t(lang, "depts"))}</dt>
          <dd>${escapeHtml(bureau.departments || "")}</dd>
        </dl>
      </div>
    </details>`;
  }

  function renderIssueCard(issue, lang) {
    const name = lang === "en" && issue.en ? issue.en : issue.zh;
    const alt = lang === "en" ? issue.zh : issue.en;
    const source = issue.source
      ? `<p><a href="${escapeHtml(issue.source)}" target="_blank" rel="noopener noreferrer">↗</a></p>`
      : "";
    return `<details class="jre-ref-card">
      <summary><span class="jre-ref-name">${escapeHtml(name)}</span>
        <span class="jre-ref-en">${escapeHtml(alt || "")}</span>
        <span class="jre-ref-lead">${escapeHtml(issue.lead || "")}</span></summary>
      <div class="jre-ref-card-body">
        <dl>
          <dt>${escapeHtml(t(lang, "lead"))}</dt><dd>${escapeHtml(issue.owner || issue.lead || "")}</dd>
          <dt>${escapeHtml(t(lang, "collab"))}</dt><dd>${escapeHtml(issue.collaborate || "")}</dd>
          <dt>${escapeHtml(t(lang, "execute"))}</dt><dd>${escapeHtml(issue.execute || "")}</dd>
          <dt>${escapeHtml(t(lang, "example"))}</dt><dd>${escapeHtml(issue.example || "")}</dd>
        </dl>
        ${source}
      </div>
    </details>`;
  }

  function renderVocabCard(entry) {
    const ex = (entry.examples && entry.examples[0]) || {};
    const example = ex.en || entry.example || "";
    const exampleZh = ex.zh || "";
    return `<article class="jre-ref-term">
      <h4>${escapeHtml(entry.term || "")} <span class="jre-ref-zh">${escapeHtml(entry.zh || "")}</span></h4>
      <p class="jre-ref-meta">${escapeHtml([entry.pos, entry.topic].filter(Boolean).join(" · "))}</p>
      ${example ? `<p class="jre-ref-ex">${escapeHtml(example)}${exampleZh ? `<br>${escapeHtml(exampleZh)}` : ""}</p>` : ""}
    </article>`;
  }

  async function render() {
    if (!state.dialog) return;
    const lang = detectLang(state.options);
    state.body.innerHTML = `<p class="jre-ref-status">${escapeHtml(t(lang, "loading"))}</p>`;
    try {
      if (state.tab === "vocab") {
        const vocab = await loadVocab();
        const matched = filterVocab(vocab, state.query);
        const limit = 40;
        const shown = matched.slice(0, limit);
        state.status.textContent = matched.length
          ? `${t(lang, "shown")} ${shown.length}${t(lang, "of")}${matched.length}`
          : "";
        state.body.innerHTML = shown.length
          ? shown.map(renderVocabCard).join("")
          : `<p class="jre-ref-empty">${escapeHtml(t(lang, "empty"))}</p>`;
        return;
      }
      const pack = await loadBureaux();
      const bureaux = filterBureaux(pack.bureaux || [], state.query);
      const issues = filterIssues(pack.issues || [], state.query);
      state.status.textContent = `${t(lang, "bureaux")} ${bureaux.length} · ${t(lang, "issues")} ${issues.length}`;
      if (!bureaux.length && !issues.length) {
        state.body.innerHTML = `<p class="jre-ref-empty">${escapeHtml(t(lang, "empty"))}</p>`;
        return;
      }
      const issueBlock = issues.length
        ? `<section class="jre-ref-group"><h3>${escapeHtml(t(lang, "issues"))}</h3>${issues.map((row) => renderIssueCard(row, lang)).join("")}</section>`
        : "";
      const bureauBlock = bureaux.length
        ? `<section class="jre-ref-group"><h3>${escapeHtml(t(lang, "bureaux"))}</h3>${bureaux.map((row) => renderBureauCard(row, lang)).join("")}</section>`
        : "";
      state.body.innerHTML = issueBlock + bureauBlock;
    } catch (err) {
      state.status.textContent = "";
      state.body.innerHTML = `<p class="jre-ref-error">${escapeHtml(t(lang, "error"))}<br><small>${escapeHtml(String(err))}</small></p>`;
    }
  }

  function bindLaunches(rootEl) {
    const scope = rootEl || document;
    scope.querySelectorAll("[data-jre-lookup]").forEach((btn) => {
      if (btn.dataset.jreLookupBound === "1") return;
      btn.dataset.jreLookupBound = "1";
      btn.addEventListener("click", () => {
        api.open({
          tab: btn.getAttribute("data-jre-lookup-tab") || "bureaux",
          query: btn.getAttribute("data-jre-lookup-query") || "",
          trigger: btn,
        });
      });
    });
  }

  const api = {
    version: "20261117b",
    joinUrl,
    matchesHay,
    filterBureaux,
    filterIssues,
    filterVocab,
    mount(options) {
      if (typeof document === "undefined") return api;
      state.options = Object.assign(
        {
          base: "../",
          defaultTab: "bureaux",
        },
        options || {}
      );
      ensureDom();
      bindLaunches(document);
      state.mounted = true;
      return api;
    },
    open(opts) {
      api.mount(state.options || (opts && opts.options) || {});
      const next = opts || {};
      state.trigger = next.trigger || document.activeElement;
      state.tab = next.tab || state.options.defaultTab || "bureaux";
      state.query = next.query || "";
      paintChrome();
      state.search.value = state.query;
      if (typeof state.dialog.showModal === "function" && !state.dialog.open) {
        state.dialog.showModal();
      }
      state.open = true;
      render();
      state.search.focus();
      if (state.query) state.search.select();
      return api;
    },
    close() {
      if (state.dialog && state.dialog.open) state.dialog.close();
      state.open = false;
      const trigger = state.trigger;
      state.trigger = null;
      if (trigger && typeof trigger.focus === "function") trigger.focus();
      return api;
    },
    isOpen() {
      return Boolean(state.dialog && state.dialog.open);
    },
  };

  root.JreReferenceLookup = api;
})();
