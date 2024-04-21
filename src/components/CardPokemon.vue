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
  <div class="card show-specifications">
    <div class="imgPokemon">
        <img
          v-if="pokemon.name"
          :src="pokemon.img"
          height="150"
          class="card-img-top"
          :alt="pokemon.name"
        />
        <img
          v-if="pokemon.name"
          :src="pokemon.img2"
          height="150"
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
        <div class="col" v-if="pokemon.name">
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
            <ul>
            <li>{{ pokemon.moves }} </li>
            </ul>
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
  
</template>



<style scoped>
.imgPokemon {
  display: flex;
  

 
}
.card{
   background-color: #874b8d;
}
.show-specifications {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
  scrollbar-width: thin; 
  scrollbar-color: #874b8d #f1f1f1; 
}

.show-specifications::-webkit-scrollbar {
  width: 8px;
}

.show-specifications::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.show-specifications::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 10px;
}

.show-specifications::-webkit-scrollbar-thumb:hover {
  background-color: #333;
}
.card-body {
  background-color: #b870be;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.text-center {
  text-align: center;
}

.border {
  border: 1px solid #943c8d;
  padding: 5px;
}

.col {
  flex: 1;
  margin: 5px;
}

</style>