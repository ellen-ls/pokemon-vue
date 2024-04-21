<template>
  <div id="app">
    <button @click="setLanguage('pt')">Português</button>
    <button @click="setLanguage('en')">English</button>
    <button @click="setLanguage('es')">Español</button>
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
      language: 'pt',
      pokemonName: ''
    };
  },
  methods: {
    async setLanguage(lang) {
      this.language = lang;
      await this.fetchPokemonData();
    },
    async fetchPokemonData() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.language}`);
        this.pokemonName = response.data.name;
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
}
</style>