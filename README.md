# Hotel Reserva

## Descrição

Aplicação que busca e reserva hotéis desenvolvido com Vue 3.

## Como rodar o Projeto

Após enntrar no diretório, instalar as dependências com ```npm install```, após a instalação das dependências, rodar o comando ```npm run dev```, após a execução doo último comando, abrir um novo terminal e rodar o comando ```npx json-server db.json --port 3001 delay --1000```, onde a flag delay é utilizada para simular throttling de rede.

## Detalhes

A aplicação "Hotel Reserva" foi desenvolvida com finalidade de testar habilidades relacionadas ao front-end utilizando Vue 3, Composition Api, teste unitários, Typescript, Pinia e Vue Router.

A aplicação é composta por um formulário que busca hotéis filtrados por:

- Destino
- Data de CheckIn
- Data de CheckOut
- Hóspedes
- Quartos

Uma lista com cartões com detalhes sobre os hotéis, que podem ser ordenadas por:

- Preço
- Avaliações
- Quantidade de avaliações

Possui a funcionalidade para comparar hotéis, que faz com que os cartões fiquem um do lado do outro para comparação de preço e avaliação.

Possui um formulário para reserva dos hotéis com o preenchimento do formulário que contém os seguintes campos:

- Nome
- Telefone
- Email
- Tipo do pagamento

Possui duas telas de navegação, onde uma contém as informações dos hotéis e suas funcionalidades e outra tela contendo detalhes sobre as reservas realizadas.

Sistema de notificação com um intervalo periódico para demonstrar novas notificações sobre as reservas.

## Fluxo da Aplicação

Após entrar na aplicação, é carregado uma tela com um formulário e uma lista contendo todos os hotéis listados pelo mock.

No formulário de pesquisa de hotéis, o único campo que possui filtro efetivo (para filtrar hotéis) é o campo de Destino, os demais outros campos (CheckIn, CheckOut, Hóspedes e Quartos) possui apenas relevância para modificar os preços de pacote nos hotéis.

Na parte de ordenação, é possível apenas ordenar na ordem do maior para menor, por exemplo:

- Ordenação por preço: filtra a lista de hotéis do maior para o menos

Cada cartão da lista contendo as informações de um hotél em específico possui um campo de checkbox, onde é possível selecionar um ou mais cartões de hotéis. Após selecionar os checkboxes aparece um novo botão ao lado dos botões de ordenação, que possui a funcionalidade de abrir uma nova tela (modal) contendo uma lista de cartões selecionados posicionados de forma horizontal.

Na página inicial, cada cartão de hotél possui um botão para comprar uma reserva. Após clicar no botão, aparece um formulário (overlay) para finalizar a compra. Ao clicar para finalizar a compra, após alguns segundos, é redirecionado para uma outra página contendo as informações sobre as reservas compradas.

Ná página/tela de Reservas é listado todas reservas.

### Tecnologias utilizadas

- Vue 3
- Typescript
- Pinia
- Vitest
- Vuetify
