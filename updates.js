/* Atualizações da base: uma linha recolhida, sem competir com concursos. */
(async () => {
  'use strict';
  const target = document.getElementById('radarmed-changes');
  if (!target) return;
  target.hidden = true;

  try {
    const [changesRes, dataRes] = await Promise.all([
      fetch('./novidades.json', { cache: 'no-store' }),
      fetch('./dados.json', { cache: 'no-store' })
    ]);
    if (!changesRes.ok || !dataRes.ok) return;
    const [changes, base] = await Promise.all([changesRes.json(),dataRes.json()]);
    if (changes.atualizado_em !== base.atualizado_em || !Array.isArray(base.vagas)) return;

    // Preserve o compartilhamento de oportunidades novas com a ponte RadarMed-Prisma.
    const updateRecent = () => window.RadarMedBridge?.setRecent?.(changes.novos || []);
    if (window.RadarMedBridge?.isReady?.()) updateRecent();
    else window.addEventListener('radarmed:ready', updateRecent, {once: true});

    const fresh = Array.isArray(changes.novos) ? changes.novos : [];
    const edited = Array.isArray(changes.retificados) ? changes.retificados : [];
    const removed = Array.isArray(changes.retirados) ? changes.retirados : [];
    const ids = [...new Set([...fresh, ...edited])];
    // Não chamar um ajuste de registro de "retificação de edital" sem confirmação documental.
    if (!ids.length && !removed.length) return;

    const byId = new Map(base.vagas.map(v=>[v.id,v]));
    const rows = ids.map(id=>byId.get(id)).filter(Boolean);
    const make = (tag, className, value) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (value != null) el.textContent = value;
      return el;
    };
    const wrap = make('details','changes-disclosure');
    const summary = make('summary');
    summary.append(make('span','', 'Atualizações da base'));
    const badges = make('span','changes-summary');
    if (fresh.length) badges.append(make('span','changes-chip',fresh.length + ' nova(s)'));
    if (edited.length) badges.append(make('span','changes-chip',edited.length + ' registro(s) revisado(s)'));
    if (removed.length) badges.append(make('span','changes-chip',removed.length + ' removido(s)'));
    summary.append(badges);
    summary.append(make('span','changes-expand','Ver detalhes ▾'));
    wrap.append(summary);

    const body = make('div','changes-content');
    body.append(make('p','', 'Confira as alterações documentadas na base. Atualização de registro não significa necessariamente retificação oficial do edital.'));
    const ul=make('ul');
    for (const v of rows.slice(0,6)) {
      const li=make('li');
      const a=make('a');
      a.href=v.url;
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.textContent=(fresh.includes(v.id)?'Novo':'Revisado')+': '+v.cargo+' — '+v.cidade+'/'+v.uf;
      li.append(a);ul.append(li);
    }
    if (ul.children.length) body.append(ul);
    if (rows.length>6) body.append(make('p','changes-more','E mais '+(rows.length-6)+' registro(s) revisado(s) na base.'));
    const date = iso => /^\d{4}-\d\d-\d\d$/.test(String(iso||'')) ? iso.split('-').reverse().join('/') : 'data não informada';
    body.append(make('small','', 'Base publicada em '+date(changes.atualizado_em)+
      ' · Comparação com '+date(changes.comparado_com)+' · Verifique sempre o edital oficial.'));
    wrap.append(body);
    // Substituição completa evita o carregamento residual e duplicações em reexecuções.
    target.replaceChildren(wrap);
    target.hidden=false;
  } catch (err) {
    // Uma falha no histórico não impede o funcionamento do RadarMed.
    console.warn('Histórico indisponível:',err);
    target.hidden=true;
  }
})();
