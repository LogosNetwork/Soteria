import Vue from 'vue'
import './assets/styles/shame.scss'
import LogosWallet from './api/wallet'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import VueInputAutowidth from 'vue-input-autowidth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/pro-solid-svg-icons'
import { faDocker } from '@fortawesome/free-brands-svg-icons'
import { faTimes, faFileImport, faChartNetwork, faLambda, faEye, faEyeSlash, faShieldCheck, faKey, faPencil, faLockAlt, faFileUpload, faCogs, faWallet, faLandmark, faPowerOff, faExchange, faSearch, faCoins, faSquare, faPlus, faFilter, faCircle, faCoin, faHandReceiving, faPaperPlane, faSyncAlt, faTachometerAlt, faCopy, faQrcode, faChartLine, faStar as faLightStar, faGlobeAmericas, faQuestionCircle, faMagic, faFire, faMask, faUserEdit, faEdit, faCrown, faListAlt, faSnowflake, faBars, faPercentage, faServer, faDownload } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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
library.add(faExchange)
library.add(faLandmark)
library.add(faPowerOff)
library.add(faSearch)
library.add(faCoins)
library.add(faCoin)
library.add(faTimes)
library.add(faPlus)
library.add(faSquare)
library.add(faFilter)
library.add(faCircle)
library.add(faHandReceiving)
library.add(faPaperPlane)
library.add(faSyncAlt)
library.add(faTachometerAlt)
library.add(faCopy)
library.add(faFileImport)
library.add(faQrcode)
library.add(faChartLine)
library.add(faStar)
library.add(faLightStar)
library.add(faGlobeAmericas)
library.add(faQuestionCircle)
library.add(faMagic)
library.add(faFire)
library.add(faMask)
library.add(faUserEdit)
library.add(faEdit)
library.add(faCrown)
library.add(faListAlt)
library.add(faSnowflake)
library.add(faBars)
library.add(faPercentage)
library.add(faDocker)
library.add(faServer)
library.add(faDownload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('multiselect', Multiselect)

dayjs.extend(relativeTime)
Vue.filter('fromNow', (timestamp) => {
  timestamp = timestamp.substring(0, timestamp.length - 3)
  return dayjs.unix(timestamp).fromNow()
})

Vue.use(BootstrapVue)
Vue.use(VueInputAutowidth)
Vue.use(LogosWallet)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')
