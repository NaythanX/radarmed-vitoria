/* RadarMed → Prisma: transferência de favoritos sem compartilhar credenciais.
   A página continua pública; a importação acontece somente com conta Prisma autenticada. */
globalThis.RADARMED_OSCE_READY=false;
(async()=>{
 try{
  const response=await fetch('./study-config.json',{cache:'no-store'});
  if(!response.ok)return;
  const config=await response.json();
  if(!config.enabled||config.oscePreparationUrl!=='https://osce-vitoria-piloto.onrender.com/preparacao.html')return;
  globalThis.RADARMED_OSCE_READY=true;
  const link=document.getElementById('dialog-study');
  if(link&&link.href.includes('/preparacao.html?concurso='))link.hidden=false;
 }catch(e){console.warn('Preparação do Prisma temporariamente indisponível.');}
})();
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a[href]');
 if(!anchor)return;
 let url;
 try{url=new URL(anchor.href,location.href);}catch{return;}
 if(url.origin!=='https://osce-vitoria-piloto.onrender.com')return;
 const favs=globalThis.RadarMedBridge?.getFavorites?.()||[];
 const valid=/^[a-z0-9][a-z0-9-]{2,79}$/;
 const ids=[...new Set(favs.filter(x=>valid.test(x)))].slice(0,50);
 if(ids.length)url.hash='radarImport='+ids.map(encodeURIComponent).join(',');
 anchor.href=url.toString();
},{capture:true});

function restoreFromPrisma(){
 const params=new URLSearchParams(location.hash.slice(1));
 if(!params.has('prismaSaved'))return;
 const ids=[...new Set((params.get('prismaSaved')||'').split(',')
   .filter(x=>/^[a-z0-9][a-z0-9-]{2,79}$/.test(x)))].slice(0,50);
 if(!globalThis.RadarMedBridge?.isReady?.())return;
 globalThis.RadarMedBridge.replaceFavorites(ids);
 history.replaceState(null,'',location.pathname+location.search);
 const indicator=document.getElementById('radarmed-account-status');
 if(indicator)indicator.textContent='Favoritos atualizados com a conta do Prisma.';
}
window.addEventListener('radarmed:ready',restoreFromPrisma);
restoreFromPrisma();
