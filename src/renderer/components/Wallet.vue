<template>
  <div>
    <div class="header mt-3 mb-1">
      <font-awesome-icon class="icon" size="lg" :icon="['fal','lambda']" />
      <span v-t="'logosnetwork'"></span>
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
.icon {
  color: var(--primary);
}
</style>
