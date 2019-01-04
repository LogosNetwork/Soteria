<template>
  <div class="onboarding-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="panel table">
        <div class="plan">
          <div class="circle">
            <font-awesome-icon size="6x" class="icon" :icon="['fal','file-import']" />
          </div>
          <h5 class="header" v-t="'haveaseed'"></h5>
          <b-button class="mt-3" size="lg" v-t="'importseed'" variant="outline-primary"></b-button>
        </div>
        <div class="plan">
          <div class="circle">
            <font-awesome-icon size="6x" class="icon" :icon="['fal','chart-network']" />
          </div>
          <h5 class="header" v-t="'needaseed'"></h5>
          <b-button class="mt-3" size="lg" v-t="'generateseed'" v-on:click="encryptSeedPage()" variant="primary"></b-button>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-100" variant="dark" v-t="'previous'"  v-on:click="previous()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import LogosWallet from '../api/wallet'
Vue.use(LogosWallet)

export default {
  name: 'generate-seed',
  methods: {
    encryptSeedPage () {
      let wallet = new this.$Wallet()
      let seed = wallet.createWallet()
      this.$router.push({ name: 'encryptSeed', params: { seed: seed } })
    },
    previous () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
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
  .panel {
    border-radius: 10px;
    padding: 15px 25px;
    position: relative;
    width: 100%;
    z-index: 10;
  }
  .icon {
    color:#007bff;
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    background: #FFF;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 25px;
    max-width: 100%;
  }

  .table {
    display: flex;
    flex-direction: row;
  }

  .table * {
    text-align: center;
  }

  .plan {
    border-bottom: none;
    border-right: 1px solid #e1f1ff;
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }

  .header {
    color: #888;
    font-weight: 600;
    letter-spacing: 1px;
  }
</style>
