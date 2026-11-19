# RadarMed — Quadro central de pesquisa e publicação

**Atualizado:** 2026-11-19 (auditoria e publicação incremental). Este é o quadro de handoff entre as conversas de um projeto ChatGPT e a automação semanal. Não é fonte de edital: confirme no órgão/banca.

## Fontes de verdade
- Base pública: [dados.json](../dados.json) (branch main) e [site RadarMed](https://radarmed-vitoria.onrender.com).
- Protocolo de cobertura: [PROTOCOLO_COBERTURA_PCI.md](./PROTOCOLO_COBERTURA_PCI.md).
- Descoberta: PCI Concursos plugin quando conectado, bancas, prefeituras, Diários Oficiais.
- Validação de elegibilidade, datas e salários: **edital e retificações oficiais**.
- Publicação: commit GitHub + CI + deploy Render confirmado.

## Situação inicial da auditoria
| Eixo | Estado em 17/11/2026 | Próximo trabalho |
|---|---|---|
| Cobertura PR/SC/SP | **Parcial**, não exaustiva | Cruzar múltiplas buscas PCI, bancas e municípios |
| Registros em dados.json | **33 cargos/jornadas** na revisão atual; conferir SHA e contagem antes de alterar | Recontar **editais** e **cargos/jornadas**, separadamente |
| Falsos positivos PCI | Ocorrência de Médico Veterinário nas buscas por “médico” | Triagem profissional e exigência de RQE |
| Navegantes (SC) | 4 cargos/jornadas registrados com fonte FURB | Monitorar retificações e prazo 25/11/2026 |
| Pouso Redondo (SC) | Médico registrado após validação inicial SC Treinamentos | Monitorar retificações e prazo 26/11/2026 |
| Santa Terezinha do Progresso (SC) | **PENDENTE:** divergência de prazo e indicação de suspensão | Reabrir fonte oficial Fênix antes de publicar |
| Mogi Guaçu (SP) | **DESCOBERTO:** validar edital e Médico Clínico Geral | Validar requisitos/abertura/vagas na Publiconsult |
| Automação de e-mail | “Radar concursos Vitória”, seg/qui 08h15 | Evitar outra automação duplicada |

## Pipeline e responsabilidade

| Conversa | Faz | Não faz |
|---|---|---|
| 00 Orquestrador | Prioriza fila e atualiza este documento | Fingir que outros chats executaram tarefas |
| 01 Descoberta PCI | Investiga e deduplica candidatos por UF | Publicar ou declarar elegível |
| 02 Validação | Confere edital, erratas e requisitos de Medicina | Publicar sem revisão |
| 03 Publicação | Escreve dados.json com SHA, testa deploy | Inserir notícias PCI sem edital |
| 04 Auditoria | Busca faltantes, conflitos e filtros incorretos | Enviar e-mail |
| 05 Comunicação | Resume mudanças efetivamente confirmadas | Enviar e-mail duplicado |
| 06 Prisma | Metadados oficiais da banca, programa e provas passadas | Alterar progresso privado |

## Registro de passagens (acrescentar uma linha por ciclo)

| Data/hora Brasília | Etapa | Concurso ou lote | Descobertos | Confirmados | Publicados | Pendentes | Fonte/commit/observação |
|---|---|---|---:|---:|---:|---:|---|
| 17/11/2026 | Auditoria inicial | SC e revisão parcial PR/SP | — | 5 registros de cargo/jornada | 5 | vários | Navegantes (4), Pouso Redondo (1); cobertura ainda parcial |
| 17/11/2026 | Integração PCI | PR/SC/SP, busca cargo médico | 53 editais PCI únicos | 12 novos registros de cargo/jornada com fonte oficial | 12 | 9 leads médicos gerais na fila PCI | 26 registros no total; candidatos_pci.json contém filas separadas por situação. Fonte PCI não é comprovação de elegibilidade nem leitura do edital. |
| 19/11/2026 08h Brasília | PCI + editais oficiais | PR/SC/SP; Diário Oficial Palmital, Talent Coronel Freitas, HC Ibirama, SC Treinamentos Bom Retiro, Fênix Santa Terezinha | 56 resultados nas 3 buscas PCI atuais (4 PR, 27 SC, 25 SP); 62 IDs no histórico acumulado | 4 editais oficiais, 7 registros de cargo/jornada | 7 | 9 candidatos PCI em verificação | dados.json 33 cargos; Santa Terezinha suspensa na Fênix; Palmital inicia inscrições 25/11; commits 81e1dd94, 622625e9. Cobertura parcial, sem auditoria integral de todos os municípios. |

## Regras do registro
1. O estado deste documento é **uma síntese**, não substitui ler edital ou `dados.json`.
2. Nunca transformar lead de PCI em publicado sem validação, commit e deploy.
3. Preservar pendências não resolvidas mesmo quando não aparecerem em buscas posteriores.
4. Usar data/hora, editais distintos, cargos/jornadas e links de fonte. Não inventar contagens não auditadas.
5. Ler o SHA atual antes de editar; escrever mudanças mínimas para evitar conflitos de conversas/automação.
6. Quando a pesquisa for parcial, sinalizar claramente o que ficou sem cobertura.

## Integração PCI visível no site (17/11/2026)
- O **plugin PCI Concursos** está conectado e foi consultado para a pesquisa por cargo “médico” em PR, SC e SP. Resultados: 4 PR, 23 SC, 28 SP, total **53 editais PCI únicos** após desduplicação entre estados, entre os quais aparecem especialidades, Medicina Veterinária e certames nacionais.
- O arquivo `candidatos_pci.json` registra um **retrato datado** dessas pesquisas, com status de cada edital (publicado, aguardando validação, especialidade/incompatibilidade, data futura/encerrada). Na primeira fotografia há **9 candidatos generalistas/compatíveis pendentes de validação oficial**, que aparecem no RadarMed na seção “Oportunidades em verificação” dentro da aba Oportunidades, separada da lista principal.
- O arquivo `pci-pendentes.js` renderiza a seção de auditoria, exibe apenas as pistas com estado `aguardando_validacao_oficial` e respeita filtro de UF e busca textual. O navegador **não consulta o plugin PCI ao vivo**; é uma fotografia publicada por GitHub, atualizável pelo orquestrador após cada pesquisa.
- A lista de vagas verificadas em `dados.json` foi ampliada com **12 registros médicos** de Araranguá, Curitibanos, São Carlos, Agronômica, Guarujá do Sul, Fraiburgo, Mogi Guaçu e Corumbataí. Há campos “Consultar edital” onde remuneração/requisitos específicos ainda não estavam disponíveis nas páginas oficiais consultadas; não são valores inventados.
- A divergência de data de Umuarama está explicitamente descrita na base, com referência à banca Instituto Unicampo (02/12) e aviso da Prefeitura (30/11), até resolução oficial documentada.
- **Ação restante:** continuar verificando os nove leads e ampliar buscas por sinônimos, especialidades com exigência esclarecida e cargos de nível superior compatíveis. Não afirmar cobertura total dos estados.

### Observações da revisão de 19/11/2026
- 7 registros novos publicados em 4 editais: Palmital/PR (2 médicos gerais, 2 vagas imediatas + CR cada, inscrições futuras 25/11-27/12); Coronel Freitas/SC (3 perfis médicos, CR, inscrições até 27/11); Ibirama/SC (Médico Clínico Geral, 1 + CR, até 29/11); Bom Retiro/SC (Médico, quantitativo específico ainda precisa confirmação, até 23/11).
- Santa Terezinha do Progresso/SC: Fênix Instituto classifica Concurso 01/2026 como **Suspenso**, logo não anunciar inscrições abertas mesmo que PCI indique prazo. Fonte: https://institutofenix.selecao.net.br/informacoes/103
- PCI é descoberta, não validação. Buscas principais tiveram 56 resultados (4 PR, 27 SC, 25 SP), mas o histórico acumulado possui 62 IDs porque conserva pistas de ciclos anteriores. A cobertura de bancas e cidades permanece parcial.
