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
let searchPokemonType = ref("");
let pokemonTypes = ref([]);
let searchPokemonSpecies = ref("");
let evolutionChain = reactive(ref([]));

onMounted(async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
  );
  const data = await res.json();
  pokemons.value = await Promise.all(
    data.results.map(async (pokemon, index) => {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      const resTypes = await fetch("https://pokeapi.co/api/v2/type");
      const dataTypes = await resTypes.json();
      pokemonTypes.value = dataTypes.results.map((type) => type.name);
      const speciesRes = await fetch(pokemonData.species.url); 
      const speciesData = await speciesRes.json();
      return {
        species: speciesData.name,
        ...pokemon,
        id: index + 1,
        type: pokemonData.types.map((type) => type.type.name),
      };
    })
  );
});

const pokemonsFilter = computed(() => {
  if (pokemons.value) {
    return pokemons.value.filter(
      (pokemon) =>
        (searchPokemonField.value === "" ||
          pokemon.name
            .toLowerCase()
            .includes(searchPokemonField.value.toLowerCase()) ||
          pokemon.id.toString() === searchPokemonField.value) &&
        (searchPokemonType.value === "" ||
          pokemon.type.includes(searchPokemonType.value.toLowerCase())) && // Adicione esta linha para filtrar por tipo
        (searchPokemonSpecies.value === "" ||
          pokemon.species
            .toLowerCase()
            .includes(searchPokemonSpecies.value.toLowerCase())) // Filtrar por espécie
    );
  }
  return pokemons.value;
});
const selectPokemon = async (pokemon) => {
  await fetch(pokemon.url)
    .then((res) => res.json())
    .then((res) => {
      pokemonSelected.value = res;
      pokemon.type = res.types.map((type) => type.type.name); // Adicione esta linha para salvar o tipo do Pokémon
      fetchEvolutionChain(res.species.url);
      
    });

};

function getEvolutionNames(chain) {
  let names = [chain.species.name];
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evo) => {
      names.push(...getEvolutionNames(evo));
    });
  }
  return names;
}

const fetchEvolutionChain = async (speciesUrl) => {
  const speciesRes = await fetch(speciesUrl);
  const speciesData = await speciesRes.json();
  const evolutionChainRes = await fetch(speciesData.evolution_chain.url);
  const evolutionChainData = await evolutionChainRes.json();
  
  const evolutionNames = getEvolutionNames(evolutionChainData.chain);
  evolutionChain.value = evolutionNames;
};


</script>

<template>
  <main class="pokemonBody">
       <div class="container p-4">
       <div class="row mt-4">
        <div class="col-sm-12 col-md-6 mb-3 mb-md-0">
          <CardPokemon
            
            :name="pokemonSelected?.name"
            :xp="pokemonSelected?.base_experience"
            :hp="pokemonSelected?.stats[0].base_stat"
            :attack="pokemonSelected?.stats[1].base_stat"
            :defense="pokemonSelected?.stats[2].base_stat"
            :special_attack="pokemonSelected?.stats[3].base_stat"
            :special_defense="pokemonSelected?.stats[4].base_stat"
            :speed="pokemonSelected?.stats[5].base_stat"
            :height="pokemonSelected?.height"
            :weight="pokemonSelected?.weight"
            :img="pokemonSelected?.sprites.front_default"
            :img2="pokemonSelected?.sprites.back_default"
            :types="pokemonSelected?.types.map((type) => type.type.name).join(', ')"
            :moves="pokemonSelected?.moves.map((moviments) => moviments.move.name).join(', ')"
            :abilities="pokemonSelected?.abilities.map((typeSlot) => typeSlot.ability.name).join(', ')"
            :gameIndice="pokemonSelected?.game_indices.map((game) => game.version.name).join(', ')"
            :evolutionChain="evolutionChain.join(', ')"
                        
          />
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
                  placeholder="Pesquisar nome ou ID"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div class="mb-3">
                <label for="searchPokemonSpecies" class="form-label"
                  >Filtrar por espécie</label
                >
                <input
                  v-model="searchPokemonSpecies"
                  type="text"
                  class="form-control"
                  id="searchPokemonSpecies"
                  placeholder="Pesquisar espécie"
                />
              </div>
              <div class="mb-3">
                <label for="searchPokemonType" class="form-label"
                  >Filtrar por tipo</label
                >
                <select
                  v-model="searchPokemonType"
                  id="searchPokemonType"
                  class="form-control"
                >
                  <option value="">Todos os tipos</option>
                  <option
                    v-for="type in pokemonTypes"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
              </div>
               <PokemonList
                v-for="pokemon in pokemonsFilter"
                :key="pokemon.name"
                :name="pokemon.name"
                :urlBase="urlBase + pokemon.id + '.svg'"
                :ids="pokemon.id"
                :type="pokemon.type.join()"
                @click="selectPokemon(pokemon)"
                class="mb-3"
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

.card-body {
  background-color: rgb(42, 134, 88);
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.card-body::-webkit-scrollbar {
  width: 8px;
}

.card-body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.card-body::-webkit-scrollbar-thumb {
  background-color: rgb(55, 173, 114);
  border-radius: 10px;
}

.card-body::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

</style>
