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
          :icon="['fal','file-import']"
        />
        <h4
          v-t="'importvault'"
          class="mb-3"
        />
        <div class="form-group text-left">
          <b-form-file
            ref="fileinput"
            v-model="seedVault"
            accept=".lgsx"
            :placeholder="$t('chooseyourseedvault')"
          />
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
            class="w-100"
            variant="secondary"
            @click="previous()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'InsertVault',
  data () {
    return {
      seedVault: null
    }
  },
  computed: {
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet
    })
  },
  watch: {
    seedVault: function (newVault, oldVault) {
      if (newVault !== null) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = reader.result
          this.setWallet(text)
          this.$router.push({ path: '/locked' })
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
      'setWallet'
    ]),
    previous () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  #passwordDecrypt {
    max-width:450px;
    width:100vw;
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
