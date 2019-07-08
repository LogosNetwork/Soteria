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
          <multiselect
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
      <b-form-group
        :label="$t('to')"
        label-size="lg"
      >
        <b-input-group size="lg">
          <multiselect
            id="toSelector"
            v-model="destinationAccount"
            class="scan"
            required
            :tag-placeholder="$t('addThisAccount')"
            track-by="address"
            :custom-label="labelWithAddress"
            :options="combinedAccounts"
            :multiple="false"
            :taggable="true"
            :placeholder="$t('searchOrAdd')"
            @tag="addAccount"
          >
            <template
              slot="singleLabel"
              slot-scope="{ option }"
            >
              <span v-if="option.label !== option.address">
                {{ option.label }}  -
              </span>
              <LogosAddress
                :inactive="true"
                :force="true"
                :address="option.address"
              />
            </template>
          </Multiselect>
          <b-input-group-append>
            <b-button
              v-b-tooltip.hover
              :title="$t('scanQR')"
              :pressed="isScanning"
              variant="outline-black"
              class="text-white"
              @click="scan()"
            >
              <font-awesome-icon
                class="icon"
                :icon="['fal','qrcode']"
              />
              <span
                v-t="'scanQR'"
                class="sr-only"
              />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <div
        v-if="isScanning"
        class="mt-3"
      >
        <qrcode-stream
          :paused="!isScanning"
          @init="onInit"
          @decode="onDecode"
        />
        <div class="error">
          {{ errorMessage }}
        </div>
      </div>

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
            <b-input-group-text slot="prepend">
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
            :disabled="!isValidAmount || !destinationAccount || (sendingTokens && !validDestination)"
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
import bigInt from 'big-integer'
import Logos from '@logosnetwork/logos-rpc-client'

export default {
  name: 'Send',
  components: {
    AccountList,
    'QrcodeStream': () => import(/* webpackChunkName: "QRCode-Reader" */'vue-qrcode-reader').then(({ QrcodeStream }) => QrcodeStream),
    'Multiselect': () => import(/* webpackChunkName: "Multiselect" */'vue-multiselect'),
    'LogosAddress': () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  data () {
    return {
      amount: '',
      isScanning: false,
      destinationAccount: null,
      errorMessage: null,
      token: null,
      validDestination: null,
      invalidDestinationError: ''
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress,
      contacts: state => state.contacts
    }),
    ...mapState('Language', {
      languageCode: state => state.selectedLanguageCode.value
    }),
    currentAccountAddress () {
      if (this.activeAddress !== null) {
        return this.activeAddress
      } else {
        return this.$Wallet.accounts[0].address
      }
    },
    availableTokens () {
      let tokens = []
      if (this.account && this.account.tokenBalances) {
        for (let tokenID in this.account.tokenBalances) {
          let forgeToken = this.$Wallet.tokenAccounts[this.$Utils.parseAccount(tokenID)]
          if (forgeToken.feeType === 'flat') {
            if (bigInt(this.account.tokenBalances[tokenID])
              .minus(bigInt(forgeToken.feeRate)).greater(0)) {
              tokens.push({
                name: forgeToken.name,
                symbol: forgeToken.symbol,
                tokenID: tokenID,
                balance: this.account.tokenBalances[tokenID]
              })
            }
          } else {
            if (bigInt(this.account.tokenBalances[tokenID]).greater(0)) {
              tokens.push({
                name: forgeToken.name,
                symbol: forgeToken.symbol,
                tokenID: tokenID,
                balance: this.account.tokenBalances[tokenID]
              })
            }
          }
        }
      }
      if (tokens.length > 0) {
        tokens.unshift({
          name: 'Logos',
          symbol: 'lgs',
          tokenID: null,
          balance: this.account.balance
        })
      }
      return tokens
    },
    account () {
      return this.$Wallet.accountsObject[this.activeAddress]
    },
    tokenAccount () {
      if (!this.sendingTokens) return null
      return this.$Wallet.tokenAccounts[this.$Utils.parseAccount(this.token.tokenID)]
    },
    combinedAccounts () {
      let results = []
      const map = new Map()
      map.set(this.currentAccountAddress, true)
      for (let address in this.$Wallet.accountsObject) {
        if (!map.has(address)) {
          map.set(address, true)
          results.push({
            label: `${this.$Wallet.accountsObject[address].label}`,
            address: address
          })
        }
      }
      for (let token in this.$Wallet.tokenAccounts) {
        if (!map.has(token)) {
          map.set(token, true)
          if (!this.sendingTokens) {
            results.push({
              label: `${this.$Wallet.tokenAccounts[token].name} (${this.$Wallet.tokenAccounts[token].symbol})`,
              address: token
            })
          }
        }
      }
      for (let contact of this.contacts) {
        if (!map.has(contact.address)) {
          map.set(contact.address, true)
          results.push({
            label: contact.label,
            address: contact.address
          })
        }
      }
      return results
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
      let result = {
        text: '',
        amount: ''
      }
      if (!this.sendingTokens) {
        let amount = Logos.convert.fromReason(bigInt(this.account.balance).minus(bigInt(this.$Utils.minimumFee)).toString(), 'LOGOS')
        result.amount = amount
        result.text = `${amount} ${this.$t('lgsAvailableToSend')}`
      } else {
        let amount = null
        let amountInBaseUnit = this.account.tokenBalances[this.token.tokenID]
        if (this.tokenAccount.feeType === 'flat') {
          amountInBaseUnit = bigInt(amountInBaseUnit).minus(bigInt(this.tokenAccount.feeRate)).toString()
        }
        if (this.issuerInfo && typeof this.issuerInfo.decimals !== 'undefined') {
          amount = Logos.convert.fromTo(amountInBaseUnit, 0, this.issuerInfo.decimals)
          result.amount = amount
          result.text = `${amount} ${this.tokenAccount.symbol} ${this.$t('areAvailableToSend')}`
        } else {
          amount = amountInBaseUnit
          result.amount = amount
          result.text = `${amount} ${this.$t('baseUnitsOf')} ${this.tokenAccount.name} ${this.$t('areAvailableToSend')}`
        }
      }
      return result
    },
    isValidAmount () {
      if (this.amount === '') return null
      if (this.amount) {
        if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
        if (!this.sendingTokens) {
          let amountInRaw = Logos.convert.toReason(this.amount, 'LOGOS')
          return (
            bigInt(amountInRaw).greater(0) &&
            bigInt(this.$Wallet.account.balance)
              .greaterOrEquals(
                bigInt(amountInRaw)
                  .plus(
                    bigInt(this.$Utils.minimumFee)
                  )
              )
          )
        } else {
          let amountInRaw = null
          if (this.issuerInfo && typeof this.issuerInfo.decimals !== 'undefined' &&
            this.issuerInfo.decimals > 0) {
            if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
            amountInRaw = Logos.convert.fromTo(this.amount, this.issuerInfo.decimals, 0)
          } else {
            amountInRaw = this.transaction.amount
            if (!/^([0-9]+)$/.test(amountInRaw)) return false
          }
          if (amountInRaw === null) return false
          if (this.tokenAccount.feeType === 'flat') {
            return (bigInt(this.account.tokenBalances[this.token.tokenID])
              .minus(bigInt(this.tokenAccount.feeRate))
              .greaterOrEquals(bigInt(amountInRaw)))
          } else {
            return (bigInt(this.account.tokenBalances[this.token.tokenID])
              .greaterOrEquals(bigInt(amountInRaw)))
          }
        }
      }
      return false
    }
  },
  watch: {
    token (oldToken, newToken) {
      this.isValidDestination(this.destinationAccount)
      this.amount = ''
    },
    destinationAccount (oldAccount, newAccount) {
      if (this.destinationAccount !== null) {
        this.isValidDestination(this.destinationAccount)
      }
    },
    combinedAccounts (newAccounts, oldAccounts) {
      if (newAccounts.length > 0) {
        let valid = false
        for (let account of newAccounts) {
          if (this.destinationAccount && account.address === this.destinationAccount.address) {
            this.destinationAccount = account
            valid = true
          }
        }
        if (valid === false) {
          this.destinationAccount = newAccounts[0]
        }
      } else {
        this.destinationAccount = null
      }
    }
  },
  created () {
    if (this.activeAddress === null && this.$Wallet.accounts.length > 0) {
      this.setActiveAddress(this.$Wallet.accounts[0].address)
    }
    if (this.combinedAccounts.length > 0) {
      this.destinationAccount = this.combinedAccounts[0]
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
    scan () {
      this.isScanning = !this.isScanning
    },
    onDecode (content) {
      if (content.match(/^lgs:lgs_[13456789abcdefghijkmnopqrstuwxyz]{60}$/)) {
        this.addAccount(content.substring(4, 68))
        this.isScanning = false
      }
    },
    onInit (promise) {
      promise.then()
        .catch(error => {
          if (error.name === 'NotAllowedError') {
            this.errorMessage = 'Hey! I need access to your camera'
          } else if (error.name === 'NotFoundError') {
            this.errorMessage = 'Do you even have a camera on your device?'
          } else if (error.name === 'NotSupportedError') {
            this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
          } else if (error.name === 'NotReadableError') {
            this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
          } else if (error.name === 'OverconstrainedError') {
            this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
          } else {
            this.errorMessage = 'UNKNOWN ERROR: ' + error.message
          }
        })
    },
    addAccount (newAddress) {
      try {
        this.$Utils.keyFromAccount(newAddress)
        let newAccount = { label: newAddress, address: newAddress }
        if (this.currentAccountAddress !== newAddress) {
          let existingAccount = this.findAccount(newAddress)
          if (!existingAccount) {
            this.addContact(newAccount)
            this.destinationAccount = newAccount
          } else {
            this.destinationAccount = existingAccount
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    findAccount (newAddress) {
      return this.combinedAccounts.find((account) => {
        return account.address === newAddress
      })
    },
    tokenLabel ({ name, symbol }) {
      return `${name} (${symbol})`
    },
    labelWithAddress ({ label, address }) {
      if (label !== address) {
        return `${label} — ${address.substring(0, 9)}...${address.substring(59, 64)}`
      } else {
        return `${address.substring(0, 9)}...${address.substring(59, 64)}`
      }
    },
    setMax () {
      this.amount = this.availableToSend.amount
    },
    isValidDestination: async function (account) {
      if (this.destinationAccount.address.match(/^lgs_[13456789abcdefghijkmnopqrstuwxyz]{60}$/) === null) return false
      if (!this.sendingTokens) return true
      this.validDestination = null
      this.invalidDestinationError = ''
      if (this.tokenAccount && account && account.address) {
        let address = account.address
        let rpc = this.$Wallet.rpcClient()
        let accountInfo = await rpc.accounts.info(address)
        if (!accountInfo) {
          this.validDestination = false
          this.invalidDestinationError = 'Unable to validate this account.'
          return
        }
        if (accountInfo.error && accountInfo.error === 'failed to get account') {
          this.validDestination = false
          this.invalidDestinationError = 'This account must be opened first before sending tokens to it.'
          return
        }
        if (accountInfo.error && accountInfo.error === 'Bad account number') {
          this.validDestination = false
          this.invalidDestinationError = 'This is not a valid address.'
          return
        }
        if (accountInfo.type !== 'LogosAccount') {
          this.validDestination = false
          this.invalidDestinationError = 'You cannot send tokens to TokenAccounts.'
          return
        }
        let tokenInfo = this.tokenAccount.getAccountStatus(account.address)
        if (this.tokenAccount.settings.whitelist && tokenInfo.whitelisted === false) {
          this.validDestination = false
          this.invalidDestinationError = 'This account has not been whitelisted.'
        } else if (tokenInfo.frozen === true) {
          this.validDestination = false
          this.invalidDestinationError = `This account is frozen and cannot receive or send ${this.tokenAccount.symbol}.`
        } else {
          this.validDestination = true
        }
      }
    },
    send () {
      if (this.sendingTokens && this.isValidDestination) {
        let amountInBaseUnit = null
        if (this.issuerInfo && typeof this.issuerInfo.decimals !== 'undefined') {
          amountInBaseUnit = Logos.convert.fromTo(this.amount, this.issuerInfo.decimals, 0)
        } else {
          amountInBaseUnit = this.amount
        }
        if (this.tokenAccount.feeType === 'flat') {
          if (bigInt(this.account.tokenBalances[this.token.tokenID])
            .minus(bigInt(this.tokenAccount.feeRate))
            .greaterOrEquals(bigInt(amountInBaseUnit))) {
            this.$Wallet.account.createTokenSendRequest(
              this.tokenAccount.address,
              [{
                destination: this.destinationAccount.address,
                amount: amountInBaseUnit
              }]
            )
          }
        } else {
          if (bigInt(this.currentAccount.tokenBalances[this.token.tokenID])
            .greaterOrEquals(bigInt(amountInBaseUnit))) {
            this.$Wallet.account.createTokenSendRequest(
              this.tokenAccount.address,
              [{
                destination: this.destinationAccount.address,
                amount: amountInBaseUnit
              }]
            )
          }
        }
        this.$emit('sent')
      } else {
        let amount = Logos.convert.toReason(this.amount, 'LOGOS')
        if (bigInt(this.$Wallet.accountsObject[this.currentAccountAddress].balance)
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
  .formButton {
    height: 48px;
  }
  .formButton > .btn-link {
    color: theme-color("base");
  }
  .formButton > .btn-link:hover {
    color: theme-color("base");
    opacity: 0.5;
  }
</style>
