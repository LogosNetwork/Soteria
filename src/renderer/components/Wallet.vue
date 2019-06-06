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
          class="pt-4"
        >
          <Sidebar />
        </b-col>
        <b-col class="pt-3 content">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Wallet/Sidebar.vue'

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
  created () {
    if (this.wallet.seed === null) {
      this.$router.push({ path: '/' })
    } else if (this.wallet && this.wallet.accounts.length === 0) {
      this.addAccount()
    }
  },
  methods: {
    addAccount: async function () {
      let newAccount = await this.wallet.createAccount(null, false)
      delete this.wallet._accounts[newAccount.address]
      this.$set(this.wallet._accounts, newAccount.address, newAccount)
      for (let token in this.wallet._tokenAccounts) {
        let tkAccount = this.wallet._tokenAccounts[token]
        delete this.wallet._tokenAccounts[token]
        this.$set(this.wallet._tokenAccounts, tkAccount.address, tkAccount)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .wallet-container {
    overflow:hidden;
    height: calc(100vh);
    background-color: theme-color("secondary");
  }
  .content {
    background-color: theme-color("bg");
  }
</style>
