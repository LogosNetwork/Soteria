<template>
  <div>
    <div class="row h-100 justify-content-center align-items-center">
      <div id="passwordEncrypt">
        <font-awesome-icon
          size="4x"
          class="icon mb-3"
          :icon="['fal','shield-check']"
        />
        <h4
          v-t="'encryptseed'"
          class="mb-3"
        />
        <div class="form-group text-left">
          <label
            v-t="'password'"
            for="pwd"
          />
          <div class="security">
            <div :class="{ 'bg-danger': score !== null && (score.score >= 0 && score.score < 4), 'bg-success': score !== null && score.score === 4}" />
            <div :class="{ 'bg-danger': score !== null && (score.score >= 2 && score.score < 4), 'bg-success': score !== null && score.score === 4}" />
            <div :class="{ 'bg-danger': score !== null && (score.score >= 3 && score.score < 4), 'bg-success': score !== null && score.score === 4}" />
            <div :class="{ 'bg-success': score !== null && score.score === 4}" />
          </div>
          <div class="input-group input-group-lg">
            <b-form-input
              id="pwd"
              v-model="password"
              :type="inputType"
              :state="score && score.score >= 4"
              class="transparent"
              required
              @input="validatePassword()"
            />
            <div class="input-group-append eyeButton">
              <b-button
                v-b-tooltip.hover
                :title="$t('togglePasswordVisibility')"
                :pressed="showPassword"
                variant="link"
                class="btn btn-default btn-sm text-white"
                @click="changePasswordVisibility()"
              >
                <font-awesome-icon
                  v-if="showPassword"
                  class="icon"
                  :icon="['fal','eye']"
                />
                <font-awesome-icon
                  v-if="!showPassword"
                  class="icon"
                  :icon="['fal','eye-slash']"
                />
                <span
                  v-t="'togglePasswordVisibility'"
                  class="sr-only"
                />
              </b-button>
            </div>
          </div>
          <small
            id="pwdHelp"
            class="form-text text-muted"
          > <span v-if="password && score && score.feedback && score.feedback.warning">{{ score.feedback.warning }}</span></small>
        </div>
        <div class="form-group text-left">
          <label
            v-t="'retypePassword'"
            for="pwdConfirm"
          />
          <form @submit.stop.prevent="createWallet">
            <div class="input-group input-group-lg mb-3">
              <b-form-input
                id="pwdConfirm"
                v-model="passwordConfirm"
                :type="inputType"
                :state="validatePasswordConfirmation()"
                :disabled="score === null || score.score < 4"
                class="transparent"
                required
              />
              <div class="input-group-append eyeButton">
                <b-button
                  v-b-tooltip.hover
                  :title="$t('togglePasswordVisibility')"
                  :pressed="showPassword"
                  variant="link"
                  class="btn btn-default btn-sm text-white"
                  @click="changePasswordVisibility()"
                >
                  <font-awesome-icon
                    v-if="showPassword"
                    class="icon"
                    :icon="['fal','eye']"
                  />
                  <font-awesome-icon
                    v-if="!showPassword"
                    class="icon"
                    :icon="['fal','eye-slash']"
                  />
                  <span
                    v-t="'togglePasswordVisibility'"
                    class="sr-only"
                  />
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'previous'"
            class="w-50"
            variant="secondary"
            @click="previous()"
          />
          <b-button
            v-t="'encrypt'"
            :disabled="!valid"
            class="w-50"
            variant="primary"
            @click="createWallet()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EncryptSeed',
  data () {
    return {
      password: null,
      passwordConfirm: null,
      score: null,
      showPassword: false,
      deleteText: null,
      inputType: 'password',
      valid: false
    }
  },
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    ...mapState('EncryptedWallet', {
      validated: state => state.validated
    })
  },
  methods: {
    ...mapActions('EncryptedWallet', [
      'setWallet'
    ]),
    previous () {
      this.$router.go(-1)
    },
    createWallet () {
      let tempWallet = new this.$LogosWallet({
        password: this.password,
        seed: this.seed,
        mqtt: false,
        rpc: false
      })
      let encryptedWallet = tempWallet.encrypt()
      this.setWallet(encryptedWallet)
      if (this.validated) {
        this.$Wallet.setPassword(this.password)
        this.$Wallet.load(encryptedWallet).then((val) => {
          this.$router.push({ path: '/wallet/dashboard' })
        })
      } else {
        this.$router.push({ name: 'exportSeed' })
      }
    },
    changePasswordVisibility () {
      this.showPassword = !this.showPassword
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    },
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
    background: $input-bg
  }
  .eyeButton {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    height: 48px;
    width: 59px;
    background: $input-bg;
    border: 1px solid $input-border-color;
  }
  .eyeButton > .btn-link:hover > .icon {
    opacity: 0.5;
  }
</style>
