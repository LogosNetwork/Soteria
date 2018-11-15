<template>
  <div id="app">
    <img class="img-fluid" id="logo" src="~@/assets/logo-light.png" alt="logos logo">
    <div class="mb-5">
      <h1 v-t="'logosnetwork'"></h1>
      <h5>Loading...</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'landing-page'
  }
</script>

<style scoped lang="scss">
  #logo {
    height: auto;
    max-height: 65vh;
    max-width: 65vw;
    margin: auto;
  }
</style>
