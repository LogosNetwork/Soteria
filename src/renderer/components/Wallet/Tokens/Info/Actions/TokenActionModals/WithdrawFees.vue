<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <AccountSelector
        size="lg"
        :label="$t('to')"
        :show-current="false"
        :token-account="tokenAccount"
        :show-token-accounts="false"
        @change="destinationAccount = $event.account"
        @scanning="isScanning = $event"
      />
      <div
        v-if="!isScanning"
      >
        <b-form-group
          :label="$t('amount')"
          label-size="lg"
          :description="availableToWithdraw.text"
          class="mt-3"
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
                :pressed="amount === availableToWithdraw.amount"
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
          <b-form-invalid-feedback
            v-t="'insufficientLogosFunds'"
            class="text-danger"
            :class="!hasFee ? 'd-block': ''"
          />
        </b-form-group>
      </div>
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
            v-t="'send'"
            :disabled="!isValidAmount || !destinationAccount || !hasFee"
            class="w-100"
            variant="primary"
            @click="withdrawFees()"
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
  name: 'WithdrawFees',
  components: {
    AccountSelector
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
    availableToWithdraw () {
      const amountInMinorUnit = this.tokenAccount.tokenFeeBalance
      if (this.tokenAccount.decimals !== null) {
        const amountInMajorUnit = this.tokenAccount.convertToMajor(amountInMinorUnit)
        return {
          text: `${parseFloat(amountInMajorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.tokenAccount.symbol} ${this.$t('areAvailableToWithdraw')}`,
          amount: amountInMajorUnit
        }
      } else {
        return {
          text: `${parseFloat(amountInMinorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.$t('minorUnitsOf')} ${this.tokenAccount.name} ${this.$t('areAvailableToWithdraw')}`,
          amount: amountInMinorUnit
        }
      }
    },
    isValidAmount () {
      if (this.amount === '') return null
      if (!this.amountInMinorUnit) return false
      return bigInt(this.tokenAccount.tokenFeeBalance)
        .greaterOrEquals(bigInt(this.amountInMinorUnit))
    },
    hasFee () {
      return bigInt(this.tokenAccount.balance).minus(bigInt(this.$Utils.minimumFee)).greaterOrEquals(0)
    }
  },
  methods: {
    setMax () {
      this.amount = this.availableToWithdraw.amount
    },
    withdrawFees () {
      if (this.isValidAmount && this.destinationAccount !== null) {
        if (bigInt(this.tokenAccount.tokenFeeBalance)
          .greaterOrEquals(bigInt(this.amountInMinorUnit))) {
          for (const accountAddress in this.$Wallet.accounts) {
            if (this.tokenAccount.controllerPrivilege(accountAddress, 'withdraw_fee')) {
              this.$Wallet.accounts[accountAddress].createWithdrawFeeRequest({
                tokenAccount: this.tokenAccount.address,
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
}
</script>

<style scoped lang="scss">
</style>
