<template>
  <div>
    <div class="header mt-3 mb-1">
      <font-awesome-icon class="icon" size="lg" :icon="['fal','lambda']" />
      <span v-t="'logosnetwork'"></span>
    </div>
    <div class="decrypt-container">
      <div class="row h-100 justify-content-center align-items-center">
        <div id="passwordDecrypt" class="p-3">
          <font-awesome-icon size="4x" class="icon mb-3" :icon="['fal','key']" />
          <h4 v-t="'unlockwallet'" class="mb-3"></h4>
          <div class="form-group text-left">
            <label for="pwd" v-t="'password'"></label>
            <div class="input-group input-group-lg">
              <form id="unlockWalletForm" @submit.stop.prevent="unlockWallet()">
                <div class="input-group input-group-lg">
                  <b-form-input id="pwd"
                    :type="inputType"
                    v-model="password"
                    :placeholder="$t('password').toLowerCase()"
                    required>
                  </b-form-input>
                  <div class="input-group-append eyeButton">
                    <b-button v-b-tooltip.hover :title="$t('togglePasswordVisibility')" :pressed="showPassword" variant="link" v-on:click="changePasswordVisibility()" class="btn btn-default btn-sm">
                      <font-awesome-icon v-if="showPassword" class="icon" :icon="['fal','eye']" />
                      <font-awesome-icon v-if="!showPassword" class="icon" :icon="['fal','eye-slash']" />
                      <span class="sr-only" v-t="'togglePasswordVisibility'"></span>
                    </b-button>
                  </div>
                </div>
                <small v-if="error" id="error" class="form-text text-danger">{{error}}</small>
              </form>
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
  </div>
</template>

<script>
import LogosWallet from '../api/wallet'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
Vue.use(LogosWallet)

export default {
  name: 'decrypt-wallet',
  methods: {
    ...mapActions('Onboarding', [
      'setSeed'
    ]),
    ...mapActions('EncryptedWallet', [
      'setValidated'
    ]),
    unlockWallet () {
      this.error = null
      this.$Wallet.setPassword(this.password)
      this.$Wallet.load(this.wallet).then((val) => {
        this.setValidated(true)
        this.setSeed(null)
        this.$router.push({ path: '/wallet/dashboard' })
      }).catch(() => {
        this.error = 'Invalid Password'
      })
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
    changePasswordVisibility () {
      this.showPassword = !this.showPassword
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    }
  },
  computed: {
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet,
      validated: state => state.validated
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
      error: null,
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
    max-width:450px;
    width:100vw;
  }
  #unlockWalletForm {
    width: 100%;
  }
  #error {
    height: 15px;
  }
  .eyeButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    border: 1px solid #ced4da;
    border-left: none;
  }
  .eyeButton > .btn-link {
    color: var(--base);
  }
  .eyeButton > .btn-link:hover > .icon {
    color: var(--base);
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
  .header > .icon {
    color: var(--primary);
  }
</style>
