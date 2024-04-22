<script setup>
  // Importações do Vue
  import { onMounted, reactive, ref, computed } from "vue";
  // Componentes utilizados
  import PokemonList from "../components/PokemonList.vue";
  import CardPokemon from "@/components/CardPokemon.vue";

 
 
  // Variáveis reativas
  let pokemons = reactive(ref());
  let urlBase = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/");
  let searchPokemonField = ref("");
  let pokemonSelected = reactive(ref());
  let searchPokemonType = ref("");
  let pokemonTypes = ref([]);
  let searchPokemonSpecies = ref("");
  let evolutionChain = reactive(ref([]));
  let selectedLanguage = ref("pt");
  
 

  // Função executada após a montagem do componente
  onMounted(async () => {
    try {
      // Fetch para obter a lista inicial de Pokémon
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
      const data = await res.json();
      // Mapeamento dos dados obtidos
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
            ...pokemon,
            id: index + 1,
            type: pokemonData.types.map((type) => type.type.name),
            species: speciesData.name,
          };
        })
      );
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  });

  // Função computada para filtrar os Pokémon exibidos na lista
  const pokemonsFilter = computed(() => {
    if (pokemons.value) {
      return pokemons.value.filter(
        (pokemon) =>
          (searchPokemonField.value === "" ||
            pokemon.name.toLowerCase().startsWith(searchPokemonField.value.toLowerCase()) ||
            pokemon.id.toString() === searchPokemonField.value) &&
          (searchPokemonType.value === "" ||
            pokemon.type.includes(searchPokemonType.value.toLowerCase())) &&
          (searchPokemonSpecies.value === "" ||
            pokemon.species.toLowerCase().startsWith(searchPokemonSpecies.value.toLowerCase()))
      );
    }
    return pokemons.value;
  });

  // Função para selecionar um Pokémon
  const selectPokemon = async (pokemon) => {
    try {
      const res = await fetch(`${pokemon.url}?language=${selectedLanguage.value}`);
      const data = await res.json();
      pokemonSelected.value = data;
      pokemon.type = data.types.map((type) => type.type.name);
      fetchEvolutionChain(data.species.url);
    } catch (error) {
      console.error("Failed to fetch selected Pokemon:", error);
    }
  };

  // Função recursiva para obter os nomes da cadeia de evolução de um Pokémon
  function getEvolutionNames(chain) {
    let names = [chain.species.name];
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evo) => {
        names.push(...getEvolutionNames(evo));
      });
    }
    return names;
  }

  // Função para buscar a cadeia de evolução de um Pokémon
  const fetchEvolutionChain = async (speciesUrl) => {
    try {
      const res = await fetch(`${speciesUrl}?language=${selectedLanguage.value}`);
      const data = await res.json();
      const evolutionRes = await fetch(data.evolution_chain.url);
      const evolutionData = await evolutionRes.json();
      const evolutionNames = getEvolutionNames(evolutionData.chain);
      evolutionChain.value = evolutionNames;
    } catch (error) {
      console.error("Failed to fetch evolution chain:", error);
    }
  };

  // Função para alterar o idioma dos Pokémon exibidos
  const changeLanguage = async () => {
    console.log("Selected Language:", selectedLanguage.value);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0&language=${selectedLanguage.value}`);
      const data = await res.json();
      pokemons.value = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const pokemonRes = await fetch(pokemon.url);
          const pokemonData = await pokemonRes.json();
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
    } catch (error) {
      console.error("Failed to fetch Pokemon data in selected language:", error);
    }
  };
</script>


<template>
  <main class="pokemonBody">
    <div class="text-center">
      <label for="language-select">Select Language:</label>
      <select
        id="language-select"
        v-model="selectedLanguage"
        @change="changeLanguage"
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
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
            :types="
              pokemonSelected?.types.map((type) => type.type.name).join(' | ')
            "
            :moves="
              pokemonSelected?.moves
                .map((moviments) => moviments.move.name)
                .join(', ')
            "
            :abilities="
              pokemonSelected?.abilities
                .map((typeSlot) => typeSlot.ability.name)
                .join(', ')
            "
            :gameIndice="
              pokemonSelected?.game_indices
                .map((game) => game.version.name)
                .join(', ')
            "
            :evolutionChain="evolutionChain.join(' -> ')"
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
