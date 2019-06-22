import LogosWallet from '@logosnetwork/logos-webwallet-sdk'

export { LogosWallet }

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.prototype.$LogosWallet = LogosWallet.Wallet
    let wallet = new LogosWallet.Wallet()
    wallet.ResetWalletReactivity = () => {
      for (let token in Vue.prototype.$Wallet._tokenAccounts) {
        let tkAccount = Vue.prototype.$Wallet._tokenAccounts[token]
        delete Vue.prototype.$Wallet._tokenAccounts[token]
        Vue.prototype.$set(Vue.prototype.$Wallet._tokenAccounts, token, tkAccount)
      }
      for (let address in Vue.prototype.$Wallet._accounts) {
        let account = Vue.prototype.$Wallet._accounts[address]
        delete Vue.prototype.$Wallet._accounts[address]
        Vue.prototype.$set(Vue.prototype.$Wallet._accounts, address, account)
      }
    }
    wallet.VueCreateAccount = async () => {
      await Vue.prototype.$Wallet.createAccount(null, false)
      Vue.prototype.$Wallet.ResetWalletReactivity()
    }
    Vue.prototype.$Wallet = wallet
  }
}
