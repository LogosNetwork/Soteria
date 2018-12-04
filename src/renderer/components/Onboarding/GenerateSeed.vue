<template>
  <div class="h-100">
    <b-container class="h-100">
      <div class="row h-100 justify-content-center align-items-center">
        Righteous
      </div>
    </b-container>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-100" variant="dark" v-t="'previous'"  v-on:click="changeLanguagePage()"></b-button>
          <b-button class="w-100" variant="default" v-t="'continue'"  v-on:click="validateSeedPage()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'generate-seed',
  methods: {
    validateSeedPage () {
      this.$router.push({ path: '/onboarding/validate' })
    },
    changeLanguagePage () {
      this.$router.push({ path: '/onboarding/language' })
    }
  }
}
</script>

<style scoped lang="scss">
  #jumbotron {
    width:450px;
  }
  .fixed-row-bottom { 
    position: fixed;
    bottom: 0;
    left: 15px;
    width: 100vw;
  }
</style>
