(function () {
  "use strict";

  const STORAGE_MARKS = "jre-q1-marks-v1";
  const STORAGE_ANSWER = "jre-q1-answer-v1";

  const CAT_LABELS = {
    all: "全部",
    opening: "開場",
    implications: "影響／後果",
    assessment: "評估／分析",
    comparison: "方案比較",
    recommend: "建議措施",
    monitor: "監察／檢討",
    specificity: "負責方／時限／資源",
    discourse: "論述銜接",
    balance: "平衡／條件",
  };


  const state = {
    q1: { disclaimer: "", categories: [], items: [] },
    category: "all",
    // hub = q1 + common + untagged; pure q2 only under「全部」
    paper: "hub",
    modelOpen: false,
    caseId: null,
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

  const PAPER_CHIPS = [
    { id: "all", label: "全部" },
    { id: "q1", label: "Q1" },
    { id: "common", label: "常用" },
  ];

  function matchesPaper(item, filter) {
    const p = item.paper || "";
    if (filter === "all") return true;
    if (filter === "q1") return p === "q1" || p === "";
    if (filter === "common") return p === "common";
    return p === "q1" || p === "common" || p === "";
  }

  function paperLabel(p) {
    if (p === "q1") return "Q1";
    if (p === "common") return "常用";
    if (p === "q2") return "Q2";
    return "";
  }

  function renderPaperFilters() {
    const wrap = $("#q1PaperFilters");
    if (!wrap) return;
    wrap.innerHTML = PAPER_CHIPS.map(
      (c) =>
        `<button type="button" data-paper="${c.id}" class="${state.paper === c.id ? "active" : ""}">${c.label}</button>`
    ).join("");
    $$("button", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.paper;
        state.paper = state.paper === next ? "hub" : next;
        renderPaperFilters();
        renderPhrases();
      });
    });
  }

  function phraseHTML(item) {
    const paper = paperLabel(item.paper);
    return `<article class="phrase-card">
      <div class="meta"><span class="cat-pill">${escapeHtml(CAT_LABELS[item.category] || item.category)}</span>${paper ? ` <span class="cat-pill">${escapeHtml(paper)}</span>` : ""}</div>
      <p class="en">${escapeHtml(item.en)}</p>
      <p class="zh">${escapeHtml(item.zh || "")}</p>
      ${item.note ? `<div class="meta">${escapeHtml(item.note)}</div>` : ""}
      ${item.example ? `<p class="ex">${escapeHtml(item.example)}</p>` : ""}
      <button type="button" class="btn btn-copy" data-en="${escapeHtml(item.en)}" data-zh="${escapeHtml(item.zh || "")}">複製句式</button>
    </article>`;
  }

  function renderPhrases() {
    const q = ($("#q1Search")?.value || "").trim().toLowerCase();
    let list = (state.q1.items || []).filter((i) => matchesPaper(i, state.paper));
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

  function getCasePacks() {
    return Array.isArray(window.Q1_CASE_PACKS) ? window.Q1_CASE_PACKS : [];
  }

  function getActivePack() {
    const packs = getCasePacks();
    if (!packs.length) return null;
    if (!state.caseId || !packs.some((p) => p.id === state.caseId)) {
      state.caseId = packs[0].id;
    }
    return packs.find((p) => p.id === state.caseId) || packs[0];
  }

  function renderCase() {
    const root = $("#caseRoot");
    const packs = getCasePacks();
    const pack = getActivePack();
    if (!root) return;
    if (!pack) {
      root.innerHTML = `<div class="empty">未能載入 Data File 練習（data/*.js）。</div>`;
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
        <div class="toolbar" style="margin-bottom:8px">
          <label class="select-wrap">題目
            <select id="caseSelect">${packs.map((p) => `<option value="${escapeHtml(p.id)}" ${p.id === pack.id ? "selected" : ""}>${escapeHtml(p.titleZh || p.title)}</option>`).join("")}</select>
          </label>
        </div>
        <h2>${escapeHtml(pack.title)}</h2>
        <p class="sub">${escapeHtml(pack.titleZh || "")}</p>
        <p class="lede" style="margin:0">${escapeHtml(pack.tip || "")}</p>
        <div class="chip-row" style="margin-top:10px">
          <span class="chip">500–800 words</span>
          <span class="chip">${(pack.docs || []).length} docs</span>
          <span class="chip">左 DF · 右作答</span>
        </div>
      </div>
      ${taskHtml}
      <div class="practice-split">
        <div class="practice-pane practice-pane-df">
          <div class="card practice-pane-head" style="padding-bottom:8px">
            <h2>DATA FILE</h2>
            <p class="muted" style="margin:0">Sort → highlight → outline。唔好抄長段 background。</p>
          </div>
          <div class="practice-pane-scroll">
            ${docsHtml}
          </div>
        </div>
        <div class="practice-pane practice-pane-write">
          <div class="card practice-write-card">
            <h2>作答</h2>
            <p class="lede">空白格寫 memo。答卷存呢部裝置；寫完先睇下面範例。</p>
            <div class="timer-row">
              <div class="timer" id="timerDisplay">70:00</div>
              <div class="toolbar">
                <button type="button" class="btn primary" id="btnStart70">70 分</button>
                <button type="button" class="btn" id="btnStart90">90 分</button>
                <button type="button" class="btn" id="btnPause">暫停</button>
                <button type="button" class="btn" id="btnReset">重設</button>
              </div>
            </div>
            <label class="sr-only" for="answer">答卷</label>
            <textarea id="answer" placeholder="Opening → P1／P2 + implications → Options + objections → Recommend (who／when／KPI)"></textarea>
            <div class="toolbar">
              <button type="button" class="btn" id="btnCopyAnswer">複製答卷</button>
              <button type="button" class="btn" id="btnGoMark">去自評</button>
              <span class="count" id="wordCount">0 words</span>
            </div>
          </div>
        </div>
      </div>
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
    const sel = $("#caseSelect");
    if (sel) {
      sel.onchange = () => {
        state.caseId = sel.value;
        stopPracticeTick();
        practiceRemain = 70 * 60;
        renderCase();
        toast("已換題");
      };
    }
    initPractice();
  }

  async function loadPhrases() {
    try {
      const res = await fetch("../vocab/data/q1_phrases.json?v=20261028b", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      state.q1 = {
        disclaimer: data.disclaimer || "",
        categories: data.categories || [],
        items: data.items || [],
      };
      renderPaperFilters();
      renderFilters();
      renderPhrases();
    } catch (e) {
      console.warn(e);
      const grid = $("#q1Grid");
      if (grid) grid.innerHTML = `<div class="empty">未能載入 Q1 句式庫（../vocab/data/q1_phrases.json）。</div>`;
    }
  }



  let practiceRemain = 70 * 60;
  let practiceTick = null;

  function paintPracticeTimer() {
    const display = $("#timerDisplay");
    if (!display) return;
    const m = Math.floor(Math.max(0, practiceRemain) / 60);
    const s = Math.max(0, practiceRemain) % 60;
    display.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    display.classList.toggle("warn", practiceRemain <= 10 * 60 && practiceRemain > 5 * 60);
    display.classList.toggle("danger", practiceRemain <= 5 * 60);
  }

  function stopPracticeTick() {
    if (practiceTick) clearInterval(practiceTick);
    practiceTick = null;
  }

  function startPracticeTimer(mins) {
    stopPracticeTick();
    practiceRemain = mins * 60;
    paintPracticeTimer();
    practiceTick = setInterval(() => {
      practiceRemain -= 1;
      paintPracticeTimer();
      if (practiceRemain <= 0) {
        stopPracticeTick();
        toast("時間到 — 去自評清單打勾");
      }
    }, 1000);
  }

  function countWords(t) {
    const s = (t || "").trim();
    if (!s) return 0;
    return s.split(/\s+/).filter(Boolean).length;
  }

  function initPractice() {
    const answer = $("#answer");
    const countEl = $("#wordCount");
    if (!answer || !countEl) return;

    answer.value = localStorage.getItem(STORAGE_ANSWER) || "";
    function syncCount() {
      countEl.textContent = `${countWords(answer.value)} words`;
    }
    answer.oninput = () => {
      localStorage.setItem(STORAGE_ANSWER, answer.value);
      syncCount();
    };
    syncCount();

    paintPracticeTimer();
    $("#btnStart70")?.addEventListener("click", () => startPracticeTimer(70));
    $("#btnStart90")?.addEventListener("click", () => startPracticeTimer(90));
    $("#btnPause")?.addEventListener("click", () => {
      if (practiceTick) {
        stopPracticeTick();
        toast("已暫停");
      } else if (practiceRemain > 0) {
        practiceTick = setInterval(() => {
          practiceRemain -= 1;
          paintPracticeTimer();
          if (practiceRemain <= 0) {
            stopPracticeTick();
            toast("時間到");
          }
        }, 1000);
        toast("繼續");
      }
    });
    $("#btnReset")?.addEventListener("click", () => {
      stopPracticeTick();
      practiceRemain = 70 * 60;
      paintPracticeTimer();
    });
    $("#btnCopyAnswer")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(answer.value);
        toast("已複製答卷");
      } catch {
        toast("複製失敗");
      }
    });
    $("#btnGoMark")?.addEventListener("click", () => {
      const markBtn = $$("#subnav button").find((b) => b.dataset.panel === "mark");
      markBtn?.click();
    });
  }

  function initMarks() {
    const checks = [...document.querySelectorAll("#checklist input")];
    const scoreEl = $("#markScore");
    if (!checks.length || !scoreEl) return;
    function loadMarks() {
      let saved = {};
      try {
        saved = JSON.parse(localStorage.getItem(STORAGE_MARKS) || "{}");
      } catch {}
      checks.forEach((c) => {
        c.checked = !!saved[c.dataset.k];
      });
      scoreEl.textContent = `${checks.filter((c) => c.checked).length} / ${checks.length}`;
    }
    function saveMarks() {
      const o = {};
      checks.forEach((c) => {
        o[c.dataset.k] = c.checked;
      });
      localStorage.setItem(STORAGE_MARKS, JSON.stringify(o));
      scoreEl.textContent = `${checks.filter((c) => c.checked).length} / ${checks.length}`;
    }
    checks.forEach((c) => c.addEventListener("change", saveMarks));
    $("#btnClearMarks")?.addEventListener("click", () => {
      checks.forEach((c) => {
        c.checked = false;
      });
      saveMarks();
    });
    loadMarks();
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
    initMarks();
    renderCase();
    const search = $("#q1Search");
    if (search) search.addEventListener("input", renderPhrases);
    loadPhrases();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
