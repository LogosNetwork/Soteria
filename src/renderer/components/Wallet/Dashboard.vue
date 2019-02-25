<template>
  <div class="dashboard-container">
    <b-container class="h-100" fluid>
      <b-row class="h-100">
        <b-col cols="3" class="pt-3">
          Account Selector
          <ul v-if="wallet && wallet.accounts.length > 0">
            <li v-for="account in wallet.accounts" :key="account.address">{{account.address}}</li>
          </ul>
        </b-col>
        <b-col class="dashboard pt-3">
          Dashboard
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LogosWallet from '../../api/wallet'
import Vue from 'vue'
Vue.use(LogosWallet)
export default {
  name: 'dashboard',
  methods: {
    previous () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState('Wallet', {
      wallet: function (state) {
        return new this.$Wallet(state.wallet)
      }
    })
  },
  created: function () {
    if (this.wallet && this.wallet.accounts.length === 0) this.wallet.createAccount()
  }
}
</script>

<style scoped lang="scss">
  .dashboard-container {
    overflow:hidden;
    height: calc(100vh);
    background-color: var(--secondary)
  }
  .dashboard {
    background-color: var(--bg)
  }
</style>
