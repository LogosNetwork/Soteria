<template>
  <div class="decrypt-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div id="passwordDecrypt">
        <font-awesome-icon size="4x" class="icon mb-3" :icon="['fal','key']" />
        <h4 v-t="'unlockwallet'" class="mb-3"></h4>
        <div class="form-group text-left">
          <label for="pwd" v-t="'password'"></label>
          <div class="input-group input-group-lg">
            <b-form-input id="pwd"
              :type="inputType"
              v-model="password"
              :placeholder="$t('password').toLowerCase()"
              required>
            </b-form-input>
            <div class="input-group-append eyeButton">
              <b-button v-b-tooltip.hover title="Toggle Password Visibility" :pressed="showPassword" variant="link" v-on:click="togglePasswordVisibility()" class="btn btn-default btn-sm">
                <font-awesome-icon v-if="showPassword" class="icon" :icon="['fal','eye']" />
                <font-awesome-icon v-if="!showPassword" class="icon" :icon="['fal','eye-slash']" />
                <span class="sr-only">Toggle Visibility of Password Field</span>
              </b-button>
            </div>
          </div>
          <div>
            <b-button v-b-modal.clearWalletModal variant="link" class="btn-sm" style="padding-left:0px" v-t="'forgotPassword'"></b-button>
            <b-modal id="clearWalletModal" ref="clearWallet" :title="$t('areyousure')" @ok="handleOk">
              <p class="text-danger" v-t="'forgotPasswordWarning'"></p>
              <form @submit.stop.prevent="handleSubmit">
                <b-form-input 
                  class="mt-3 mb-3"
                  type="text"
                  :placeholder="$t('delete.placeholder')"
                  :state="validateDeleteKeyword"
                  v-model="deleteText">
                </b-form-input>
              </form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-100" variant="primary" v-t="'unlockwallet'"  v-on:click="unlockWallet()"></b-button>
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
    unlockWallet () {
      // TODO
    },
    handleSubmit () {
      if (this.deleteText.toLowerCase() === this.$t('delete.keyword').toLowerCase()) {
        this.$refs.clearWallet.hide()
        this.$router.push({ path: '/onboarding/language' })
      }
    },
    handleOk (evt) {
      evt.preventDefault()
      this.handleSubmit()
    },
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    }
  },
  computed: {
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet
    }),
    validateDeleteKeyword () {
      if (this.deleteText !== null && this.deleteText.length > 0) {
        return this.deleteText.toLowerCase() === this.$t('delete.keyword').toLowerCase()
      } else {
        return null
      }
    }
  },
  data () {
    return {
      password: null,
      showPassword: false,
      deleteText: null,
      inputType: 'password'
    }
  }
}
</script>

<style scoped lang="scss">
  #passwordDecrypt {
    width:450px;
  }
  .eyeButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    border: 1px solid #ced4da;
  }
  .eyeButton > .btn-link {
    color: var(--white);
  }
  .eyeButton > .btn-link:hover > .icon {
    color: var(--white);
    opacity: 0.5;
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
