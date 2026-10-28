(() => {
  const STORAGE_ANSWER = "jre-q2-answer-v1";
  const STORAGE_MARKS = "jre-q2-marks-v1";
  const STORAGE_DRILL = "jre-q2-drill-id-v1";

  const THEME_ZH = {
    "culture-tourism": "文化旅遊",
    education: "教育",
    "elderly-care": "安老與照顧",
    "environment-climate": "環境與氣候",
    healthcare: "醫療衞生",
    "housing-land": "房屋與土地",
    innovation: "創科與產業",
    labour: "勞工保障",
    "national-development": "國家發展與大灣區",
    "northern-metropolis": "北部都會區",
    "poverty-welfare": "扶貧與福利",
    "transport-logistics": "運輸與物流",
    youth: "青年發展",
  };

  const DAI_PAI_DONG = {
    id: "sample-daipaidong",
    title_zh: "官方 sample · 大牌檔",
    prompt:
      "近年有意見認為，政府應加強規管街頭大牌檔／流動小販，以改善衛生、消防及市容；亦有人認為大牌檔是香港飲食文化一部分，應予保留甚至推廣，以鞏固「美食天堂」形象。\n\n請分析有關建議的利與弊，表明你是否支持加強規管，並提出具體措施或替代方法，以達致相關政策目標。",
    pros: [
      "加強衛生、消防及通道管理，減低公眾安全風險。",
      "劃一規管有助公平競爭，減少滋擾居民與商戶的投訴。",
      "市容改善或有利旅遊形象的「質感」。",
    ],
    cons: [
      "一刀切取締削弱街头飲食特色與基層生計。",
      "過度規管可能推高價格、減少平民美食選擇。",
      "執法成本高；若無配套安置，問題只會轉移。",
    ],
    measures: [
      "持牌＋指定區／時段經營；消防、排污、垃圾最低標準。",
      "試點「美食車／夜市專區」，用 KPI（投訴、衛生抽查、旅客評價）檢討。",
      "輔導轉型或安置檔位，保留代表性菜式作文化推廣。",
    ],
  };

  const $ = (sel) => document.querySelector(sel);
  const toast = (msg) => {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 1600);
  };

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
  function listHtml(items, ordered) {
    if (!items || !items.length) return "";
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</${tag}>`;
  }
  function themeLabel(id) {
    return THEME_ZH[id] || id;
  }

  function showPanel(name) {
    document.querySelectorAll("#subnav button").forEach((b) => {
      b.classList.toggle("active", b.dataset.panel === name);
    });
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    const panel = $(`#panel-${name}`);
    if (panel) panel.classList.add("active");
  }

  document.querySelectorAll("#subnav button").forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.panel));
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-goto]");
    if (!a) return;
    e.preventDefault();
    showPanel(a.dataset.goto);
  });
  const linkToBank = $("#linkToBank");
  if (linkToBank) {
    linkToBank.addEventListener("click", (e) => {
      e.preventDefault();
      showPanel("bank");
    });
  }

  let briefsData = null;
  let openBriefs = new Set();
  let bankQuery = "";
  let drills = [DAI_PAI_DONG];
  let current = DAI_PAI_DONG;

  function briefMatches(brief) {
    const q = bankQuery.trim().toLowerCase();
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
      brief.sample_answer || "",
      brief.sample_note || "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function filteredBriefs() {
    if (!briefsData) return [];
    return briefsData.briefs.filter(briefMatches);
  }

  function renderBriefs() {
    const list = $("#briefsList");
    const countEl = $("#bankCount");
    const quickRef = $("#quickRef");
    const sourcesEl = $("#briefsSources");
    if (!list) return;

    if (!briefsData) {
      countEl.textContent = "題庫: —";
      list.innerHTML = `<div class="empty">無法載入 data/briefs.json</div>`;
      quickRef.hidden = true;
      sourcesEl.hidden = true;
      return;
    }

    const briefs = filteredBriefs();
    countEl.textContent = `題庫: ${briefs.length}`;
    list.innerHTML = "";
    if (!briefs.length) {
      list.innerHTML = `<div class="empty">沒有符合條件的項目。試試清空搜尋。</div>`;
      quickRef.hidden = true;
      sourcesEl.hidden = true;
      return;
    }

    const frag = document.createDocumentFragment();
    briefs.forEach((brief) => {
      const open = openBriefs.has(brief.id);
      const card = document.createElement("article");
      card.className = "brief-card" + (open ? " open" : "");
      card.dataset.id = brief.id;

      const tags = (brief.theme_ids || [])
        .map((th) => `<span class="chip">${escapeHtml(themeLabel(th))}</span>`)
        .join("") + (brief.sample_answer
          ? `<span class="chip chip-sample">有範文</span>`
          : "");

      const facts = (brief.facts || [])
        .map((f) => {
          const link = f.url
            ? `<br><a href="${escapeAttr(f.url)}" target="_blank" rel="noopener noreferrer">來源 ↗</a>`
            : "";
          return `<li>${escapeHtml(f.text)}${link}</li>`;
        })
        .join("");

      card.innerHTML = `
        <button type="button" class="brief-summary" aria-expanded="${open ? "true" : "false"}">
          <span class="brief-num">${brief.n}</span>
          <span class="brief-summary-text">
            <h3>${escapeHtml(brief.title_zh)}</h3>
            <div class="brief-en">${escapeHtml(brief.title_en || "")}</div>
            <p class="brief-stance-one">${escapeHtml(brief.stance || "")}</p>
            <div class="brief-tags">${tags}</div>
          </span>
          <span class="brief-chev" aria-hidden="true">▾</span>
        </button>
        <div class="brief-body">
          <div class="brief-section">
            <h4>考試式題目</h4>
            <p class="brief-prompt">${escapeHtml(brief.prompt)}</p>
          </div>
          <div class="brief-section pros">
            <h4>利</h4>
            ${listHtml(brief.pros, false)}
          </div>
          <div class="brief-section cons">
            <h4>弊</h4>
            ${listHtml(brief.cons, false)}
          </div>
          <div class="brief-section stance">
            <h4>建議立場</h4>
            <p class="brief-stance-label">${escapeHtml(brief.stance || "")}</p>
            ${listHtml(brief.stance_points, true)}
          </div>
          <div class="brief-section">
            <h4>措施／替代</h4>
            ${listHtml(brief.measures, true)}
          </div>
          <div class="brief-section">
            <h4>必記事實</h4>
            <ul class="facts-list">${facts}</ul>
          </div>
          ${brief.sample_answer ? `<div class="brief-section sample">
            <h4>範文</h4>
            ${brief.sample_note ? `<p class="muted brief-sample-note">${escapeHtml(brief.sample_note)}</p>` : ""}
            <pre class="brief-sample">${escapeHtml(brief.sample_answer)}</pre>
            <button type="button" class="btn btn-copy-sample" data-id="${escapeAttr(brief.id)}">複製範文</button>
          </div>` : ""}
          <div class="brief-actions">
            <button type="button" class="btn primary btn-use-drill" data-id="${escapeAttr(brief.id)}">用呢題計時</button>
          </div>
        </div>`;

      card.querySelector(".brief-summary").addEventListener("click", () => {
        if (openBriefs.has(brief.id)) openBriefs.delete(brief.id);
        else openBriefs.add(brief.id);
        renderBriefs();
      });
      const copyBtn = card.querySelector(".btn-copy-sample");
      if (copyBtn) {
        copyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          copyText(brief.sample_answer || "", "已複製範文");
        });
      }
      card.querySelector(".btn-use-drill").addEventListener("click", (e) => {
        e.stopPropagation();
        const d = drills.find((x) => x.id === brief.id);
        if (d) {
          renderDrill(d);
          showPanel("drill");
          toast("已載入呢題 — 可以開始計時");
        }
      });
      frag.appendChild(card);
    });
    list.appendChild(frag);

    const qr = briefsData.quick_ref || [];
    if (qr.length && !bankQuery.trim()) {
      quickRef.hidden = false;
      quickRef.innerHTML = `
        <h3>速查表（練筆前 30 秒）</h3>
        <table>
          <thead><tr><th>#</th><th>主題</th><th>一句立場</th></tr></thead>
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
      quickRef.hidden = true;
      quickRef.innerHTML = "";
    }

    const sources = briefsData.sources || [];
    if (sources.length && !bankQuery.trim()) {
      sourcesEl.hidden = false;
      sourcesEl.innerHTML = `
        <h3>主要來源</h3>
        <ul class="link-list">
          ${sources
            .map(
              (s) =>
                `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`
            )
            .join("")}
        </ul>`;
    } else {
      sourcesEl.hidden = true;
      sourcesEl.innerHTML = "";
    }
  }

  function renderDrill(d) {
    current = d;
    localStorage.setItem(STORAGE_DRILL, d.id);
    $("#drillSelect").value = d.id;
    const chips = [`<span class="chip">${escapeHtml(d.title_zh)}</span>`];
    if (d.sample_answer) chips.push('<span class="chip chip-sample">有範文</span>');
    $("#drillMeta").innerHTML = chips.join("");
    $("#drillPrompt").textContent = d.prompt;
    const lines = [];
    if (d.pros?.length) lines.push("利：\n- " + d.pros.join("\n- "));
    if (d.cons?.length) lines.push("弊：\n- " + d.cons.join("\n- "));
    if (d.measures?.length) lines.push("措施提示：\n- " + d.measures.join("\n- "));
    $("#drillHints").textContent = lines.join("\n\n") || "（呢題未有提示卡）";

    const sampleCard = $("#drillSampleCard");
    const sampleWrap = $("#drillSampleWrap");
    const sampleText = $("#drillSampleText");
    const sampleNote = $("#drillSampleNote");
    const btnToggle = $("#btnToggleSample");
    if (sampleCard && sampleText) {
      if (d.sample_answer) {
        sampleCard.hidden = false;
        sampleText.textContent = d.sample_answer;
        if (sampleNote) {
          sampleNote.textContent = d.sample_note
            ? d.sample_note
            : "寫完先開。範文只係參考結構同語氣，唔好背。";
        }
        if (sampleWrap) sampleWrap.hidden = true;
        if (btnToggle) btnToggle.textContent = "顯示範文";
      } else {
        sampleCard.hidden = true;
        sampleText.textContent = "";
        if (sampleWrap) sampleWrap.hidden = true;
      }
    }
  }

  function fillSelect() {
    const sel = $("#drillSelect");
    sel.innerHTML = drills
      .map((d) => `<option value="${escapeAttr(d.id)}">${escapeHtml(d.title_zh)}</option>`)
      .join("");
    sel.onchange = () => {
      const d = drills.find((x) => x.id === sel.value) || drills[0];
      renderDrill(d);
    };
  }

  async function loadBriefs() {
    try {
      const res = await fetch("./data/briefs.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      briefsData = await res.json();
      const extras = (briefsData.briefs || []).map((b) => ({
        id: b.id,
        title_zh: b.title_zh || b.heading || b.id,
        prompt: b.prompt || "",
        pros: b.pros || [],
        cons: b.cons || [],
        measures: b.measures || [],
        sample_answer: b.sample_answer || "",
        sample_note: b.sample_note || "",
      }));
      drills = [DAI_PAI_DONG, ...extras.filter((b) => b.prompt)];
    } catch (e) {
      briefsData = null;
      drills = [DAI_PAI_DONG];
      toast("題庫未載入 — 用大牌檔 sample");
    }
    fillSelect();
    const saved = localStorage.getItem(STORAGE_DRILL);
    const pick = drills.find((d) => d.id === saved) || drills[0];
    renderDrill(pick);
    renderBriefs();
  }

  $("#bankSearch").addEventListener("input", () => {
    bankQuery = $("#bankSearch").value;
    renderBriefs();
  });
  $("#bankClear").addEventListener("click", () => {
    $("#bankSearch").value = "";
    bankQuery = "";
    renderBriefs();
  });


  // Sample below answer (Q1-style)
  const btnToggleSample = $("#btnToggleSample");
  if (btnToggleSample) {
    btnToggleSample.addEventListener("click", () => {
      const wrap = $("#drillSampleWrap");
      if (!wrap || !current.sample_answer) return;
      wrap.hidden = !wrap.hidden;
      btnToggleSample.textContent = wrap.hidden ? "顯示範文" : "隱藏範文";
    });
  }
  const btnCopySampleDrill = $("#btnCopySampleDrill");
  if (btnCopySampleDrill) {
    btnCopySampleDrill.addEventListener("click", () => {
      if (!current.sample_answer) return toast("呢題未有範文");
      copyText(current.sample_answer, "已複製範文");
    });
  }

  $("#btnShuffle").addEventListener("click", () => {
    if (drills.length < 2) return renderDrill(drills[0]);
    let next;
    do {
      next = drills[Math.floor(Math.random() * drills.length)];
    } while (next.id === current.id && drills.length > 1);
    renderDrill(next);
  });

  // Timer
  let remain = 70 * 60;
  let ticking = null;
  const display = $("#timerDisplay");
  function paintTimer() {
    const m = Math.floor(Math.max(0, remain) / 60);
    const s = Math.max(0, remain) % 60;
    display.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    display.classList.toggle("warn", remain <= 10 * 60 && remain > 5 * 60);
    display.classList.toggle("danger", remain <= 5 * 60);
  }
  function stopTick() {
    if (ticking) clearInterval(ticking);
    ticking = null;
  }
  function startTimer(mins) {
    stopTick();
    remain = mins * 60;
    paintTimer();
    ticking = setInterval(() => {
      remain -= 1;
      paintTimer();
      if (remain <= 0) {
        stopTick();
        toast("時間到 — 去自評清單打勾");
      }
    }, 1000);
  }
  $("#btnStart").onclick = () => startTimer(70);
  $("#btnStart80").onclick = () => startTimer(80);
  $("#btnPause").onclick = () => {
    if (ticking) {
      stopTick();
      toast("已暫停");
    } else if (remain > 0) {
      ticking = setInterval(() => {
        remain -= 1;
        paintTimer();
        if (remain <= 0) {
          stopTick();
          toast("時間到");
        }
      }, 1000);
      toast("繼續");
    }
  };
  $("#btnReset").onclick = () => {
    stopTick();
    remain = 70 * 60;
    paintTimer();
  };
  paintTimer();

  const answer = $("#answer");
  answer.value = localStorage.getItem(STORAGE_ANSWER) || "";
  const countEl = $("#wordCount");
  function countChars(t) {
    return (t || "").replace(/\s/g, "").length;
  }
  function syncCount() {
    countEl.textContent = `${countChars(answer.value)} 字`;
  }
  answer.addEventListener("input", () => {
    localStorage.setItem(STORAGE_ANSWER, answer.value);
    syncCount();
  });
  syncCount();

  async function copyText(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
      toast(okMsg);
    } catch {
      toast("複製失敗");
    }
  }
  $("#btnCopyPrompt").onclick = () => copyText(current.prompt, "已複製題目");
  $("#btnCopyAnswer").onclick = () => copyText(answer.value, "已複製答卷");

  const checks = [...document.querySelectorAll("#checklist input")];
  const scoreEl = $("#markScore");
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
  $("#btnClearMarks").onclick = () => {
    checks.forEach((c) => {
      c.checked = false;
    });
    saveMarks();
  };
  loadMarks();


  /* —— 句式庫 (Anson bank) —— */
  const phraseState = { data: { disclaimer: "", categories: [], items: [] }, category: "all", paper: "hub" };

  function phraseCatLabel(id) {
    if (id === "all") return "全部";
    const cat = (phraseState.data.categories || []).find((c) => c.id === id);
    return (cat && cat.zh) || id;
  }

  const PAPER_CHIPS = [
    { id: "all", label: "全部" },
    { id: "q2", label: "Q2" },
    { id: "common", label: "常用" },
  ];

  function matchesPaper(item, filter) {
    const p = item.paper || "";
    if (filter === "all") return true;
    if (filter === "q2") return p === "q2" || p === "";
    if (filter === "common") return p === "common";
    return p === "q2" || p === "common" || p === "";
  }

  function renderPaperFilters() {
    const wrap = $("#q2PaperFilters");
    if (!wrap) return;
    wrap.innerHTML = PAPER_CHIPS.map(
      (c) =>
        `<button type="button" data-paper="${c.id}" class="${phraseState.paper === c.id ? "active" : ""}">${c.label}</button>`
    ).join("");
    wrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.paper;
        phraseState.paper = phraseState.paper === next ? "hub" : next;
        renderPaperFilters();
        renderQ2Phrases();
      });
    });
  }

  function renderPhraseFilters() {
    const cats = ["all", ...(phraseState.data.categories || []).map((c) => c.id)];
    const wrap = $("#q2PhraseFilters");
    if (!wrap) return;
    wrap.innerHTML = cats
      .map(
        (c) =>
          `<button type="button" data-cat="${c}" class="${phraseState.category === c ? "active" : ""}">${phraseCatLabel(c)}</button>`
      )
      .join("");
    wrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        phraseState.category = btn.dataset.cat;
        renderPhraseFilters();
        renderQ2Phrases();
      });
    });
  }

  function paperLabel(p) {
    if (p === "q2") return "Q2";
    if (p === "q1") return "Q1";
    if (p === "common") return "常用";
    return p || "";
  }

  function phraseCardHTML(item) {
    const paper = paperLabel(item.paper);
    return `<article class="phrase-card">
      <div class="meta"><span class="cat-pill">${escapeHtml(phraseCatLabel(item.category))}</span>${paper ? ` <span class="cat-pill paper">${escapeHtml(paper)}</span>` : ""}</div>
      <p class="zh">${escapeHtml(item.zh || "")}</p>
      <p class="en">${escapeHtml(item.en || "")}</p>
      ${item.note ? `<div class="meta">${escapeHtml(item.note)}</div>` : ""}
      ${item.example ? `<p class="ex">${escapeHtml(item.example)}</p>` : ""}
      <button type="button" class="btn btn-copy" data-zh="${escapeAttr(item.zh || "")}" data-en="${escapeAttr(item.en || "")}">複製句式</button>
    </article>`;
  }

  function renderQ2Phrases() {
    const q = ($("#q2PhraseSearch")?.value || "").trim().toLowerCase();
    let list = (phraseState.data.items || []).filter((i) => matchesPaper(i, phraseState.paper));
    if (phraseState.category !== "all") list = list.filter((i) => i.category === phraseState.category);
    if (q) {
      list = list.filter((i) =>
        `${i.zh} ${i.en} ${i.category} ${i.note || ""} ${i.example || ""}`.toLowerCase().includes(q)
      );
    }
    const count = $("#q2PhraseCount");
    if (count) count.textContent = `${list.length} 句`;
    const disc = $("#q2PhraseDisclaimer");
    if (disc) disc.textContent = phraseState.data.disclaimer || "";
    const grid = $("#q2PhraseGrid");
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="empty">沒有符合的句式。</div>`;
      return;
    }
    grid.innerHTML = list.map(phraseCardHTML).join("");
    grid.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = `${btn.dataset.zh || ""}\n${btn.dataset.en || ""}`.trim();
        try {
          await navigator.clipboard.writeText(text);
          toast("已複製句式");
        } catch {
          toast("複製失敗 — 請手動選取");
        }
      });
    });
  }

  async function loadQ2Phrases() {
    const grid = $("#q2PhraseGrid");
    try {
      const res = await fetch("data/q2_phrases.json?v=20261028a", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      phraseState.data = await res.json();
      renderPaperFilters();
      renderPhraseFilters();
      renderQ2Phrases();
      const search = $("#q2PhraseSearch");
      if (search) search.addEventListener("input", renderQ2Phrases);
    } catch (e) {
      if (grid) grid.innerHTML = `<div class="empty">未能載入句式庫（data/q2_phrases.json）。</div>`;
      console.error(e);
    }
  }

  loadBriefs();
  loadQ2Phrases();
})();
