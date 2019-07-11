<template>
  <b-container
    fluid
    class="accountContainer"
  >
    <b-row>
      <b-col
        class="accountList"
        :class="{ tkFilter: tokenfilter }"
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
        <TokenFilter />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Accounts from '@/components/Wallet/Dashboard/AccountList/Accounts.vue'
import TokenFilter from '@/components/Wallet/Dashboard/AccountList/TokenFilter.vue'

export default {
  name: 'AccountList',
  components: {
    Accounts,
    TokenFilter
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
.accountList:not(.tkFilter) {
  max-width: 100%;
}
.tkFilter {
  max-width: calc(100% - 55px);
  padding-right: 0px;
}
.accountContainer {
  height: 25px;
}
</style>
