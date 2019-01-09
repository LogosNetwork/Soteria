<template>
  <div class="onboarding-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div id="passwordEncrypt">
        <font-awesome-icon size="4x" class="icon mb-3" :icon="['fal','shield-check']" />
        <h4 v-t="'encryptseed'" class="mb-3"></h4>
        <div class="form-group text-left">
          <label for="pwd" v-t="'password'"></label>
          <div class="security">
            <div v-bind:class="{ 'bg-danger': score !== null && (score.score >= 0 && score.score < 4), 'bg-success': score !== null && score.score === 4}"></div>
            <div v-bind:class="{ 'bg-danger': score !== null && (score.score >= 2 && score.score < 4), 'bg-success': score !== null && score.score === 4}"></div>
            <div v-bind:class="{ 'bg-danger': score !== null && (score.score >= 3 && score.score < 4), 'bg-success': score !== null && score.score === 4}"></div>
            <div v-bind:class="{ 'bg-success': score !== null && score.score === 4}"></div>
          </div>
          <div class="input-group input-group-lg">
            <b-form-input id="pwd"
              :type="inputType"
              :state="validatePassword"
              v-model="password"
              class="transparent"
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
          <small id="pwdHelp" class="form-text text-muted"> <span v-if="password && score && score.feedback && score.feedback.warning">{{score.feedback.warning}}</span></small>
        </div>
        <div class="form-group text-left">
          <label for="pwdConfirm" v-t="'retypePassword'"></label>
          <div class="input-group input-group-lg mb-3">
            <b-form-input id="pwdConfirm"
              :type="inputType"
              :state="validatePasswordConfirmation"
              :disabled="score === null || score.score < 4"
              v-model="passwordConfirm"
              class="transparent"
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
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-50" variant="dark" v-t="'previous'"  v-on:click="previous()"></b-button>
          <b-button :disabled="!valid" class="w-50" variant="primary" v-t="'encrypt'"  v-on:click="createWallet()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import LogosWallet from '../api/wallet'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
Vue.use(LogosWallet)

export default {
  name: 'encrypt-seed',
  methods: {
    ...mapActions('EncryptedWallet', [
      'setWallet'
    ]),
    previous () {
      this.$router.go(-1)
    },
    createWallet () {
      let wallet = new this.$Wallet(this.password)
      wallet.createWallet(this.seed)
      this.setWallet(wallet.pack())
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
    validatePassword () {
      if (this.password === null || this.password.length === 0) {
        this.score = null
        return null
      } else {
        this.score = zxcvbn(this.password)
        return this.score.score >= 4
      }
    },
    validatePasswordConfirmation () {
      if (this.passwordConfirm === null || this.passwordConfirm.length === 0) {
        this.valid = null
        return null
      } else {
        if (this.password === this.passwordConfirm) {
          this.valid = true
          return this.valid
        } else {
          this.valid = false
          return this.valid
        }
      }
    }
  },
  data () {
    return {
      seed: this.$attrs.seed,
      password: null,
      passwordConfirm: null,
      score: null,
      showPassword: false,
      inputType: 'password',
      valid: false
    }
  }
}
</script>

<style scoped lang="scss">
  #passwordEncrypt {
    width:450px;
  }
  #pwdHelp {
    height: 15px;
  }
  .security {
    float: right;
  }
  .security > div {
    width:60px;
    height:5px;
    margin-left:1px;
    display: inline-block;
    background: rgba(233, 236, 239, 0.15)
  }
  .eyeButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    border: 1px solid #ced4da;
  }
  .eyeButton > .btn-link {
    color: #F5F5F5;
  }
  .eyeButton > .btn-link:hover > .icon {
    color: #F5F5F5;
    opacity: 0.5;
  }
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
