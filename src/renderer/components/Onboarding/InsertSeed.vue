<template>
  <div class="decrypt-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div id="passwordDecrypt" class="p-3">
        <h4 v-t="'validateYourSeed'"></h4>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'decrypt-wallet',
  methods: {
    ...mapActions('EncryptedWallet', [
      'setValidated'
    ]),
    ...mapActions('Onboarding', [
      'setSeed'
    ]),
    previous () {
      this.$router.go(-1)
    },
    verify () {
      if (this.seed === null && (/[0-9A-F]{64}/i).test(this.insertedSeed)) {
        this.setValidated(true)
        this.setSeed(this.insertedSeed.toUpperCase())
        this.$router.push({ name: 'encryptSeed' })
      } else if (this.seed === this.insertedSeed.toUpperCase()) {
        this.setValidated(true)
        if (this.wallet) {
          this.$router.push({ name: 'locked' })
        } else {
          this.$router.push({ name: 'encryptSeed' })
        }
      }
    }
  },
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet
    }),
    seedMatch () {
      if (this.seed === null) {
        if (this.insertedSeed && this.insertedSeed.length === 64) {
          return (/[0-9a-f]+/i).test(this.insertedSeed)
        }
        return null
      } else {
        if (!this.insertedSeed || this.insertedSeed.length === 0) return null
        return this.seed === this.insertedSeed.toUpperCase()
      }
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
