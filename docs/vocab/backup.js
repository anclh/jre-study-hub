/* Narrow, versioned manual backups. Shared by Q1 through ../vocab/backup.js. */
(() => {
  'use strict';
  const MAX_BYTES = 2 * 1024 * 1024;
  const MARKS = ['opening', 'problems', 'options', 'recommend', 'dfcite', 'tone', 'concise'];
  const fail = (message) => { throw new Error(message); };
  const record = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
  const text = (x) => typeof x === 'string' && x.length <= 100000;
  function safeTree(x, depth = 0) {
    if (depth > 10) fail('資料層次過多 / Data too deeply nested');
    if (x === null || typeof x === 'boolean' || (typeof x === 'number' && Number.isFinite(x))) return;
    if (text(x)) return;
    if (Array.isArray(x) && x.length <= 10000) return x.forEach(v => safeTree(v, depth + 1));
    if (record(x)) return Object.entries(x).forEach(([k, v]) => {
      if (['__proto__', 'prototype', 'constructor'].includes(k)) fail('不安全的欄位 / Unsafe field');
      safeTree(v, depth + 1);
    });
    fail('資料類型不符 / Invalid data type');
  }
  function cards(items) {
    if (!Array.isArray(items) || items.length > 10000) fail('生字須為陣列（最多 10,000 筆）/ Invalid vocabulary list');
    items.forEach(c => {
      if (!record(c) || !text(c.term) || !c.term.trim()) fail('每筆須有 term / Missing word');
      safeTree(c);
      for (const k of ['zh', 'pos', 'note', 'example', 'topic', 'savedAt', 'matchedSpan', 'phraseId']) {
        if (k in c && !text(c[k])) fail(`欄位須為文字 / Text required: ${k}`);
      }
      for (const k of ['synonyms', 'antonyms', 'related']) {
        if (k in c && (!Array.isArray(c[k]) || !c[k].every(text))) fail(`無效詞組 / Invalid list: ${k}`);
      }
      if ('examples' in c && (!Array.isArray(c.examples) || !c.examples.every(e => text(e) ||
        (record(e) && Object.keys(e).every(k => ['en', 'zh'].includes(k)) && Object.values(e).every(text))))) fail('例句格式不符 / Invalid examples');
      if ('source' in c) {
        if (!record(c.source) || !Object.values(c.source).every(text)) fail('來源格式不符 / Invalid source');
        if (c.source.link && !/^https?:\/\//i.test(c.source.link)) fail('來源連結須為 http(s) / Invalid source URL');
      }
    });
    return items;
  }
  function marks(data) {
    if (!record(data) || Object.entries(data).some(([k, v]) => !MARKS.includes(k) || typeof v !== 'boolean')) fail('自評欄位不符 / Invalid checklist');
    return data;
  }
  function validate(kind, data) {
    if (kind === 'vocab') return cards(data);
    if (kind === 'q1-checklist') return marks(data);
    fail('不支援的備份類型 / Unsupported backup kind');
  }
  function envelope(kind, data) {
    validate(kind, data);
    return {format: 'jre-study-backup', version: 1, kind, exportedAt: new Date().toISOString(), data};
  }
  function parseCSV(input) {
    const rows = [], row = []; let cell = '', quoted = false, ended = false;
    input = input.replace(/^\uFEFF/, '');
    for (let i = 0; i < input.length; i++) {
      const c = input[i];
      if (quoted) {
        if (c === '"' && input[i + 1] === '"') { cell += '"'; i++; }
        else if (c === '"') { quoted = false; ended = true; }
        else cell += c;
      } else if (c === '"') {
        if (cell || ended) fail('CSV 引號錯誤 / Invalid CSV quote');
        quoted = true;
      } else if (c === ',' || c === '\n' || c === '\r') {
        row.push(cell); cell = ''; ended = false;
        if (c !== ',') {
          rows.push(row.splice(0));
          if (c === '\r' && input[i + 1] === '\n') i++;
        }
      } else {
        if (ended) fail('CSV 引號後有多餘文字 / Invalid CSV after quote');
        cell += c;
      }
    }
    if (quoted) fail('CSV 引號未完成 / Unclosed CSV quote');
    if (cell || row.length || ended) { row.push(cell); rows.push(row); }
    return rows;
  }
  const csv = rows => '\uFEFF' + rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n') + '\r\n';
  function encode(kind, data, format) {
    const value = envelope(kind, data);
    if (format === 'json') return JSON.stringify(value, null, 2);
    if (format !== 'csv') fail('不支援的格式 / Unsupported format');
    return kind === 'vocab'
      ? csv([['format', 'version', 'kind', 'term', 'zh', 'card_json'], ...data.map(c => ['jre-study-backup', 1, kind, c.term, c.zh || '', JSON.stringify(c)])])
      : csv([['format', 'version', 'kind', 'key', 'checked'], ...Object.entries(data).map(([k, v]) => ['jre-study-backup', 1, kind, k, v])]);
  }
  function decode(kind, input, format) {
    if (new Blob([input]).size > MAX_BYTES) fail('檔案上限 2 MB / File limit: 2 MB');
    let value;
    if (format === 'json') {
      value = JSON.parse(input.replace(/^\uFEFF/, ''));
      if (!record(value) || value.format !== 'jre-study-backup' || value.version !== 1 || value.kind !== kind || !text(value.exportedAt) || !Number.isFinite(Date.parse(value.exportedAt))) fail('備份版本或類型不符 / Incompatible backup version or kind');
    } else if (format === 'csv') {
      const rows = parseCSV(input), head = rows.shift();
      const expected = kind === 'vocab' ? ['format','version','kind','term','zh','card_json'] : ['format','version','kind','key','checked'];
      if (JSON.stringify(head) !== JSON.stringify(expected)) fail('CSV 標題不符 / Invalid CSV header');
      const data = kind === 'vocab' ? [] : {};
      rows.forEach(r => {
        if (r.length !== expected.length || r[0] !== 'jre-study-backup' || r[1] !== '1' || r[2] !== kind) fail('CSV 版本或欄位不符 / Invalid CSV row');
        if (kind === 'vocab') {
          const c = JSON.parse(r[5]);
          if (!record(c) || c.term !== r[3] || (c.zh || '') !== r[4]) fail('CSV 生字欄位不一致 / Inconsistent CSV word');
          data.push(c);
        } else {
          if (!MARKS.includes(r[3]) || !['true','false'].includes(r[4]) || Object.hasOwn(data, r[3])) fail('CSV 自評欄位不符 / Invalid CSV checklist');
          data[r[3]] = r[4] === 'true';
        }
      });
      value = {data};
    } else fail('請選 JSON 或 CSV / Choose JSON or CSV');
    return validate(kind, value.data);
  }
  function merge(kind, current, incoming) {
    if (kind === 'q1-checklist') {
      marks(current); marks(incoming);
      return Object.fromEntries(MARKS.map(k => [k, current[k] === true || incoming[k] === true]));
    }
    if (!record(current)) fail('現有生字格式不符；未更改 / Existing vocabulary invalid; unchanged');
    cards(Object.values(current)); cards(incoming);
    const result = Object.create(null), seen = new Set();
    for (const [storedKey, c] of [...Object.entries(current), ...incoming.map(c => [null, c])]) {
      const term = c.term.trim().toLowerCase();
      const key = storedKey || (c.phraseId ? `q1:${c.phraseId.toLowerCase()}` : term);
      if (['__proto__', 'prototype', 'constructor'].includes(key)) fail('不安全的生字鍵 / Unsafe vocabulary key');
      if (!seen.has(term) && !Object.hasOwn(result, key)) { result[key] = c; seen.add(term); }
    }
    return result;
  }
  function mount({root, kind, key, get, refresh}) {
    const host = document.querySelector(root); if (!host) return;
    const status = host.querySelector('[data-backup-status]');
    const report = message => { status.textContent = message; };
    host.querySelectorAll('[data-backup-export]').forEach(btn => btn.addEventListener('click', () => {
      try {
        const format = btn.dataset.backupExport;
        const current = get();
        const content = encode(kind, kind === 'vocab' ? Object.values(current) : current, format);
        if (new Blob([content]).size > MAX_BYTES) fail('備份超過 2 MB / Backup exceeds 2 MB');
        const url = URL.createObjectURL(new Blob([content], {type: format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json'}));
        const a = document.createElement('a'); a.href = url; a.download = `jre-${kind}-v1-${new Date().toISOString().slice(0,10)}.${format}`;
        document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        report('已要求下載；請保存檔案 / Download requested; save the file.');
      } catch (e) { report('未能匯出 / Export failed: ' + e.message); }
    }));
    host.querySelector('input[type=file]').addEventListener('change', async event => {
      const input = event.target, file = input.files[0]; if (!file) return;
      try {
        if (file.size > MAX_BYTES) fail('檔案上限 2 MB / File limit: 2 MB');
        const format = file.name.toLowerCase().endsWith('.json') ? 'json' : file.name.toLowerCase().endsWith('.csv') ? 'csv' : '';
        const incoming = decode(kind, await file.text(), format);
        // Re-read current storage after async file read; write one feature key only, then update UI.
        const next = merge(kind, get(), incoming);
        localStorage.setItem(key, JSON.stringify(next));
        refresh(next);
        report('已合併還原；保留現有生字及勾選 / Restored by merging; existing words and ticks retained.');
      } catch (e) { report('未有還原；原有資料保留 / Not restored; existing data retained: ' + e.message); }
      finally { input.value = ''; }
    });
  }
  globalThis.JreBackup = {MAX_BYTES, MARKS, encode, decode, merge, mount};
})();
