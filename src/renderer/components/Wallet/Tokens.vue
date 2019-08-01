<template>
  <div>
    <TokenAccountList :addtoken="true" />
    <TokenAccountInfo />
    <TokenAccountHistory />
  </div>
</template>

<script>
import TokenAccountList from '@/components/Wallet/Tokens/List.vue'
import TokenAccountInfo from '@/components/Wallet/Tokens/Info.vue'
import TokenAccountHistory from '@/components/Wallet/Tokens/History.vue'
export default {
  name: 'Tokens',
  components: {
    TokenAccountList,
    TokenAccountInfo,
    TokenAccountHistory
  }
}
</script>

<style scoped lang="scss">
</style>
