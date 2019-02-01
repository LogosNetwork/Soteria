<template>
  <div id="app">
    <div class="header mt-3">
      <font-awesome-icon class="icon" size="lg" :icon="['fal','lambda']" />
      <span v-t="'logosnetwork'"></span>
    </div>
    <div class="onboarding-container">
      <div class="row h-100 justify-content-center align-items-center">
        <router-view></router-view>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'onboarding'
}
</script>

<style scoped lang="scss">
  .onboarding-container {
    overflow:hidden;
    height: calc(100vh - 88px);
  }
  .icon {
    color: var(--primary);
  }
</style>
