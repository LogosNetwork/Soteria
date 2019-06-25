<template>
  <b-container fluid>
    <b-row>
      <b-col
        class="overflow-hidden"
        :class="{ accountList: tokenfilter }"
      >
        <Accounts
          :aggregate="aggregate"
          :addaccount="addaccount"
        />
      </b-col>
      <b-col
        v-if="tokenfilter"
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
  },
  props: {
    aggregate: {
      type: Boolean,
      default: true
    },
    tokenfilter: {
      type: Boolean,
      default: true
    },
    addaccount: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
.accountList {
  max-width: calc(100% - 55px);
}
</style>
