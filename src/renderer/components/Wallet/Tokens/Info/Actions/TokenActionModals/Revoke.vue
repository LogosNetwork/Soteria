<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <AccountSelector
        v-show="!fromScanning"
        size="lg"
        :label="$t('from')"
        :show-current="false"
        :token-account="tokenAccount"
        :show-token-accounts="false"
        @change="revokeeAccount = $event.account"
        @scanning="toScanning = $event"
      />
      <AccountSelector
        v-show="!toScanning"
        size="lg"
        :label="$t('to')"
        :show-current="false"
        :blacklist="revokeeAccount !== null ? [revokeeAccount.address] : null"
        :token-account="tokenAccount"
        :show-token-accounts="false"
        @change="destinationAccount = $event.account"
        @scanning="fromScanning = $event"
      />
      <div
        v-if="!toScanning && !fromScanning"
      >
        <b-form-group
          :label="$t('amount')"
          label-size="lg"
          :description="availableToRevoke ? availableToRevoke.text : ''"
        >
          <b-input-group size="lg">
            <b-form-input
              id="amount"
              v-model="amount"
              autocomplete="off"
              aria-describedby="amountError"
              :state="isValidAmount"
              required
              type="number"
              :placeholder="`${$t('amountIn')} ${tokenAccount.name}`"
            />
            <b-input-group-append>
              <b-button
                variant="outline-black"
                class="text-white"
                :pressed="availableToRevoke ? amount === availableToRevoke.amount : false"
                @click="setMax()"
              >
                <span
                  v-t="'max'"
                />
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback
            v-if="isValidAmount === false"
            id="amountError"
            v-t="'sendAmountError'"
            class="text-danger"
          />
        </b-form-group>
      </div>
    </b-container>
    <b-row
      v-if="!fromScanning && !toScanning"
      class="mt-3"
    >
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'tokenActions.revoke'"
            :disabled="!isValidAmount || !destinationAccount || !revokeeAccount"
            class="w-100"
            variant="primary"
            @click="revoke()"
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
  name: 'Revoke',
  components: {
    AccountSelector
  },
  data () {
    return {
      amount: '',
      toScanning: false,
      fromScanning: false,
      revokeeAccount: null,
      destinationAccount: null
    }
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
    amountInMinorUnit () {
      if (this.amount === '') return false
      if (this.tokenAccount.decimals !== null) {
        if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
        return this.tokenAccount.convertToMinor(this.amount)
      } else {
        if (!/^([0-9]+)$/.test(this.amount)) return false
        return this.amount
      }
    },
    amountInMajorUnit () {
      if (this.amount === '') return false
      if (this.tokenAccount.decimals === null) return false
      if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
      return this.amount
    },
    availableToRevoke () {
      if (this.revokeeAccount && this.revokeeAccount.accountInfo && this.revokeeAccount.accountInfo.tokens) {
        const amountInMinorUnit = bigInt(this.revokeeAccount.accountInfo.tokens[this.tokenAccount.publicKey].balance).toString()
        if (this.tokenAccount.decimals !== null) {
          const amountInMajorUnit = this.tokenAccount.convertToMajor(amountInMinorUnit)
          return {
            text: `${parseFloat(amountInMajorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.tokenAccount.symbol} ${this.$t('areAvailableToRevoke')}`,
            amount: amountInMajorUnit
          }
        } else {
          return {
            text: `${parseFloat(amountInMinorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.$t('minorUnitsOf')} ${this.tokenAccount.name} ${this.$t('areAvailableToRevoke')}`,
            amount: amountInMinorUnit
          }
        }
      } else {
        return null
      }
    },
    isValidAmount () {
      if (this.amount === '') return null
      if (!this.amountInMinorUnit) return false
      if (!this.availableToRevoke) return false
      return bigInt(this.availableToRevoke.amount).minus(bigInt(this.amountInMinorUnit))
        .greaterOrEquals(bigInt(0))
    }
  },
  methods: {
    setMax () {
      if (!this.availableToRevoke) return
      this.amount = this.availableToRevoke.amount
    },
    revoke () {
      if (this.isValidAmount && this.destinationAccount && this.revokeeAccount) {
        for (const accountAddress in this.$Wallet.accounts) {
          if (this.tokenAccount.controllerPrivilege(accountAddress, 'revoke')) {
            this.$Wallet.accounts[accountAddress].createRevokeRequest({
              tokenAccount: this.tokenAccount.address,
              source: this.revokeeAccount.address,
              transaction: {
                destination: this.destinationAccount.address,
                amount: this.amountInMinorUnit
              }
            })
            this.$emit('sent')
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
