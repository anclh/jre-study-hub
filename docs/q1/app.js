(function () {
  "use strict";

  const CAT_LABELS = {
    all: "全部",
    implications: "影響／後果",
    assessment: "評估／分析",
    recommend: "建議措施",
    monitor: "監察／檢討",
    specificity: "負責方／時限／資源",
    discourse: "論述銜接",
  };


  const state = {
    q1: { disclaimer: "", categories: [], items: [] },
    category: "all",
    modelOpen: false,
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 1600);
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }


  function renderFilters() {
    const cats = ["all", ...(state.q1.categories || []).map((c) => c.id)];
    const wrap = $("#q1Filters");
    if (!wrap) return;
    wrap.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" data-cat="${c}" class="${state.category === c ? "active" : ""}">${CAT_LABELS[c] || c}</button>`
      )
      .join("");
    $$("button", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.cat;
        renderFilters();
        renderPhrases();
      });
    });
  }

  function phraseHTML(item) {
    return `<article class="phrase-card">
      <div class="meta"><span class="cat-pill">${escapeHtml(CAT_LABELS[item.category] || item.category)}</span></div>
      <p class="en">${escapeHtml(item.en)}</p>
      <p class="zh">${escapeHtml(item.zh || "")}</p>
      ${item.note ? `<div class="meta">${escapeHtml(item.note)}</div>` : ""}
      ${item.example ? `<p class="ex">${escapeHtml(item.example)}</p>` : ""}
      <button type="button" class="btn btn-copy" data-en="${escapeHtml(item.en)}" data-zh="${escapeHtml(item.zh || "")}">複製句式</button>
    </article>`;
  }

  function renderPhrases() {
    const q = ($("#q1Search")?.value || "").trim().toLowerCase();
    let list = state.q1.items || [];
    if (state.category !== "all") list = list.filter((i) => i.category === state.category);
    if (q) {
      list = list.filter((i) =>
        `${i.en} ${i.zh} ${i.category} ${i.note || ""} ${i.example || ""}`.toLowerCase().includes(q)
      );
    }
    const count = $("#q1Count");
    if (count) count.textContent = `${list.length} 句`;
    const disc = $("#q1Disclaimer");
    if (disc) disc.textContent = state.q1.disclaimer || "";
    const grid = $("#q1Grid");
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="empty">沒有符合的句式。</div>`;
      return;
    }
    grid.innerHTML = list.map(phraseHTML).join("");
    $$(".btn-copy", grid).forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = `${btn.dataset.en}\n${btn.dataset.zh || ""}`.trim();
        try {
          await navigator.clipboard.writeText(text);
          toast("已複製句式");
        } catch {
          toast("複製失敗 — 請手動選取");
        }
      });
    });
  }


  function renderDoc(doc) {
    let body = "";
    if (doc.paras) {
      body += doc.paras.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
    }
    if (doc.table) {
      const hi = doc.table.highlightCol;
      const head = doc.table.headers
        .map((h) => `<th>${escapeHtml(h)}</th>`)
        .join("");
      const rows = doc.table.rows
        .map(
          (r) =>
            `<tr>${r
              .map(
                (c, i) =>
                  `<td class="${i === hi ? "hi" : ""}">${escapeHtml(c)}</td>`
              )
              .join("")}</tr>`
        )
        .join("");
      body += `<div class="table-wrap"><table class="doc-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    if (doc.quote) {
      body += `<blockquote class="doc-quote">${doc.quote
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join("")}</blockquote>`;
    }
    if (doc.bullets) {
      body += `<ul class="doc-bullets">${doc.bullets
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("")}</ul>`;
    }
    if (doc.options) {
      body += doc.options
        .map(
          (o) =>
            `<div class="option-block"><p class="opt-name">${escapeHtml(o.name)}</p><p class="opt-text">${escapeHtml(o.text)}</p></div>`
        )
        .join("");
    }
    if (doc.closing) {
      body += `<p class="doc-closing">${escapeHtml(doc.closing)}</p>`;
    }
    return `<article class="card doc-card">
      <span class="doc-label">Doc ${escapeHtml(doc.id)}</span>
      <h3>${escapeHtml(doc.title)}</h3>
      ${body}
    </article>`;
  }

  function renderCase() {
    const root = $("#caseRoot");
    const pack = window.Q1_CASE_PACK;
    if (!root) return;
    if (!pack) {
      root.innerHTML = `<div class="empty">未能載入 Data File 練習（data/heat-island.js）。</div>`;
      return;
    }

    const task = pack.task || {};
    const model = pack.model || {};
    const learn = pack.learnPoints || [];

    const taskHtml = `<div class="card">
      <h2>TASK</h2>
      <p>${escapeHtml(task.role || "")}</p>
      <p class="muted" style="margin-bottom:6px">Using only the Data File below, you should:</p>
      <ol class="task-bullets">
        ${(task.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
      </ol>
      <p class="doc-closing">${escapeHtml(task.note || "")}</p>
    </div>`;

    const docsHtml = (pack.docs || []).map(renderDoc).join("");

    const learnHtml = `<div class="card">
      <h2>學習重點（睇範例時注意）</h2>
      <ul class="learn-list">
        ${learn
          .map((b) => {
            const m = String(b).match(/^\*\*(.+?)\*\*(.*)$/);
            if (m) return `<li><strong>${escapeHtml(m[1])}</strong>${escapeHtml(m[2])}</li>`;
            return `<li>${escapeHtml(b)}</li>`;
          })
          .join("")}
      </ul>
    </div>`;

    const modelSections = (model.sections || [])
      .map(
        (s) =>
          `<div class="model-section"><h4>${escapeHtml(s.h)}</h4>${s.html}</div>`
      )
      .join("");

    const modelHtml = `<div class="card">
      <h2>範例 memo</h2>
      <p class="lede">約 850 字。自己寫完先開。</p>
      <div class="toolbar">
        <button type="button" class="btn primary" id="btnToggleModel">顯示範例</button>
      </div>
      <div class="model-wrap" id="modelWrap" hidden>
        <div class="model-meta">
          <div><strong>To:</strong> ${escapeHtml(model.to || "")}</div>
          <div><strong>From:</strong> ${escapeHtml(model.from || "")}</div>
          <div><strong>Subject:</strong> ${escapeHtml(model.subject || "")}</div>
          <div><strong>Date:</strong> ${escapeHtml(model.date || "")}</div>
        </div>
        ${modelSections}
      </div>
    </div>`;

    root.innerHTML = `
      <div class="card case-hero">
        <h2>${escapeHtml(pack.title)}</h2>
        <p class="sub">${escapeHtml(pack.titleZh || "")}</p>
        <p class="lede" style="margin:0">${escapeHtml(pack.tip || "")}</p>
        <div class="chip-row" style="margin-top:10px">
          <span class="chip">500–800 words</span>
          <span class="chip">≤15 min Data File</span>
          <span class="chip">Docs A–G</span>
        </div>
      </div>
      ${taskHtml}
      <div class="card" style="padding-bottom:8px">
        <h2>DATA FILE</h2>
        <p class="muted" style="margin:0">Sort → highlight quotable numbers → outline。唔好抄長段 background。</p>
      </div>
      ${docsHtml}
      ${learnHtml}
      ${modelHtml}
    `;

    const btn = $("#btnToggleModel");
    const wrap = $("#modelWrap");
    if (btn && wrap) {
      state.modelOpen = false;
      btn.addEventListener("click", () => {
        state.modelOpen = !state.modelOpen;
        wrap.hidden = !state.modelOpen;
        btn.textContent = state.modelOpen ? "隱藏範例" : "顯示範例";
      });
    }
  }

  async function loadPhrases() {
    try {
      const res = await fetch("../vocab/data/q1_phrases.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      state.q1 = {
        disclaimer: data.disclaimer || "",
        categories: data.categories || [],
        items: data.items || [],
      };
      renderFilters();
      renderPhrases();
    } catch (e) {
      console.warn(e);
      const grid = $("#q1Grid");
      if (grid) grid.innerHTML = `<div class="empty">未能載入 Q1 句式庫（../vocab/data/q1_phrases.json）。</div>`;
    }
  }

  function initNav() {
    $$("#subnav button").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("#subnav button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        $$(".panel").forEach((p) => p.classList.remove("active"));
        const panel = $(`#panel-${btn.dataset.panel}`);
        if (panel) panel.classList.add("active");
      });
    });
  }

  function init() {
    initNav();
    renderCase();
    const search = $("#q1Search");
    if (search) search.addEventListener("input", renderPhrases);
    loadPhrases();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
