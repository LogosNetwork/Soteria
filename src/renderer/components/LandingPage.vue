<template>
  <b-container>
    <img class="img-fluid" id="logo" src="~@/assets/logo-light.png" alt="logos logo">
    <div class="mb-5">
      <h1 v-t="'logosnetwork'"></h1>
    </div>
  </b-container>
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
      if (this.selectedLanguageCode === null) {
        setTimeout(() => {
          this.$router.push({ path: '/onboarding/language' })
        }, 2000)
      } else {
        this.$i18n.locale = this.selectedLanguageCode
        // In future direct to wherever
        setTimeout(() => {
          this.$router.push({ path: '/onboarding/language' })
        }, 2000)
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
