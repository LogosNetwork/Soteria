<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Logos-Node'
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
  body {
    font-family: 'Noto Sans', sans-serif;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #20262D;
    color:#F5F5F5;
  }
</style>
