<script setup>
const pokemon = defineProps(["name", "urlBase", "ids", "type"])

</script>

<template>
<div class="col-6 col-md-4">
  <div class="card p-2 mb-3 cardListPokemon">
    <p class="text-start text-secondary">#{{ pokemon.ids }}</p>
    <p class="text-center">{{ pokemon.name }}</p>
    
    <img 
      :src="urlBase" 
      class="card-img-top" 
      alt="..."
      height="90"
    >
   <p class="text-center styleType">{{ pokemon.type }}</p>
  </div>
</div>
</template>

<style scoped>
.cardListPokemon {
    background-color: aquamarine;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Adiciona uma transição suave */
}

.cardListPokemon:hover {
    transform: scale(1.1);
}
.styleType{
  background-color: rgb(202, 236, 217);
  border: 1px solid green;
  border-radius: 10px;
  margin: 5px;
}

</style>