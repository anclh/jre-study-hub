(() => {
  const state = {
    lang: localStorage.getItem("jre-lang") || "zh",
    view: "browse",
    query: "",
    departments: new Set(),
    themes: new Set(),
    sort: "newest",
    data: null,
    briefsData: null,
    openBriefs: new Set(),
    filtersOpen: localStorage.getItem("jre-filters-open") === "1" || window.matchMedia("(min-width: 768px)").matches,
  };

  const el = {
    search: document.getElementById("search"),
    clear: document.getElementById("clearSearch"),
    deptChips: document.getElementById("deptChips"),
    themeChips: document.getElementById("themeChips"),
    cards: document.getElementById("cards"),
    count: document.getElementById("count"),
    sort: document.getElementById("sort"),
    browse: document.getElementById("browse"),
    digest: document.getElementById("digest"),
    digestBody: document.getElementById("digestBody"),
    briefs: document.getElementById("briefs"),
    briefsList: document.getElementById("briefsList"),
    briefsCount: document.getElementById("briefsCount"),
    quickRef: document.getElementById("quickRef"),
    briefsSources: document.getElementById("briefsSources"),
    hero: document.querySelector(".hero"),
    langBtns: document.querySelectorAll("[data-lang]"),
    viewBtns: document.querySelectorAll("[data-view]"),
    i18n: document.querySelectorAll("[data-i18n]"),
    filtersToggle: document.getElementById("filtersToggle"),
    filtersPanel: document.getElementById("filtersPanel"),
    filtersCount: document.getElementById("filtersCount"),
    filtersToolbar: document.getElementById("filtersToolbar"),
  };

  const i18n = {
    zh: {
      subtitle: "面試取向時事／政策資料庫（公開政府來源）",
      heroTitle: "搜尋近期香港政策動向",
      heroLede: "關鍵字搜尋、政策局／署過濾、主題標籤、摘要與面試角度——素材來自 info.gov.hk 等公開公報，非任何收費資料庫內容。",
      heroTitleBriefs: "中文 Q2 政策題庫",
      heroLedeBriefs: "搜尋主題、考試式題目、立場或必記事實。點開卡片展開完整練筆包（利弊→立場→措施→事實）。",
      disclaimer: "免責：本工具僅供面試備試參考。摘要與面試角度為原創整理，請以原文公報為準。與 CS Radar 無關，亦未使用其付費內容。",
      searchPh: "搜尋標題、摘要、部門、主題…",
      searchPhBriefs: "搜尋題庫主題、題目、立場、事實…",
      clear: "清除",
      depts: "政策局／部門",
      themes: "政策主題",
      results: "結果",
      sortLabel: "排序",
      newest: "最新優先",
      oldest: "最舊優先",
      angles: "面試角度／提問",
      source: "原文連結",
      browse: "瀏覽",
      briefs: "題庫",
      digest: "每周摘要",
      digestTitle: "近14天按部門／局別整理",
      digestLede: "將最近兩周的政策項目按部門分組，方便快速複習。",
      briefsTitle: "中文 Q2 政策題庫",
      briefsLede: "十個主題練筆包：考試式題目 → 利弊 → 建議立場 → 措施 → 必記事實。點開主題即可展開全文。",
      briefsCount: "題庫",
      prompt: "考試式題目",
      pros: "利",
      cons: "弊",
      stance: "建議立場",
      measures: "措施／替代",
      facts: "必記事實",
      factLink: "來源",
      quickRef: "速查表（練筆前 30 秒）",
      mainSources: "主要來源",
      empty: "沒有符合條件的項目。試試清空篩選或換關鍵字。",
      loadError: "無法載入 data/policies.json。請用本地伺服器開啟（見 README），勿直接用 file:// 若瀏覽器封鎖 fetch。",
      briefsLoadError: "無法載入 data/briefs.json。",
      items: "項",
      all: "全部",
      filtersToggle: "篩選部門／主題",
    },
    en: {
      subtitle: "Interview-oriented HK policy bank (public sources)",
      heroTitle: "Search recent Hong Kong policy developments",
      heroLede: "Keyword search, bureau filters, theme chips, summaries and interview angles — from public info.gov.hk releases, not any paid database.",
      heroTitleBriefs: "Chinese Q2 policy briefs",
      heroLedeBriefs: "Search themes, exam prompts, stance, or must-know facts. Tap a card to expand the full drill pack.",
      disclaimer: "Disclaimer: For interview prep only. Summaries and angles are original notes; rely on the official release. Not affiliated with CS Radar; no paid content used.",
      searchPh: "Search title, summary, departments, themes…",
      searchPhBriefs: "Search brief themes, prompts, stance, facts…",
      clear: "Clear",
      depts: "Bureaux / departments",
      themes: "Policy themes",
      results: "Results",
      sortLabel: "Sort",
      newest: "Newest first",
      oldest: "Oldest first",
      angles: "Interview angles / questions",
      source: "Source link",
      browse: "Browse",
      briefs: "Briefs",
      digest: "Weekly digest",
      digestTitle: "Last 14 days by department",
      digestLede: "Recent items grouped by bureau/department for quick revision.",
      briefsTitle: "Chinese Q2 policy briefs",
      briefsLede: "Ten theme packs: exam prompt → pros/cons → stance → measures → must-know facts. Tap to expand.",
      briefsCount: "Briefs",
      prompt: "Exam-style prompt",
      pros: "Pros",
      cons: "Cons",
      stance: "Suggested stance",
      measures: "Measures / alternatives",
      facts: "Must-know facts",
      factLink: "Source",
      quickRef: "Quick reference (30s before writing)",
      mainSources: "Key sources",
      empty: "No matching items. Clear filters or try another keyword.",
      loadError: "Could not load data/policies.json. Serve via a local server (see README); file:// may block fetch.",
      briefsLoadError: "Could not load data/briefs.json.",
      items: "items",
      all: "All",
      filtersToggle: "Filter bureaux / themes",
    },
  };

  function t(key) {
    return i18n[state.lang][key] || key;
  }

  function applyI18n() {
    el.i18n.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });
    const heroTitle = document.querySelector('[data-i18n="heroTitle"]');
    const heroLede = document.querySelector('[data-i18n="heroLede"]');
    if (state.view === "briefs") {
      if (heroTitle) heroTitle.textContent = t("heroTitleBriefs");
      if (heroLede) heroLede.textContent = t("heroLedeBriefs");
      el.search.placeholder = t("searchPhBriefs");
    } else {
      el.search.placeholder = t("searchPh");
    }
    el.langBtns.forEach((b) => b.classList.toggle("active", b.dataset.lang === state.lang));
    el.viewBtns.forEach((b) => b.classList.toggle("active", b.dataset.view === state.view));
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    if (el.hero) el.hero.classList.toggle("briefs-mode", state.view === "briefs");
  }

  function deptLabel(id) {
    const d = state.data.departments.find((x) => x.id === id);
    if (!d) return id;
    return state.lang === "zh" ? d.zh : d.en;
  }

  function themeLabel(id) {
    const th = state.data.themes.find((x) => x.id === id);
    if (!th) return id;
    return state.lang === "zh" ? th.zh : th.en;
  }

  function itemTitle(item) {
    if (state.lang === "en" && item.title_en) return item.title_en;
    return item.title;
  }

  function buildChips() {
    const mk = (container, list, set) => {
      container.innerHTML = "";
      const all = document.createElement("button");
      all.type = "button";
      all.className = "chip" + (set.size === 0 ? " active" : "");
      all.textContent = t("all");
      all.addEventListener("click", () => {
        set.clear();
        buildChips();
        render();
      });
      container.appendChild(all);

      list.forEach((entry) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip" + (set.has(entry.id) ? " active" : "");
        btn.textContent = state.lang === "zh" ? entry.zh : entry.en;
        btn.addEventListener("click", () => {
          if (set.has(entry.id)) set.delete(entry.id);
          else set.add(entry.id);
          buildChips();
          render();
        });
        container.appendChild(btn);
      });
    };
    mk(el.deptChips, state.data.departments, state.departments);
    mk(el.themeChips, state.data.themes, state.themes);
    updateFiltersUi();
  }

  function updateFiltersUi() {
    if (!el.filtersToggle || !el.filtersPanel) return;
    el.filtersToggle.setAttribute("aria-expanded", state.filtersOpen ? "true" : "false");
    el.filtersPanel.hidden = !state.filtersOpen;
    const n = state.departments.size + state.themes.size;
    if (n > 0) {
      el.filtersCount.hidden = false;
      el.filtersCount.textContent = String(n);
    } else {
      el.filtersCount.hidden = true;
      el.filtersCount.textContent = "";
    }
  }

  function matches(item) {
    const q = state.query.trim().toLowerCase();
    if (state.departments.size) {
      const ok = item.departments.some((d) => state.departments.has(d));
      if (!ok) return false;
    }
    if (state.themes.size) {
      const ok = item.themes.some((th) => state.themes.has(th));
      if (!ok) return false;
    }
    if (!q) return true;
    const hay = [
      item.title,
      item.title_en || "",
      item.summary,
      ...(item.interview_angles || []),
      ...item.departments.map(deptLabel),
      ...item.themes.map(themeLabel),
      item.source_name || "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function filtered() {
    let items = state.data.items.filter(matches);
    items.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return state.sort === "newest" ? -cmp : cmp;
    });
    return items;
  }

  function briefMatches(brief) {
    const q = state.query.trim().toLowerCase();
    if (!q) return true;
    const factText = (brief.facts || []).map((f) => f.text).join(" ");
    const hay = [
      brief.title_zh,
      brief.title_en,
      brief.heading || "",
      brief.prompt,
      brief.stance,
      ...(brief.pros || []),
      ...(brief.cons || []),
      ...(brief.stance_points || []),
      ...(brief.measures || []),
      factText,
      ...(brief.theme_ids || []).map(themeLabel),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function filteredBriefs() {
    if (!state.briefsData) return [];
    return state.briefsData.briefs.filter(briefMatches);
  }

  function renderCards(items) {
    el.cards.innerHTML = "";
    if (!items.length) {
      el.cards.innerHTML = `<div class="empty">${t("empty")}</div>`;
      return;
    }
    const frag = document.createDocumentFragment();
    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";
      const titleEn =
        state.lang === "zh" && item.title_en
          ? `<div class="title-en">${escapeHtml(item.title_en)}</div>`
          : state.lang === "en" && item.title && item.title_en
            ? `<div class="title-en">${escapeHtml(item.title)}</div>`
            : "";
      const deptTags = item.departments
        .map((d) => `<span class="tag">${escapeHtml(deptLabel(d))}</span>`)
        .join("");
      const themeTags = item.themes
        .map((th) => `<span class="tag theme">${escapeHtml(themeLabel(th))}</span>`)
        .join("");
      const angles = (item.interview_angles || [])
        .map((a) => `<li>${escapeHtml(a)}</li>`)
        .join("");
      card.innerHTML = `
        <div class="card-top">
          <span class="date-badge">${escapeHtml(item.date)}</span>
        </div>
        <h3>${escapeHtml(itemTitle(item))}</h3>
        ${titleEn}
        <div class="meta-tags">${deptTags}${themeTags}</div>
        <p class="summary">${escapeHtml(item.summary)}</p>
        <div class="angles">
          <h4>${t("angles")}</h4>
          <ol>${angles}</ol>
        </div>
        <div class="card-foot">
          <a class="source-link" href="${escapeAttr(item.source_url)}" target="_blank" rel="noopener noreferrer">${t("source")} ↗</a>
          <span class="source-name">${escapeHtml(item.source_name || "")}</span>
        </div>`;
      frag.appendChild(card);
    });
    el.cards.appendChild(frag);
  }

  function listHtml(items, ordered) {
    if (!items || !items.length) return "";
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</${tag}>`;
  }

  function renderBriefs() {
    const briefs = filteredBriefs();
    el.briefsCount.textContent = `${t("briefsCount")}: ${briefs.length}`;
    el.briefsList.innerHTML = "";
    if (!briefs.length) {
      el.briefsList.innerHTML = `<div class="empty">${t("empty")}</div>`;
      el.quickRef.hidden = true;
      el.briefsSources.hidden = true;
      return;
    }

    const frag = document.createDocumentFragment();
    briefs.forEach((brief) => {
      const open = state.openBriefs.has(brief.id);
      const card = document.createElement("article");
      card.className = "brief-card" + (open ? " open" : "");
      card.dataset.id = brief.id;

      const title = state.lang === "zh" ? brief.title_zh : brief.title_en;
      const subtitle = state.lang === "zh" ? brief.title_en : brief.title_zh;
      const tags = (brief.theme_ids || [])
        .map((th) => `<span class="tag theme">${escapeHtml(themeLabel(th))}</span>`)
        .join("");

      const facts = (brief.facts || [])
        .map((f) => {
          const link = f.url
            ? `<br><a href="${escapeAttr(f.url)}" target="_blank" rel="noopener noreferrer">${t("factLink")} ↗</a>`
            : "";
          return `<li>${escapeHtml(f.text)}${link}</li>`;
        })
        .join("");

      card.innerHTML = `
        <button type="button" class="brief-summary" aria-expanded="${open ? "true" : "false"}">
          <span class="brief-num">${brief.n}</span>
          <span class="brief-summary-text">
            <h3>${escapeHtml(title)}</h3>
            <div class="brief-en">${escapeHtml(subtitle)}</div>
            <p class="brief-stance-one">${escapeHtml(brief.stance || "")}</p>
            <div class="brief-tags">${tags}</div>
          </span>
          <span class="brief-chev" aria-hidden="true">▾</span>
        </button>
        <div class="brief-body">
          <div class="brief-section">
            <h4>${t("prompt")}</h4>
            <p class="brief-prompt">${escapeHtml(brief.prompt)}</p>
          </div>
          <div class="brief-section pros">
            <h4>${t("pros")}</h4>
            ${listHtml(brief.pros, false)}
          </div>
          <div class="brief-section cons">
            <h4>${t("cons")}</h4>
            ${listHtml(brief.cons, false)}
          </div>
          <div class="brief-section stance">
            <h4>${t("stance")}</h4>
            <p class="brief-stance-label">${escapeHtml(brief.stance || "")}</p>
            ${listHtml(brief.stance_points, true)}
          </div>
          <div class="brief-section">
            <h4>${t("measures")}</h4>
            ${listHtml(brief.measures, true)}
          </div>
          <div class="brief-section">
            <h4>${t("facts")}</h4>
            <ul class="facts-list">${facts}</ul>
          </div>
        </div>`;

      card.querySelector(".brief-summary").addEventListener("click", () => {
        if (state.openBriefs.has(brief.id)) state.openBriefs.delete(brief.id);
        else state.openBriefs.add(brief.id);
        renderBriefs();
      });
      frag.appendChild(card);
    });
    el.briefsList.appendChild(frag);

    // Quick ref + sources (show when no search filter, or always)
    const qr = state.briefsData.quick_ref || [];
    if (qr.length && !state.query.trim()) {
      el.quickRef.hidden = false;
      el.quickRef.innerHTML = `
        <h3>${t("quickRef")}</h3>
        <table>
          <thead><tr><th>#</th><th>${state.lang === "zh" ? "主題" : "Theme"}</th><th>${state.lang === "zh" ? "一句立場" : "Stance"}</th></tr></thead>
          <tbody>
            ${qr
              .map(
                (r) =>
                  `<tr><td>${r.n}</td><td>${escapeHtml(r.theme)}</td><td>${escapeHtml(r.stance_one_liner)}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>`;
    } else {
      el.quickRef.hidden = true;
      el.quickRef.innerHTML = "";
    }

    const sources = state.briefsData.sources || [];
    if (sources.length && !state.query.trim()) {
      el.briefsSources.hidden = false;
      el.briefsSources.innerHTML = `
        <h3>${t("mainSources")}</h3>
        <ul>
          ${sources
            .map(
              (s) =>
                `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`
            )
            .join("")}
        </ul>`;
    } else {
      el.briefsSources.hidden = true;
      el.briefsSources.innerHTML = "";
    }
  }

  function renderDigest() {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 14);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    const recent = state.data.items
      .filter((i) => i.date >= cutoffStr)
      .sort((a, b) => b.date.localeCompare(a.date));

    const byDept = new Map();
    recent.forEach((item) => {
      item.departments.forEach((d) => {
        if (!byDept.has(d)) byDept.set(d, []);
        byDept.get(d).push(item);
      });
    });

    const ordered = [...byDept.entries()].sort((a, b) => b[1].length - a[1].length);
    if (!ordered.length) {
      el.digestBody.innerHTML = `<div class="empty">${t("empty")}</div>`;
      return;
    }

    el.digestBody.innerHTML = ordered
      .map(([deptId, items]) => {
        const unique = [];
        const seen = new Set();
        items.forEach((it) => {
          if (!seen.has(it.id)) {
            seen.add(it.id);
            unique.push(it);
          }
        });
        const lis = unique
          .map(
            (it) => `<li>
              <div class="d-date">${escapeHtml(it.date)}</div>
              <a href="${escapeAttr(it.source_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(itemTitle(it))}</a>
              <p class="d-summary">${escapeHtml(it.summary.slice(0, 140))}${it.summary.length > 140 ? "…" : ""}</p>
            </li>`
          )
          .join("");
        return `<section class="digest-group">
          <h3>${escapeHtml(deptLabel(deptId))} · ${unique.length}</h3>
          <ul class="digest-list">${lis}</ul>
        </section>`;
      })
      .join("");
  }

  function render() {
    applyI18n();
    el.browse.classList.add("hidden");
    el.browse.hidden = true;
    el.digest.classList.remove("visible");
    el.briefs.hidden = true;

    if (state.view === "browse") {
      el.browse.classList.remove("hidden");
      el.browse.hidden = false;
      const items = filtered();
      el.count.textContent = `${t("results")}: ${items.length} ${t("items")}`;
      renderCards(items);
    } else if (state.view === "briefs") {
      el.briefs.hidden = false;
      if (!state.briefsData) {
        el.briefsList.innerHTML = `<div class="error">${t("briefsLoadError")}</div>`;
      } else {
        renderBriefs();
      }
    } else {
      el.digest.classList.add("visible");
      renderDigest();
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  async function init() {
    applyI18n();
    el.langBtns.forEach((b) =>
      b.addEventListener("click", () => {
        state.lang = b.dataset.lang;
        localStorage.setItem("jre-lang", state.lang);
        if (state.data) buildChips();
        render();
      })
    );
    el.viewBtns.forEach((b) =>
      b.addEventListener("click", () => {
        state.view = b.dataset.view;
        render();
      })
    );
    el.search.addEventListener("input", () => {
      state.query = el.search.value;
      render();
    });
    el.clear.addEventListener("click", () => {
      el.search.value = "";
      state.query = "";
      render();
    });
    el.sort.addEventListener("change", () => {
      state.sort = el.sort.value;
      render();
    });
    if (el.filtersToggle) {
      el.filtersToggle.addEventListener("click", () => {
        state.filtersOpen = !state.filtersOpen;
        localStorage.setItem("jre-filters-open", state.filtersOpen ? "1" : "0");
        updateFiltersUi();
      });
      updateFiltersUi();
    }

    try {
      const [polRes, briefRes] = await Promise.all([
        fetch("data/policies.json", { cache: "no-store" }),
        fetch("data/briefs.json", { cache: "no-store" }),
      ]);
      if (!polRes.ok) throw new Error("policies " + polRes.status);
      state.data = await polRes.json();
      if (briefRes.ok) {
        state.briefsData = await briefRes.json();
      } else {
        state.briefsData = null;
        console.warn("briefs.json missing", briefRes.status);
      }
      buildChips();
      render();
    } catch (err) {
      el.cards.innerHTML = `<div class="error">${t("loadError")}<br><small>${escapeHtml(String(err))}</small></div>`;
      el.browse.classList.remove("hidden");
      el.browse.hidden = false;
    }
  }

  init();
})();
