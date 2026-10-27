/**
 * Headless check of the vocab browse list: compact cards, in-place expand,
 * save without toggling, and the saved grid sharing the same card markup.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8765;
const CDP_PORT = 9334;

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".json")) return "application/json";
  return "application/octet-stream";
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.normalize(path.join(root, rel));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "content-type": contentType(file), "cache-control": "no-store" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

function startChrome() {
  const userDir = "/tmp/chrome-vocab-browse-af97";
  fs.rmSync(userDir, { recursive: true, force: true });
  const chrome = spawn(
    "google-chrome",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${userDir}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );
  return chrome;
}

async function waitFor(fn, label, tries = 40) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  throw new Error(`${label}: ${last && last.message ? last.message : last}`);
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let seq = 0;
  const pending = new Map();
  const waiters = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
      return;
    }
    for (const w of waiters) {
      if (w.method === msg.method) w.resolve(msg.params);
    }
  });
  return new Promise((resolve, reject) => {
    ws.addEventListener("open", () => {
      resolve({
        send(method, params = {}, sessionId) {
          const id = ++seq;
          return new Promise((res, rej) => {
            pending.set(id, { resolve: res, reject: rej });
            const payload = { id, method, params };
            if (sessionId) payload.sessionId = sessionId;
            ws.send(JSON.stringify(payload));
          });
        },
        close() {
          ws.close();
        },
      });
    });
    ws.addEventListener("error", () => reject(new Error("cdp websocket failed")));
  });
}

async function evalJs(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(JSON.stringify(result.exceptionDetails.exception || result.exceptionDetails));
  }
  return result.result.value;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  const server = await startServer();
  const chrome = startChrome();
  let cdp;
  try {
    const version = await waitFor(
      () => fetch(`http://127.0.0.1:${CDP_PORT}/json/version`).then((r) => r.json()),
      "cdp"
    );
    cdp = await connect(version.webSocketDebuggerUrl);
    const { targetId } = await cdp.send("Target.createTarget", {
      url: `http://127.0.0.1:${PORT}/docs/vocab/index.html`,
    });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    const browserSend = cdp.send.bind(cdp);
    cdp.send = (method, params) => browserSend(method, params, sessionId);

    await cdp.send("Runtime.enable");
    await cdp.send("Page.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    const ready = await waitFor(async () => {
      const n = await evalJs(cdp, `document.querySelectorAll("#vocabGrid .vocab-card").length`);
      if (!n) throw new Error("grid empty");
      return n;
    }, "vocab cards");
    console.log(`loaded ${ready} cards`);

    const shot = async (name, selector = "#vocabGrid") => {
      const box = await evalJs(cdp, `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        const r = el.getBoundingClientRect();
        return {
          x: Math.max(0, r.left + window.scrollX),
          y: Math.max(0, r.top + window.scrollY),
          width: Math.max(1, r.width),
          height: 1100,
        };
      })()`);
      const { data } = await cdp.send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { ...box, scale: 1 },
      });
      fs.writeFileSync(`/tmp/vocab-${name}.png`, Buffer.from(data, "base64"));
    };
    await shot("collapsed-light");

    const collapsed = await evalJs(cdp, `(() => {
      const card = document.querySelector("#vocabGrid .vocab-card");
      const details = card.querySelector(".card-details");
      const summary = card.querySelector(".card-summary").innerText;
      const style = details ? getComputedStyle(details).display : "missing";
      return {
        term: card.dataset.term,
        summary,
        display: style,
        hidden: details ? details.hidden : null,
        leaked: /同義詞|反義詞|例句/.test(summary),
        hasSave: !!card.querySelector(".card-actions .btn-save"),
        saveInDetails: !!card.querySelector(".card-details .btn-save"),
        expandable: card.dataset.expandable,
      };
    })()`);
    console.log("collapsed", collapsed);
    assert(collapsed.expandable === "true", "card should be expandable");
    assert(collapsed.display === "none", "details should be display:none");
    assert(collapsed.hidden === true, "details hidden attribute");
    assert(collapsed.leaked === false, "summary leaked detail labels: " + collapsed.summary);
    assert(collapsed.hasSave === true, "save button visible in actions");
    assert(collapsed.saveInDetails === false, "save button must stay outside details");
    assert(collapsed.summary.includes(collapsed.term), "summary shows term");

    await evalJs(cdp, `document.querySelector("#vocabGrid .vocab-card .card-summary").click()`);
    const opened = await evalJs(cdp, `(() => {
      const card = document.querySelector("#vocabGrid .vocab-card");
      const details = card.querySelector(".card-details");
      return {
        expanded: card.classList.contains("is-expanded"),
        hidden: details.hidden,
        display: getComputedStyle(details).display,
        text: details.innerText,
        aria: card.querySelector(".card-summary").getAttribute("aria-expanded"),
      };
    })()`);
    console.log("opened", { ...opened, text: opened.text.slice(0, 180) });
    assert(opened.expanded, "card expanded");
    assert(opened.hidden === false, "hidden cleared");
    assert(opened.display === "flex", "details shown");
    assert(opened.aria === "true", "aria-expanded");
    assert(opened.text.includes("同義詞") || opened.text.includes("例句") || opened.text.includes("反義詞"), "details show fields");
    assert(opened.text.includes("收起"), "collapse control");
    await shot("expanded-light");

    const second = await evalJs(cdp, `(() => {
      const cards = [...document.querySelectorAll("#vocabGrid .vocab-card")];
      cards[1].querySelector(".card-summary").click();
      return {
        first: cards[0].classList.contains("is-expanded"),
        second: cards[1].classList.contains("is-expanded"),
        openCount: document.querySelectorAll("#vocabGrid .vocab-card.is-expanded").length,
      };
    })()`);
    console.log("one open", second);
    assert(second.first === false && second.second === true, "only the tapped card stays open");
    assert(second.openCount === 1, "one expanded card in the browse grid");

    await evalJs(cdp, `document.querySelectorAll("#vocabGrid .vocab-card")[1].querySelector(".btn-collapse").click()`);
    const collapsedAgain = await evalJs(
      cdp,
      `document.querySelectorAll("#vocabGrid .vocab-card.is-expanded").length`
    );
    assert(collapsedAgain === 0, "收起 collapses the card");

    const saveResult = await evalJs(cdp, `(() => {
      const card = document.querySelector("#vocabGrid .vocab-card");
      const term = card.dataset.term;
      const wasExpanded = card.classList.contains("is-expanded");
      card.querySelector(".btn-save").click();
      const next = document.querySelector("#vocabGrid .vocab-card[data-term='" + term.replace(/'/g, "") + "']");
      const raw = localStorage.getItem("jre-vocab-saved-v1");
      const saved = JSON.parse(raw);
      return {
        wasExpanded,
        stillExpanded: next.classList.contains("is-expanded"),
        hasSavedClass: next.classList.contains("saved"),
        label: next.querySelector(".btn-save").textContent,
        stored: Object.keys(saved).includes(term.toLowerCase()),
        key: raw.includes("savedAt"),
      };
    })()`);
    console.log("save", saveResult);
    assert(saveResult.wasExpanded === false, "started collapsed");
    assert(saveResult.stillExpanded === false, "save must not expand the card");
    assert(saveResult.hasSavedClass === true, "saved style");
    assert(saveResult.label.includes("已收藏"), "save label updated");
    assert(saveResult.stored === true, "localStorage jre-vocab-saved-v1");

    const savedGrid = await evalJs(cdp, `(() => {
      document.querySelector('#nav button[data-panel="saved"]').click();
      const card = document.querySelector("#savedGrid .vocab-card");
      const details = card.querySelector(".card-details");
      const summary = card.querySelector(".card-summary").innerText;
      return {
        count: document.querySelectorAll("#savedGrid .vocab-card").length,
        display: getComputedStyle(details).display,
        leaked: /同義詞|反義詞|例句/.test(summary),
        label: card.querySelector(".btn-save").textContent,
      };
    })()`);
    console.log("saved grid", savedGrid);
    assert(savedGrid.count === 1, "saved grid has the card");
    assert(savedGrid.display === "none", "saved card starts collapsed");
    assert(savedGrid.leaked === false, "saved card leaked details");
    assert(savedGrid.label.includes("已收藏"), "saved grid save button");

    await evalJs(cdp, `document.querySelector("#savedGrid .card-summary").click()`);
    const savedOpen = await evalJs(cdp, `(() => {
      const card = document.querySelector("#savedGrid .vocab-card");
      return {
        expanded: card.classList.contains("is-expanded"),
        text: card.querySelector(".card-details").innerText.slice(0, 80),
      };
    })()`);
    assert(savedOpen.expanded, "saved card expands in place");

    const keepOpen = await evalJs(cdp, `(() => {
      const card = document.querySelector("#savedGrid .vocab-card");
      card.querySelector(".btn-save").click();
      const grid = document.querySelector("#savedGrid");
      return { empty: grid.innerText.includes("尚未收藏"), expandedGone: !document.querySelector("#savedGrid .is-expanded") };
    })()`);
    console.log("unsave", keepOpen);
    assert(keepOpen.empty === true, "unsaving from the saved list removes the card");

    await evalJs(cdp, `document.querySelector('#nav button[data-panel="vocab"]').click()`);
    const source = await evalJs(cdp, `(() => {
      const input = document.querySelector("#vocabSearch");
      input.value = "enforcement";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const card = document.querySelector('#vocabGrid .vocab-card[data-term="enforcement"]');
      if (!card) return { missing: true, count: document.querySelectorAll("#vocabGrid .vocab-card").length };
      const summary = card.querySelector(".card-summary").innerText;
      card.querySelector(".card-summary").click();
      const link = card.querySelector(".card-details a");
      let navigated = false;
      if (link) link.addEventListener("click", (e) => e.preventDefault(), true);
      if (link) link.click();
      return {
        missing: false,
        summaryLeak: /同義詞|原文|Press|新聞/.test(summary),
        expandedAfterLink: card.classList.contains("is-expanded"),
        href: link ? link.getAttribute("href") : "",
        detailsText: card.querySelector(".card-details").innerText.slice(0, 160),
      };
    })()`);
    console.log("source", source);
    assert(source.missing === false, "enforcement card rendered");
    assert(source.summaryLeak === false, "source text hidden until expand");
    assert(source.expandedAfterLink === true, "source link must not collapse the card");
    assert(source.href.startsWith("http"), "source href kept");
    assert(source.detailsText.includes("原文") || source.detailsText.includes("同義詞"), "expanded source/details");

    await evalJs(cdp, `document.querySelector("#btnTheme").click()`);
    const theme = await evalJs(cdp, `document.documentElement.getAttribute("data-theme")`);
    assert(theme === "dark", "theme toggle still works");
    await shot("expanded-dark", '#vocabGrid .vocab-card[data-term="enforcement"]');

    const study = await evalJs(cdp, `(() => {
      document.querySelector("#vocabSearch").value = "";
      document.querySelector("#vocabSearch").dispatchEvent(new Event("input", { bubbles: true }));
      document.querySelector("#btnStartStudy").click();
      const overlay = document.querySelector("#studyOverlay");
      const opened = overlay.hidden === false;
      const term = document.querySelector("#flipTerm").textContent;
      const save = document.querySelector("#btnStudySave").textContent;
      document.querySelector("#btnStudyClose").click();
      return { opened, term, save, closed: document.querySelector("#studyOverlay").hidden };
    })()`);
    console.log("study", study);
    assert(study.opened === true && study.term, "flip study still opens");
    assert(study.closed === true, "flip study still closes");

    console.log("browser checks passed");
  } finally {
    if (cdp) cdp.close();
    chrome.kill("SIGKILL");
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
