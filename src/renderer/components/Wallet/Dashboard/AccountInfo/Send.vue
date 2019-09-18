<template>
  <div>
    <AccountList
      :aggregate="false"
      :tokenfilter="false"
      :addaccount="false"
    />
    <b-container
      class="text-left mt-3"
      fluid
    >
      <b-form-group
        v-if="!isScanning && availableTokens.length > 0"
        :label="$t('token')"
        label-size="lg"
      >
        <b-input-group size="lg">
          <Multiselect
            id="tokenSelector"
            v-model="token"
            required
            track-by="tokenID"
            label="label"
            :custom-label="tokenLabel"
            :options="availableTokens"
            :multiple="false"
            :placeholder="$t('searchToken')"
            class="w-100"
          >
            <template
              slot="singleLabel"
              slot-scope="{ option }"
            >
              <span>
                {{ option.name }} ({{ option.symbol }})
              </span>
            </template>
          </Multiselect>
        </b-input-group>
      </b-form-group>
      <AccountSelector
        size="lg"
        :label="$t('to')"
        :show-current="false"
        :token-account="token"
        :show-token-accounts="!sendingTokens"
        @change="destinationAccount = $event.account"
        @scanning="isScanning = $event"
      />
      <div
        v-if="!isScanning"
      >
        <b-form-group
          :label="$t('amount')"
          label-size="lg"
          :description="currentAccountAddress ? availableToSend.text : `${$t('noAccountFound')}`"
          class="mt-3"
        >
          <b-input-group size="lg">
            <b-input-group-text
              v-if="!sendingTokens"
              slot="prepend"
            >
              <font-awesome-icon
                class="text-primary"
                :icon="['fal','lambda']"
              />
            </b-input-group-text>
            <b-form-input
              id="amount"
              v-model="amount"
              autocomplete="off"
              aria-describedby="amountError"
              :state="isValidAmount"
              required
              type="number"
              :placeholder="sendingTokens ? `${$t('amountIn')} ${token.name}` : $t('amountInLogos')"
            />
            <b-input-group-append>
              <b-button
                variant="outline-black"
                class="text-white"
                :pressed="amount === availableToSend.amount"
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
            @click="send()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AccountList from '@/components/Wallet/Dashboard/AccountList.vue'
import AccountSelector from '@/components/Shared/AccountSelector.vue'

import bigInt from 'big-integer'

export default {
  name: 'Send',
  components: {
    AccountList,
    AccountSelector,
    Multiselect: () => import(/* webpackChunkName: "Multiselect" */'vue-multiselect')
  },
  data () {
    return {
      amount: '',
      isScanning: false,
      destinationAccount: null,
      token: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    accountArray: function () {
      return Object.values(this.$Wallet.accounts)
    },
    currentAccountAddress () {
      if (this.activeAddress !== null) {
        return this.activeAddress
      } else {
        return this.accountArray[0].address
      }
    },
    availableTokens () {
      const tokens = []
      if (this.account && this.account.tokenBalances) {
        for (const tokenID in this.account.tokenBalances) {
          const forgeToken = this.$Wallet.tokenAccounts[this.$Utils.accountFromHexKey(tokenID)]
          if (forgeToken.feeType === 'flat') {
            if (bigInt(this.account.tokenBalances[tokenID])
              .minus(bigInt(forgeToken.feeRate)).greater(0)) {
              tokens.push(forgeToken)
            }
          } else {
            if (bigInt(this.account.tokenBalances[tokenID]).greater(0)) {
              tokens.push(forgeToken)
            }
          }
        }
      }
      if (tokens.length > 0) {
        tokens.unshift({
          name: this.$t('logos'),
          symbol: 'lgs',
          tokenID: null,
          balance: this.account.balance
        })
      }
      return tokens
    },
    account () {
      return this.$Wallet.accounts[this.activeAddress]
    },
    tokenAccount () {
      if (!this.sendingTokens) return null
      return this.$Wallet.tokenAccounts[this.$Utils.accountFromHexKey(this.token.tokenID)]
    },
    sendingTokens () {
      return this.token !== null && this.token.tokenID !== null
    },
    issuerInfo () {
      if (!this.tokenAccount) return null
      try {
        return JSON.parse(this.tokenAccount.issuerInfo)
      } catch (e) {
        return {}
      }
    },
    availableToSend () {
      const result = {
        text: '',
        amount: ''
      }
      if (!this.sendingTokens) {
        const amount = this.$Wallet.rpcClient.convert.fromReason(bigInt(this.account.balance).minus(bigInt(this.$Utils.minimumFee)).toString(), 'LOGOS')
        result.amount = amount
        if (bigInt(this.account.balance).minus(bigInt(this.$Utils.minimumFee)).lesserOrEquals(bigInt(0))) {
          result.text = this.$t('insufficientFunds')
        } else {
          result.text = `${amount} ${this.$t('lgsAvailableToSend')}`
        }
      } else {
        let amount = null
        let amountInMinorUnit = this.account.tokenBalances[this.token.tokenID]
        if (this.tokenAccount.feeType === 'flat') {
          amountInMinorUnit = bigInt(amountInMinorUnit).minus(bigInt(this.tokenAccount.feeRate)).toString()
        }
        if (this.issuerInfo && typeof this.issuerInfo.decimals !== 'undefined') {
          amount = this.$Wallet.rpcClient.convert.fromTo(amountInMinorUnit, 0, this.issuerInfo.decimals)
          result.amount = amount
          result.text = `${parseFloat(amount).toLocaleString(this.languageCode, { useGrouping: true })} ${this.tokenAccount.symbol} ${this.$t('areAvailableToSend')}`
        } else {
          result.amount = amountInMinorUnit
          result.text = `${parseFloat(amountInMinorUnit).toLocaleString(this.languageCode, { useGrouping: true })} ${this.$t('minorUnitsOf')} ${this.tokenAccount.name} ${this.$t('areAvailableToSend')}`
        }
      }
      return result
    },
    isValidAmount () {
      if (this.amount === '') return null
      if (this.amount) {
        if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
        if (!this.sendingTokens) {
          const amountInMinorUnit = this.$Wallet.rpcClient.convert.toReason(this.amount, 'LOGOS')
          return (
            bigInt(amountInMinorUnit).greater(0) &&
            bigInt(this.$Wallet.account.balance)
              .greaterOrEquals(
                bigInt(amountInMinorUnit)
                  .plus(
                    bigInt(this.$Utils.minimumFee)
                  )
              )
          )
        } else {
          let amountInMinorUnit = null
          if (this.issuerInfo && typeof this.issuerInfo.decimals !== 'undefined' &&
            this.issuerInfo.decimals > 0) {
            if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
            amountInMinorUnit = this.$Wallet.rpcClient.convert.fromTo(this.amount, this.issuerInfo.decimals, 0)
          } else {
            amountInMinorUnit = this.amount
            if (!/^([0-9]+)$/.test(amountInMinorUnit)) return false
          }
          if (amountInMinorUnit === null) return false
          if (this.tokenAccount.feeType === 'flat') {
            return (bigInt(this.account.tokenBalances[this.token.tokenID])
              .minus(bigInt(this.tokenAccount.feeRate))
              .greaterOrEquals(bigInt(amountInMinorUnit)))
          } else {
            return (bigInt(this.account.tokenBalances[this.token.tokenID])
              .greaterOrEquals(bigInt(amountInMinorUnit)))
          }
        }
      }
      return false
    }
  },
  watch: {
    token (oldToken, newToken) {
      this.amount = ''
    }
  },
  created () {
    if (this.activeAddress === null && this.accountArray.length > 0) {
      this.setActiveAddress(this.accountArray[0].address)
    }
    if (this.availableTokens.length > 0) {
      this.token = this.availableTokens[0]
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress',
      'addContact'
    ]),
    tokenLabel ({ name, symbol }) {
      return `${name} (${symbol})`
    },
    setMax () {
      this.amount = this.availableToSend.amount
    },
    send () {
      if (this.sendingTokens) {
        let amountInMinorUnit = null
        if (this.issuerInfo && typeof this.issuerInfo.decimals !== 'undefined') {
          amountInMinorUnit = this.$Wallet.rpcClient.convert.fromTo(this.amount, this.issuerInfo.decimals, 0)
        } else {
          amountInMinorUnit = this.amount
        }
        if (this.tokenAccount.feeType === 'flat') {
          if (bigInt(this.account.tokenBalances[this.token.tokenID])
            .minus(bigInt(this.tokenAccount.feeRate))
            .greaterOrEquals(bigInt(amountInMinorUnit))) {
            this.$Wallet.account.createTokenSendRequest(
              this.tokenAccount.address,
              [{
                destination: this.destinationAccount.address,
                amount: amountInMinorUnit
              }]
            )
          }
        } else {
          if (bigInt(this.currentAccount.tokenBalances[this.token.tokenID])
            .greaterOrEquals(bigInt(amountInMinorUnit))) {
            this.$Wallet.account.createTokenSendRequest(
              this.tokenAccount.address,
              [{
                destination: this.destinationAccount.address,
                amount: amountInMinorUnit
              }]
            )
          }
        }
        this.$emit('sent')
      } else {
        const amount = this.$Wallet.rpcClient.convert.toReason(this.amount, 'LOGOS')
        if (bigInt(this.$Wallet.accounts[this.currentAccountAddress].balance)
          .greaterOrEquals(
            bigInt(amount).plus(bigInt(this.$Utils.minimumFee))
          )) {
          this.$Wallet.account.createSendRequest([{
            destination: this.destinationAccount.address,
            amount: amount
          }])
          this.$emit('sent')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
