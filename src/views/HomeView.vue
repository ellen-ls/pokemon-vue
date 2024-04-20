<script setup>
import CardPokemon from "@/components/CardPokemon.vue";
import { onMounted, reactive, ref, computed } from "vue";
import PokemonList from "../components/PokemonList.vue";

let pokemons = reactive(ref());
let urlBase = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"
);
let searchPokemonField = ref("");
let pokemonSelected = reactive(ref());

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((res) => res.json())
    .then((res) => (pokemons.value = res.results));
});

const pokemonsFilter = computed(() => {
  if (pokemons.value && searchPokemonField.value) {
    return pokemons.value.filter((pokemon) =>
      pokemon.name
      
        .toLowerCase()
        .includes(searchPokemonField.value.toLowerCase())
    );
  }
  return pokemons.value;
});

const selectPokemon = async (pokemon) => {
  await fetch(pokemon.url)
    .then(res => res.json())
    .then(res => pokemonSelected.value = res);
    

  console.log(pokemonSelected.value);
};
</script>

<template>
  <main class="pokemonBody">
    <div class="container p-4">
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
          <CardPokemon

            :name="pokemonSelected?.name"
            :xp="pokemonSelected?.base_experience"
            :height="pokemonSelected?.height"
            :weight="pokemonSelected?.weight"
            :img="pokemonSelected?.sprites.front_default"
            :img2="pokemonSelected?.sprites.back_default"
              
          />
          <v-chip
          label
          v-for="type in pokemonSelected?.types"
          :key="type.name"
          >{type.type.name}
          </v-chip>

        </div>

        <div class="col-sm-12 col-md-6">
          <div class="card cardBody">
            <div class="card-body row">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">🔎</span>

                <input
                  v-model="searchPokemonField"
                  type="text"
                  class="form-control"
                  id="searchPokemonField"
                  placeholder="Pesquisar"
                  aria-label="Username"
                  a
                  ria-describedby="basic-addon1"
                />
              </div>
              <PokemonList
                v-for="pokemon in pokemonsFilter"
                :key="pokemon.name"
                :name="pokemon.name"
                :urlBase="urlBase + pokemon.url.split('/')[6] + '.svg'"
                :ids="pokemon.url.split('/')[6]"
                @click="selectPokemon(pokemon)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.pokemonBody {
  background-image: url("https://i.pinimg.com/736x/2b/3b/04/2b3b04771ccca26c3dd96d781b0117ca.jpg");
  background-size: cover;
}

.cardBody {
  background-color: rgb(42, 134, 88);
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
