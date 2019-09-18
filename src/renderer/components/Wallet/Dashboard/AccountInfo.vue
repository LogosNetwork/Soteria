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
          body-class="pb-0"
          hide-footer
          hide-header
        >
          <Send @sent="$bvModal.hide('send')" />
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
import bigInt from 'big-integer'
import Receive from '@/components/Shared/ActionModals/Receive'
import Send from '@/components/Wallet/Dashboard/AccountInfo/Send'

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
        return parseFloat(this.$Wallet.rpcClient.convert.fromReason(this.$Wallet.accounts[this.activeAddress].balance, 'LOGOS')).toLocaleString(this.languageCode, { useGrouping: true })
      } else {
        let sum = bigInt(0)
        for (const address in this.$Wallet.accounts) {
          const account = this.$Wallet.accounts[address]
          sum = sum.add(bigInt(account.balance))
        }
        return parseFloat(this.$Wallet.rpcClient.convert.fromReason(sum.toString(), 'LOGOS')).toLocaleString(this.languageCode, { useGrouping: true })
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
