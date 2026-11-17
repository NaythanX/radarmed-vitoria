# RadarMed — Quadro central de pesquisa e publicação

**Atualizado:** 2026-11-17. Este é o quadro de handoff entre as conversas de um projeto ChatGPT e a automação semanal. Não é fonte de edital: confirme no órgão/banca.

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
| Registros em dados.json | 14 linhas após Navegantes e Pouso Redondo; consultar valor atual antes de repetir | Recontar **editais** e **cargos/jornadas**, separadamente |
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

## Regras do registro
1. O estado deste documento é **uma síntese**, não substitui ler edital ou `dados.json`.
2. Nunca transformar lead de PCI em publicado sem validação, commit e deploy.
3. Preservar pendências não resolvidas mesmo quando não aparecerem em buscas posteriores.
4. Usar data/hora, editais distintos, cargos/jornadas e links de fonte. Não inventar contagens não auditadas.
5. Ler o SHA atual antes de editar; escrever mudanças mínimas para evitar conflitos de conversas/automação.
6. Quando a pesquisa for parcial, sinalizar claramente o que ficou sem cobertura.
