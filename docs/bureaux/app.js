/* Bureaux browse + flashcards. Both modes read data/bureaux.json. No localStorage. */
(() => {
  const DATA_URL = "data/bureaux.json?v=20261118b";
  const AS_OF = "2026-11-18";

  const state = {
    pack: null,
    mode: "browse",
    deck: [],
    index: 0,
    flipped: false,
  };

  const $ = (id) => document.getElementById(id);

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildCards(bureaux) {
    const cards = [];
    (bureaux || []).forEach((bureau) => {
      cards.push({
        id: `${bureau.id}-remit`,
        bureauId: bureau.id,
        kind: "職責",
        front: `${bureau.zh}（${bureau.abbr}）的主要職責是甚麼？`,
        frontEn: `What does ${bureau.en} do?`,
        title: bureau.zh,
        titleEn: bureau.en,
        lines: bureau.responsibilities || [],
        status: "職責（今次沒有改寫）",
        date: "",
        source: "",
        sourceName: "",
      });
      (bureau.updates || []).forEach((update) => {
        cards.push({
          id: update.id,
          bureauId: bureau.id,
          kind: "措施",
          front: `哪一個決策局主責「${update.title}」？現況和關鍵事實是甚麼？`,
          frontEn: update.titleEn || "",
          title: `${bureau.zh} · ${update.title}`,
          titleEn: `${bureau.en} · ${update.titleEn || ""}`,
          lines: update.facts || [],
          status: update.statusZh || "",
          date: update.date || "",
          source: update.source || "",
          sourceName: update.sourceName || "來源",
        });
      });
    });
    return cards;
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function renderBureau(bureau) {
    const duties = (bureau.responsibilities || [])
      .map((row) => `<li>${escapeHtml(row)}</li>`)
      .join("");
    const updates = bureau.updates || [];
    const updateHtml = updates.length
      ? `<ul class="update-list">${updates
          .map(
            (row) => `<li>
              <p class="update-title"><strong>${escapeHtml(row.title)}</strong>
                <span class="update-status">${escapeHtml(row.statusZh || "")}</span></p>
              <p class="update-meta">${escapeHtml(row.date || "")}${row.titleEn ? ` · ${escapeHtml(row.titleEn)}` : ""}</p>
              <ul>${(row.facts || []).map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul>
              ${
                row.source
                  ? `<a href="${escapeHtml(row.source)}" rel="noopener" target="_blank">${escapeHtml(row.sourceName || "來源")} ↗</a>`
                  : ""
              }
            </li>`
          )
          .join("")}</ul>`
      : `<p class="update-empty">截至 ${AS_OF}，這頁未有新增已核實的局方措施。職責維持不變。</p>`;
    const older = (bureau.policyFocus || [])
      .filter((row) => !row.fresh)
      .map((row) => `<li><strong>${escapeHtml(row.title || "")}</strong> ${escapeHtml(row.text || "")}</li>`)
      .join("");
    return `<article class="bureau-card" id="bureau-${escapeHtml(bureau.id)}" data-kw="${escapeHtml(
      [bureau.keywords, bureau.zh, bureau.en, bureau.abbr].join(" ")
    )}">
      <div class="b-header">
        <div class="b-title">
          <h2>${escapeHtml(bureau.zh)}</h2>
          <div class="en">${escapeHtml(bureau.en)} (${escapeHtml(bureau.abbr)})</div>
        </div>
        <span class="b-badge">${escapeHtml(bureau.abbr)}</span>
      </div>
      <div class="bureau-detail">
        <section>
          <h3 class="sec-label">主要職責</h3>
          <ul class="responsibilities">${duties}</ul>
        </section>
        <section>
          <h3 class="sec-label">截至 ${AS_OF} 的近期措施</h3>
          ${updateHtml}
          ${
            older
              ? `<h3 class="sec-label older-label">頁內原有政策重點（今次未逐項重核）</h3><ul>${older}</ul>`
              : ""
          }
        </section>
      </div>
      <div class="depts-tag"><strong>執行署／機構：</strong> ${escapeHtml(bureau.departments || "")}</div>
    </article>`;
  }

  function filterLookup() {
    const search = $("search");
    const issueLookup = $("issue-lookup");
    const empty = $("lookup-empty");
    if (!search) return;
    const keywords = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const cards = [...document.querySelectorAll("#browse-view .bureau-card, #browse-view .issue-card")];
    let matches = 0;
    let issues = 0;
    cards.forEach((card) => {
      const text = [card.dataset.kw, card.dataset.keywords, card.textContent].join(" ").toLowerCase();
      const hit = keywords.every((keyword) => text.includes(keyword));
      card.hidden = !hit;
      if (hit) {
        matches += 1;
        if (card.matches(".issue-card")) issues += 1;
      }
    });
    if (issueLookup) issueLookup.hidden = issues === 0;
    if (empty) empty.hidden = matches > 0;
  }

  function currentPool() {
    const bureauId = $("flash-bureau") ? $("flash-bureau").value : "all";
    const cards = buildCards(state.pack.bureaux || []);
    return bureauId === "all" ? cards : cards.filter((card) => card.bureauId === bureauId);
  }

  function showCard() {
    const card = state.deck[state.index];
    const face = $("flash-card");
    const stateLine = $("flash-state");
    const progress = $("flash-progress");
    if (!card) {
      if (face) face.hidden = true;
      if (stateLine) {
        stateLine.hidden = false;
        stateLine.textContent = "這個範圍沒有閃卡。";
      }
      if (progress) progress.textContent = "0 / 0";
      return;
    }
    if (stateLine) stateLine.hidden = true;
    if (face) face.hidden = false;
    $("flash-kicker").textContent = card.kind;
    $("flash-front").textContent = card.front;
    $("flash-front-en").textContent = card.frontEn;
    $("flash-back-title").textContent = card.title;
    $("flash-back-en").textContent = card.titleEn;
    $("flash-back-lines").innerHTML = (card.lines || []).map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    $("flash-back-status").textContent = [card.status, card.date].filter(Boolean).join(" · ");
    const link = $("flash-back-source");
    if (card.source) {
      link.hidden = false;
      link.href = card.source;
      link.textContent = `${card.sourceName} ↗`;
    } else {
      link.hidden = true;
      link.removeAttribute("href");
      link.textContent = "";
    }
    $("flash-back").hidden = !state.flipped;
    $("flash-flip").textContent = state.flipped ? "收回答案" : "翻面";
    $("flash-flip").setAttribute("aria-expanded", state.flipped ? "true" : "false");
    if (progress) progress.textContent = `${state.index + 1} / ${state.deck.length}`;
  }

  function resetDeck(nextDeck) {
    state.deck = nextDeck;
    state.index = 0;
    state.flipped = false;
    showCard();
  }

  function fillBureauFilter() {
    const select = $("flash-bureau");
    if (!select) return;
    const current = select.value || "all";
    const options = ['<option value="all">全部 15 局</option>'];
    (state.pack.bureaux || []).forEach((bureau) => {
      options.push(
        `<option value="${escapeHtml(bureau.id)}">${escapeHtml(bureau.zh)} ${escapeHtml(bureau.abbr)}</option>`
      );
    });
    select.innerHTML = options.join("");
    select.value = [...select.options].some((option) => option.value === current) ? current : "all";
  }

  function renderBrowse() {
    const list = $("bureaux-list");
    if (!list || !state.pack) return;
    const bureaux = state.pack.bureaux || [];
    list.innerHTML = bureaux.map(renderBureau).join("");
    filterLookup();
  }

  function setMode(mode) {
    state.mode = mode === "flash" ? "flash" : "browse";
    const flash = state.mode === "flash";
    $("browse-view").hidden = flash;
    $("flash-view").hidden = !flash;
    $("tab-browse").setAttribute("aria-selected", flash ? "false" : "true");
    $("tab-flash").setAttribute("aria-selected", flash ? "true" : "false");
    const next = flash ? "#flash" : location.pathname + location.search;
    if (flash) {
      if (location.hash !== "#flash") history.replaceState(null, "", "#flash");
    } else if (location.hash === "#flash") {
      history.replaceState(null, "", next);
    }
  }

  function bind() {
    $("tab-browse").addEventListener("click", () => setMode("browse"));
    $("tab-flash").addEventListener("click", () => setMode("flash"));
    $("search").addEventListener("input", filterLookup);
    $("flash-flip").addEventListener("click", () => {
      state.flipped = !state.flipped;
      showCard();
    });
    $("flash-card").addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      state.flipped = !state.flipped;
      showCard();
    });
    $("flash-prev").addEventListener("click", () => {
      if (!state.deck.length) return;
      state.index = (state.index - 1 + state.deck.length) % state.deck.length;
      state.flipped = false;
      showCard();
    });
    $("flash-next").addEventListener("click", () => {
      if (!state.deck.length) return;
      state.index = (state.index + 1) % state.deck.length;
      state.flipped = false;
      showCard();
    });
    $("flash-shuffle").addEventListener("click", () => {
      resetDeck(shuffle(currentPool()));
    });
    $("flash-bureau").addEventListener("change", () => {
      resetDeck(currentPool());
    });
    document.addEventListener("keydown", (event) => {
      if (state.mode !== "flash") return;
      const tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowRight") {
        $("flash-next").click();
      } else if (event.key === "ArrowLeft") {
        $("flash-prev").click();
      } else if (event.key === " " || event.key === "Enter") {
        if (event.target.closest && event.target.closest("button, a, select, input")) return;
        event.preventDefault();
        state.flipped = !state.flipped;
        showCard();
      }
    });
  }

  function openLinkedIssue() {
    const id = location.hash.slice(1);
    if (!id || id === "flash") return;
    const linked = document.getElementById(id);
    if (linked && linked.matches(".issue-card")) linked.open = true;
  }

  async function load() {
    const list = $("bureaux-list");
    const flashState = $("flash-state");
    try {
      const response = await fetch(DATA_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      state.pack = await response.json();
      if (!Array.isArray(state.pack.bureaux) || state.pack.bureaux.length !== 15) {
        throw new Error("決策局數目不是 15");
      }
      renderBrowse();
      fillBureauFilter();
      resetDeck(buildCards(state.pack.bureaux));
      if (location.hash === "#flash") setMode("flash");
    } catch (error) {
      const message = "決策局資料暫時載入不到。請再整理頁面。";
      if (list) list.innerHTML = `<p class="bureau-state">${message}</p>`;
      if (flashState) {
        flashState.hidden = false;
        flashState.textContent = message;
      }
    }
  }

  bind();
  filterLookup();
  openLinkedIssue();
  load();
})();
