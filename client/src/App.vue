<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch('autoLogIn')
  }
}
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lora&family=Montserrat&display=swap");
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
