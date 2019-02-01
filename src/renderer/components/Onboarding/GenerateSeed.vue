<template>
  <div>
    <div class="row h-100 justify-content-center align-items-center">
      <div class="panel table">
        <div class="plan">
          <div class="circle">
            <font-awesome-icon size="6x" class="icon" :icon="['fal','file-import']" />
          </div>
          <h5 v-t="'haveaseed'"></h5>
          <b-button class="mt-3" size="lg" v-t="'importseed'" variant="outline-primary"></b-button>
        </div>
        <div class="plan">
          <div class="circle">
            <font-awesome-icon size="6x" class="icon" :icon="['fal','chart-network']" />
          </div>
          <h5 v-t="'needaseed'"></h5>
          <b-button class="mt-3" size="lg" v-t="'generateseed'" v-on:click="encryptSeedPage()" variant="primary"></b-button>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-100" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import LogosWallet from '../../api/wallet'
import { mapState, mapActions } from 'vuex'
Vue.use(LogosWallet)

export default {
  name: 'generate-seed',
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    })
  },
  methods: {
    ...mapActions('Onboarding', [
      'setSeed'
    ]),
    encryptSeedPage () {
      let wallet = new this.$Wallet({mqtt: false, rpc: false})
      let seed = wallet.seed
      this.setSeed(seed)
      this.$router.push({ name: 'encryptSeed' })
    },
    previous () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
  .panel {
    border-radius: 10px;
    padding: 15px 25px;
    position: relative;
    width: 100%;
    z-index: 10;
  }
  .icon {
    color: var(--primary);
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    background: var(--white);
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
    border-right: 1px solid var(--white);
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }
</style>
