<script setup>
const pokemon = defineProps(["name", "xp", "height", "img", "img2","weight","type"]);
</script>


<template>
  <div>
    <div class="card card-list p-4">
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
        <hr />
        <div class="row">
          <section class="col">
            <strong>XP: </strong>
            <span>{{ pokemon.xp }}</span>
          </section>
          <section class="col">
            <strong>Altura: </strong>
            <span>{{ pokemon.height *2.54 }} cm</span>
          </section>
            <section class="col">
            <strong>Peso: </strong>
            <span>{{ (pokemon.weight *0.453592).toFixed(2) }} Kg</span>
          </section>
            <section class="col">
            <strong>Tipo: </strong>
            <span>{{ pokemon.types }} </span>
          </section>
          </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.card-list{
    height: 75vh;

}

.imgPokemon{
    display: flex;
}
</style>