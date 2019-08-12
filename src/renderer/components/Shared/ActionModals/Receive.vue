<template>
  <div>
    <AccountList
      v-if="list"
      :aggregate="false"
      :tokenfilter="false"
      class="mb-3"
    />
    <b-container
      class="text-left"
      fluid
    >
      <div>
        <b-form-group
          :label="$t('address')"
          label-size="lg"
        >
          <b-input-group size="lg">
            <b-form-input
              id="address"
              :value="currentAccountAddress"
              type="text"
              :disabled="true"
            />
            <b-form-input
              ref="myAddress"
              :value="currentAccountAddress"
              type="text"
              tabindex="-1"
              class="hiddenInput"
            />
            <b-input-group-append>
              <b-button
                v-b-tooltip.hover
                :title="$t('copy')"
                variant="outline-black"
                class="text-white"
                @click="copy()"
              >
                <font-awesome-icon
                  class="icon"
                  :icon="['fal','copy']"
                />
                <span
                  v-t="'copyAddress'"
                  class="sr-only"
                />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <div class="mt-3">
        <label for="qrCode">Scan</label>
        <b-card class="text-center">
          <qrcode
            id="qrCode"
            :value="qrAddress"
            :options="{
              margin: 2,
              width: 175,
              color: {
                dark: '#000',
                light: '#FFF'
              }
            }"
          />
        </b-card>
      </div>
      <b-alert
        class="copyAlert"
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        <span v-t="'copyToClipboard'" />
      </b-alert>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AccountList from '@/components/Wallet/Dashboard/AccountList.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'Receive',
  components: {
    AccountList,
    qrcode: VueQrcode
  },
  props: {
    list: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      amount: '0',
      dismissCountDown: 0,
      dismissSecs: 3
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress
    }),
    accountArray: function () {
      return Object.values(this.$Wallet.accounts)
    },
    currentAccountAddress: function () {
      if (this.activeAddress !== null) {
        return this.activeAddress
      } else {
        return this.accountArray[0].address
      }
    },
    qrAddress: function () {
      return `lgs:${this.currentAccountAddress}`
    }
  },
  created: function () {
    if (this.activeAddress === null && this.accountArray.length > 0) {
      this.setActiveAddress(this.accountArray[0].address)
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'setActiveAddress'
    ]),
    copy () {
      this.$refs.myAddress.select()
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<style scoped lang="scss">
  .copyAlert {
    position: absolute;
    bottom: -75px;
    width: calc(100% - 60px);
  }
  .hiddenInput {
    position:absolute;
    left:-1000px;
    width:1000px;
    top:-1000px;
  }
  .copyButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    width: 59px;
    background: $input-bg;
    border: 1px solid $input-border-color;
    border-left: none;
  }
  .copyButton > .btn-link {
    color: theme-color("base");
    cursor: copy;
  }
  .copyButton > .btn-link:hover > .icon {
    color: theme-color("base");
    opacity: 0.5;
  }
  #address {
    cursor: text;
  }
</style>
