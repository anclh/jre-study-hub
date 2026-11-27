/* Bureaux browse and flashcards use the local portfolio data and the current Q2 bank. */
(() => {
  const DATA_URL = "data/bureaux.json?v=20261127q2sync";
  const Q2_URL = "../q2/data/briefs.json";
  const AS_OF = "2026-11-23";

  const state = {
    pack: null,
    q2Issues: [],
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

  function buildCards() {
    const cards = [];
    state.pack.bureaux.forEach((bureau) => {
      cards.push({
        id: `${bureau.id}-remit`,
        bureauId: bureau.id,
        kind: "職責",
        front: `${bureau.zh}（${bureau.abbr}）的主要職責是甚麼？`,
        frontEn: `What does ${bureau.en} do?`,
        title: bureau.zh,
        titleEn: bureau.en,
        lines: bureau.responsibilities || [],
        status: "決策局職責",
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
          sources: sourceList(update),
        });
      });
    });
    return cards.concat(state.q2Issues.map(({ issue, brief }) => ({
      id: issue.id,
      bureauIds: issue.bureauIds,
      kind: "Q2 議題分工",
      front: `哪一個決策局或機構負責「${brief.title_zh}」？`,
      frontEn: brief.title_en,
      title: issue.lead,
      titleEn: brief.title_en,
      lines: [issue.owner, issue.collaborate, issue.execute].filter(Boolean),
      sources: [...sourceList(issue), { url: policyCardUrl(brief.id), name: "政策溫習卡" }],
    })));
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
              ${sourceHtml(sourceList(row))}
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
    const empty = $("lookup-empty");
    if (!search) return;
    const keywords = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const cards = [...document.querySelectorAll("#browse-view .bureau-card, #browse-view .issue-card")];
    let matches = 0;
    cards.forEach((card) => {
      const text = [card.dataset.kw, card.dataset.keywords, card.textContent].join(" ").toLowerCase();
      const hit = keywords.every((keyword) => text.includes(keyword));
      card.hidden = !hit;
      if (hit) matches += 1;
    });
    if ($("q2-issues").childElementCount) {
      $("issue-lookup").hidden = !document.querySelector("#q2-issues .issue-card:not([hidden])");
    }
    $("other-issue-lookup").hidden = !document.querySelector("#other-issues .issue-card:not([hidden])");
    if (empty) empty.hidden = matches > 0;
  }

  function sourceList(row) {
    const links = [];
    if (row.source) links.push({ url: row.source, name: row.sourceName || "來源" });
    (row.moreSources || []).forEach((item) => {
      if (item && item.url) links.push({ url: item.url, name: item.name || "來源" });
    });
    return links;
  }

  function sourceHtml(links) {
    return (links || [])
      .map(
        (link) =>
          `<a href="${escapeHtml(link.url)}" rel="noopener" target="_blank">${escapeHtml(link.name)} ↗</a>`
      )
      .join(" ");
  }

  function policyCardUrl(briefId) {
    return `../policy/#q2-${encodeURIComponent(briefId)}`;
  }

  function renderIssue(issue, brief) {
    const title = brief?.title_zh || issue.zh;
    const titleEn = brief?.title_en || issue.en;
    const keywords = [issue.keywords, issue.zh, issue.en, ...(issue.bureauIds || [])].join(" ");
    return `<details class="issue-card" id="${escapeHtml(issue.id)}" data-keywords="${escapeHtml(keywords)}"${brief ? ` data-brief-id="${escapeHtml(brief.id)}"` : ""}>
      <summary>
        <span><strong>${escapeHtml(title)}</strong><span class="issue-en" lang="en">${escapeHtml(titleEn)}</span></span>
        <span class="issue-lead">${escapeHtml(issue.lead)}</span>
      </summary>
      <div class="issue-body">
        <dl>
          <dt>主責／統籌</dt><dd>${escapeHtml(issue.owner)}</dd>
          ${issue.collaborate ? `<dt>協作</dt><dd>${escapeHtml(issue.collaborate)}</dd>` : ""}
          <dt>執行</dt><dd>${escapeHtml(issue.execute)}</dd>
        </dl>
        ${!brief && issue.example ? `<p class="issue-example"><strong>答題例句</strong> ${escapeHtml(issue.example)}</p>` : ""}
        <p class="flash-sources">
          ${sourceHtml(sourceList(issue))}
          ${brief ? `<a href="${policyCardUrl(brief.id)}">政策溫習卡 →</a>` : ""}
        </p>
      </div>
    </details>`;
  }

  function renderIssues(q2) {
    const issues = state.pack.issues || [];
    const byBrief = new Map([...issues, ...(state.pack.q2Issues || [])].filter((issue) => issue.briefId).map((issue) => [issue.briefId, issue]));
    state.q2Issues = (q2?.briefs || []).flatMap((brief) => {
      const issue = byBrief.get(brief.id);
      return issue ? [{ issue, brief }] : [];
    });
    $("q2-issues").innerHTML = state.q2Issues.map(({ issue, brief }) => renderIssue(issue, brief)).join("");
    $("other-issues").innerHTML = issues.filter((issue) => !issue.briefId).map((issue) => renderIssue(issue)).join("");
    $("q2-issue-status").innerHTML = q2
      ? `<a href="../q2/#bank">中文 Q2 題庫</a>的主責及執行分工 · ${state.q2Issues.length}／${q2.briefs.length} 題`
      : "暫時無法核對中文 Q2 題庫。請重新整理。";
    filterLookup();
    openLinkedIssue();
  }

  function currentPool() {
    const bureauId = $("flash-bureau") ? $("flash-bureau").value : "all";
    const cards = buildCards();
    return bureauId === "all" ? cards : cards.filter((card) => card.bureauId === bureauId || card.bureauIds?.includes(bureauId));
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
    const sources = card.sources || [];
    if (sources.length) {
      link.hidden = false;
      link.innerHTML = sourceHtml(sources);
    } else {
      link.hidden = true;
      link.innerHTML = "";
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
    let pointer = null;
    $("flash-card").addEventListener("pointerdown", (event) => {
      if (event.target.closest("a, button")) return;
      pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    $("flash-card").addEventListener("pointerup", (event) => {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer = null;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      state.skipFlip = true;
      if (dx < 0) $("flash-next").click();
      else $("flash-prev").click();
    });
    $("flash-card").addEventListener("click", (event) => {
      if (state.skipFlip) {
        state.skipFlip = false;
        return;
      }
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
    if (linked?.matches(".issue-card")) {
      linked.open = true;
      requestAnimationFrame(() => linked.scrollIntoView({ block: "start" }));
    }
  }

  async function loadJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  }

  async function load() {
    const list = $("bureaux-list");
    const flashState = $("flash-state");
    try {
      const [pack, q2] = await Promise.all([
        loadJson(DATA_URL),
        loadJson(Q2_URL).catch(() => null),
      ]);
      state.pack = pack;
      if (!Array.isArray(state.pack.bureaux) || state.pack.bureaux.length !== 15) {
        throw new Error("決策局數目不是 15");
      }
      renderBrowse();
      renderIssues(Array.isArray(q2?.briefs) ? q2 : null);
      fillBureauFilter();
      resetDeck(buildCards());
      if (location.hash === "#flash") setMode("flash");
    } catch (error) {
      const message = "決策局資料暫時載入不到。請再整理頁面。";
      if (list) list.innerHTML = `<p class="bureau-state">${message}</p>`;
      $("q2-issue-status").textContent = message;
      if (flashState) {
        flashState.hidden = false;
        flashState.textContent = message;
      }
    }
  }

  bind();
  filterLookup();
  window.addEventListener("hashchange", openLinkedIssue);
  load();
})();
