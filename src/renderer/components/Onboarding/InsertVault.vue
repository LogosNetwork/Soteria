<template>
  <div class="decrypt-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div
        id="passwordDecrypt"
        class="p-3"
      >
        <font-awesome-icon
          size="4x"
          class="icon mb-3"
          :icon="['fal','key']"
        />
        <h4
          v-t="'importvault'"
          class="mb-3"
        />
        <div class="form-group text-left">
          <div v-show="!validFile">
            <b-form-file
              ref="fileinput"
              v-model="seedVault"
              accept=".lgsx"
              :placeholder="$t('chooseyourseedvault')"
            />
          </div>
          <div v-if="validFile">
            <label
              v-t="'unlockSeedVault'"
              for="pwd"
            />
            <div class="input-group input-group-lg">
              <form
                id="unlockWalletForm"
                @submit.stop.prevent="unlockWallet()"
              >
                <div class="input-group input-group-lg">
                  <b-form-input
                    id="pwd"
                    v-model="password"
                    :type="inputType"
                    :placeholder="$t('password').toLowerCase()"
                    required
                  />
                  <div class="input-group-append eyeButton">
                    <b-button
                      v-b-tooltip.hover
                      :title="$t('togglePasswordVisibility')"
                      :pressed="showPassword"
                      variant="link"
                      class="btn btn-default btn-sm"
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
                  v-if="error"
                  id="error"
                  class="form-text text-danger"
                >{{ error }}</small>
              </form>
            </div>
            <div>
              <b-button
                v-t="'selectDifferent'"
                variant="link"
                class="btn-sm"
                style="padding-left:0px"
                @click="clearFiles()"
              />
            </div>
          </div>
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
            v-t="'unlockwallet'"
            :disabled="!validFile || password === null"
            class="w-50"
            variant="primary"
            @click="unlockWallet()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LogosWallet from '../../api/wallet'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
Vue.use(LogosWallet)

export default {
  name: 'InsertVault',
  data () {
    return {
      error: null,
      password: null,
      showPassword: false,
      deleteText: null,
      seedVault: null,
      inputType: 'password'
    }
  },
  computed: {
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet,
      validated: state => state.validated
    }),
    validFile () {
      if (this.seedVault === null) return null
      return Boolean(this.seedVault)
    }
  },
  watch: {
    seedVault: function (newVault, oldVault) {
      if (newVault !== null) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = reader.result
          this.setWallet(text)
        }
        reader.readAsText(newVault)
      }
    }
  },
  methods: {
    ...mapActions('Onboarding', [
      'setSeed'
    ]),
    ...mapActions('EncryptedWallet', [
      'setValidated',
      'setWallet'
    ]),
    previous () {
      this.$router.go(-1)
    },
    clearFiles () {
      this.seedVault = null
      this.$refs.fileinput.reset()
    },
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
    changePasswordVisibility () {
      this.showPassword = !this.showPassword
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
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
    width: 59px;
    border: 1px solid #2E3136;
    background: rgba(220, 221, 222, 0.05);
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
</style>
