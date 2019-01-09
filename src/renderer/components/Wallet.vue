<template>
  <div id="app">
    <div class="header mt-3">
      <font-awesome-icon class="icon" size="lg" :icon="['fal','lambda']" />
      <span class="title" v-t="'logosnetwork'"></span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'wallet'
}
</script>

<style scoped lang="scss">
#app {
  height: 100vh;
}
.icon {
  color: #007bff;
}
.title {
  color: #FFF;
}
</style>
