<template>
  <div class="dashboard-container">
    <b-container class="h-100" fluid>
      <b-row class="h-100">
        <b-col cols="3" class="pt-3">
          <b-form-group v-if="wallet && wallet.accounts.length > 0">
            <div tabindex="-1" role="group">
              <div id="accountSelectorRadios" role="radiogroup" tabindex="-1" class="btn-group-toggle btn-group-vertical">
                <label class="btn btn-primary" v-bind:class="{ active: account.address === wallet.currentAccountAddress }" v-for="account in wallet.accounts" :key="account.address">
                  <input @click="setCurrentAccount(account.address)" :id="`accountSelectorRadios_${account.address}`" type="radio" name="accountSelector" autocomplete="off" :value="account.address"/>
                  <span>{{account.label}}</span>
                </label>
              </div>
            </div>
            <b-button variant="link" @click="addAccount">+ Add new account</b-button>
          </b-form-group>
        </b-col>
        <b-col class="dashboard pt-3">
          Dashboard
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      wallet: this.$Wallet
    }
  },
  methods: {
    previous () {
      this.$router.go(-1)
    },
    setCurrentAccount (address) {
      this.wallet.currentAccountAddress = address
    },
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
  },
  created () {
    if (this.wallet.seed === null) this.$router.push({ path: '/' })
    if (this.wallet && this.wallet.accounts.length === 0) this.addAccount()
  }
}
</script>

<style scoped lang="scss">
  .dashboard-container {
    overflow:hidden;
    height: calc(100vh);
    background-color: var(--secondary);
  }
  .dashboard {
    background-color: var(--bg);
  }
</style>
