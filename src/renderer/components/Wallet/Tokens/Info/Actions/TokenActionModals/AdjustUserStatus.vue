<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <AccountSelector
        size="lg"
        :label="$t('address')"
        :show-current="false"
        :token-account="tokenAccount"
        :ignore-status="true"
        :show-token-accounts="false"
        @change="destinationAccount = $event.account"
        @scanning="isScanning = $event"
      />
      <b-form-invalid-feedback
        v-t="'insufficientLogosFunds'"
        class="text-danger"
        :class="!hasFee ? 'd-block': ''"
      />
    </b-container>
    <b-row
      v-if="!isScanning"
      class="mt-3"
    >
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="buttonLabel"
            :disabled="!destinationAccount || !hasFee"
            class="w-100"
            variant="primary"
            @click="adjustUserStatus()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AccountSelector from '@/components/Shared/AccountSelector.vue'
import bigInt from 'big-integer'

export default {
  name: 'AdjustUserStatus',
  components: {
    AccountSelector
  },
  props: {
    type: {
      type: String,
      default: 'freeze'
    }
  },
  data () {
    return {
      amount: '',
      isScanning: false,
      destinationAccount: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    tokenAccount () {
      return this.$Wallet.tokenAccounts[this.activeAddress]
    },
    isFrozen () {
      return (this.destinationAccount &&
        this.destinationAccount.address &&
        this.tokenAccount.getAccountStatus(this.destinationAccount.address).frozen === true)
    },
    hasFee () {
      return bigInt(this.tokenAccount.balance).minus(bigInt(this.$Utils.minimumFee)).greaterOrEquals(0)
    },
    isWhitelisted () {
      return (this.destinationAccount &&
        this.destinationAccount.address &&
        this.tokenAccount.getAccountStatus(this.destinationAccount.address).whitelisted === true)
    },
    buttonLabel () {
      if (this.type === 'freeze') {
        return this.isFrozen ? 'unfreeze' : 'tokenActions.freeze'
      } else {
        return this.isWhitelisted ? 'removeFromWhitelist' : 'tokenActions.whitelist'
      }
    }
  },
  methods: {
    adjustUserStatus () {
      for (const accountAddress in this.$Wallet.accounts) {
        if (this.tokenAccount.controllerPrivilege(accountAddress, this.type)) {
          this.$Wallet.accounts[accountAddress].createAdjustUserStatusRequest({
            tokenAccount: this.tokenAccount.address,
            account: this.destinationAccount.address,
            status: this.type === 'freeze' ? this.isFrozen ? 'unfrozen' : 'frozen' : this.isWhitelisted ? 'not_whitelisted' : 'whitelisted'
          })
          this.$emit('sent')
          break
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
