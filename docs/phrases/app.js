(() => {
  const STAGE_CATEGORIES = ["position", "arguments", "rebuttal", "recommend", "balance", "close"];
  const $ = (sel) => document.querySelector(sel);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const escapeAttr = (value) => escapeHtml(value);
  const phraseState = { data: { disclaimer: "", categories: [], items: [] } };

  function categoryLabel(id) {
    const category = phraseState.data.categories.find((item) => item.id === id);
    return category?.zh || "其他";
  }

  function phraseCardHTML(item, showCategory) {
    const paper = item.paper === "q2" ? "Q2" : item.paper === "common" ? "常用" : item.paper || "";
    const pills = [];
    if (showCategory) pills.push(`<span class="cat-pill">${escapeHtml(categoryLabel(item.category))}</span>`);
    if (paper) pills.push(`<span class="cat-pill paper">${escapeHtml(paper)}</span>`);
    return `<article class="phrase-card">
      ${pills.length ? `<div class="meta">${pills.join(" ")}</div>` : ""}
      <p class="zh">${escapeHtml(item.zh || "")}</p>
      <p class="en">${escapeHtml(item.en || "")}</p>
      ${item.note ? `<div class="meta">${escapeHtml(item.note)}</div>` : ""}
      ${item.example ? `<p class="ex">${escapeHtml(item.example)}</p>` : ""}
      <button type="button" class="btn-copy" data-zh="${escapeAttr(item.zh || "")}" data-en="${escapeAttr(item.en || "")}">複製句式</button>
    </article>`;
  }

  function render() {
    const query = $("#q2PhraseSearch").value.trim().toLowerCase();
    const list = phraseState.data.items.filter((item) => {
      const paper = item.paper || "";
      const inQ2Bank = paper === "q2" || paper === "common" || paper === "";
      const matchesQuery = `${item.zh} ${item.en} ${item.category} ${item.note || ""} ${item.example || ""}`.toLowerCase().includes(query);
      return inQ2Bank && matchesQuery;
    });
    $("#q2PhraseCount").textContent = `${list.length} 句`;
    $("#q2PhraseDisclaimer").textContent = phraseState.data.disclaimer || "";
    const grouped = new Map();
    list.forEach((item) => {
      const key = item.category || "other";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(item);
    });
    const known = new Set(STAGE_CATEGORIES);
    const order = [...STAGE_CATEGORIES, ...[...grouped.keys()].filter((key) => !known.has(key))];
    const nav = $("#q2StageNav");
    nav.innerHTML = order.map((id) => `<a href="#phrase-${escapeAttr(id)}">${escapeHtml(categoryLabel(id))}</a>`).join("");
    $("#q2PhrasesRoot").innerHTML = order.map((id) => {
      const items = grouped.get(id) || [];
      const label = categoryLabel(id);
      const cards = items.length
        ? items.map((item) => phraseCardHTML(item, !known.has(id))).join("")
        : '<p class="muted stage-empty">沒有符合的句式。</p>';
      return `<section class="card stage-card" id="phrase-${escapeAttr(id)}"><h2>${escapeHtml(label)} <span class="chip">${items.length} 句</span></h2><div class="phrase-grid">${cards}</div></section>`;
    }).join("");
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.querySelectorAll("a").forEach((item) => item.classList.toggle("active", item === link));
    }));
  }

  document.addEventListener("input", (event) => {
    if (event.target.id === "q2PhraseSearch") render();
  });
  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".btn-copy");
    if (!button) return;
    try {
      await navigator.clipboard.writeText(`${button.dataset.zh || ""}\n${button.dataset.en || ""}`.trim());
      $("#toast").textContent = "已複製句式";
      $("#toast").classList.add("show");
      setTimeout(() => $("#toast").classList.remove("show"), 1600);
    } catch {
      $("#toast").textContent = "複製失敗 — 請手動選取";
      $("#toast").classList.add("show");
      setTimeout(() => $("#toast").classList.remove("show"), 1600);
    }
  });

  fetch("../q2/data/q2_phrases.json?v=20261108a", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .then((data) => {
      phraseState.data = data;
      $("#q2PhraseStatus").textContent = "";
      render();
    })
    .catch((error) => {
      $("#q2PhraseStatus").innerHTML = '<div class="empty">未能載入句式庫（q2/data/q2_phrases.json）。</div>';
      console.error(error);
    });
})();
