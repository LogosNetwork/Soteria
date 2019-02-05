import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      redirect: '/onboarding/language',
      component: require('@/components/Onboarding').default,
      children: [
        {
          name: 'langauge',
          path: 'language',
          component: require('@/components/Onboarding/SelectLanguage').default
        },
        {
          name: 'seed',
          path: 'seed',
          component: require('@/components/Onboarding/GenerateSeed').default
        },
        {
          name: 'encryptSeed',
          path: 'encryptSeed',
          component: require('@/components/Onboarding/EncryptSeed').default
        },
        {
          name: 'exportSeed',
          path: 'exportSeed',
          component: require('@/components/Onboarding/ExportSeed').default
        },
        {
          name: 'exportPaper',
          path: 'exportPaper',
          component: require('@/components/Onboarding/ExportPaper').default
        },
        {
          name: 'validateSeed',
          path: 'validateSeed',
          component: require('@/components/Onboarding/ValidateSeed').default
        },
        {
          name: 'insertMnemonic',
          path: 'insertMnemonic',
          component: require('@/components/Onboarding/InsertMnemonic').default
        }
      ]
    },
    {
      path: '/wallet',
      name: 'wallet',
      redirect: '/wallet/decrypt',
      component: require('@/components/Wallet').default,
      children: [
        {
          name: 'decrypt',
          path: 'decrypt',
          component: require('@/components/Wallet/DecryptWallet').default
        },
        {
          name: 'dashboard',
          path: 'dashboard',
          component: require('@/components/Wallet/Dashboard').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
