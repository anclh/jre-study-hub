(() => {
  const STORAGE_ANSWER = "jre-q2-answer-v1";
  const STORAGE_MARKS = "jre-q2-marks-v1";
  const STORAGE_DRILL = "jre-q2-drill-id-v1";

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

  // Subnav
  document.querySelectorAll("#subnav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#subnav button").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      $(`#panel-${btn.dataset.panel}`).classList.add("active");
    });
  });

  let drills = [DAI_PAI_DONG];
  let current = DAI_PAI_DONG;

  function renderDrill(d) {
    current = d;
    localStorage.setItem(STORAGE_DRILL, d.id);
    $("#drillSelect").value = d.id;
    $("#drillMeta").innerHTML = `<span class="chip">${d.title_zh}</span>`;
    $("#drillPrompt").textContent = d.prompt;
    const lines = [];
    if (d.pros?.length) lines.push("利：\n- " + d.pros.join("\n- "));
    if (d.cons?.length) lines.push("弊：\n- " + d.cons.join("\n- "));
    if (d.measures?.length) lines.push("措施提示：\n- " + d.measures.join("\n- "));
    $("#drillHints").textContent = lines.join("\n\n") || "（呢題未有提示卡 — 自己由 Policy 頁補。）";
  }

  function fillSelect() {
    const sel = $("#drillSelect");
    sel.innerHTML = drills
      .map((d) => `<option value="${d.id}">${d.title_zh}</option>`)
      .join("");
    sel.onchange = () => {
      const d = drills.find((x) => x.id === sel.value) || drills[0];
      renderDrill(d);
    };
  }

  async function loadBriefs() {
    try {
      const res = await fetch("../policy/data/briefs.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const extras = (data.briefs || []).map((b) => ({
        id: b.id,
        title_zh: b.title_zh || b.heading || b.id,
        prompt: b.prompt || "",
        pros: b.pros || [],
        cons: b.cons || [],
        measures: b.measures || [],
      }));
      drills = [DAI_PAI_DONG, ...extras.filter((b) => b.prompt)];
    } catch (e) {
      drills = [DAI_PAI_DONG];
      toast("Policy briefs 未載入 — 用大牌檔 sample");
    }
    fillSelect();
    const saved = localStorage.getItem(STORAGE_DRILL);
    const pick = drills.find((d) => d.id === saved) || drills[0];
    renderDrill(pick);
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

  // Answer + word count
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

  // Marks
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

  loadBriefs();
})();
