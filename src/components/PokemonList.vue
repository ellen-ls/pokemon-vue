<script setup>
const pokemon = defineProps(["name", "urlBase"])
</script>

<template>
    <div class="col-4">
       <div class="card mb-3" >
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

</style>