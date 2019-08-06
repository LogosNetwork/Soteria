<template>
  <div class="pt-4">
    <AccountList />
    <AccountInfo />
    <AccountHistory />
  </div>
</template>

<script>
import AccountList from '@/components/Wallet/Dashboard/AccountList.vue'
import AccountInfo from '@/components/Wallet/Dashboard/AccountInfo.vue'
import AccountHistory from '@/components/Wallet/Dashboard/AccountHistory.vue'

export default {
  name: 'Dashboard',
  components: {
    AccountList: AccountList,
    AccountInfo: AccountInfo,
    AccountHistory: AccountHistory
  }
}
</script>

<style scoped lang="scss">
</style>
