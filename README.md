# RadarMed — Concursos da Vitória

Site público: https://radarmed-vitoria.onrender.com

## Objetivo
Acompanhar seleções de nível superior compatíveis com graduação em Medicina no Paraná, Santa Catarina e São Paulo, priorizando Curitiba e região.

## O que funciona
- Visão geral com vagas imediatas e inscrições a vencer
- Filtros por estado, vínculo e vagas imediatas; busca e exportação CSV
- Requisitos, salários, benefícios, jornada, taxas, provas, duração e prorrogação quando informadas
- Links para páginas oficiais; dificuldade estimada
- Favoritos no armazenamento local do navegador
- Botão “Adicionar à Agenda” abre Google Agenda com um evento pré-preenchido; a pessoa deve confirmar o salvamento
- Apresentação de boas-vindas com quatro passos

## O que NÃO está conectado automaticamente
- Os favoritos não sincronizam entre dispositivos
- Favoritar não cria automaticamente um evento de calendário
- O site não pesquisa editais em tempo real
- A pesquisa agendada de segunda/quinta e o envio de e-mails são tarefas separadas; os dados do painel devem ser publicados pelo fluxo de atualização do repositório

## Dados e publicação
- `index.html` é um painel autossuficiente. Pode abrir localmente.
- `dados.json` contém a base editável. **Quando publicado**, o site carrega essa base ao abrir. Não é necessário alterar o HTML para atualização regular.
- `atualizado_em` é a data da base efetivamente publicada, não uma promessa de atualização em tempo real.
- Render publica automaticamente commits da branch `main`.
- Padrão de dados: `{titulo, atualizado_em, observacao, vagas:[...]}`. Preserve os campos existentes das vagas.
- Atualize somente com informações verificadas nos editais oficiais e não sobrescreva o arquivo inteiro com resultados incompletos de uma busca.

## Cronograma
A pesquisa e o e-mail estão programados para **segunda e quinta às 08h15**, horário de Brasília. Após cada pesquisa, a tarefa deve tentar atualizar `dados.json` e verificar a publicação, e enviar resumo por e-mail com o link oficial do painel. Caso o GitHub ou Render falhe, informar que o painel não foi atualizado.

## Aviso
Este é um radar informativo, não o sistema de inscrição. Sempre verifique os editais, retificações e requisitos na fonte oficial antes de se inscrever.


## V1.1 — histórico e atualizações

- O painel consulta `dados.json` a cada visita, sem cache persistente; a automação de pesquisa é agendada para **segunda e quinta, 08h15 (Brasília)** no ChatGPT.
- A automação deve conferir cada edital oficial e **escrever os resultados verificados em `dados.json`** através do conector GitHub. O GitHub Action `.github/workflows/detectar-novidades.yml` compara a base atual com a imediatamente anterior e gera `novidades.json`.
- Alterações em `dados.json` disparam publicação automática no Render. O Action exige permissões GitHub Actions para escrita (`contents: write`) e deve ser conferido na aba Actions. Até haver um ciclo real concluído, o fluxo ponta a ponta não está homologado.
- O email de segunda/quinta contém um resumo útil com concursos, prazos e link público do painel. Não assumir sucesso se a integração de Gmail falhar.
- O painel permanece informativo: **não substitui a leitura do edital**, nem faz busca em tempo real.

## V1.2 — login Google e favoritos na nuvem (em preparação)

O código frontend já existe em `auth.js`. O botão de login fica desativado enquanto `auth-config.json` tiver `enabled:false`; os favoritos locais continuam funcionando.

Para ativar sem prejudicar o projeto OSCE, use um **projeto Supabase dedicado** ao RadarMed:
1. Criar o novo projeto no Supabase e confirmar que está ativo.
2. Aplicar `supabase/migrations/20261117_create_user_favorites.sql` e verificar as políticas RLS (cada pessoa só lê/grava seus próprios favoritos).
3. No Google Cloud, criar OAuth Client ID **Web**, origem `https://radarmed-vitoria.onrender.com` e URI de redirecionamento `https://<PROJECT_REF>.supabase.co/auth/v1/callback`.
4. No Supabase Auth > Providers > Google, ativar o provedor usando o Client ID e Secret; configurar Site URL `https://radarmed-vitoria.onrender.com` e redirect URL correspondente.
5. Em `auth-config.json`, preencher `enabled:true`, a URL pública `https://<PROJECT_REF>.supabase.co` e a **publishable key** (`sb_publishable_...`). Publishable key é pública por definição. **Nunca** publicar a secret key, service_role ou Client Secret no repositório.
6. Testar login, retorno OAuth, importação dos favoritos locais no primeiro acesso e sincronização em dois dispositivos.

Ao autenticar, os favoritos do navegador são importados na primeira conexão; nos acessos seguintes, a conta passa a ser a referência. A sincronização de favoritos **não** cria eventos automaticamente no Google Agenda; essa etapa depende de uma autorização separada. O botão manual da agenda continua disponível.

## Próximos módulos

- Google Agenda com consentimento individual e lembretes de inscrição/prova.
- Etapas de acompanhamento (interessada, inscrição, pagamento, prova).
- Alertas personalizados e experiência de instalação no celular.
