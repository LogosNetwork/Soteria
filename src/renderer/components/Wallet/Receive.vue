<template>
  <div>
    <AccountList
      :aggregate="false"
      :tokenfilter="false"
    />
    <b-container
      class="text-left"
      fluid
    >
      <div class="mt-3">
        <label for="address">Address</label>
        <div class="input-group input-group-lg">
          <b-form-input
            id="address"
            :value="currentAccountAddress"
            type="text"
            :disabled="true"
          />
          <div class="input-group-append copyButton">
            <b-button
              v-b-tooltip.hover
              :title="$t('copy')"
              variant="link"
              class="btn btn-default btn-sm"
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
          </div>
        </div>
      </div>
      <div class="mt-3">
        <label for="qrCode">Scan</label>
        <b-card class="text-center">
          <qrcode
            id="qrCode"
            :value="qrAddress"
            :options="{
              margin: 2,
              width: 200,
              color: {
                dark: '#000',
                light: '#FFF'
              }
            }"
          />
        </b-card>
      </div>
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
  data () {
    return {
      amount: '0'
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
    },
    qrAddress: function () {
      return `lgs:${this.currentAccountAddress}`
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
    copy: function () {
      return null
    }
  }
}
</script>

<style scoped lang="scss">
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
