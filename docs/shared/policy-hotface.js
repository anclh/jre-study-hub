/**
 * Shared hot-face extractor for policy cards / daily draw.
 * extractHotFace(item) -> { figureOk, figureText, facts, measure }
 */
(function (root) {
  "use strict";

  var INTERVIEW_RE = /面試宜問[^。；;\n]*[。；;]?|面試宜[^。；;\n]*[。；;]?|interview[^.。；;\n]*/gi;
  var VERB_RE =
    /推出|設立|成立|預留|重建|資助|推行|宣布|刊憲|展開|恢復二讀|恢復|徵詢|招募|更新|推進|推動|支持|加強|落實|引入|啟用|擴展|增至|進入|遷置|回收|合作|張貼|調升|調高|提高|發行|歡迎|放寬|施行|豁免|取消|延長|縮短|開設|擴建|興建|招標|撥款|注資|簽訂|通過|修訂/;
  var STRONG_VERB_RE =
    /刊憲|推出|設立|成立|調升|調高|提高|發行|張貼|重建|撥款|注資|開設|擴建|興建|招標|恢復二讀|通過|宣布|展開|引入|啟用|擴展|增至|遷置|回收|資助|推行|放寬|施行|豁免|取消/;
  var WEAK_META_RE = /反映相關政策|致辭|分享會|訪問行程|禮節|政策相關公報|民生／|創科／|以下是|議員議案|總結發言/;
  var ORG_COMPRESS = [
    [/香港金融管理局/g, "金管局"],
    [/香港科技大學/g, "科大"],
    [/香港中文大學/g, "中大"],
    [/香港理工大學/g, "理大"],
    [/香港大學/g, "港大"],
    [/商務及經濟發展局/g, "商經局"],
    [/創新科技及工業局/g, "創科局"],
    [/運輸及物流局/g, "運物局"],
    [/醫務衛生局/g, "醫衛局"],
    [/勞工及福利局/g, "勞福局"],
    [/環境及生態局/g, "環生局"],
    [/財經事務及庫務局/g, "財庫局"],
    [/政制及內地事務局/g, "政制局"],
    [/公務員事務局/g, "公務員局"],
  ];

  function stripInterview(s) {
    return String(s || "")
      .replace(INTERVIEW_RE, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function compressOrgs(s) {
    var out = String(s || "");
    for (var i = 0; i < ORG_COMPRESS.length; i++) {
      out = out.replace(ORG_COMPRESS[i][0], ORG_COMPRESS[i][1]);
    }
    return out;
  }

  function clip(s, max) {
    s = String(s || "").replace(/\s+/g, " ").trim();
    if (!s) return "";
    if (s.length <= max) return s;
    return s.slice(0, max).replace(/[，、,\s…]+$/g, "") + "…";
  }

  function figureScore(snip, index) {
    var sc = 2;
    if (/(?:%|％|萬|億|元|人|間|公頃|幅|戶|床|宗|倍|小時)/.test(snip)) sc = 4;
    else if (/20\d{2}\s*年\s*\d/.test(snip)) sc = 2;
    else if (/20\d{2}\s*年/.test(snip)) sc = 1;
    // Prefer "調升至／提高至／增至" target amounts over baseline "由X"
    if (/每小時/.test(snip)) sc += 2;
    // Slight preference for later matches when scores tie (often the new figure)
    return sc * 1000 - index;
  }

  function findFigure(text) {
    // Prefer "調升／提高／增至" target amounts before scanning generics
    var toAmt = text.match(/(?:調升|提高|上調|增)至\s*(每小時\s*)?(\d+(?:\.\d+)?)\s*元/);
    if (toAmt) {
      var pref = (toAmt[1] ? "每小時" : "") + toAmt[2] + "元";
      return pref.replace(/\s+/g, "");
    }
    var patterns = [
      /(\d{1,2})\s*[x×Ｘ]\s*(\d)/,
      /每小時\s*(\d+(?:\.\d+)?)\s*元/,
      /(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)\s*(?:%|％|萬人|萬元|億元|億港元|港元|萬|億|元|人|間|日|年|宗|倍|公里|公頃|幅|個|項|份|名|座|幢|戶|床|劑|次|小時)/,
      /約?\s*(\d{1,3}(?:[,\s]\d{3})+|\d+)\s*(人|間|個|名|宗|戶|張|隊|幅|公頃)/,
      /(20\d{2})\s*年(?:\s*\d{1,2}\s*月(?:\s*\d{1,2}\s*日)?)?/,
      /(\d+(?:\.\d+)?)\s*(?:至|-|–|—)\s*(\d+(?:\.\d+)?)\s*(%|％|萬|億|人|間|日|元|小時)?/,
      /(\d+(?:\.\d+)?)\s*(?:%|％)/,
    ];
    var best = "";
    var bestScore = -1e9;
    for (var p = 0; p < patterns.length; p++) {
      var re = new RegExp(patterns[p].source, "g");
      var m;
      while ((m = re.exec(text)) !== null) {
        var snip = m[0].replace(/\s+/g, " ").trim();
        if (/^[一二三四五六七八九十百]+$/.test(snip)) continue;
        if (snip.length > 24) snip = snip.slice(0, 24);
        var sc = figureScore(snip, m.index);
        if (sc > bestScore) {
          best = snip;
          bestScore = sc;
        }
      }
    }
    return best;
  }

  function titleMain(title) {
    var t = String(title || "").replace(/\s+/g, " ").trim();
    var cut = t.search(/\s+(?:助|以|為|旨在|加快)/);
    if (cut > 8) t = t.slice(0, cut);
    return t.trim();
  }

  function pickVerbSlice(text) {
    text = String(text || "");
    if (!text) return "";
    var strong = [];
    var re = new RegExp(STRONG_VERB_RE.source, "g");
    var m;
    while ((m = re.exec(text)) !== null) {
      strong.push({ i: m.index, v: m[0] });
    }
    if (strong.length) {
      var pick = strong[strong.length - 1];
      var chunk = text.slice(pick.i).trim();
      var comma = chunk.search(/[，,]/);
      if (comma > 6 && comma <= 36) chunk = chunk.slice(0, comma);
      if (pick.v === "刊憲") {
        var before = text.slice(0, pick.i);
        var ord = before.match(/《([^》]{4,40})》/);
        if (ord) return clip("《" + ord[1] + "》刊憲", 36);
        return "刊憲";
      }
      return clip(chunk, 36);
    }
    var vi = text.search(VERB_RE);
    if (vi >= 0) {
      var c2 = text.slice(vi).trim();
      var cma = c2.search(/[，,]/);
      if (cma > 6 && cma <= 36) c2 = c2.slice(0, cma);
      return clip(c2, 36);
    }
    return "";
  }

  function extractMeasure(item) {
    var title = titleMain(item.title || "");
    var summary = stripInterview(item.summary || "");
    var best = pickVerbSlice(title);

    if (!best || best.length < 2 || WEAK_META_RE.test(best)) {
      var parts = summary.split(/[。；;]/).filter(Boolean);
      for (var i = 0; i < parts.length; i++) {
        var s = parts[i].trim();
        if (!s || WEAK_META_RE.test(s)) continue;
        var cand = pickVerbSlice(s);
        if (cand && !WEAK_META_RE.test(cand) && cand.length > 2) {
          best = cand;
          break;
        }
      }
    }

    // Avoid ultra-short weak leftovers like bare 「合作」
    if (!best || best.length < 3 || WEAK_META_RE.test(best)) {
      best = compressOrgs(clip(title, 32)) || "（見政策卡措施）";
    }
    best = compressOrgs(best);
    if (best.length > 36) {
      var c = best.search(/[，,]/);
      if (c > 8 && c <= 36) best = best.slice(0, c);
      else best = clip(best, 34);
    }
    return best || "（見政策卡措施）";
  }

  function overlapRatio(a, b) {
    a = String(a || "");
    b = String(b || "");
    if (!a || !b) return 0;
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0) return 1;
    var set = {};
    for (var i = 0; i < a.length - 1; i++) set[a.slice(i, i + 2)] = true;
    var hit = 0;
    var tot = 0;
    for (var j = 0; j < b.length - 1; j++) {
      tot++;
      if (set[b.slice(j, j + 2)]) hit++;
    }
    return tot ? hit / tot : 0;
  }

  function extractFacts(item, measure) {
    var facts = [];
    var title = titleMain(item.title || "");
    var summary = stripInterview(item.summary || "");
    var measureC = compressOrgs(measure || "");

    // Compress first, THEN find verb — avoids index mismatch on raw title
    var tCompressed = compressOrgs(title).replace(/與/g, "×");
    var vi = tCompressed.search(VERB_RE);
    if (vi > 0) {
      var actorPart = tCompressed.slice(0, vi).replace(/[×與和及\s]+$/, "");
      var combo = clip(actorPart + measureC, 36);
      if (combo.length >= 6) facts.push(combo);
    }
    if (!facts.length && tCompressed) {
      facts.push(clip(tCompressed, 36));
    }

    var clauses = [];
    summary.split(/[。；;]/).forEach(function (sent) {
      sent = sent.trim();
      if (!sent) return;
      sent.split(/[，,]/).forEach(function (p) {
        p = p.trim();
        if (p) clauses.push(p);
      });
    });

    var preferRe = /配合|同步|涵蓋|涉及|新增|達至|約|超過|逾|合共|共有|首批|分階|分層|過渡|框架|指數|機制|平台|條例|草案|計劃|措施|歸還|遷出|適用於/;
    var candidates = [];
    for (var i = 0; i < clauses.length; i++) {
      var c = compressOrgs(clauses[i]);
      if (c.length < 6) continue;
      if (WEAK_META_RE.test(c)) continue;
      if (overlapRatio(c, measureC) >= 0.75) continue;
      if (facts.length && overlapRatio(c, facts[0]) >= 0.75) continue;
      if (/^政策相關公報|^民生／|^創科／|^以下是|^反映相關/.test(c)) continue;
      var score = preferRe.test(c) ? 2 : 1;
      if (c.length > 36) c = clip(c, 34);
      candidates.push({ text: c, score: score, len: c.length });
    }
    candidates.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.len - b.len;
    });

    for (var k = 0; k < candidates.length && facts.length < 2; k++) {
      var f = candidates[k].text;
      if (facts.some(function (x) { return overlapRatio(x, f) >= 0.7; })) continue;
      facts.push(clip(f, 36));
    }

    facts = facts
      .map(function (x) { return clip(x, 36); })
      .filter(Boolean)
      .slice(0, 2);

    if (!facts.length) {
      var fb = clip(compressOrgs(title || summary), 32);
      if (fb) facts.push(fb);
    }
    return facts;
  }

  function extractHotFace(item) {
    item = item || {};
    var summary = stripInterview(item.summary || "");
    var title = String(item.title || "");
    var figureText = findFigure((summary + " " + title).replace(/\s+/g, " "));
    var measure = extractMeasure(item);
    var figureOk = !!figureText;
    var facts = figureOk ? [] : extractFacts(item, measure);

    if (!figureOk && facts.length) {
      facts = facts.filter(function (f, idx) {
        if (overlapRatio(f, measure) >= 0.88 && facts.length > 1 && idx > 0) return false;
        return true;
      });
      if (facts.length === 1 && overlapRatio(facts[0], measure) >= 0.88) {
        var t = compressOrgs(titleMain(title)).replace(/與/g, "×");
        var vix = t.search(VERB_RE);
        if (vix > 0) {
          facts = [clip(t.slice(0, vix).replace(/[×與和及]+$/, "") + "：" + measure, 36)];
        }
      }
    }

    return {
      figureOk: figureOk,
      figureText: figureText || "",
      facts: facts,
      measure: measure,
    };
  }

  root.extractHotFace = extractHotFace;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { extractHotFace: extractHotFace };
  }
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
