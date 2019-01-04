<template>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'landing-page',
    computed: {
      ...mapState('Language', {
        selectedLanguageCode: state => state.selectedLanguageCode
      })
    },
    created: function () {
      // Check wallet and initalize i18n
      if (this.selectedLanguageCode !== null) {
        this.$i18n.locale = this.selectedLanguageCode
      }
      console.log(this.wallet)
      if (this.wallet === null || typeof this.wallet === 'undefined') {
        // Start onboarding
        this.$router.push({ path: '/onboarding/language' })
      } else {
        // Route to wallet initalizer
      }
    }
  }
</script>

<style scoped lang="scss">
  #logo {
    height: auto;
    max-height: 65vh;
    max-width: 65vw;
    margin: auto;
  }
</style>
