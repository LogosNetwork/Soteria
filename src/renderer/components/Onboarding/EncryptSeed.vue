<template>
  <div class="onboarding-container">
    <div class="row h-100 justify-content-center align-items-center">
      {{seed}}
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-50" variant="dark" v-t="'previous'"  v-on:click="previous()"></b-button>
          <b-button class="w-50" variant="primary" v-t="'encrypt'"  v-on:click="tba()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'encrypt-seed',
  methods: {
    previous () {
      this.$router.go(-1)
    },
    tba () {
      // TODO
      console.log(this.seed)
    }
  },
  data () {
    return {
      seed: this.$attrs.seed
    }
  }
}
</script>

<style scoped lang="scss">
  .onboarding-container {
    overflow:hidden;
    height: calc(100vh - 88px);
  }
  .fixed-row-bottom { 
    position: fixed;
    bottom: 0;
    left: 15px;
    width: 100vw;
  }
</style>
