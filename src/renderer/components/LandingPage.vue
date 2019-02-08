<template>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'landing-page',
    computed: {
      ...mapState('Language', {
        selectedLanguageCode: state => state.selectedLanguageCode
      }),
      ...mapState('EncryptedWallet', {
        wallet: state => state.wallet,
        validated: state => state.validated
      })
    },
    created: function () {
      // Check wallet and initalize i18n
      if (this.selectedLanguageCode !== null) {
        this.$i18n.locale = this.selectedLanguageCode
      }
      if (typeof this.wallet === 'undefined' || this.wallet === null ||
        typeof this.validated === 'undefined' || this.validated === false) {
        // Start onboarding
        this.$router.push({ path: '/onboarding/language' })
      } else {
        // Wallet found time to decrypt and unpack
        this.$router.push({ path: '/locked' })
      }
    }
  }
</script>