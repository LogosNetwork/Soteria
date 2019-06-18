import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
let plugins = []
if (global && global.createPersistedState && global.createSharedMutations) {
  plugins = [
    global.createPersistedState({
      ignoredPaths: ['Onboarding']
    }),
    global.createSharedMutations()
  ]
}
export default new Vuex.Store({
  modules,
  plugins: plugins,
  strict: process.env.NODE_ENV !== 'production'
})
