// Run with node docs/vocab/tests/backup.test.cjs. No access to browser/user storage.
const {strict: assert} = require('node:assert');
const fs = require('node:fs');
require('../backup.js');
const B = globalThis.JreBackup;
const words = [{term:'Special, "quoted" 中文\nline', zh:'多行\r\n中文, "引號"', synonyms:['one,two'], examples:[{en:'<img src=x onerror=alert(1)>',zh:'例句'}], source:{link:'https://example.com'}, savedAt:'2026-11-17T00:00:00Z'}];
for (const format of ['json','csv']) {
 assert.deepEqual(B.decode('vocab', B.encode('vocab', words, format), format), words);
 assert.deepEqual(B.decode('vocab', B.encode('vocab', [], format), format), []);
 const marks = {opening:true, tone:false};
 assert.deepEqual(B.decode('q1-checklist', B.encode('q1-checklist', marks, format), format), marks);
}
const all = JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../data/lexicon.json')));
assert.equal(B.decode('vocab',B.encode('vocab',all,'json'),'json').length, all.length);
const phrase = {term:'Phrase',phraseId:'rec-01'};
assert.deepEqual(Object.keys(B.merge('vocab', {'q1:rec-01':phrase}, [phrase])), ['q1:rec-01']);
assert.deepEqual(Object.keys(B.merge('vocab', {}, [phrase])), ['q1:rec-01']);
const existing = {'hello':{term:'Hello',zh:'keep'}};
const merged = B.merge('vocab', existing, [{term:'HELLO',zh:'replace?'},...words]);
assert.equal(Object.keys(merged).length,2); assert.equal(merged.hello.zh,'keep');
assert.equal(B.merge('q1-checklist',{opening:true},{opening:false,tone:true}).opening,true);
for (const data of [null,{}, {term:2}, {term:'a',synonyms:'no'}, {term:'a',examples:[2]}, {term:'a',source:{link:'javascript:alert(1)'}}, JSON.parse('{"term":"x","__proto__":{}}')]) {
 assert.throws(()=>B.encode('vocab',[data],'json'));
}
for (const input of ['{','{}', B.encode('q1-checklist',{},'json'), B.encode('vocab',words,'json').replace('"version": 1','"version": 2'), 'x'.repeat(B.MAX_BYTES+1)]) assert.throws(()=>B.decode('vocab',input,'json'));
for (const input of ['x,y', '"unfinished', B.encode('vocab',words,'csv').replace('"1"','"2"')]) assert.throws(()=>B.decode('vocab',input,'csv'));
// Exercise actual file handler including atomic validation, cancel, quota and unrelated-key preservation.
(async()=>{
 const handlers={}, messages={textContent:''}; const fileInput={value:'',files:[],addEventListener:(name,fn)=>handlers[name]=fn};
 global.document={querySelector:()=>({querySelector:s=>s==='input[type=file]'?fileInput:messages,querySelectorAll:()=>[]})};
 let store={'vocab':JSON.stringify(existing),answer:'draft',marks:'checklist',theme:'light'};
 let refreshed=0, quota=false;
 global.localStorage={setItem:(k,v)=>{if(quota)throw Error('quota');store[k]=v;}};
 B.mount({root:'#test',kind:'vocab',key:'vocab',get:()=>JSON.parse(store.vocab),refresh:()=>refreshed++});
 const send=async(content,name='test.json',size=Buffer.byteLength(content))=>{fileInput.files=[{name,size,text:async()=>content}];await handlers.change({target:fileInput});};
 const before=JSON.stringify(store);
 await send('{}'); assert.equal(JSON.stringify(store),before); assert.equal(refreshed,0);
 await send(B.encode('vocab',words,'json'),'test.json',B.MAX_BYTES+1); assert.equal(JSON.stringify(store),before);
 quota=true;await send(B.encode('vocab',words,'json'));assert.equal(JSON.stringify(store),before);assert.equal(refreshed,0);
 quota=false; await send(B.encode('vocab',words,'csv'),'test.csv'); assert.equal(refreshed,1); assert.equal(Object.keys(JSON.parse(store.vocab)).length,2);
 assert.deepEqual([store.answer,store.marks,store.theme],['draft','checklist','light']);
 const restored=JSON.stringify(store);fileInput.files=[];await handlers.change({target:fileInput});assert.equal(JSON.stringify(store),restored);
 console.log('PASS: JSON/CSV Unicode + quotes + multiline + full lexicon; merge; malformed/schema/version/size/prototype/URL rejection; atomic import; quota; cancel; unrelated storage.');
})().catch(e=>{console.error(e);process.exitCode=1;});
