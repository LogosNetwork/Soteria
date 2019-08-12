<template>
  <div>
    <b-container
      class="text-left mt-3"
      fluid
    >
      <AccountSelector
        size="lg"
        :label="$t('to')"
        :show-current="false"
        :token-account="tokenAccount"
        :show-token-accounts="false"
        @change="!$event.error ? destinationAccount = $event.account : null"
        @scanning="isScanning = $event"
      />
      <div
        v-if="!isScanning"
      >
        <b-form-group
          :label="$t('amount')"
          label-size="lg"
          :description="availableToDistribute.text"
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
                :pressed="amount === availableToDistribute.amount"
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
            :disabled="!isValidAmount || !destinationAccount"
            class="w-100"
            variant="primary"
            @click="distribute()"
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
  name: 'Distribute',
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
    availableToDistribute () {
      const amountInMinorUnit = this.tokenAccount.tokenBalance
      if (this.tokenAccount.decimals !== null) {
        const amountInMajorUnit = this.tokenAccount.convertToMajor(amountInMinorUnit)
        return {
          text: `${parseInt(amountInMajorUnit, 10).toLocaleString(this.languageCode, { useGrouping: true })} ${this.tokenAccount.symbol} ${this.$t('areAvailableToDistribute')}`,
          amount: amountInMajorUnit
        }
      } else {
        return {
          text: `${parseInt(amountInMinorUnit, 10).toLocaleString(this.languageCode, { useGrouping: true })} ${this.$t('minorUnitsOf')} ${this.tokenAccount.name} ${this.$t('areAvailableToDistribute')}`,
          amount: amountInMinorUnit
        }
      }
    },
    isValidAmount () {
      if (this.amount === '') return null
      if (!this.amountInMinorUnit) return false
      return bigInt(this.tokenAccount.tokenBalance)
        .greaterOrEquals(bigInt(this.amountInMinorUnit))
    }
  },
  methods: {
    setMax () {
      this.amount = this.availableToDistribute.amount
    },
    distribute () {
      if (this.isValidAmount && this.destinationAccount !== null) {
        if (bigInt(this.tokenAccount.tokenBalance)
          .greaterOrEquals(bigInt(this.amountInMinorUnit))) {
          for (const accountAddress in this.$Wallet.accounts) {
            if (this.tokenAccount.controllerPrivilege(accountAddress, 'distribute')) {
              this.$Wallet.accounts[accountAddress].createDistributeRequest({
                tokenAccount: this.tokenAccount.address,
                transaction: {
                  destination: this.destinationAccount.address,
                  amount: this.amountInMinorUnit
                }
              })
              this.$emit('distribute')
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
