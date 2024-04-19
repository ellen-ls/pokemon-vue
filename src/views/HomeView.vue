<script setup>
import {onMounted, reactive,ref, computed} from "vue";
import PokemonList from "../components/PokemonList.vue"


let pokemons = reactive(ref())
let urlBase = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/")
let searchPokemonField = ref("")

onMounted(()=>{
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
  .then(res => res.json())
  .then(res => pokemons.value = res.results)
})

const pokemonsFilter = computed(()=>{
  if(pokemons.value && searchPokemonField.value){
    return pokemons.value.filter(pokemon=>
    pokemon.name.toLowerCase().includes(searchPokemonField.value.toLowerCase())
    )
  }
  return pokemons.value
})
</script>

<template>
  <main>
   <div class="container">
   <div class="card">

         <div class="card-body row">
         <div class="input-group mb-3">
           <span class="input-group-text" id="basic-addon1">🔎</span>

           <input 
           v-model="searchPokemonField"
           type="text" 
           class="form-control" 
           id="searchPokemonField"
           placeholder="Pesquisar" 
           aria-label="Username" a
           ria-describedby="basic-addon1">
         </div>
         <PokemonList
           v-for="pokemon in pokemonsFilter"
           :key="pokemon.name"
           :name="pokemon.name"
           :urlBase="urlBase + pokemon.url.split('/')[6] + '.svg'"
        />
        
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       </div>
  </div>
   </div>


  </main>
</template>
