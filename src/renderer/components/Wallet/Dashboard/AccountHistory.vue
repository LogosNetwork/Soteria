<template>
  <b-container
    fluid
    class="mt-3"
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
      class="mt-3 transactionHistoryContainer scroller visible"
    />
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import RequestList from '@/components/Shared/Requests/RequestList.vue'

export default {
  name: 'AccountHistory',
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
    requests () {
      if (this.activeAddress !== null) {
        if (!this.$Wallet.account) return []
        return this.$Wallet.account.chain.concat(this.$Wallet.account.receiveChain)
      } else {
        let dedupedRequests = new Map()
        let result = []
        for (let account of this.$Wallet.accounts) {
          let accountsRequests = account.chain.concat(account.receiveChain)
          for (let request of accountsRequests) {
            if (!dedupedRequests.has(request.hash)) {
              request.view = account.address
              result.push(request)
              dedupedRequests.set(request.hash, new Set([account.address]))
            } else if (dedupedRequests.has(request.hash) &&
              !dedupedRequests.get(request.hash).has(account.address)) {
              let addressSet = dedupedRequests.get(request.hash)
              request.view = account.address
              result.push(request)
              addressSet.add(account.address)
              dedupedRequests.set(request.hash, addressSet)
            }
          }
        }
        return result.sort((a, b) => {
          if (a.timestamp > b.timestamp) return -1
          if (a.timestamp < b.timestamp) return 1
          return 0
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.transactionHistoryContainer {
  height: calc(100vh - 203px) !important;
}
</style>
