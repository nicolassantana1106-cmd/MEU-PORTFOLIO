# MEU-PORTFOLIO

Portfólio pessoal desenvolvido como projeto acadêmico para a disciplina de Desenvolvimento Front-End para Web.

## Link do site publicado
https://nicolassantana1106-cmd.github.io/MEU-PORTFOLIO/

## Entrega CP4

Versão final do portfólio pessoal, evoluída a partir dos checkpoints anteriores e publicada no GitHub Pages com HTTPS.

### Alterações realizadas

- Estrutura do portfólio organizada em 5 páginas:
  - index.html
  - pages/curriculo.html
  - pages/formulario.html
  - pages/multimidia.html
  - pages/grafico.html
- Criação de um layout visual mais alinhado ao padrão de portfólio, com header, hero e navegação interna.
- Implementação de header e footer reutilizáveis para manter consistência visual em todas as páginas.
- Ajustes de responsividade para telas menores, garantindo melhor visualização em mobile e tablets.
- Integração do Bootstrap 5.3.3 em todas as páginas, complementando o CSS personalizado.
- Melhorias de acessibilidade: link para pular ao conteúdo, navegação identificada, estado da página atual, foco de teclado visível, mensagens de erro associadas aos campos e descrição acessível do gráfico.

### Feature interativa com JavaScript e localStorage

A funcionalidade interativa foi implementada em `js/scripts.js` e inclui:

- Toggle de tema (claro/escuro) com persistência no navegador.
- Salvamento do tema no `localStorage` para manter a preferência do usuário entre visitas.
- Persistência de rascunho do formulário.
- Armazenamento do último envio do formulário para reforçar a interatividade com dados do navegador.

### Validação do formulário

O formulário em `pages/formulario.html` foi validado com JavaScript, com feedback visual direto ao usuário:

- Nome obrigatório e com tamanho mínimo válido.
- E-mail com validação de formato.
- Seleção de área de interesse obrigatória.
- Escolha de prioridade obrigatória.
- Mensagem com tamanho mínimo exigido.
- Mensagens de erro e sucesso exibidas visivelmente para o usuário.

### Arquivos principais

- `css/estilos.css` — estilos do projeto.
- `js/scripts.js` — interatividade e persistência com localStorage.
- `js/includes.js` — carregamento do header e do footer compartilhados.
- `components/header.html` — estrutura do cabeçalho.
- `components/footer.html` — estrutura do rodapé.

### Repositório e publicação

- Repositório GitHub configurado com histórico de commits.
- Tag `cp3-entrega` marca o checkpoint anterior; a tag `cp4-entrega` identifica a versão final.
- Site publicado em GitHub Pages com HTTPS.

### Observações finais

O vídeo de apresentação entre 1min30s e 2min30s deve ser gravado e enviado pelo autor. Ele deve mostrar a navegação no site publicado e a funcionalidade JavaScript em execução, além de explicar a evolução do CP1 ao CP4 e as decisões de layout, responsividade, acessibilidade, Bootstrap e uso/revisão de IA, se aplicável.
