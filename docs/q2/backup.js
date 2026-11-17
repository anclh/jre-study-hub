/* Narrow, versioned manual backups for Q2 self-checklist (docs/q2/ only). */
(() => {
  'use strict';
  const MAX_BYTES = 2 * 1024 * 1024;
  const KIND = 'q2-checklist';
  const MARKS = ['stance', 'r1', 'r2', 'rebut', 'measure', 'close', 'noslogan'];
  const UNSAFE_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
  const fail = (message) => { throw new Error(message); };
  const record = (x) => {
    if (x === null || typeof x !== 'object' || Array.isArray(x)) return false;
    const proto = Object.getPrototypeOf(x);
    return proto === Object.prototype || proto === null;
  };
  const text = (x) => typeof x === 'string' && x.length <= 100000;

  function safeTree(x, depth = 0) {
    if (depth > 10) fail('資料層次過多 / Data too deeply nested');
    if (x === null || typeof x === 'boolean' || (typeof x === 'number' && Number.isFinite(x))) return;
    if (text(x)) return;
    if (Array.isArray(x) && x.length <= 10000) {
      x.forEach((v) => safeTree(v, depth + 1));
      return;
    }
    if (record(x)) {
      Object.getOwnPropertyNames(x).forEach((k) => {
        if (UNSAFE_KEYS.has(k)) fail('不安全的欄位 / Unsafe field');
        safeTree(x[k], depth + 1);
      });
      return;
    }
    fail('資料類型不符 / Invalid data type');
  }

  function marks(data) {
    safeTree(data);
    if (!record(data) || Object.entries(data).some(([k, v]) => !MARKS.includes(k) || typeof v !== 'boolean')) {
      fail('自評欄位不符 / Invalid Q2 checklist');
    }
    return data;
  }

  function validate(kind, data) {
    if (kind === KIND) return marks(data);
    fail('不支援的備份類型 / Unsupported backup kind');
  }

  function envelope(kind, data) {
    validate(kind, data);
    return {
      format: 'jre-study-backup',
      version: 1,
      kind,
      exportedAt: new Date().toISOString(),
      data,
    };
  }

  function parseCSV(input) {
    if (typeof input !== 'string') fail('CSV 須為文字 / CSV must be text');
    const rows = [];
    const row = [];
    let cell = '';
    let quoted = false;
    let ended = false;
    const src = input.replace(/^\uFEFF/, '');
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (quoted) {
        if (c === '"' && src[i + 1] === '"') {
          cell += '"';
          i++;
        } else if (c === '"') {
          quoted = false;
          ended = true;
        } else {
          cell += c;
        }
      } else if (c === '"') {
        if (cell || ended) fail('CSV 引號錯誤 / Invalid CSV quote');
        quoted = true;
      } else if (c === ',' || c === '\n' || c === '\r') {
        row.push(cell);
        cell = '';
        ended = false;
        if (c !== ',') {
          rows.push(row.splice(0));
          if (c === '\r' && src[i + 1] === '\n') i++;
        }
      } else {
        if (ended) fail('CSV 引號後有多餘文字 / Invalid CSV after quote');
        cell += c;
      }
    }
    if (quoted) fail('CSV 引號未完成 / Unclosed CSV quote');
    if (cell || row.length || ended) {
      row.push(cell);
      rows.push(row);
    }
    return rows;
  }

  function toCSV(rows) {
    return '\uFEFF' + rows
      .map((r) => r.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(','))
      .join('\r\n') + '\r\n';
  }

  function encode(kind, data, format) {
    const value = envelope(kind, data);
    if (format === 'json') return JSON.stringify(value, null, 2);
    if (format !== 'csv') fail('不支援的格式 / Unsupported format');
    return toCSV([
      ['format', 'version', 'kind', 'key', 'checked'],
      ...Object.entries(data).map(([k, v]) => ['jre-study-backup', 1, kind, k, v]),
    ]);
  }

  function decode(kind, input, format) {
    if (kind !== KIND) fail('不支援的備份類型 / Unsupported backup kind');
    if (typeof input !== 'string') fail('檔案須為文字 / Input must be text');
    if (new Blob([input]).size > MAX_BYTES) fail('檔案上限 2 MB / File limit: 2 MB');
    let value;
    if (format === 'json') {
      value = JSON.parse(input.replace(/^\uFEFF/, ''));
      safeTree(value);
      if (
        !record(value) ||
        value.format !== 'jre-study-backup' ||
        value.version !== 1 ||
        value.kind !== kind ||
        !text(value.exportedAt) ||
        !Number.isFinite(Date.parse(value.exportedAt)) ||
        !Object.hasOwn(value, 'data')
      ) {
        fail('備份版本或類型不符 / Incompatible backup version or kind');
      }
    } else if (format === 'csv') {
      const rows = parseCSV(input);
      const head = rows.shift();
      const expected = ['format', 'version', 'kind', 'key', 'checked'];
      if (JSON.stringify(head) !== JSON.stringify(expected)) {
        fail('CSV 標題不符 / Invalid CSV header');
      }
      const data = {};
      rows.forEach((r) => {
        if (r.length !== expected.length || r[0] !== 'jre-study-backup' || r[1] !== '1' || r[2] !== kind) {
          fail('CSV 版本或欄位不符 / Invalid CSV row');
        }
        if (!MARKS.includes(r[3]) || !['true', 'false'].includes(r[4]) || Object.hasOwn(data, r[3])) {
          fail('CSV 自評欄位不符 / Invalid CSV checklist');
        }
        data[r[3]] = r[4] === 'true';
      });
      value = { data };
    } else {
      fail('請選 JSON 或 CSV / Choose JSON or CSV');
    }
    return validate(kind, value.data);
  }

  function merge(kind, current, incoming) {
    if (kind !== KIND) fail('不支援的備份類型 / Unsupported backup kind');
    marks(current);
    marks(incoming);
    return Object.fromEntries(MARKS.map((k) => [k, current[k] === true || incoming[k] === true]));
  }

  function mount({ root, kind, key, get, refresh }) {
    const host = document.querySelector(root);
    if (!host) return;
    const status = host.querySelector('[data-backup-status]');
    const report = (message) => {
      if (status) status.textContent = message;
    };
    host.querySelectorAll('[data-backup-export]').forEach((btn) => {
      if (btn.dataset.backupBound === '1') return;
      btn.dataset.backupBound = '1';
      btn.addEventListener('click', () => {
        try {
          const format = btn.dataset.backupExport;
          const current = get();
          const content = encode(kind, current, format);
          if (new Blob([content]).size > MAX_BYTES) fail('備份超過 2 MB / Backup exceeds 2 MB');
          const mime = format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json';
          const url = URL.createObjectURL(new Blob([content], { type: mime }));
          const a = document.createElement('a');
          a.href = url;
          a.download = `jre-${kind}-v1-${new Date().toISOString().slice(0, 10)}.${format}`;
          document.body.append(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          report('已要求下載；請保存檔案 / Download requested; save the file.');
        } catch (e) {
          report('未能匯出 / Export failed: ' + e.message);
        }
      });
    });
    const fileInput = host.querySelector('input[type=file]');
    if (fileInput && fileInput.dataset.backupBound !== '1') {
      fileInput.dataset.backupBound = '1';
      fileInput.addEventListener('change', async (event) => {
        const input = event.target;
        const file = input.files && input.files[0];
        if (!file) return;
        try {
          if (file.size > MAX_BYTES) fail('檔案上限 2 MB / File limit: 2 MB');
          const lower = String(file.name || '').toLowerCase();
          const format = lower.endsWith('.json') ? 'json' : lower.endsWith('.csv') ? 'csv' : '';
          const incoming = decode(kind, await file.text(), format);
          const next = merge(kind, get(), incoming);
          localStorage.setItem(key, JSON.stringify(next));
          refresh(next);
          report('已合併還原；保留現有勾選 / Restored by merging; existing ticks retained.');
        } catch (e) {
          report('未有還原；原有資料保留 / Not restored; existing data retained: ' + e.message);
        } finally {
          input.value = '';
        }
      });
    }
  }

  globalThis.JreQ2Backup = { MAX_BYTES, KIND, MARKS, encode, decode, merge, mount, parseCSV, toCSV };
})();
