<template>
  <div>
    <b-form-group
      :label="label"
      :label-size="size"
    >
      <b-input-group :size="size">
        <Multiselect
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
        <div
          v-if="validDestination === false && showErrors"
          class="invalid-feedback d-block"
        >
          {{ invalidDestinationError }}
        </div>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountSelector',
  components: {
    QrcodeStream: () => import(/* webpackChunkName: "QRCode-Reader" */'vue-qrcode-reader').then(({ QrcodeStream }) => QrcodeStream),
    Multiselect: () => import(/* webpackChunkName: "Multiselect" */'vue-multiselect'),
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  props: {
    showCurrent: {
      type: Boolean,
      default: true
    },
    showTokenAccounts: {
      type: Boolean,
      default: true
    },
    tokenAccount: {
      type: Object,
      default: null
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'lg'
    },
    blacklist: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      isScanning: false,
      destinationAccount: null,
      destinationAccountInfo: null,
      errorMessage: null,
      validDestination: null,
      invalidDestinationError: ''
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress,
      contacts: state => state.contacts
    }),
    account () {
      if (Object.prototype.hasOwnProperty.call(this.$Wallet.accounts, this.activeAddress)) {
        return this.$Wallet.accounts[this.activeAddress]
      } else if (Object.prototype.hasOwnProperty.call(this.$Wallet.tokenAccounts, this.activeAddress)) {
        return this.$Wallet.tokenAccounts[this.activeAddress]
      }
      return null
    },
    combinedAccounts () {
      const results = []
      const map = new Map()
      if (this.showCurrent === false) {
        map.set(this.account.address, true)
      }
      if (this.blacklist && this.blacklist.length > 0) {
        for (const address of this.blacklist) {
          map.set(address, true)
        }
      }
      for (const address in this.$Wallet.accounts) {
        if (!map.has(address)) {
          map.set(address, true)
          results.push({
            label: `${this.$Wallet.accounts[address].label}`,
            address: address
          })
        }
      }
      if (this.showTokenAccounts) {
        for (const token in this.$Wallet.tokenAccounts) {
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
      }
      for (const contact of this.contacts) {
        if (!map.has(contact.address)) {
          map.set(contact.address, true)
          results.push({
            label: contact.label,
            address: contact.address
          })
        }
      }
      return results
    }
  },
  watch: {
    account (oldAccount, newAccount) {
      if (!this.isValidDestination(this.account)) {
        if (this.combinedAccounts.length > 0) {
          for (const account of this.combinedAccounts) {
            if (this.isValidDestination(account)) {
              this.destinationAccount = account
              this.emitDestination()
              return
            }
          }
        } else {
          this.destinationAccount = null
          this.emitDestination()
        }
      }
    },
    tokenAccount (oldTokenAccount, newTokenAccount) {
      this.emitDestination()
    },
    destinationAccount (oldAccount, newAccount) {
      this.emitDestination()
    },
    combinedAccounts (newAccounts, oldAccounts) {
      if (newAccounts.length > 0) {
        let valid = false
        // Checks to make sure the destination account is still in the combinedAccounts list
        for (const account of newAccounts) {
          if (this.destinationAccount && account.address === this.destinationAccount.address) {
            this.destinationAccount = account
            valid = true
          }
        }
        // Not in the list then set destination to the first account
        if (valid === false) {
          this.destinationAccount = newAccounts[0]
        }
      } else {
        this.destinationAccount = null
      }
    }
  },
  mounted () {
    if (this.combinedAccounts.length > 0) {
      for (const account of this.combinedAccounts) {
        if (this.isValidDestination(account)) {
          this.destinationAccount = account
          this.emitDestination()
          return
        }
      }
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'addContact'
    ]),
    scan () {
      this.isScanning = !this.isScanning
      this.$emit('scanning', this.isScanning)
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
            this.errorMessage = this.$t('accountSelectorErrors.cameraAccess')
          } else if (error.name === 'NotFoundError') {
            this.errorMessage = this.$t('accountSelectorErrors.cameraNotFound')
          } else if (error.name === 'NotSupportedError') {
            this.errorMessage = this.$t('accountSelectorErrors.cameraNotSupported')
          } else if (error.name === 'NotReadableError') {
            this.errorMessage = this.$t('accountSelectorErrors.cameraNotUsable')
          } else if (error.name === 'OverconstrainedError') {
            this.errorMessage = this.$t('accountSelectorErrors.cameraContrains')
          } else {
            this.errorMessage = `${this.$t('accountSelectorErrors.cameraUnkown')} ${error.message}`
          }
        })
    },
    addAccount (newAddress) {
      // Validates the account checksum
      if (this.$Utils.isLogosAccount(newAddress)) {
        const newAccount = { label: newAddress, address: newAddress }
        const existingAccount = this.findAccount(newAddress)
        if (!existingAccount) {
          this.addContact(newAccount)
          this.destinationAccount = newAccount
        } else {
          this.destinationAccount = existingAccount
        }
      } else {
        console.log('Invalid Destination Account, Checksum failed')
      }
    },
    findAccount (newAddress) {
      return this.combinedAccounts.find((account) => {
        return account.address === newAddress
      })
    },
    labelWithAddress ({ label, address }) {
      if (label !== address) {
        return `${label} — ${address.substring(0, 9)}...${address.substring(59, 64)}`
      } else {
        return `${address.substring(0, 9)}...${address.substring(59, 64)}`
      }
    },
    emitDestination: async function () {
      if (this.destinationAccount !== null) {
        const isValid = await this.isValidDestination(this.destinationAccount)
        if (isValid) {
          this.$emit('change', {
            error: null,
            account: this.destinationAccountInfo
          })
        } else {
          this.$emit('change', {
            error: this.invalidDestinationError,
            account: null
          })
        }
      } else {
        this.$emit('change', {
          error: 'No Account Selected',
          account: null
        })
      }
    },
    isValidDestination: async function (account) {
      this.validDestination = null
      this.invalidDestinationError = ''
      if (!this.$Utils.isLogosAccount(account.address)) {
        this.validDestination = false
        this.invalidDestinationError = this.$t('accountSelectorErrors.invalidAddress')
        return false
      }
      if (!this.tokenAccount) {
        this.validDestination = true
        return true
      } else if (this.tokenAccount && account && account.address) {
        const address = account.address
        const rpc = this.$Wallet.rpcClient()
        let accountInfo = null
        if (!this.destinationAccountInfo ||
          !this.destinationAccountInfo.accountInfo ||
          this.destinationAccountInfo.address !== this.destinationAccount.address) {
          accountInfo = await rpc.accounts.info(address)
          this.destinationAccountInfo = {
            ...this.destinationAccount,
            accountInfo: accountInfo
          }
        } else {
          accountInfo = this.destinationAccountInfo.accountInfo
        }
        if (!accountInfo) {
          this.validDestination = false
          this.invalidDestinationError = this.$t('accountSelectorErrors.unableToValidate')
          return false
        }
        if (accountInfo.error && accountInfo.error === 'Bad account number') {
          this.validDestination = false
          this.invalidDestinationError = this.$t('accountSelectorErrors.invalidAddress')
          return false
        }
        // If this is a token send
        if (this.tokenAccount.tokenID !== null) {
          if (accountInfo.error && accountInfo.error === 'failed to get account') {
            this.validDestination = false
            this.invalidDestinationError = this.$t('accountSelectorErrors.notOpened')
            return false
          }
          if (accountInfo.type !== 'LogosAccount') {
            this.validDestination = false
            this.invalidDestinationError = this.$t('accountSelectorErrors.tokenAccountError')
            return false
          }
          const tokenInfo = this.tokenAccount.getAccountStatus(account.address)
          if (this.tokenAccount.settings.whitelist && tokenInfo.whitelisted === false) {
            this.validDestination = false
            this.invalidDestinationError = this.$t('accountSelectorErrors.needsWhitelisted')
            return false
          } else if (tokenInfo.frozen === true) {
            this.validDestination = false
            this.invalidDestinationError = this.$t('accountSelectorErrors.frozen')
            return false
          }
        }
        this.validDestination = true
        return true
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
