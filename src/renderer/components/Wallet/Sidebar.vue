
<template>
  <div>
    <div>
      <font-awesome-icon
        class="icon text-primary mb-3"
        size="3x"
        :icon="['fal','lambda']"
      />
    </div>
    <Navigation />
  </div>
</template>

<script>
import Navigation from '@/components/Wallet/Sidebar/Navigation.vue'

export default {
  name: 'Sidebar',
  components: {
    'Navigation': Navigation
  }
}
</script>

<style scoped lang="scss">
</style>
