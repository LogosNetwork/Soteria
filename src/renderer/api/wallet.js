import LogosWallet from '@logosnetwork/logos-webwallet-sdk'
import axios from 'axios'

export { LogosWallet }

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.prototype.$Utils = LogosWallet.Utils
    Vue.prototype.$LogosWallet = LogosWallet.Wallet
    const wallet = new LogosWallet.Wallet()
    wallet.ResetWalletReactivity = () => {
      for (const token in Vue.prototype.$Wallet._tokenAccounts) {
        const tkAccount = Vue.prototype.$Wallet._tokenAccounts[token]
        delete Vue.prototype.$Wallet._tokenAccounts[token]
        Vue.prototype.$set(Vue.prototype.$Wallet._tokenAccounts, token, tkAccount)
      }
      for (const address in Vue.prototype.$Wallet._accounts) {
        const account = Vue.prototype.$Wallet._accounts[address]
        delete Vue.prototype.$Wallet._accounts[address]
        Vue.prototype.$set(Vue.prototype.$Wallet._accounts, address, account)
      }
    }
    wallet.VueCreateAccount = async () => {
      await Vue.prototype.$Wallet.createAccount(null, false)
      Vue.prototype.$Wallet.ResetWalletReactivity()
    }
    // TODO
    // Set proper syncing / verifying SDK options with user overrides
    // Set the settings for local Logos Node RPC Integration
    wallet.ConfigureSoteria = async () => {
      const response = await axios.get(`https://pla.bs/delegates`)
      // Pulls in token info
      Vue.prototype.$Wallet.tokenSync = true
      // Marks the node as trusted and doesn't validate sigs to saves time.
      // Future optimizations will speed this up but this should be true
      // for remote node integration.
      Vue.prototype.$Wallet.validateSync = false
      Vue.prototype.$Wallet.mqtt = 'wss://pla.bs:8443'
      Vue.prototype.$Wallet.rpc = {
        proxy: 'https://pla.bs',
        delegates: Object.values(response.data)
      }
      return true
    }
    Vue.prototype.$Wallet = wallet
  }
}
