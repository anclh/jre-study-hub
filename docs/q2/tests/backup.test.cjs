// Run with node docs/q2/tests/backup.test.cjs. Uses isolated in-memory mocks only.
const { strict: assert } = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const backupSrc = fs.readFileSync(path.join(__dirname, '../backup.js'), 'utf8');
assert.equal(/innerHTML/.test(backupSrc), false, 'backup.js must never use innerHTML');

require('../backup.js');
const B = globalThis.JreQ2Backup;

assert.deepEqual(B.MARKS, ['stance', 'r1', 'r2', 'rebut', 'measure', 'close', 'noslogan']);
assert.equal(B.MAX_BYTES, 2 * 1024 * 1024);

// 1. JSON & CSV roundtrips for Q2 checklist + empty object
const sample = { stance: true, r1: true, r2: false, rebut: true, measure: false, close: false, noslogan: true };
for (const format of ['json', 'csv']) {
  const encoded = B.encode('q2-checklist', sample, format);
  assert.deepEqual(B.decode('q2-checklist', encoded, format), sample);
  assert.deepEqual(B.decode('q2-checklist', B.encode('q2-checklist', {}, format), format), {});
}

// Check JSON envelope fields
const env = JSON.parse(B.encode('q2-checklist', sample, 'json'));
assert.equal(env.format, 'jre-study-backup');
assert.equal(env.version, 1);
assert.equal(env.kind, 'q2-checklist');
assert.ok(Number.isFinite(Date.parse(env.exportedAt)));

// Check CSV BOM, CRLF, header, and quoting
const csvText = B.encode('q2-checklist', sample, 'csv');
assert.ok(csvText.startsWith('\uFEFF"format","version","kind","key","checked"\r\n'));
assert.ok(csvText.includes('"jre-study-backup","1","q2-checklist","stance","true"\r\n'));

// 2. CSV quoting with Chinese, commas, quotes, multiline
const trickyRows = [
  ['欄位, "引號"', '多行\r\n中文內容', 'a,b,"c"\nline2', '<img src=x onerror=alert(1)>'],
  ['立場', '香港例子："大牌檔"\n第二行', 'ok', 'done'],
];
const encodedTricky = B.toCSV(trickyRows);
assert.ok(encodedTricky.startsWith('\uFEFF'));
assert.deepEqual(B.parseCSV(encodedTricky), trickyRows);

// 3. Union merge preserves existing true ticks
const merged = B.merge(
  'q2-checklist',
  { stance: true, r1: false, close: true },
  { stance: false, r1: true, r2: true }
);
assert.deepEqual(merged, {
  stance: true,
  r1: true,
  r2: true,
  rebut: false,
  measure: false,
  close: true,
  noslogan: false,
});

// 4. Cross-kind refusal (Q1 & vocab) and invalid schemas/versions/sizes/prototype keys
assert.throws(() => B.encode('q1-checklist', { opening: true }, 'json'));
assert.throws(() => B.encode('q2-checklist', { opening: true }, 'json'));
assert.throws(() => B.encode('q2-checklist', { stance: 'true' }, 'json'));
assert.throws(() => B.encode('q2-checklist', JSON.parse('{"stance":true,"__proto__":true}'), 'json'));

const q1Json = JSON.stringify({
  format: 'jre-study-backup',
  version: 1,
  kind: 'q1-checklist',
  exportedAt: '2026-11-17T00:00:00.000Z',
  data: { opening: true },
});
const vocabJson = JSON.stringify({
  format: 'jre-study-backup',
  version: 1,
  kind: 'vocab',
  exportedAt: '2026-11-17T00:00:00.000Z',
  data: [{ term: 'alleviate', zh: '紓緩' }],
});
const q1Csv = '\uFEFF"format","version","kind","key","checked"\r\n"jre-study-backup","1","q1-checklist","opening","true"\r\n';
const vocabCsv = '\uFEFF"format","version","kind","term","zh","card_json"\r\n"jre-study-backup","1","vocab","alleviate","紓緩","{}"\r\n';
const dupKeyCsv = B.encode('q2-checklist', { stance: true }, 'csv') + '"jre-study-backup","1","q2-checklist","stance","false"\r\n';

for (const badJson of [
  '{',
  '{}',
  q1Json,
  vocabJson,
  B.encode('q2-checklist', sample, 'json').replace('"version": 1', '"version": 2'),
  B.encode('q2-checklist', sample, 'json').replace('"jre-study-backup"', '"other-format"'),
  B.encode('q2-checklist', sample, 'json').replace('"stance": true', '"opening": true'),
  '{"format":"jre-study-backup","version":1,"kind":"q2-checklist","exportedAt":"2026-11-17T00:00:00.000Z","data":{"__proto__":true}}',
  'x'.repeat(B.MAX_BYTES + 1),
]) {
  assert.throws(() => B.decode('q2-checklist', badJson, 'json'));
}

for (const badCsv of [
  '',
  'x,y',
  '"unfinished',
  '"a"b,"c"',
  q1Csv,
  vocabCsv,
  dupKeyCsv,
  B.encode('q2-checklist', sample, 'csv').replace('"1"', '"2"'),
  B.encode('q2-checklist', sample, 'csv').replace('"stance"', '"opening"'),
]) {
  assert.throws(() => B.decode('q2-checklist', badCsv, 'csv'));
}

// 5. Mounted file input handler: atomic validation, cancel, quota failure, unrelated keys preserved
(async () => {
  const handlers = {};
  const statusEl = { textContent: '' };
  const fileInput = {
    value: '',
    files: [],
    dataset: {},
    addEventListener: (name, fn) => {
      handlers[name] = fn;
    },
  };
  global.document = {
    querySelector: () => ({
      querySelector: (s) => (s === 'input[type=file]' ? fileInput : statusEl),
      querySelectorAll: () => [],
    }),
  };
  const store = {
    'jre-q2-marks-v1': JSON.stringify({ stance: true, r1: false, r2: false, rebut: false, measure: false, close: false, noslogan: false }),
    'jre-q2-answer-v1': '我的草稿立場',
    'jre-q2-drill-id-v1': 'sample-daipaidong',
    'jre-q2-flash-v1': JSON.stringify({ 'housing-land': 'known' }),
    'jre-q1-marks-v1': JSON.stringify({ opening: true }),
  };
  let refreshed = 0;
  let quota = false;
  global.localStorage = {
    getItem: (k) => (Object.hasOwn(store, k) ? store[k] : null),
    setItem: (k, v) => {
      if (quota) throw new Error('QuotaExceededError');
      store[k] = v;
    },
  };

  B.mount({
    root: '#q2-backup',
    kind: 'q2-checklist',
    key: 'jre-q2-marks-v1',
    get: () => JSON.parse(store['jre-q2-marks-v1']),
    refresh: () => {
      refreshed++;
    },
  });

  const send = async (content, name = 'q2.json', size = Buffer.byteLength(content)) => {
    fileInput.files = [{ name, size, text: async () => content }];
    await handlers.change({ target: fileInput });
  };

  const before = JSON.stringify(store);
  await send('{}', 'bad.json');
  assert.equal(JSON.stringify(store), before);
  assert.equal(refreshed, 0);
  assert.match(statusEl.textContent, /Not restored/);

  await send(q1Json, 'q1.json');
  assert.equal(JSON.stringify(store), before);
  assert.equal(refreshed, 0);

  await send(q1Csv, 'q1.csv');
  assert.equal(JSON.stringify(store), before);
  assert.equal(refreshed, 0);

  await send(B.encode('q2-checklist', { r1: true }, 'json'), 'huge.json', B.MAX_BYTES + 1);
  assert.equal(JSON.stringify(store), before);
  assert.equal(refreshed, 0);

  await send(B.encode('q2-checklist', { r1: true }, 'json'), 'bad.txt');
  assert.equal(JSON.stringify(store), before);
  assert.equal(refreshed, 0);

  // Quota/write failure keeps existing data & does not call refresh
  quota = true;
  await send(B.encode('q2-checklist', { r1: true }, 'json'), 'q2.json');
  assert.equal(JSON.stringify(store), before);
  assert.equal(refreshed, 0);
  assert.match(statusEl.textContent, /QuotaExceededError/);

  // Valid CSV merge import updates marks and preserves existing true ticks + unrelated keys
  quota = false;
  await send(B.encode('q2-checklist', { stance: false, r1: true, measure: true }, 'csv'), 'q2.csv');
  assert.equal(refreshed, 1);
  assert.deepEqual(JSON.parse(store['jre-q2-marks-v1']), {
    stance: true,
    r1: true,
    r2: false,
    rebut: false,
    measure: true,
    close: false,
    noslogan: false,
  });
  assert.equal(store['jre-q2-answer-v1'], '我的草稿立場');
  assert.equal(store['jre-q2-drill-id-v1'], 'sample-daipaidong');
  assert.equal(store['jre-q2-flash-v1'], JSON.stringify({ 'housing-land': 'known' }));
  assert.equal(store['jre-q1-marks-v1'], JSON.stringify({ opening: true }));
  assert.equal(fileInput.value, '');

  // Cancel performs no write and no refresh
  const after = JSON.stringify(store);
  fileInput.files = [];
  await handlers.change({ target: fileInput });
  assert.equal(JSON.stringify(store), after);
  assert.equal(refreshed, 1);

  console.log('PASS: Q2 backup JSON/CSV roundtrips, Chinese/quotes/multiline CSV, cross-kind Q1/vocab refusal, prototype/size/schema rejection, atomic merge, quota/cancel, unrelated storage.');
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
