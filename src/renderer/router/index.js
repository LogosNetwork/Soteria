import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'navigator',
      component: require('@/components/Navigator').default
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
          name: 'insertSeed',
          path: 'insertSeed',
          component: require('@/components/Onboarding/InsertSeed').default
        },
        {
          name: 'insertMnemonic',
          path: 'insertMnemonic',
          component: require('@/components/Onboarding/InsertMnemonic').default
        },
        {
          name: 'insertVault',
          path: 'insertVault',
          component: require('@/components/Onboarding/InsertVault').default
        },
        {
          name: 'importSeed',
          path: 'importSeed',
          component: require('@/components/Onboarding/ImportSeed').default
        },
        {
          name: 'exportPlaintext',
          path: 'exportPlaintext',
          component: require('@/components/Onboarding/ExportPlaintext').default
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
          name: 'dashboard',
          path: 'dashboard',
          component: require('@/components/Wallet/Dashboard').default
        },
        {
          name: 'settings',
          path: 'settings',
          component: require('@/components/Wallet/Settings').default
        }
      ]
    },
    {
      path: '/locked',
      name: 'locked',
      component: require('@/components/LockedWallet').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
