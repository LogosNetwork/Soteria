<template>
  <div class="decrypt-container">
    <div class="row h-100 justify-content-center align-items-center">
      <div
        id="passwordDecrypt"
        class="p-3"
      >
        <h4 v-t="'validateYourSeed'" />
        <div class="form-group text-left">
          <label
            v-t="'seed'"
            for="seed"
          />
          <div class="input-group input-group-lg">
            <form
              id="validateSeedForm"
              @submit.stop.prevent="verify()"
            >
              <div class="input-group input-group-lg">
                <b-form-input
                  id="seed"
                  v-model="insertedSeed"
                  type="text"
                  :state="seedMatch"
                  :placeholder="$t('seed').toLowerCase()"
                  onpaste="return false;"
                  required
                />
              </div>
            </form>
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
            v-t="'validate'"
            :disabled="!seedMatch"
            class="w-50"
            variant="primary"
            @click="verify()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DecryptWallet',
  data () {
    return {
      insertedSeed: null
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
