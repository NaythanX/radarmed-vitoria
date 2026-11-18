'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');

test('RadarMed usa uma unica navegacao horizontal desktop/mobile', () => {
  assert.match(html,/<header class="topbar">/);
  assert.match(html,/<nav class="topbar-nav" aria-label="Seções do RadarMed">/);
  for (const page of ['overview','opportunities','calendar','favorites']) {
    assert.equal((html.match(new RegExp('data-view="'+page+'"','g'))||[]).length,1,page);
  }
  assert.doesNotMatch(html,/<aside class="sidebar"|<nav class="mobile-nav"/);
  assert.match(html,/id="radarmed-horizontal-default"/);
  assert.match(html,/overflow-x:auto/);
  assert.match(html,/id="btn-help"/);
  assert.match(html,/id="nav-saved"/);
  assert.match(html,/id="nav-count"/);
});
test('Prisma fica em um único link destacado no cabeçalho, sem banner repetido',()=>{
  assert.match(html,/<a class="horizon-portal" href="https:\/\/osce-vitoria-piloto.onrender.com\/radarmed\/"/);
  assert.doesNotMatch(html,/<section class="radar-network-banner"|<nav class="radar-network"/);
  assert.doesNotMatch(html,/<section class="welcome-guide"/);
});
test('Destaque declara criterio medico e remove duplicacao de vagas nos prazos',()=>{
  assert.match(html,/Oportunidades para Medicina/);
  assert.match(html,/const isMedicalRole =/);
  assert.match(html,/const prioritySort =/);
  assert.match(html,/Number\(isMedicalRole\(b\)\)-Number\(isMedicalRole\(a\)\)/);
  assert.match(html,/const featuredIds = new Set/);
  assert.match(html,/!featuredIds\.has\(v\.id\)/);
  assert.match(html,/Relevância para Medicina/);
});
test('Navegacao e favoritos preservam IDs e sintaxe JavaScript',()=>{
  for (const id of ['featured-cards','all-cards','saved-cards','stats','upcoming-list','radarmed-changes','page-crumb','go-vacancies','go-calendar','immediate-only','sort-filter','search-input']) {
    assert.equal((html.match(new RegExp('id="'+id+'"','g'))||[]).length,1,id);
  }
  const mainScript=html.match(/<script>\s*\(\(\) => \{([\s\S]*?)<\/script>/);
  assert.ok(mainScript,'script do painel');
  assert.doesNotThrow(()=>new vm.Script(mainScript[0].replace(/^<script>/,'').replace(/<\/script>$/,'')));
});