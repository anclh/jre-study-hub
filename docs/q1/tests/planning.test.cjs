// node docs/q1/tests/planning.test.cjs — isolated storage, never real user data.
const {strict: assert} = require('node:assert');
const vm = require('node:vm'), fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../planning.js'), 'utf8');
const data = new Map([['jre-q1-answer-v1', 'Existing memo 中文'], ['jre-q1-marks-v1', '{"opening":true}'], ['jre-vocab-saved-v1', '{"word":{}}']]);
const original = [...data.entries()];
let noRead = false, noWrite = false;
const storage = {getItem: k => {if(noRead)throw Error('denied');return data.get(k) ?? null;}, setItem:(k,v)=>{if(noWrite)throw Error('quota');data.set(k,v);}};
function session() {const context=vm.createContext({localStorage:storage}); vm.runInContext(source,context);return context.Q1Planning;}
let P=session();
assert.equal(P.fields.length,4);
for (const f of P.fields) P.save('drill/a', f.id, `Notes ${f.id} 中文\n"quoted" <img>`);
P.selectDrill('drill/a');
P.save('drill/b', 'sort', 'Different topic');
P=session();assert.equal(P.activeDrill(),'drill/a');
for (const f of P.fields) assert.equal(P.load('drill/a').notes[f.id],`Notes ${f.id} 中文\n"quoted" <img>`);
assert.equal(P.load('drill/b').notes.sort,'Different topic');
assert.equal(P.load('new').notes.sort,'');assert.equal(data.has(P.keyFor('new')),false);
assert.notEqual(P.keyFor('a/b'),P.keyFor('a%2Fb'));
noWrite=true;assert.match(P.save('drill/a','sort','Unsaved but editable'),/not saved/);
assert.equal(P.load('drill/a').notes.sort,'Unsaved but editable');P.selectDrill('drill/b');
noWrite=false;assert.match(P.save('drill/a','sort','Retry saved'),/Plan saved/);
assert.equal(session().load('drill/a').notes.sort,'Retry saved');
for(const raw of ['{bad',JSON.stringify({version:2,drillId:'bad',notes:{}}),JSON.stringify({version:1,drillId:'wrong',notes:{sort:'',problems:'',options:'',recommend:''}})]){
 data.set(P.keyFor('bad'),raw);const next=session();assert.match(next.load('bad').error,/Could not load/);next.save('bad','sort','In memory');assert.equal(data.get(P.keyFor('bad')),raw);assert.equal(next.load('bad').notes.sort,'In memory');
}
noRead=true;const denied=session();assert.equal(denied.activeDrill(),null);assert.match(denied.save('denied','sort','Still editable'),/Could not load/);assert.equal(denied.load('denied').notes.sort,'Still editable');noRead=false;
for(const [key,value] of original)assert.equal(data.get(key),value);
assert.throws(()=>P.save('drill/a','unknown','x'));
console.log('PASS: four fields; per-drill save/reload/switch; Unicode/HTML-looking text; selection; no writes on mount; key isolation; quota retry; denied reads; incompatible storage retained; memo/marks/vocab untouched.');
