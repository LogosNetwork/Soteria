<template>
  <b-container
    fluid
    class="mt-3"
  >
    <div class="d-flex justify-content-between">
      <div class="text-left align-self-center">
        <div>
          <small class="text-uppercase text-muted">
            <span v-t="'logos'" /> <span v-t="'balance'" />
          </small>
        </div>
        <div class="text-center">
          <h4>
            {{ balance }}
            <font-awesome-icon
              class="text-primary ml-1"
              :icon="['fal','lambda']"
            />
          </h4>
        </div>
      </div>
      <div class="align-self-center">
        <b-button
          v-b-modal.send
          variant="outline-primary"
          class="text-white"
          size="sm"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fal','paper-plane']"
          />
          <span v-t="'send'" />
        </b-button>
        <b-modal
          id="send"
          hide-footer
          hide-header
        >
          <Send />
        </b-modal>
        <b-button
          v-b-modal.receive
          variant="outline-primary"
          class="text-white"
          size="sm"
        >
          <font-awesome-icon
            class="mr-1"
            :icon="['fal','hand-receiving']"
          />
          <span v-t="'receive'" />
        </b-button>
        <b-modal
          id="receive"
          hide-footer
          hide-header
        >
          <Receive />
        </b-modal>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Logos from '@logosnetwork/logos-rpc-client'
import bigInt from 'big-integer'
import Receive from '@/components/Wallet/Receive'
import Send from '@/components/Wallet/Send'

export default {
  name: 'AccountInfo',
  components: {
    Receive,
    Send
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    balance: function () {
      if (this.activeAddress !== null) {
        if (!this.$Wallet.account) return 0
        return parseInt(Logos.convert.fromReason(this.$Wallet._accounts[this.activeAddress].balance, 'LOGOS'), 10).toLocaleString(this.languageCode, { useGrouping: true })
      } else {
        let sum = bigInt(0)
        for (let account of this.$Wallet.accounts) {
          sum = sum.add(bigInt(account.balance))
        }
        return parseInt(Logos.convert.fromReason(sum.toString(), 'LOGOS'), 10).toLocaleString(this.languageCode, { useGrouping: true })
      }
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
    ])
  }
}
</script>

<style scoped lang="scss">
</style>
