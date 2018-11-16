<template>
  <div>
    <img class="img-fluid" id="logo" src="~@/assets/logo-light.png" alt="logos logo">
    <div class="mb-5">
      <h1 v-t="'logosnetwork'"></h1>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'landing-page',
    computed: {
      ...mapState('Language', {
        selectedLanguage: state => state.selectedLanguage
      })
    },
    created: function () {
      if (this.selectedLanguage === null) {
        setTimeout(() => {
          this.$router.push({ path: '/onboarding/language' })
        }, 2000)
      } else {
        console.log(this.selectedLanguage)
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
