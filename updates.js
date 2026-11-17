/* Resumo do que mudou entre as duas últimas bases publicadas. */
(async () => {
  "use strict";
  const target = document.getElementById("radarmed-changes");
  if (!target) return;
  try {
    const [changesRes, dataRes] = await Promise.all([
      fetch("./novidades.json", { cache: "no-store" }),
      fetch("./dados.json", { cache: "no-store" })
    ]);
    if (!changesRes.ok || !dataRes.ok) return;
    const changes = await changesRes.json();
    const base = await dataRes.json();
    if (changes.atualizado_em !== base.atualizado_em) {
      target.textContent = "O histórico das novidades ainda está sendo atualizado.";
      return;
    }
    const summary = changes.resumo || {};
    const ids = [...(changes.novos || []), ...(changes.retificados || [])];
    const rows = ids.map(id => base.vagas.find(v => v.id === id)).filter(Boolean);
    const title = document.createElement("h3");
    title.textContent = "Novidades desde a última revisão";
    const lead = document.createElement("p");
    lead.textContent = (summary.novos || 0) + " novo(s) concurso(s) · " +
      (summary.retificados || 0) + " retificação(ões) · " +
      (summary.retirados || 0) + " oportunidade(s) retirada(s)";
    target.append(title, lead);
    if (!ids.length && !(changes.retirados || []).length) {
      const msg = document.createElement("p");
      msg.textContent = "Nenhuma mudança na última comparação. Confira os prazos e as oportunidades já abertas.";
      target.appendChild(msg);
    }
    const ul = document.createElement("ul");
    rows.slice(0, 6).forEach(v => {
      const li = document.createElement("li");
      const status = (changes.novos || []).includes(v.id) ? "Novo" : "Retificado";
      const a = document.createElement("a");
      a.href = v.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = status + ": " + v.cargo + " — " + v.cidade + "/" + v.uf;
      li.appendChild(a);
      ul.appendChild(li);
    });
    if (ul.children.length) target.appendChild(ul);
    const stamp = document.createElement("small");
    const formatted = iso => iso ? iso.split("-").reverse().join("/") : "não informada";
    stamp.textContent = "Comparação com a revisão de " + formatted(changes.comparado_com) +
      " · Base publicada em " + formatted(changes.atualizado_em) +
      ". Mudanças devem ser conferidas nos editais oficiais.";
    target.appendChild(stamp);
  } catch (err) { console.warn("Histórico indisponível:", err); }
})();
