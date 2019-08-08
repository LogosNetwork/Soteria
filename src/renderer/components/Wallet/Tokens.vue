<template>
  <div class="d-flex">
    <TokenAccountInfo class="w-100" />
    <TokenAccountNav />
  </div>
</template>

<script>
import TokenAccountNav from '@/components/Wallet/Tokens/Nav.vue'
import TokenAccountInfo from '@/components/Wallet/Tokens/Info.vue'
export default {
  name: 'Tokens',
  components: {
    TokenAccountNav,
    TokenAccountInfo
  }
}
</script>

<style scoped lang="scss">
</style>
