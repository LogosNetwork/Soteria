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
          path: 'encryptSeed/:seed',
          props: true,
          component: require('@/components/Onboarding/EncryptSeed').default
        },
        {
          name: 'validate',
          path: 'validate',
          component: require('@/components/Onboarding/ValidateSeed').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
