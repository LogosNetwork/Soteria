<template>
  <b-container fluid>
    <b-row>
      <b-col class="accountList">
        <Accounts />
      </b-col>
      <b-col
        cols="auto"
        class="text-right"
      >
        <TokenPanelToggle />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Accounts from '@/components/Wallet/Dashboard/AccountList/Accounts.vue'
import TokenPanelToggle from '@/components/Wallet/Dashboard/AccountList/TokenPanelToggle.vue'

export default {
  name: 'AccountList',
  components: {
    'Accounts': Accounts,
    'TokenPanelToggle': TokenPanelToggle
  }
}
</script>

<style scoped lang="scss">
.accountList {
  max-width: calc(100% - 55px);
  overflow: hidden;
}
</style>
