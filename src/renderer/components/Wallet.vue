<template>
  <div class="wallet-container">
    <b-container
      class="h-100 p-0"
      fluid
    >
      <b-row
        class="h-100"
        no-gutters
      >
        <b-col
          cols="3"
          class="pt-4 sidebar"
        >
          <Sidebar />
        </b-col>
        <b-col class="content">
          <router-view class="pt-4" />
        </b-col>
      </b-row>
      <div
        v-if="!synced"
        v-b-tooltip.hover
        class="syncer"
        :title="$t('syncingWallet')"
      >
        <font-awesome-icon
          class="text-primary mr-3 mb-3"
          size="2x"
          :icon="['fal','sync-alt']"
          spin
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Wallet/Sidebar.vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Wallet',
  components: {
    'Sidebar': Sidebar
  },
  data () {
    return {
      wallet: this.$Wallet
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress,
      synced: state => state.synced
    })
  },
  mounted: function () {
    if (this.wallet.seed) {
      this.setSynced(false)
      axios.get(`https://pla.bs/delegates`).then(res => {
        if (this.wallet.mqtt !== 'wss://pla.bs:8443') {
          this.wallet.mqtt = 'wss://pla.bs:8443'
        }
        this.wallet.rpc = {
          proxy: 'https://pla.bs',
          delegates: Object.values(res.data)
        }
        if (this.activeAddress) {
          if (this.wallet.accountsObject[this.activeAddress]) {
            this.wallet.currentAccountAddress = this.activeAddress
          } else {
            this.setActiveAddress(this.wallet.currentAccountAddress)
          }
        }
        this.wallet.sync().then((result) => {
          this.setSynced(result)
        })
      })
      window.addEventListener('beforeunload', this.recordData)
    }
  },
  created () {
    if (this.wallet.seed === null) {
      this.$router.push({ path: '/' })
    } else if (this.wallet && this.wallet.accounts.length === 0) {
      this.addAccount()
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('beforeunload', this.recordData)
  },
  methods: {
    ...mapActions('EncryptedWallet', [
      'setWallet'
    ]),
    ...mapActions('Wallet', [
      'setActiveAddress',
      'setSynced'
    ]),
    addAccount: async function () {
      let newAccount = await this.wallet.createAccount(null, false)
      delete this.wallet._accounts[newAccount.address]
      this.$set(this.wallet._accounts, newAccount.address, newAccount)
      for (let token in this.wallet._tokenAccounts) {
        let tkAccount = this.wallet._tokenAccounts[token]
        delete this.wallet._tokenAccounts[token]
        this.$set(this.wallet._tokenAccounts, tkAccount.address, tkAccount)
      }
    },
    recordData () {
      this.setWallet(this.wallet.encrypt())
    }
  }
}
</script>

<style scoped lang="scss">
  .sidebar { max-width: 200px; }
  .wallet-container {
    overflow:hidden;
    height: calc(100vh);
    background-color: theme-color("secondary");
  }
  .content {
    background-color: theme-color("bg");
  }
  .syncer {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
</style>
