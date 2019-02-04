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
                <div class="input-group-append abcButton">
                  <b-button v-b-tooltip.hover :title="$t('insertMnemonic')" variant="link" v-on:click="insertMnemonic()" class="btn btn-default btn-sm">
                    abc
                    <span class="sr-only" v-t='insertMnemonic'></span>
                  </b-button>
                </div>
                <b-form-input id="seed"
                  type="text"
                  v-model="seed"
                  :placeholder="$t('seed').toLowerCase()"
                  required>
                </b-form-input>
                <div class="input-group-append eyeButton">
                  <b-button v-b-tooltip.hover :title="$t('uploadSeedVault')" variant="link" v-on:click="uploadSeedVault()" class="btn btn-default btn-sm">
                    <font-awesome-icon class="icon" :icon="['fal','file-upload']" />
                    <span class="sr-only" v-t='uploadSeedVault'></span>
                  </b-button>
                </div>
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
          <b-button class="w-50" variant="primary" v-t="'validate'"  v-on:click="verify()"></b-button>
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
      console.log(this.seed)
      // TODO
    },
    insertMnemonic () {
      this.$router.push({ name: 'insertMnemonic' })
    },
    uploadSeedVault () {
      // TODO
    }
  },
  computed: {
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet
    })
  },
  data () {
    return {
      seed: null
    }
  }
}
</script>

<style scoped lang="scss">
  #passwordDecrypt {
    max-width:650px;
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
  .abcButton {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    height: 48px;
    border: 1px solid #ced4da;
    border-right: none;
  }
  .eyeButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    border: 1px solid #ced4da;
    border-left: none;
  }
  .abcButton > .btn-link,
  .eyeButton > .btn-link {
    color: var(--white);
  }
  .abcButton > .btn-link:hover > .icon,
  .eyeButton > .btn-link:hover > .icon {
    color: var(--white);
    opacity: 0.5;
  }
</style>
