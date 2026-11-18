/* Four planning notes per stable drill ID. Never reads/writes memo or marks keys. */
(() => {
  'use strict';
  const PREFIX = 'jre-q1-plan-v1:';
  const ACTIVE = 'jre-q1-plan-active-v1';
  const fields = [
    {id: 'sort', title: 'Sort the Data File (0–5 minutes)', cue: 'Role / audience / task; P1/P2 problems and evidence; Opt options, cost, time and benefits; Obj/Con objections and constraints; Rec delivery, pilot and KPIs.'},
    {id: 'problems', title: 'Identify Problems & Implications', cue: 'Two distinct, nonoverlapping problems. For each: Problem → Evidence → Interpretation → Implication. Impact on users, public funds or the system; why government action is needed.'},
    {id: 'options', title: 'Compare Options', cue: 'Use the prompt’s criteria; otherwise choose decisive effectiveness, fiscal cost, feasibility/manpower and acceptance/accessibility criteria. Compare tradeoffs, justify your choice and address objections inline.'},
    {id: 'recommend', title: 'Recommend & Close', cue: 'Preferred option; Who; When / Pilot; Resources; Complementary measures; KPIs / Review. End with a brief memo-appropriate closing.'}
  ];
  const cache = new Map();
  const empty = () => Object.fromEntries(fields.map(f => [f.id, '']));
  const keyFor = id => PREFIX + encodeURIComponent(id);
  function validate(value, id) {
    return value && value.version === 1 && value.drillId === id &&
      value.notes && typeof value.notes === 'object' && !Array.isArray(value.notes) &&
      Object.keys(value.notes).length === fields.length &&
      fields.every(f => Object.hasOwn(value.notes, f.id) && typeof value.notes[f.id] === 'string');
  }
  function load(id) {
    if (cache.has(id)) return cache.get(id);
    const entry = {notes: empty(), error: '', writable: true};
    try {
      const raw = localStorage.getItem(keyFor(id));
      if (raw !== null) {
        const value = JSON.parse(raw);
        if (!validate(value, id)) throw new Error('incompatible');
        entry.notes = Object.fromEntries(fields.map(f => [f.id, value.notes[f.id]]));
      }
    } catch (error) {
      entry.error = '未能讀取本題規劃；仍可輸入，請自行複製備份 / Could not load this plan; you can type and copy your notes.';
      // Preserve unreadable or incompatible stored data rather than replacing it.
      entry.writable = false;
    }
    cache.set(id, entry);
    return entry;
  }
  function save(id, field, text) {
    if (!fields.some(f => f.id === field) || typeof text !== 'string') throw new Error('Invalid planning field');
    const entry = load(id);
    entry.notes[field] = text; // In-memory copy survives topic switches even when storage fails.
    if (!entry.writable) return entry.error;
    try {
      localStorage.setItem(keyFor(id), JSON.stringify({version: 1, drillId: id, notes: entry.notes}));
      return '本題規劃已儲存在這個瀏覽器 / Plan saved for this drill in this browser.';
    } catch {
      return '規劃未儲存；仍可輸入，離開前請複製筆記 / Plan not saved; keep typing and copy your notes before leaving.';
    }
  }
  function activeDrill() {
    try { return localStorage.getItem(ACTIVE) || null; } catch { return null; }
  }
  function selectDrill(id) {
    try { localStorage.setItem(ACTIVE, id); } catch {} // Selection failure must never block the drill.
  }
  function mount(root, id) {
    const entry = load(id);
    root.replaceChildren();
    const title = document.createElement('h2'); title.textContent = 'Data File planning'; root.append(title);
    const note = document.createElement('p'); note.className = 'muted';
    note.textContent = '先填四欄筆記，再寫下方完整 memo。每題分開保存在這個瀏覽器；不會自動同步。 / Plan in four sections, then draft the full memo below. Notes are saved per drill in this browser, without automatic sync.';
    root.append(note);
    const status = document.createElement('p'); status.className = 'planning-status muted';
    status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    status.textContent = entry.error;
    fields.forEach((field, index) => {
      const section = document.createElement('section'); section.className = 'planning-section';
      const heading = document.createElement('h3');
      const label = document.createElement('label'); label.htmlFor = `plan-${field.id}`;
      label.textContent = `${index + 1}. ${field.title}`; heading.append(label);
      const cue = document.createElement('p'); cue.id = `plan-${field.id}-cue`; cue.textContent = field.cue;
      const input = document.createElement('textarea'); input.id = `plan-${field.id}`;
      input.dataset.planField = field.id; input.rows = 4;
      input.setAttribute('aria-describedby', cue.id); input.placeholder = 'Your planning notes…';
      input.value = entry.notes[field.id];
      input.addEventListener('input', () => { status.textContent = save(id, field.id, input.value); });
      section.append(heading, cue, input); root.append(section);
    });
    root.append(status);
  }
  globalThis.Q1Planning = {fields, keyFor, load, save, activeDrill, selectDrill, mount};
})();
