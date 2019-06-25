<template>
  <div>
    <AccountList
      :aggregate="false"
      :tokenfilter="false"
      :addaccount="false"
    />
    <b-container
      class="text-left"
      fluid
    >
      <div class="mt-3">
        <label
          v-t="'to'"
          for="address"
        />
        <div class="input-group input-group-lg">
          <b-form-input
            id="address"
            v-model="destinationAddress"
            :placeholder="$t('address').toLowerCase()"
            type="text"
          />
          <div class="input-group-append scanButton">
            <b-button
              v-b-tooltip.hover
              :title="$t('scanQR')"
              :pressed="isScanning"
              variant="link"
              class="btn btn-default btn-sm"
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
          </div>
        </div>
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
          <label
            v-t="'amount'"
            for="amount"
          />
          <div class="input-group input-group-lg">
            <b-form-input
              id="amount"
              v-model="amount"
              :placeholder="$t('amount').toLowerCase()"
              type="text"
            />
            <div class="input-group-append maxButton">
              <b-button
                variant="link"
                class="btn btn-default btn-sm"
                @click="setMax()"
              >
                <span
                  v-t="'max'"
                />
              </b-button>
            </div>
          </div>
        </div>
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
            :disabled="true"
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
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'Send',
  components: {
    AccountList,
    QrcodeStream
  },
  data () {
    return {
      amount: '0',
      isScanning: false,
      destinationAddress: '',
      errorMessage: null
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    currentAccountAddress: function () {
      if (this.activeAddress !== null) {
        return this.activeAddress
      } else {
        return this.$Wallet.accounts[0].address
      }
    }
  },
  created: function () {
    if (this.activeAddress === null && this.$Wallet.accounts.length > 0) {
      this.setActiveAddress(this.$Wallet.accounts[0].address)
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
        this.destinationAddress = content.substring(4, 68)
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
    setMax () {
      // TODO
    }
  }
}
</script>

<style scoped lang="scss">
  .maxButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    background: $input-bg;
    border: 1px solid $input-border-color;
    border-left: none;
  }
  .scanButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    width: 59px;
    background: $input-bg;
    border: 1px solid $input-border-color;
    border-left: none;
  }
  .maxButton > .btn-link,
  .scanButton > .btn-link {
    color: theme-color("base");
  }
  .maxButton > .btn-link:hover,
  .scanButton > .btn-link:hover > .icon {
    color: theme-color("base");
    opacity: 0.5;
  }
</style>
