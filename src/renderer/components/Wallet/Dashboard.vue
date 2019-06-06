<template>
  <div>
    <AccountList />
    <AccountInfoActions />
    <AccountHistory />
  </div>
</template>

<script>
import AccountList from '@/components/Wallet/Dashboard/AccountList.vue'
import AccountInfoActions from '@/components/Wallet/Dashboard/AccountInfoActions.vue'
import AccountHistory from '@/components/Wallet/Dashboard/AccountHistory.vue'

export default {
  name: 'Dashboard',
  components: {
    'AccountList': AccountList,
    'AccountInfoActions': AccountInfoActions,
    'AccountHistory': AccountHistory
  }
}
</script>

<style scoped lang="scss">
</style>
