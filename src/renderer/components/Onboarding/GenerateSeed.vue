<template>
  <div>
    <div class="row h-100 justify-content-center align-items-center">
      <div class="panel table text-base">
        <div class="plan">
          <div class="circle">
            <font-awesome-icon
              size="6x"
              class="icon"
              :icon="['fal','file-import']"
            />
          </div>
          <h5 v-t="'haveaseed'" />
          <b-button
            v-t="'importseed'"
            class="mt-3"
            size="lg"
            variant="outline-primary"
            @click="importSeedPage()"
          />
        </div>
        <div class="plan">
          <div class="circle">
            <font-awesome-icon
              size="6x"
              class="icon"
              :icon="['fal','chart-network']"
            />
          </div>
          <h5 v-t="'needaseed'" />
          <b-button
            v-t="'generateseed'"
            class="mt-3"
            size="lg"
            variant="primary"
            @click="encryptSeedPage()"
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
  name: 'GenerateSeed',
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    })
  },
  methods: {
    ...mapActions('Onboarding', [
      'setSeed'
    ]),
    ...mapActions('EncryptedWallet', [
      'setValidated',
      'setWallet'
    ]),
    encryptSeedPage () {
      let wallet = new this.$LogosWallet({ mqtt: false, rpc: false })
      let seed = wallet.seed
      this.setSeed(seed)
      this.setValidated(false)
      this.setWallet(null)
      this.$router.push({ name: 'encryptSeed' })
    },
    importSeedPage () {
      this.setSeed(null)
      this.setValidated(false)
      this.setWallet(null)
      this.$router.push({ name: 'importSeed' })
    },
    previous () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
  .panel {
    border-radius: 10px;
    padding: 15px 25px;
    position: relative;
    width: 100%;
    z-index: 10;
  }
  .icon {
    color: theme-color("primary");
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    background: theme-color("base");
    border-radius: 50%;
    margin: auto;
    margin-bottom: 25px;
    max-width: 100%;
  }

  .table {
    display: flex;
    flex-direction: row;
  }

  .table * {
    text-align: center;
  }

  .plan {
    border-bottom: none;
    border-right: 1px solid theme-color("base");
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }
</style>
