<template>
  <div id="app">
    <button @click="setLanguage(9)">English</button>
    <button @click="setLanguage(7)">Español</button>
    <button @click="setLanguage(13)">Português</button>
    <div>{{ language }}</div>
    <div>{{ pokemonName }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      language: 9, // Inglês como padrão
      pokemonName: '',
    };
  },
  methods: {
    async setLanguage(lang) {
      this.language = lang;
      await this.fetchPokemonData();
    },
    async fetchPokemonData() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/1/`); // Altere o número 1 para o ID do Pokémon que deseja obter as descrições
        const names = response.data.names;
        const nameInLanguage = names.find(name => name.language.id === this.language);
        if (nameInLanguage) {
          this.pokemonName = nameInLanguage.name;
        } else {
          this.pokemonName = 'Translation Not Found';
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchPokemonData();
  }
};
</script>


<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
button {
  margin: 5px;
  border: none;
  border-radius: 10px;
}
</style>
