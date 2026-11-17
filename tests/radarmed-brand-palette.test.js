'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync(require('node:path').resolve(__dirname,'../index.html'),'utf8');

test('RadarMed tem identidade Prisma com mesmo verde sem perder menu superior',()=>{
 assert.match(html,/id="prisma-brand-tokens"/);
 for(const c of ['#0c2022','#10392e','#147d58','#0b6448','#e6f5ec','#f2f7f3']){
  assert.ok(html.includes(c),'token '+c);
 }
 assert.match(html,/<meta name="theme-color" content="#10392e">/);
 assert.match(html,/<nav class="topbar-nav"/);
 assert.match(html,/class="horizon-portal"/);
 assert.doesNotMatch(html,/<aside class="sidebar"/);
});
