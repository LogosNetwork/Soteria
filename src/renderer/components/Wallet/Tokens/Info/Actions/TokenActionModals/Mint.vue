<template>
  <div>
    <b-container
      class="text-left"
      fluid
    >
      <div>
        <b-form-group
          :label="$t('amount')"
          label-size="lg"
          :description="availableToMint.text"
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
                :pressed="amount === availableToMint.amount"
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
      class="mt-3"
    >
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'send'"
            :disabled="!isValidAmount"
            class="w-100"
            variant="primary"
            @click="mint()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bigInt from 'big-integer'

export default {
  name: 'Mint',
  data () {
    return {
      amount: ''
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
    availableToMint () {
      const amountInMinorUnit = bigInt(this.$Utils.MAXUINT128).minus(bigInt(this.tokenAccount.totalSupply)).toString()
      if (this.tokenAccount.decimals !== null) {
        const amountInMajorUnit = this.tokenAccount.convertToMajor(amountInMinorUnit)
        return {
          text: `${parseFloat(amountInMajorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.tokenAccount.symbol} ${this.$t('areAvailableToMint')}`,
          amount: amountInMajorUnit
        }
      } else {
        return {
          text: `${parseFloat(amountInMinorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.$t('minorUnitsOf')} ${this.tokenAccount.name} ${this.$t('areAvailableToMint')}`,
          amount: amountInMinorUnit
        }
      }
    },
    isValidAmount () {
      if (this.amount === '') return null
      if (!this.amountInMinorUnit) return false
      return bigInt(this.amountInMinorUnit).plus(bigInt(this.tokenAccount.totalSupply))
        .lesserOrEquals(bigInt(this.$Utils.MAXUINT128))
    }
  },
  methods: {
    setMax () {
      this.amount = this.availableToMint.amount
    },
    mint () {
      if (this.isValidAmount) {
        if (bigInt(this.amountInMinorUnit).plus(bigInt(this.tokenAccount.totalSupply))
          .lesserOrEquals(bigInt(this.$Utils.MAXUINT128))) {
          for (const accountAddress in this.$Wallet.accounts) {
            if (this.tokenAccount.controllerPrivilege(accountAddress, 'issuance')) {
              this.$Wallet.accounts[accountAddress].createIssueAdditionalRequest({
                tokenAccount: this.tokenAccount.address,
                amount: this.amountInMinorUnit
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
