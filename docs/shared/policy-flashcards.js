/**
 * Shared Quizlet-style bilingual policy flashcards.
 * Tip-carry: Q1 ships this; Q2 Chinese can reuse the same CSS/JS.
 *
 * Card shape (bilingual):
 *   id, n, title_zh, title_en,
 *   prompt_zh, prompt_en, stance_zh, stance_en,
 *   pros_zh[], pros_en[], cons_zh[], cons_en[],
 *   measures_zh[], measures_en[],
 *   facts_zh[{text,url?}], facts_en[{text,url?}]
 * Legacy EN aliases (prompt/pros/cons/stance/measures/facts) also accepted.
 *
 * Usage:
 *   const ctl = JrePolicyFlash.create({ getCards: () => cards });
 *   ctl.open();                 // all from getCards()
 *   ctl.open({ startId: 'x' }); // jump to card
 *   ctl.close();
 */
(function (global) {
  "use strict";

  const OVERLAY_ID = "jrePfOverlay";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pick(card, enKey, zhKey) {
    const en = card[enKey] != null ? card[enKey] : card[enKey.replace(/_en$/, "")];
    const zh = card[zhKey];
    return { en: en || "", zh: zh || "" };
  }

  function pickList(card, enKey, zhKey) {
    const en = card[enKey] || card[enKey.replace(/_en$/, "")] || [];
    const zh = card[zhKey] || [];
    return { en: Array.isArray(en) ? en : [], zh: Array.isArray(zh) ? zh : [] };
  }

  function zipLines(zhArr, enArr, limit) {
    const n = Math.max(zhArr.length, enArr.length);
    const out = [];
    for (let i = 0; i < n && out.length < limit; i++) {
      const zh = zhArr[i] || "";
      const en = enArr[i] || "";
      if (!zh && !en) continue;
      out.push({ zh, en });
    }
    return out;
  }

  function factText(f) {
    if (!f) return "";
    return typeof f === "string" ? f : f.text || "";
  }

  function ensureOverlay() {
    let el = document.getElementById(OVERLAY_ID);
    if (el) return el;
    el = document.createElement("div");
    el.id = OVERLAY_ID;
    el.className = "jre-pf jre-pf-overlay";
    el.hidden = true;
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <div class="jre-pf-shell">
        <header class="jre-pf-top">
          <button type="button" class="jre-pf-icon-btn" data-pf="close" title="關閉閃卡" aria-label="關閉閃卡">✕</button>
          <div class="jre-pf-progress-wrap">
            <div class="jre-pf-progress-label" data-pf="progressLabel">0 / 0</div>
            <div class="jre-pf-progress-track" aria-hidden="true">
              <div class="jre-pf-progress-bar" data-pf="progressBar"></div>
            </div>
          </div>
          <div class="jre-pf-known-pill" data-pf="knownPill" title="本輪已識">識 0</div>
        </header>

        <div class="jre-pf-stage" data-pf="stage">
          <div class="jre-pf-flip-scene">
            <button type="button" class="jre-pf-flip-card" data-pf="flipCard" aria-label="翻面">
              <div class="jre-pf-flip-inner" data-pf="flipInner">
                <div class="jre-pf-face jre-pf-front" data-pf="front"></div>
                <div class="jre-pf-face jre-pf-back" data-pf="back"></div>
              </div>
            </button>
          </div>

          <div class="jre-pf-nav">
            <button type="button" class="jre-pf-btn" data-pf="prev">上一張</button>
            <button type="button" class="jre-pf-btn" data-pf="next">下一張</button>
          </div>
          <div class="jre-pf-actions">
            <button type="button" class="jre-pf-btn jre-pf-btn-learn" data-pf="learn">還未懂</button>
            <button type="button" class="jre-pf-btn jre-pf-btn-know" data-pf="know">識</button>
          </div>
          <p class="jre-pf-swipe-hint">點卡翻面 · 左滑＝未懂 · 右滑＝識 · ←/→ 換卡 · 空白鍵翻面</p>
        </div>

        <div class="jre-pf-summary" data-pf="summary" hidden>
          <h2>本輪完成</h2>
          <p class="jre-pf-summary-stats" data-pf="summaryStats"></p>
          <div class="jre-pf-summary-actions">
            <button type="button" class="jre-pf-btn jre-pf-btn-know" data-pf="retryLearning">再練未懂的</button>
            <button type="button" class="jre-pf-btn" data-pf="restart">全部重來</button>
            <button type="button" class="jre-pf-btn" data-pf="exit">返回列表</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    return el;
  }

  function create(opts) {
    opts = opts || {};
    const getCards = opts.getCards || (() => []);
    const onOpen = opts.onOpen || null;
    const onClose = opts.onClose || null;
    const hashOpen = opts.hashOpen || "bank-study";
    const hashClose = opts.hashClose || "bank";

    const state = {
      active: false,
      deck: [],
      index: 0,
      flipped: false,
      known: new Set(),
      learning: new Set(),
      everLearning: new Set(),
      touch: null,
      bound: false,
    };

    const root = ensureOverlay();
    const $ = (sel) => root.querySelector(`[data-pf="${sel}"]`);

    function current() {
      return state.deck[state.index] || null;
    }

    function renderFront(card) {
      const prompt = pick(card, "prompt_en", "prompt_zh");
      const stance = pick(card, "stance_en", "stance_zh");
      return `
        <div class="jre-pf-hint">點擊翻面 · Tap to flip</div>
        <div class="jre-pf-theme">
          <div class="jre-pf-theme-zh">${esc(card.title_zh || card.title_en || card.id)}</div>
          <div class="jre-pf-theme-en">${esc(card.title_en || "")}</div>
        </div>
        <div class="jre-pf-prompt-block">
          <div class="jre-pf-prompt-zh">${esc(prompt.zh || prompt.en)}</div>
          ${prompt.zh && prompt.en ? `<div class="jre-pf-prompt-en">${esc(prompt.en)}</div>` : ""}
        </div>
        <div class="jre-pf-stance-front">
          <div class="label">建議立場 · Stance</div>
          <div class="zh">${esc(stance.zh || stance.en)}</div>
          ${stance.zh && stance.en ? `<div class="en">${esc(stance.en)}</div>` : ""}
        </div>`;
    }

    function renderBack(card) {
      const pros = pickList(card, "pros_en", "pros_zh");
      const cons = pickList(card, "cons_en", "cons_zh");
      const stance = pick(card, "stance_en", "stance_zh");
      const measures = pickList(card, "measures_en", "measures_zh");
      const factsEn = (card.facts_en || card.facts || []).map(factText);
      const factsZh = (card.facts_zh || []).map(factText);

      const prosLines = zipLines(pros.zh, pros.en, 3)
        .map(
          (l) =>
            `<li class="jre-pf-bilingual-line"><span class="zh">${esc(l.zh || l.en)}</span>${
              l.zh && l.en ? `<span class="en">${esc(l.en)}</span>` : ""
            }</li>`
        )
        .join("");
      const consLines = zipLines(cons.zh, cons.en, 3)
        .map(
          (l) =>
            `<li class="jre-pf-bilingual-line"><span class="zh">${esc(l.zh || l.en)}</span>${
              l.zh && l.en ? `<span class="en">${esc(l.en)}</span>` : ""
            }</li>`
        )
        .join("");
      const measureLines = zipLines(measures.zh, measures.en, 3)
        .map(
          (l) =>
            `<li class="jre-pf-bilingual-line"><span class="zh">${esc(l.zh || l.en)}</span>${
              l.zh && l.en ? `<span class="en">${esc(l.en)}</span>` : ""
            }</li>`
        )
        .join("");
      const factLines = zipLines(factsZh, factsEn, 3)
        .map(
          (l) =>
            `<li class="jre-pf-bilingual-line"><span class="zh">${esc(l.zh || l.en)}</span>${
              l.zh && l.en ? `<span class="en">${esc(l.en)}</span>` : ""
            }</li>`
        )
        .join("");

      return `
        <div class="jre-pf-sec pros">
          <h4>利 · Pros</h4>
          <ul>${prosLines || "<li>—</li>"}</ul>
        </div>
        <div class="jre-pf-sec cons">
          <h4>弊 · Cons</h4>
          <ul>${consLines || "<li>—</li>"}</ul>
        </div>
        <div class="jre-pf-sec stance">
          <h4>建議立場 · Stance</h4>
          <p class="jre-pf-bilingual-line"><span class="zh">${esc(stance.zh || stance.en)}</span>${
            stance.zh && stance.en ? `<span class="en">${esc(stance.en)}</span>` : ""
          }</p>
        </div>
        <div class="jre-pf-sec">
          <h4>措施 · Measures</h4>
          <ol>${measureLines || "<li>—</li>"}</ol>
        </div>
        <div class="jre-pf-sec">
          <h4>必記事實 · Key facts</h4>
          <ul>${factLines || "<li>—</li>"}</ul>
        </div>`;
    }

    function updateChrome() {
      const total = state.deck.length;
      const done = state.known.size;
      const label = $("progressLabel");
      const bar = $("progressBar");
      const pill = $("knownPill");
      if (label) {
        label.textContent = total
          ? `${Math.min(state.index + 1, total)} / ${total}`
          : "0 / 0";
      }
      if (bar) {
        const pct = total ? Math.round((done / total) * 100) : 0;
        bar.style.width = pct + "%";
      }
      if (pill) pill.textContent = `識 ${done}`;
      const prev = $("prev");
      const next = $("next");
      if (prev) prev.disabled = !total || state.index <= 0;
      if (next) next.disabled = !total || state.index >= total - 1;
    }

    function showSummary() {
      const stage = $("stage");
      const summary = $("summary");
      if (stage) stage.hidden = true;
      if (summary) {
        summary.hidden = false;
        const stats = $("summaryStats");
        if (stats) {
          stats.innerHTML = `本輪<strong>${state.known.size}</strong> 張已識<br>曾標記未懂：<strong>${state.everLearning.size}</strong> 張`;
        }
      }
    }

    function renderCard() {
      const stage = $("stage");
      const summary = $("summary");
      if (summary) summary.hidden = true;
      if (stage) stage.hidden = false;

      const card = current();
      const flip = $("flipCard");
      const front = $("front");
      const back = $("back");
      if (!card) {
        showSummary();
        updateChrome();
        return;
      }
      state.flipped = false;
      if (flip) {
        flip.classList.remove("is-flipped", "is-swipe-left", "is-swipe-right");
        flip.style.transform = "";
        flip.style.opacity = "";
      }
      if (front) front.innerHTML = renderFront(card);
      if (back) back.innerHTML = renderBack(card);
      updateChrome();
    }

    function flipCard() {
      if (!state.active || !current()) return;
      state.flipped = !state.flipped;
      $("flipCard")?.classList.toggle("is-flipped", state.flipped);
    }

    function go(delta) {
      if (!state.deck.length) return;
      const next = state.index + delta;
      if (next < 0 || next >= state.deck.length) return;
      state.index = next;
      renderCard();
    }

    function markKnow() {
      const card = current();
      if (!card) return;
      state.known.add(card.id);
      state.learning.delete(card.id);
      if (state.index < state.deck.length - 1) {
        state.index += 1;
        renderCard();
      } else if (state.known.size >= state.deck.length) {
        showSummary();
        updateChrome();
      } else {
        // stay on last; flash progress
        renderCard();
      }
    }

    function markLearn() {
      const card = current();
      if (!card) return;
      state.learning.add(card.id);
      state.everLearning.add(card.id);
      state.known.delete(card.id);
      if (state.index < state.deck.length - 1) {
        state.index += 1;
        renderCard();
      } else {
        renderCard();
      }
    }

    function open(openOpts) {
      openOpts = openOpts || {};
      let cards = openOpts.cards || getCards() || [];
      cards = cards.slice();
      if (!cards.length) return false;

      let startIndex = 0;
      if (openOpts.startId) {
        const i = cards.findIndex((c) => c.id === openOpts.startId);
        if (i >= 0) startIndex = i;
      }

      if (openOpts.retryLearningOnly) {
        cards = cards.filter((c) => state.everLearning.has(c.id));
        if (!cards.length) return false;
        startIndex = 0;
      }

      state.deck = cards;
      state.index = startIndex;
      state.flipped = false;
      if (!openOpts.keepProgress) {
        state.known = new Set();
        state.learning = new Set();
        if (!openOpts.retryLearningOnly) state.everLearning = new Set();
      }
      state.active = true;
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("jre-pf-active");
      renderCard();
      if (typeof onOpen === "function") onOpen();
      return true;
    }

    function close() {
      state.active = false;
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      document.body.classList.remove("jre-pf-active");
      if (typeof onClose === "function") onClose();
      if (opts.manageHash !== false) {
        const h = (location.hash || "").replace(/^#/, "");
        if (h === hashOpen || h === "flash" || h === "flashcards") {
          history.replaceState(null, "", "#" + hashClose);
        }
      }
    }

    function onKey(e) {
      if (!state.active) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ($("summary") && !$("summary").hidden) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        }
        return;
      }
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        flipCard();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }

    function bindGestures() {
      const card = $("flipCard");
      if (!card) return;
      const THRESH = 72;

      card.addEventListener("click", () => {
        if (state.touch && state.touch.swiped) return;
        flipCard();
      });

      card.addEventListener(
        "touchstart",
        (e) => {
          if (!state.active || !current()) return;
          const t = e.changedTouches[0];
          state.touch = { x: t.clientX, y: t.clientY, swiped: false };
          card.classList.remove("is-swipe-left", "is-swipe-right");
        },
        { passive: true }
      );

      card.addEventListener(
        "touchmove",
        (e) => {
          if (!state.touch) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - state.touch.x;
          const dy = t.clientY - state.touch.y;
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
        if (!state.touch) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - state.touch.x;
        const dy = t.clientY - state.touch.y;
        card.style.transform = "";
        card.style.opacity = "";
        card.classList.remove("is-swipe-left", "is-swipe-right");
        if (Math.abs(dx) > THRESH && Math.abs(dx) > Math.abs(dy)) {
          state.touch.swiped = true;
          if (dx < 0) markLearn();
          else markKnow();
        }
        setTimeout(() => {
          state.touch = null;
        }, 50);
      };

      card.addEventListener("touchend", endTouch, { passive: true });
      card.addEventListener("touchcancel", () => {
        card.style.transform = "";
        card.style.opacity = "";
        card.classList.remove("is-swipe-left", "is-swipe-right");
        state.touch = null;
      });
    }

    function bindOnce() {
      if (state.bound) return;
      state.bound = true;
      $("close")?.addEventListener("click", close);
      $("exit")?.addEventListener("click", close);
      $("prev")?.addEventListener("click", () => go(-1));
      $("next")?.addEventListener("click", () => go(1));
      $("know")?.addEventListener("click", markKnow);
      $("learn")?.addEventListener("click", markLearn);
      $("restart")?.addEventListener("click", () => open({ keepProgress: false }));
      $("retryLearning")?.addEventListener("click", () => {
        if (!state.everLearning.size) return;
        open({ retryLearningOnly: true, keepProgress: false });
      });
      bindGestures();
      document.addEventListener("keydown", onKey);
    }

    bindOnce();

    return {
      open,
      close,
      isActive: () => state.active,
      hashOpen,
      hashClose,
    };
  }

  global.JrePolicyFlash = { create, ensureOverlay, OVERLAY_ID };
})(typeof window !== "undefined" ? window : globalThis);
