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
