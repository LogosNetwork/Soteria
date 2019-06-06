<template>
  <div class="mh-100">
    <b-container>
      <h4
        v-t="'insertMnemonic'"
        class="mt-3"
      />
      <small v-t="'twentyFourWords'" />
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="panel table bg-secondary">
          <b-input
            v-for="(item, index) in phraseList"
            :key="index"
            v-model="phraseList[index]"
            :state="validMnemonic"
            class="mnemonicInput"
            :placeholder="(index+1).toString()"
          />
        </div>
      </div>
      <b-button-group
        class="w-100 justify-content-center align-items-center"
        size="sm"
      >
        <b-button
          v-t="'typeSeed'"
          variant="link"
          class="btn-sm mb-3"
          @click="insertSeed()"
        />
      </b-button-group>
    </b-container>
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
            :disabled="!validMnemonic"
            class="w-50"
            variant="primary"
            @click="validateMnemonic()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import bip39 from 'bip39'

export default {
  name: 'ExportPaper',
  data () {
    return {
      phraseList: new Array(24)
    }
  },
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet
    }),
    validMnemonic () {
      for (let i = 0; i < this.phraseList.length; i++) {
        if (!this.phraseList[i] || this.phraseList[i].length === 0) return null
      }
      if (bip39.validateMnemonic(this.phraseList.join(' '))) {
        let seed = bip39.mnemonicToEntropy(this.phraseList.join(' ')).toUpperCase()
        return (this.seed === null || this.seed === seed)
      } else {
        return null
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
    validateMnemonic () {
      if (bip39.validateMnemonic(this.phraseList.join(' '))) {
        let seed = bip39.mnemonicToEntropy(this.phraseList.join(' ')).toUpperCase()
        if (this.seed === null) {
          this.setValidated(true)
          this.setSeed(seed)
          this.$router.push({ name: 'encryptSeed' })
        } else if (seed === this.seed) {
          this.setValidated(true)
          this.$router.push({ name: 'locked' })
        }
      }
    },
    insertSeed () {
      this.$router.push({ name: 'insertSeed' })
    }
  }
}
</script>

<style scoped lang="scss">
  .validation {
    width: 100vw;
  }
  .mnemonicInput {
    border: 1px solid rgba($black, .125);
    max-width: 100px;
    margin: 1rem;
    display: inline-flex;
  }
  ul {
    list-style: none;
  }
  li {
    margin-bottom: 1rem;
  }
  .mh-100 {
    max-height: 100%;
  }
</style>
