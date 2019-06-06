<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <Accounts />
      </b-col>
      <b-col>
        <Tokens />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Accounts from '@/components/Wallet/Dashboard/AccountList/Accounts.vue'
import Tokens from '@/components/Wallet/Dashboard/AccountList/Tokens.vue'

export default {
  name: 'AccountList',
  components: {
    'Accounts': Accounts,
    'Tokens': Tokens
  }
}
</script>

<style scoped lang="scss">
</style>
