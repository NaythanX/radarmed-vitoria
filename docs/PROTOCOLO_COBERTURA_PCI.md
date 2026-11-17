# Protocolo de cobertura — RadarMed Vitória

Revisão: 17/11/2026.

## Objetivo
Identificar concursos e processos seletivos de nível superior compatíveis com graduação em Medicina em PR, SC e SP, sem exigir especialização não comprovada. **Priorizar por região não significa excluir municípios distantes.** Incluir efetivos, temporários/PSS, CLT, cadastro de reserva (CR) e cargos com vagas imediatas.

## Fontes, sempre nesta ordem de uso
1. **Descoberta ampla**: [PCI Concursos](https://www.pciconcursos.com.br/) — [pesquisa por médico](https://www.pciconcursos.com.br/pesquisa/medico), [cargos](https://www.pciconcursos.com.br/cargos/), [últimas notícias](https://www.pciconcursos.com.br/ultimas/), [concursos do Sul](https://www.pciconcursos.com.br/concursos/sul/) e [Sudeste](https://www.pciconcursos.com.br/concursos/sudeste/). Notícias e listagens são PISTAS e não provam a situação atual da inscrição ou os requisitos.
2. **Descoberta independente**: bancas oficiais, prefeituras, Diários Oficiais e outras listas de concursos. FURB, FEPESE, UNIVALI, AMEOSC, SC Treinamentos, PS Concursos, Fênix, Instituto Unicampo, Publiconsult, INDEPAC, FAFIPA e outras, sem exclusividade.
3. **Verificação obrigatória**: edital, retificações e página atual do órgão/banca. Resolver divergências de data e de status antes de publicar.

O PCI oferece um conector MCP oficial com cinco ferramentas somente de consulta em https://www.pciconcursos.com.br/mcp-e-gpt. Usar quando realmente estiver conectado e disponível; caso contrário consultar páginas web, nunca presumir acesso.

## Matriz de busca
- PR: cobrir capital, região metropolitana, interior e localidades pequenas.
- SC: cobrir litoral, Vale do Itajaí, oeste, sul, serra e norte; incluir a região de Navegantes.
- SP: cobrir capital, grande São Paulo, interior e litoral.
- Termos combinados: médico, clínico geral, generalista, ESF, PSF, atenção básica, plantonista, perito, auditor médico, médico legista, medicina, nível superior qualquer área.
- Vários cargos: abrir e verificar editais mistos, porque o título da notícia não precisa conter a palavra "médico".
- Excluir: medicina veterinária, enfermagem, nível médio/técnico, especialidades com residência/título/RQE obrigatório não comprovado e oportunidades com inscrições oficialmente encerradas.
- Separar **quantidade de registros** (cargo + carga horária) de **quantidade de editais distintos**. Um concurso pode conter várias jornadas.

## Etapas para cada oportunidade
1. **Descoberto**: link público PCI ou outra fonte; ainda NÃO publicar como aberto.
2. **Em verificação**: localizar órgão/banca, conferir inscrição, status, escolaridade, especialidade, CRM, jornada, vagas, vínculo, taxas, salários e retificações.
3. **Elegível confirmado**: gravar um ID estável em `dados.json`, com link oficial, data de checagem e somente campos verificados. Registrar banca e conteúdo do programa apenas com referência oficial.
4. **Excluído**: documentar razão (inscrições encerradas; especialização; cargo incompatível; suspensão; duplicidade).
5. **Monitorado**: revisar edital/erratas no ciclo seguinte; não remover histórico ou substituir toda a base por lista parcial.

## Problemas encontrados em 17/11/2026
- **Navegantes/SC**: PSS nº 0172/2026 faltava e foi publicado após verificação oficial FURB.
- **Pouso Redondo/SC**: PSS nº 003/2026 faltava; médico compatível na página oficial da SC Treinamentos, inscrição até 26/11/2026. Adicionado à base.
- **Santa Terezinha do Progresso/SC**: PCI noticiou Médico e inscrições até 25/11, enquanto a página oficial da Fênix mostra prazo de 24/11 às 18h e situação **"Suspenso"** apesar de também exibir aviso de inscrições abertas. **Manter pendente; NÃO declarar seleção ativa enquanto não esclarecer o status diretamente na banca.**
- **Mogi Guaçu/SP**: PCI noticiou Médico Clínico Geral no concurso nº 3/2026, prazo 27/11. A situação de aptidão do cargo e os requisitos exatos dependem de edital oficial Publiconsult; **pendente de revisão**.

## Atualização e relatório
A automação de segunda e quinta 08h15 deve pesquisar e verificar novos editais, comparar com `dados.json`, atualizar o GitHub com controle de SHA, conferir publicação Render quando possível e enviar e-mail à Vitória em todas as execuções. Informar número de descobertos no PCI, confirmados, já cadastrados, pendentes, excluídos, prazo próximos de 7 dias e **quando a busca foi parcial**. Nunca confundir atualização do site PCI com atualização da base RadarMed; são fontes independentes. Não criar compromisso no Google Agenda sem consentimento da estudante.

## Condições do painel
A interface RadarMed inicia com UF=Todos, vínculo=Todos e filtro de vagas imediatas DESLIGADO. Um concurso ausente de `dados.json` não está escondido: nunca foi cadastrado. A correção prioritária é **cobertura das fontes**, não relaxar indiscriminadamente filtros de elegibilidade.

## Uso de um ChatGPT Project
Um projeto de ChatGPT separado pode se chamar **Radar de Concursos — Pesquisa e Auditoria** para comparar editais e manter histórico de decisões. Ele não substitui a automação nem o arquivo `dados.json`. Quando criar o projeto, fixar este protocolo e vincular a automação atual ao fluxo de publicação. Esse projeto deve tratar apenas da descoberta/validação; o Prisma continua dedicado ao estudo.
