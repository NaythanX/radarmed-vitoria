/* Só habilitar o caminho para estudos quando o OSCE estiver homologado. */
globalThis.RADARMED_OSCE_READY=false;
(async()=>{
 try{
  const response=await fetch('./study-config.json',{cache:'no-store'});
  if(!response.ok)return;
  const config=await response.json();
  if(!config.enabled||
     config.oscePreparationUrl!=='https://osce-vitoria-piloto.onrender.com/preparacao.html')return;
  globalThis.RADARMED_OSCE_READY=true;
  const link=document.getElementById('dialog-study');
  if(link&&link.href.includes('/preparacao.html?concurso='))link.hidden=false;
 }catch(e){console.warn('Integração OSCE indisponível:',e);}
})();