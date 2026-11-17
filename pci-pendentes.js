/* RadarMed — pista PCI: oportunidades de interesse ainda SEM validação de edital.
 * Arquivo gerado por pesquisas do plugin no ChatGPT, não é integração PCI em tempo real no navegador.
 * Os links deste painel levam à notícia; somente dados.json alimenta a lista de editais confirmados.
 */
(()=>{'use strict';
const destination=document.getElementById('opportunities-section');
if(!destination)return;
const root=document.createElement('section');
root.id='pci-pendentes';
root.className='pci-section';
root.setAttribute('aria-labelledby','pci-pendentes-titulo');
const heading=document.createElement('div');heading.className='pci-heading';
const headingCopy=document.createElement('div');
const eyebrow=document.createElement('div');eyebrow.className='pci-eyebrow';eyebrow.textContent='PESQUISA COMPLEMENTAR · PCI CONCURSOS';
const title=document.createElement('h2');title.id='pci-pendentes-titulo';title.textContent='Oportunidades em verificação';
const description=document.createElement('p');description.className='pci-explain';
description.textContent='O PCI encontrou estas oportunidades, mas ainda precisamos conferir o edital, requisitos e possíveis retificações. Elas não estão na lista de concursos confirmados acima.';
headingCopy.append(eyebrow,title,description);
const pill=document.createElement('span');pill.className='pci-counter';pill.textContent='Carregando pesquisa…';
heading.append(headingCopy,pill);
const list=document.createElement('div');list.className='pci-cards';
const footer=document.createElement('p');footer.className='pci-footer';
root.append(heading,list,footer);destination.append(root);
const text=(tag,value,cls)=>{const n=document.createElement(tag);n.textContent=value;if(cls)n.className=cls;return n;};
let snapshot=null;
function render(){
 if(!snapshot)return;
 const active=document.querySelector('#uf-filters [data-uf].active')?.dataset.uf||'ALL';
 const term=(document.getElementById('search-input')?.value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const candidates=snapshot.candidatos.filter(x=>x.situacao==='aguardando_validacao_oficial');
 const selected=candidates.filter(x=>(active==='ALL'||x.uf===active)&&
   (!term||[x.orgao,x.uf,...x.cargos_genericos].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(term)));
 pill.textContent=selected.length+' em verificação';
 list.replaceChildren();
 if(!selected.length){list.append(text('p','Nenhuma oportunidade pendente para este filtro.','pci-empty'));}
 for(const c of selected.slice(0,40)){
  const card=document.createElement('article');card.className='pci-card';
  const top=document.createElement('div');top.className='pci-card-top';
  top.append(text('strong',c.orgao,'pci-org'),text('span','Pendente de edital','pci-status'));
  const roles=text('div',c.cargos_genericos.join(' · '),'pci-role');
  const info=document.createElement('div');info.className='pci-meta';
  info.append(text('span',(c.uf||'Nacional')+' · '+(c.inscricoes_ate?'Prazo anunciado pelo PCI: '+c.inscricoes_ate.split('-').reverse().join('/'):'Prazo não informado')));
  const a=document.createElement('a');a.href=c.link_pci||'https://www.pciconcursos.com.br/';
  a.target='_blank';a.rel='noopener noreferrer';a.textContent='Ver notícia no PCI ↗';
  a.setAttribute('aria-label','Ler a notícia sobre '+c.orgao+' no PCI Concursos, ainda sem validação do edital');
  card.append(top,roles,info,a);list.append(card);
 }
 footer.textContent='Pesquisa PCI: '+snapshot.atualizado_em.split('-').reverse().join('/')+
 '. Exibição parcial e não automática. Conteúdo descoberto pelo PCI não representa confirmação do edital e pode exigir qualificação adicional. Confira a fonte oficial antes de se inscrever.';
}
document.addEventListener('click',e=>{
 if(e.target.closest('#uf-filters [data-uf],#clear-filters'))setTimeout(render,0);
});
document.getElementById('search-input')?.addEventListener('input',render);
fetch('./candidatos_pci.json',{cache:'no-store'})
.then(r=>{if(!r.ok)throw Error('Arquivo não disponível');return r.json();})
.then(j=>{if(!Array.isArray(j.candidatos))throw Error('Formato inválido');snapshot=j;render();})
.catch(()=>{pill.textContent='Indisponível';list.append(text('p','A lista de oportunidades em verificação não está disponível agora. A lista de editais confirmados continua funcionando normalmente.','pci-empty'));});
})();