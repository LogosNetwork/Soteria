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
          path: 'language',
          component: require('@/components/Onboarding/SelectLanguage').default
        },
        {
          path: 'seed',
          component: require('@/components/Onboarding/GenerateSeed').default
        },
        {
          path: 'account',
          component: require('@/components/Onboarding/NameAccount').default
        },
        {
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
