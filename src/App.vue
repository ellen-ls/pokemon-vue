<script>
import LanguageList from "./components/LanguageList.vue";

export default {
  components: {
    LanguageList,
  },
};
</script>


<template>
  <!-- NAVBAR -->
  <nav class="navbar bg-primary">
   <div class="container-fluid">
      <router-link class="navbar-brand" href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Logo"
          width="150"
          class="d-inline-block align-text-top"
        />
       </router-link>
       <!-- Language -->
       <LanguageList/>
      
    </div>
      
  </nav>
  <!-- CONTENT -->
  <div class="main">
    <router-view></router-view>
  </div>

  <footer class="bg-primary text-light">
    <div>
      <span
        >Desenvolvido com Vue por Ellen Lima e Silva em
        {{ new Date().getFullYear() }} .
      </span>
    </div>
  </footer>
</template>


<style>
footer {
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
}
</style>
