<template>
  <div id="app">
    <div id="closeBar"></div>
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
  #closeBar {
    -webkit-app-region: drag;
    height: 25px;
    position: fixed;
    width: 100vw;
    top:0px;
    left:0px;
    z-index: 99999;
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
