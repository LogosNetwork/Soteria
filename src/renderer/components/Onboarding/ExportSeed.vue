<template>
  <div class="export">
    <h4 class="mt-3" v-t="'storeseed'"></h4>
    <div>
      <small v-t="'whystore'"></small>
    </div>
    <div class="row mt-3 justify-content-center align-items-center">
      <div class="panel table text-base">
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon size="3x" class="icon" :icon="['fal','pencil']" />
            </div>
            <div class="card-body">
              <h5 class="card-title" v-t="'writedownyourseed'"></h5>
              <b-button class="btn mt-3 btn-lg" variant="primary" v-t="'continue'" v-on:click="writeSeed()"></b-button>
            </div>
          </div>
        </div>
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon size="3x" class="icon" :icon="['fal','lock-alt']" />
            </div>
            <div class="card-body">
              <h5 class="card-title" v-t="'exportlogosvault'"></h5>
              <b-button class="btn mt-3 btn-lg" variant="primary" v-t="'continue'" v-on:click="saveVault()"></b-button>
            </div>
          </div>
        </div>
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <span style="font-size:2.2em">Abc</span>
            </div>
            <div class="card-body">
              <h5 class="card-title" v-t="'importMnemonic'"></h5>
              <b-button class="btn mt-3 btn-lg" variant="primary" v-t="'continue'" v-on:click="mnemonic()"></b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-100" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { remote } from 'electron'
import fs from 'fs'

export default {
  name: 'export-seed',
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    ...mapState('EncryptedWallet', {
      wallet: state => state.wallet
    })
  },
  methods: {
    saveVault () {
      try {
        const now = new Date()
        let prefix = 'SeedVault'
        const path = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
          title: 'Export keyfile',
          defaultPath: `Logos${prefix}-${now
            .toISOString()
            .slice(0, 16)
            .replace(/[-:]/g, '')
            .replace('T', '-')}.lgsx`,
          buttonLabel: 'Export',
          filters: [{ name: 'SeedVault File', extensions: ['lgsx'] }]
        })

        if (!path) {
          throw Error('Export cancelled')
        }

        fs.writeFileSync(path, Buffer.from(this.wallet))
        this.$router.push({ name: 'locked' })
        return false
      } catch (error) {
        return error.message
      }
    },
    writeSeed () {
      this.$router.push({ name: 'exportPlaintext' })
    },
    mnemonic () {
      this.$router.push({ name: 'exportPaper' })
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
    padding: 1rem 2rem;
    position: relative;
    width: 100%;
    z-index: 10;
  }
  .export {
    width: 100%;
    max-width: 100vw
  }
  .icon {
    color: var(--base);
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    background: var(--bg);
    border-radius: 50%;
    margin: auto;
    margin-bottom: 25px;
    max-width: 100%;
  }

  .table {
    display: flex;
    flex-direction: row;
  }

  .plan {
    border-bottom: none;
    border-right: 1px solid #e1f1ff;
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }

  .header {
    color: #888;
    font-weight: 600;
    letter-spacing: 1px;
  }
</style>
