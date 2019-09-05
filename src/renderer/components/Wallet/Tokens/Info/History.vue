<template>
  <b-container
    v-if="tokenAccount"
    fluid
  >
    <div class="text-left">
      <small
        class="text-left text-uppercase text-muted"
      >
        <span v-t="'recentTransactions'" />
      </small>
    </div>
    <RequestList
      :requests="requests"
      :address="activeAddress"
      :small="true"
      class="mt-1"
    />
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import RequestList from '@/components/Shared/Requests/requestList.vue'

export default {
  name: 'TokenAccountHistory',
  components: {
    RequestList
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    requests () {
      if (!this.tokenAccount) return []
      const results = this.tokenAccount.chain.concat(this.tokenAccount.receiveChain)
      return results.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1
        if (a.timestamp < b.timestamp) return 1
        return 0
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
