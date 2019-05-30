import Vue from 'vue'
import axios from 'axios'
import './assets/css/shame.scss'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileImport, faChartNetwork, faLambda, faEye, faEyeSlash, faShieldCheck, faKey, faPencil, faLockAlt, faFileUpload, faCogs, faWallet, faLandmark, faPowerOff } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

library.add(faFileImport)
library.add(faChartNetwork)
library.add(faLambda)
library.add(faKey)
library.add(faEye)
library.add(faPencil)
library.add(faLockAlt)
library.add(faEyeSlash)
library.add(faShieldCheck)
library.add(faFileUpload)
library.add(faCogs)
library.add(faWallet)
library.add(faLandmark)
library.add(faPowerOff)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')
