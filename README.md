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
