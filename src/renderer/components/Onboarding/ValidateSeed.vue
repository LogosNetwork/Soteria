<template>
  <div class="decrypt-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div id="passwordDecrypt" class="p-3">
        <h4 v-t="'validateYourSeed'"></h4>
        <div>
          <small v-t="'whyvalidate'"></small>
        </div>
        <div class="form-group text-left">
          <label for="seed" v-t="'seed'"></label>
          <div class="input-group input-group-lg">
            <form id="validateSeedForm" @submit.stop.prevent="verify()">
              <div class="input-group input-group-lg">
                <b-form-input id="seed"
                  type="text"
                  v-model="insertedSeed"
                  :state="seedMatch"
                  :placeholder="$t('seed').toLowerCase()"
                  onpaste="return false;"
                  required>
                </b-form-input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-50" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
          <b-button :disabled="!seedMatch" class="w-50" variant="primary" v-t="'validate'"  v-on:click="verify()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LogosWallet from '../../api/wallet'
import Vue from 'vue'
import { mapState } from 'vuex'
Vue.use(LogosWallet)

export default {
  name: 'decrypt-wallet',
  methods: {
    previous () {
      this.$router.go(-1)
    },
    verify () {
      if (this.seed === this.insertedSeed) {
        this.$router.push({ name: 'decrypt' })
      }
    }
  },
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    seedMatch () {
      if (!this.insertedSeed || this.insertedSeed.length === 0) return null
      return this.seed === this.insertedSeed
    }
  },
  data () {
    return {
      insertedSeed: null
    }
  }
}
</script>

<style scoped lang="scss">
  #passwordDecrypt {
    max-width:675px;
    width:100vw;
  }
  #validateSeedForm {
    width: 100%;
  }
  .decrypt-container {
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
