<template>
  <div class="d-flex">
    <TokenAccountNav />
    <div
      id="tokenContainer"
      class="scroller visible pt-4 w-100"
    >
      <TokenAccountInfo />
      <TokenAccountHistory />
    </div>
  </div>
</template>

<script>
import TokenAccountNav from '@/components/Wallet/Tokens/Nav.vue'
import TokenAccountInfo from '@/components/Wallet/Tokens/Info.vue'
import TokenAccountHistory from '@/components/Wallet/Tokens/History.vue'
export default {
  name: 'Tokens',
  components: {
    TokenAccountNav,
    TokenAccountInfo,
    TokenAccountHistory
  }
}
</script>

<style scoped lang="scss">
</style>
