<template>
  <div class="mh-100">
    <b-container>
      <h4 v-t="'insertMnemonic'"></h4>
      <small v-t="'twentyFourWords'"></small>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="panel table bg-secondary">
          <b-input v-for="(item, index) in phraseList" :state="validMnemonic" v-model="phraseList[index]" :key="index" class="mnemonicInput card" :placeholder="(index+1).toString()"></b-input>
        </div>
      </div>
    </b-container>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-50" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
          <b-button :disabled="!validMnemonic" class="w-50" variant="primary" v-t="'validate'"  v-on:click="validateMnemonic()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bip39 from 'bip39'

export default {
  name: 'export-paper',
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    validMnemonic () {
      for (let i = 0; i < this.phraseList.length; i++) {
        if (!this.phraseList[i] || this.phraseList[i].length === 0) return null
      }
      return bip39.validateMnemonic(this.phraseList.join(' '))
    }
  },
  methods: {
    previous () {
      this.$router.go(-1)
    },
    validateMnemonic () {
      if (bip39.validateMnemonic(this.phraseList.join(' '))) {
        // Create Wallet based on seed
      }
    }
  },
  data () {
    return {
      phraseList: new Array(24)
    }
  }
}
</script>

<style scoped lang="scss">
  .validation {
    width: 100vw;
  }
  .mnemonicInput {
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
