<script setup>
const pokemon = defineProps([
  "name",
  "hp",
  "attack",
  "defense",
  "special_attack",
  "special_defense",
  "speed",
  "xp",
  "height",
  "img",
  "img2",
  "weight",
  "types",
  "moves",
  "abilities",
  "gameIndice",
]);
</script>


<template>
  <div class="show-specifications">
    <div class="card p-4">
      <div class="imgPokemon">
        <img
          v-if="pokemon.name"
          :src="pokemon.img"
          height="250"
          class="card-img-top"
          :alt="pokemon.name"
        />
        <img
          v-if="pokemon.name"
          :src="pokemon.img2"
          height="250"
          class="card-img-top"
          :alt="pokemon.name"
        />
        <img
          v-else
          src="../assets/egg_pokemon.svg"
          height="250"
          class="card-img-top"
          alt="???"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">{{ pokemon.name || "???" }}</h5>
        <p class="text-center border">{{ pokemon.types }}</p>
        <hr />
        <div class="row">
          <section class="col">
            <strong>XP: </strong>
            <span>{{ pokemon.xp }}</span>
          </section>
          <section class="col">
            <strong>HP: </strong>
            <span>{{ pokemon.hp }}</span>
          </section>
           <section class="col">
            <strong>Ataque: </strong>
            <span>{{ pokemon.attack }}</span>
          </section>
            <section class="col">
            <strong>Defesa: </strong>
            <span>{{ pokemon.defense }}</span>
          </section>
            <section class="col">
            <strong>Ataque especial: </strong>
            <span>{{ pokemon.special_attack}}</span>
          </section>
           <section class="col">
            <strong>Defesa especial: </strong>
            <span>{{ pokemon.special_defense }}</span>
          </section>
            <section class="col">
            <strong>Velocidade: </strong>
            <span>{{ pokemon.speed }}</span>
          </section>
          <section class="col">
            <strong>Altura: </strong>
            <span>{{ pokemon.height * 2.54 }} cm</span>
          </section>
          <section class="col">
            <strong>Peso: </strong>
            <span>{{ (pokemon.weight * 0.453592).toFixed(2) }} Kg</span>
          </section>
          <section class="col">
            <strong>Movimentos: </strong>
            <span>{{ pokemon.moves }} </span>
          </section>
          <section class="col">
            <strong>Habilidades: </strong>
            <ul>
              <li>{{ pokemon.abilities }}</li>
            </ul>
          </section>
          <section class="col">
            <strong>Game Indice: </strong>
            <ul>
              <li>{{ pokemon.gameIndice }}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.imgPokemon {
  display: flex;
}
.show-specifications {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
}
</style>