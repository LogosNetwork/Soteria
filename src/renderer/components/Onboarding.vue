<template>
  <div>
    <div class="header mt-3 mb-1 d-print-none">
      <font-awesome-icon class="icon" size="lg" :icon="['fal','lambda']" />
      <span v-t="'logosnetwork'"></span>
    </div>
    <div class="onboarding-container">
      <div class="row justify-content-center align-items-center">
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
    display: flex;
    height: calc(100vh - 88px);
  }
  .onboarding-container > div {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .icon {
    color: var(--primary);
  }
</style>
