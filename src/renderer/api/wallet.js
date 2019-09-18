import { Wallet, Utils } from '@logosnetwork/logos-webwallet-sdk'
import axios from 'axios'

export { Wallet }

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.prototype.$Utils = Utils
    Vue.prototype.$LogosWallet = Wallet
    const wallet = new Wallet()
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
    wallet.ConfigureSoteria = async (nodeOptions = null) => {
      Vue.prototype.$Wallet.tokenSync = true
      Vue.prototype.$Wallet.validateSync = false
      if (nodeOptions) {
        Vue.prototype.$Wallet.mqtt = null
        Vue.prototype.$Wallet.ws = true
        Vue.prototype.$Wallet.p2pPropagation = true
        Vue.prototype.$Wallet.rpc = {
          nodeURL: nodeOptions.nodeURL,
          nodePort: nodeOptions.nodePort,
          wsPort: nodeOptions.wsPort
        }
      } else {
        const response = await axios.get('https://pla.bs/delegates')
        Vue.prototype.$Wallet.mqtt = 'wss://pla.bs:8443'
        Vue.prototype.$Wallet.rpc = {
          proxy: 'https://pla.bs',
          nodeURL: Object.values(response.data)[0]
        }
      }
      return true
    }
    Vue.prototype.$Wallet = wallet
  }
}
