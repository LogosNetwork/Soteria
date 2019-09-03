import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

Vue.use(Vuex)
let plugins = []

if (global && global.createPersistedState && global.createSharedMutations) {
  // Electron Persistance
  plugins = [
    global.createPersistedState({
      ignoredPaths: ['Onboarding', 'System']
    })
  ]
} else if (window.localStorage) {
  // Web Application Persistance
  plugins = [new VuexPersistence({
    storage: window.localStorage,
    supportCircular: true,
    reducer: (state) => {
      return {
        EncryptedWallet: state.EncryptedWallet,
        Language: state.Language,
        Wallet: state.Wallet
      }
    }
  }).plugin]
}
export default new Vuex.Store({
  modules,
  plugins: plugins,
  strict: process.env.NODE_ENV !== 'production'
})
