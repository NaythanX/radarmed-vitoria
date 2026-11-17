'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.resolve(__dirname,'..',file),'utf8');
const html=read('index.html'),updates=read('updates.js');

test('RadarMed nao exibe aviso de carregamento junto das novidades',()=>{
 assert.match(html,/id="radarmed-changes"[^>]*hidden><\/section>/);
 assert.doesNotMatch(html,/Conferindo histórico das atualizações/);
 assert.match(html,/id="radarmed-changes-compact"/);
 assert.match(updates,/target\.replaceChildren\(wrap\)/);
 assert.match(updates,/target\.hidden=false/);
 assert.doesNotThrow(()=>new vm.Script(updates));
});
test('atualizacoes sao resumidas e detalhes ficam fechados por padrao',()=>{
 assert.match(updates,/document\.createElement\(tag\)/);
 assert.match(updates,/make\('details','changes-disclosure'\)/);
 assert.match(updates,/make\('summary'\)/);
 assert.match(updates,/Ver detalhes/);
 assert.match(updates,/rows\.slice\(0,6\)/);
 assert.doesNotMatch(updates,/wrap\.open\s*=\s*true|wrap\.setAttribute\('open'/);
});
test('ajustes internos nao sao rotulados como retificacao de edital',()=>{
 assert.match(updates,/registro\(s\) revisado\(s\)/);
 assert.match(updates,/não significa necessariamente retificação oficial/);
 assert.match(updates,/RadarMedBridge\?\.setRecent/);
 assert.match(updates,/changes\.atualizado_em !== base\.atualizado_em/);
});
