# Pokédex Vue App

Este é um aplicativo de Pokédex desenvolvido em Vue.js, utilizando a API PokeAPI para obter informações sobre os Pokémon.

## Funcionalidades

:heavy_check_mark: Listagem dos Pokémon com scroll infinito

:heavy_check_mark: Filtros para nome, ID, tipo e espécie dos Pokémon

:construction: Suporte aos idiomas Português, Inglês e Espanhol

:heavy_check_mark: Detalhes do Pokémon ao abrir seu card na listagem, incluindo:

:heavy_check_mark: Sprites do Pokémon

:heavy_check_mark: Movimentos de ataque

:heavy_check_mark: Evoluções, quando disponíveis

:heavy_check_mark: Games em que o Pokémon está presente

:heavy_check_mark: Aplicação responsiva

## Tecnologias Utilizadas

- Vue.js
- HTML
- CSS (Bootstrap opcional)
- JavaScript

## Instalação e Uso
1.Clone este repositório:

```sh
git clone https://github.com/seu-usuario/pokedex-vue.git
```
2.Instale as dependências:

```sh
cd pokedex-vue
npm install
```
3.Inicie o servidor de desenvolvimento:
```sh
npm run dev
```

## Estrutura do Projeto

- src/components/CardPokemon.vue: Componente para exibir os detalhes do Pokémon.
- src/components/PokemonList.vue: Componente para listar os Pokémon com filtros.
- src/views/Home.vue: Página inicial que contém a listagem de Pokémon.
- src/App.vue: Componente raiz do aplicativo.
- src/main.js: Arquivo principal do Vue.js.

## Como Funciona

- Ao acessar o aplicativo, você verá a lista de Pokémon.
- Você pode filtrar os Pokémon por nome, ID, tipo e espécie.
- Ao clicar em um Pokémon na lista, você verá detalhes como seus sprites, movimentos de ataque, evoluções e games em que está presente.
- Você pode alterar o idioma entre Português, Inglês e Espanhol para ver os dados dos Pokémon no idioma desejado.
