/**
 * Policy-tab 政策溫習卡. Same 17 bilingual cards as Q1
 * (docs/q1/data/policy-cards.json) and the shared Quizlet overlay.
 * Deep links: #flash, #bank-study, #flashcards.
 */
(() => {
  "use strict";

  const STAMP = "20261103w";
  const DATA_URL = "../q1/data/policy-cards.json?v=" + STAMP;
  const OPEN_HASHES = ["flash", "bank-study", "flashcards"];

  const $ = (s, el = document) => el.querySelector(s);

  let policyCardsData = undefined;
  let loadSettled = false;
  const openPolicyCards = new Set();
  let bankQuery = "";
  let bankFlash = null;

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function factBlob(arr) {
    return (arr || []).map((f) => (typeof f === "string" ? f : f.text || "")).join("\n");
  }

  function cardMatches(card) {
    const q = bankQuery.trim().toLowerCase();
    if (!q) return true;
    const blob = [
      card.id,
      card.title_zh,
      card.title_en,
      card.prompt,
      card.prompt_zh,
      card.prompt_en,
      card.stance,
      card.stance_zh,
      card.stance_en,
      ...(card.pros || []),
      ...(card.pros_zh || []),
      ...(card.pros_en || []),
      ...(card.cons || []),
      ...(card.cons_zh || []),
      ...(card.cons_en || []),
      ...(card.measures || []),
      ...(card.measures_zh || []),
      ...(card.measures_en || []),
      factBlob(card.facts),
      factBlob(card.facts_zh),
      factBlob(card.facts_en),
      ...(card.theme_ids || []),
    ]
      .join("\n")
      .toLowerCase();
    return blob.includes(q);
  }

  function filteredPolicyCards() {
    if (!policyCardsData) return [];
    return (policyCardsData.cards || []).filter(cardMatches);
  }

  function bilingualBlock(zh, en, asList, ordered) {
    const z = Array.isArray(zh) ? zh : zh ? [zh] : [];
    const e = Array.isArray(en) ? en : en ? [en] : [];
    const n = Math.max(z.length, e.length);
    if (!n) return `<p class="muted">—</p>`;
    if (!asList) {
      const zhT = z[0] || "";
      const enT = e[0] || "";
      return `<div class="bilingual-pair"><p class="zh">${escapeHtml(zhT || enT)}</p>${
        zhT && enT ? `<p class="en">${escapeHtml(enT)}</p>` : ""
      }</div>`;
    }
    const tag = ordered ? "ol" : "ul";
    let html = `<${tag} class="bilingual-list">`;
    for (let i = 0; i < n; i++) {
      const zhT = z[i] || "";
      const enT = e[i] || "";
      html += `<li><span class="zh">${escapeHtml(zhT || enT)}</span>${
        zhT && enT ? `<span class="en">${escapeHtml(enT)}</span>` : ""
      }</li>`;
    }
    html += `</${tag}>`;
    return html;
  }

  function factsBilingual(zhFacts, enFacts) {
    const z = zhFacts || [];
    const e = enFacts || [];
    const n = Math.max(z.length, e.length);
    let html = `<ul class="facts-list">`;
    for (let i = 0; i < n; i++) {
      const zf = z[i];
      const ef = e[i];
      const zhT = zf ? (typeof zf === "string" ? zf : zf.text || "") : "";
      const enT = ef ? (typeof ef === "string" ? ef : ef.text || "") : "";
      const url = (ef && ef.url) || (zf && zf.url) || "";
      const link = url
        ? `<br><a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">來源 ↗</a>`
        : "";
      html += `<li><span class="zh">${escapeHtml(zhT || enT)}</span>${
        zhT && enT ? `<span class="en">${escapeHtml(enT)}</span>` : ""
      }${link}</li>`;
    }
    html += `</ul>`;
    return html;
  }

  function setStatus(msg) {
    const el = $("#flashStatus");
    if (!el) return;
    if (!msg) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = msg;
  }

  function renderPolicyCards() {
    const list = $("#briefsList");
    const countEl = $("#bankCount");
    const quickRef = $("#quickRef");
    const sourcesEl = $("#briefsSources");
    if (!list || !countEl) return;

    if (!policyCardsData) {
      countEl.textContent = "溫習卡: —";
      list.innerHTML = `<div class="empty">${
        loadSettled ? "無法載入政策溫習卡（q1/data/policy-cards.json）" : "載入政策溫習卡…"
      }</div>`;
      if (quickRef) quickRef.hidden = true;
      if (sourcesEl) sourcesEl.hidden = true;
      return;
    }

    const cards = filteredPolicyCards();
    countEl.textContent = `溫習卡: ${cards.length}`;
    list.innerHTML = "";
    if (!cards.length) {
      list.innerHTML = `<div class="empty">沒有符合條件的項目。試試清空搜尋。</div>`;
      if (quickRef) quickRef.hidden = true;
      if (sourcesEl) sourcesEl.hidden = true;
      return;
    }

    const entries = cards.map((card) => {
      const open = openPolicyCards.has(card.id);
      const el = document.createElement("article");
      el.className = "brief-card" + (open ? " open" : "");
      el.dataset.id = card.id;

      const tags = (card.theme_ids || [])
        .map((th) => `<span class="chip">${escapeHtml(th)}</span>`)
        .join("");

      const stanceZh = card.stance_zh || card.stance || "";
      const stanceEn = card.stance_en || card.stance || "";

      el.innerHTML = `
        <div class="brief-summary-row">
          <button type="button" class="brief-summary" aria-expanded="${open ? "true" : "false"}">
            <span class="brief-num">${escapeHtml(card.n)}</span>
            <span class="brief-summary-text">
              <h3>${escapeHtml(card.title_zh || card.title_en || card.id)}</h3>
              <div class="brief-en">${escapeHtml(card.title_en || "")}</div>
              <p class="brief-stance-one"><span class="zh">${escapeHtml(stanceZh)}</span>${
                stanceZh && stanceEn && stanceZh !== stanceEn
                  ? `<span class="en">${escapeHtml(stanceEn)}</span>`
                  : ""
              }</p>
              <div class="brief-tags">${tags}</div>
            </span>
            <span class="brief-chev" aria-hidden="true">▾</span>
          </button>
          <button type="button" class="brief-flash-btn" data-flash-id="${escapeAttr(card.id)}" title="由此題開閃卡" aria-label="閃卡">閃</button>
        </div>
        <div class="brief-body">
          <div class="brief-section">
            <h4>考試式題目</h4>
            ${bilingualBlock(card.prompt_zh, card.prompt_en || card.prompt, false, false)}
          </div>
          <div class="brief-section pros">
            <h4>利 · Pros</h4>
            ${bilingualBlock(card.pros_zh, card.pros_en || card.pros, true, false)}
          </div>
          <div class="brief-section cons">
            <h4>弊 · Cons</h4>
            ${bilingualBlock(card.cons_zh, card.cons_en || card.cons, true, false)}
          </div>
          <div class="brief-section stance">
            <h4>建議立場 · Stance</h4>
            ${bilingualBlock(stanceZh, stanceEn, false, false)}
          </div>
          <div class="brief-section">
            <h4>措施 · Measures</h4>
            ${bilingualBlock(card.measures_zh, card.measures_en || card.measures, true, true)}
          </div>
          <div class="brief-section">
            <h4>必記事實 · Key facts</h4>
            ${factsBilingual(card.facts_zh, card.facts_en || card.facts)}
          </div>
          <div class="brief-actions">
            <button type="button" class="btn primary brief-open-flash" data-flash-id="${escapeAttr(card.id)}">閃卡溫習此題</button>
          </div>
        </div>`;

      const summary = el.querySelector(".brief-summary");
      summary.addEventListener("click", () => {
        const isOpen = el.classList.toggle("open");
        if (isOpen) openPolicyCards.add(card.id);
        else openPolicyCards.delete(card.id);
        summary.setAttribute("aria-expanded", String(isOpen));
      });
      el.querySelectorAll("[data-flash-id]").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          openBankFlash(btn.getAttribute("data-flash-id"));
        });
      });
      return { theme: card.theme_ids?.[0], card: el };
    });
    window.JrePolicyGroups.render(list, entries, { lang: "zh", expandMatches: Boolean(bankQuery.trim()) });

    const qr = policyCardsData.quick_ref || [];
    if (quickRef) {
      if (qr.length && !bankQuery.trim()) {
        quickRef.hidden = false;
        quickRef.innerHTML = `
          <h3>速查表（練筆前 30 秒）</h3>
          <table>
            <thead><tr><th>#</th><th>主題</th><th>一句立場</th></tr></thead>
            <tbody>
              ${qr
                .map((r) => {
                  const theme = r.theme_zh
                    ? `<span class="zh">${escapeHtml(r.theme_zh)}</span><span class="en">${escapeHtml(r.theme || "")}</span>`
                    : escapeHtml(r.theme || "");
                  const stance = r.stance_one_liner_zh
                    ? `<span class="zh">${escapeHtml(r.stance_one_liner_zh)}</span><span class="en">${escapeHtml(r.stance_one_liner || "")}</span>`
                    : escapeHtml(r.stance_one_liner || "");
                  return `<tr><td>${escapeHtml(r.n)}</td><td>${theme}</td><td>${stance}</td></tr>`;
                })
                .join("")}
            </tbody>
          </table>`;
      } else {
        quickRef.hidden = true;
        quickRef.innerHTML = "";
      }
    }

    const sources = policyCardsData.sources || [];
    if (sourcesEl) {
      if (sources.length && !bankQuery.trim()) {
        sourcesEl.hidden = false;
        sourcesEl.innerHTML = `
          <h3>主要來源</h3>
          <ul>${sources
            .map(
              (s) =>
                `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`
            )
            .join("")}</ul>`;
      } else {
        sourcesEl.hidden = true;
        sourcesEl.innerHTML = "";
      }
    }
  }

  function openBankFlash(startId) {
    if (!bankFlash) {
      if (!window.JrePolicyFlash) {
        console.warn("JrePolicyFlash missing");
        setStatus("閃卡元件未載入");
        return;
      }
      bankFlash = window.JrePolicyFlash.create({
        getCards: () => filteredPolicyCards(),
        hashOpen: "bank-study",
        hashClose: "flash",
        manageHash: true,
        onOpen: () => {
          const h = (location.hash || "").replace(/^#/, "");
          if (OPEN_HASHES.indexOf(h) === -1) {
            history.replaceState(null, "", "#flash");
          }
        },
      });
    }
    setStatus("");
    const ok = bankFlash.open(startId ? { startId } : {});
    if (!ok) setStatus("沒有可溫習的卡");
  }

  async function loadPolicyCards() {
    try {
      const res = await fetch(DATA_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      policyCardsData = await res.json();
    } catch (err) {
      console.warn("policy-cards load failed", err);
      policyCardsData = null;
    } finally {
      loadSettled = true;
      renderPolicyCards();
    }
  }

  function hashName() {
    return (location.hash || "").replace(/^#/, "");
  }

  function applyHash() {
    const h = hashName();
    if (OPEN_HASHES.indexOf(h) === -1) return;
    const target = document.getElementById("flash");
    if (target) target.scrollIntoView({ block: "start" });
    let tries = 0;
    const tryOpen = () => {
      if (policyCardsData) {
        openBankFlash();
        return;
      }
      if (loadSettled || tries++ > 40) return;
      setTimeout(tryOpen, 80);
    };
    tryOpen();
  }

  function init() {
    const bankSearch = $("#bankSearch");
    if (bankSearch) {
      bankSearch.addEventListener("input", () => {
        bankQuery = bankSearch.value || "";
        renderPolicyCards();
      });
    }
    const bankClear = $("#bankClear");
    if (bankClear) {
      bankClear.addEventListener("click", () => {
        if (bankSearch) bankSearch.value = "";
        bankQuery = "";
        renderPolicyCards();
        if (bankSearch) bankSearch.focus();
      });
    }
    $("#btnBankFlash")?.addEventListener("click", () => openBankFlash());
    window.addEventListener("hashchange", applyHash);
    loadPolicyCards().then(applyHash);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
