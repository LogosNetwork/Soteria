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
        :label="$t('to')"
        label-size="lg"
      >
        <b-input-group size="lg">
          <multiselect
            id="toSelector"
            v-model="destinationAccount"
            class="scan text-base"
            required
            :tag-placeholder="$t('addThisAccount')"
            track-by="address"
            label="label"
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
                <strong>{{ option.label }}</strong>  -
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
              variant="outline-primary"
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
        class="mt-3"
      >
        <b-form-group
          :label="$t('amount')"
          label-size="lg"
          :description="currentAccountAddress ? `${availableToSend} ${$t('lgsAvailableToSend')}` : `${$t('noAccountFound')}`"
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
              :placeholder="$t('amountInLogos')"
            />
            <b-input-group-append>
              <b-button
                variant="outline-primary"
                class="text-white"
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
            @click="confirmSend()"
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
      localAccounts: []
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    currentAccountAddress () {
      if (this.activeAddress !== null) {
        return this.activeAddress
      } else {
        return this.$Wallet.accounts[0].address
      }
    },
    combinedAccounts () {
      // TODO Contact / Address Book Support
      let results = []
      for (let address in this.$Wallet.accountsObject) {
        if (address !== this.currentAccountAddress) {
          results.push({
            label: `${this.$Wallet.accountsObject[address].label}`,
            address: address
          })
        }
      }
      for (let token in this.$Wallet.tokenAccounts) {
        results.push({
          label: `${this.$Wallet.tokenAccounts[token].name} (${this.$Wallet.tokenAccounts[token].symbol})`,
          address: token
        })
      }
      return results.concat(this.localAccounts)
    },
    availableToSend () {
      return Logos.convert.fromReason(bigInt(this.$Wallet.accountsObject[this.currentAccountAddress].balance).minus(bigInt(this.$Utils.minimumFee)).toString(), 'LOGOS')
    },
    isValidAmount: function () {
      if (this.amount === '') return null
      if (this.amount) {
        if (!/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(this.amount)) return false
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
      }
      return false
    }
  },
  watch: {
    combinedAccounts: function (newAccounts, oldAccounts) {
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
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
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
        if (!this.findAccount(newAddress)) {
          // TODO Prompt user to add label for address book?
          this.localAccounts.push(newAccount)
          this.destinationAccount = newAccount
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
    labelWithAddress ({ label, address }) {
      if (label !== address) {
        return `${label} — ${address.substring(0, 9)}...${address.substring(59, 64)}`
      } else {
        return `${address.substring(0, 9)}...${address.substring(59, 64)}`
      }
    },
    setMax () {
      // TODO
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
