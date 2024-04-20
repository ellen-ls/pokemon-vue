<script setup>
const pokemon = defineProps(["name", "urlBase", "ids"])
</script>

<template>
    <div class="col-4">
       <div class="card p-2 mb-3 cardListPokemon" >
         <p class="text-start text-secondary">#{{ pokemon.ids }}</p>
         <p class="text-center">{{ pokemon.name }}</p>
         <img 
         :src="urlBase" class="card-img-top" 
         alt="..."
         height="90"
         >
       </div>
    </div>
</template>

<style scoped>
.cardListPokemon{
    background-color: aquamarine;
    cursor: pointer;
    
}

</style>