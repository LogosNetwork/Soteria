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
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Wallet/Sidebar.vue'
import { mapActions } from 'vuex'

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
  mounted: function () {
    window.addEventListener('beforeunload', this.recordData)
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
    max-width: calc(100% - 200px);
  }
</style>
