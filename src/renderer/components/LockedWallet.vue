<template>
  <div>
    <div class="header mt-3 mb-1">
      <font-awesome-icon
        class="icon"
        size="lg"
        :icon="['fal','lambda']"
      />
      <span v-t="'logosnetwork'" />
    </div>
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
            v-t="'unlockwallet'"
            class="mb-3"
          />
          <div class="form-group text-left">
            <label
              v-t="'password'"
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
                v-b-modal.clearWalletModal
                v-t="'forgotPassword'"
                variant="link"
                class="btn-sm text-white"
                style="padding-left:0px"
              />
              <b-modal
                id="clearWalletModal"
                ref="clearWallet"
                :title="$t('areyousure')"
                :ok-title="$t('delete.keyword')"
                :ok-variant="'danger'"
                @ok="handleOk"
              >
                <p
                  v-t="'forgotPasswordWarning'"
                />
                <form @submit.stop.prevent="handleSubmit">
                  <b-form-input
                    v-model="deleteText"
                    class="mt-3 mb-3"
                    type="text"
                    :placeholder="$t('delete.placeholder')"
                    :state="validateDeleteKeyword"
                  />
                </form>
              </b-modal>
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
              v-t="'unlockwallet'"
              class="w-100"
              variant="primary"
              @click="unlockWallet()"
            />
          </b-button-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DecryptWallet',
  data () {
    return {
      error: null,
      password: 'thisisagoodpassword', // TODO Remove this for prod
      showPassword: false,
      deleteText: null,
      inputType: 'password'
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
  methods: {
    ...mapActions('Onboarding', [
      'setSeed'
    ]),
    ...mapActions('EncryptedWallet', [
      'setValidated'
    ]),
    unlockWallet () {
      this.error = null
      this.$Wallet.password = this.password
      try {
        this.$Wallet.load(this.wallet)
        this.setValidated(true)
        this.setSeed(null)
        this.$Wallet.ResetWalletReactivity()
        this.$Wallet.ConfigureSoteria().then((res) => {
          this.$router.push({ path: '/wallet/dashboard' })
        })
      } catch (err) {
        this.error = 'Invalid Password'
      }
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
    background: $input-bg;
    border: 1px solid $input-border-color;
    border-left: none;
  }
  .eyeButton > .btn-link {
    color: theme-color("base");
  }
  .eyeButton > .btn-link:hover > .icon {
    color: theme-color("base");
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
    color: theme-color("primary");
  }
</style>
