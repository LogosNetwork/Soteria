import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue'
import LogosWallet from '@logosnetwork/logos-webwallet-sdk'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileImport, faChartNetwork } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

library.add(faFileImport)
library.add(faChartNetwork)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(LogosWallet.Block)
Vue.use(LogosWallet.LogosFunctions)
Vue.use(LogosWallet.Wallet)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')
