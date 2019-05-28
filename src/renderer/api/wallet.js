import LogosWallet from '@logosnetwork/logos-webwallet-sdk'

export { LogosWallet }

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.prototype.$LogosWallet = LogosWallet.Wallet
    Vue.prototype.$Wallet = new LogosWallet.Wallet()
  }
}
