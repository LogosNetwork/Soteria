<template>
  <div class="export">
    <h4
      v-t="'storeseed'"
      class="mt-3"
    />
    <div>
      <small v-t="'whystore'" />
    </div>
    <div class="row mt-3 justify-content-center align-items-center">
      <div class="panel table text-base">
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon
                size="3x"
                class="icon"
                :icon="['fal','pencil']"
              />
            </div>
            <div class="card-body">
              <h5
                v-t="'writedownyourseed'"
                class="card-title"
              />
              <b-button
                v-t="'continue'"
                class="btn mt-3 btn-lg"
                variant="primary"
                @click="writeSeed()"
              />
            </div>
          </div>
        </div>
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <font-awesome-icon
                size="3x"
                class="icon"
                :icon="['fal','lock-alt']"
              />
            </div>
            <div class="card-body">
              <h5
                v-t="'exportlogosvault'"
                class="card-title"
              />
              <b-button
                v-t="'continue'"
                class="btn mt-3 btn-lg"
                variant="primary"
                @click="saveVault()"
              />
            </div>
          </div>
        </div>
        <div class="plan">
          <div class="card bg-secondary">
            <div class="mt-3 mb-0 card-img-top circle">
              <span style="font-size:2.2em">Abc</span>
            </div>
            <div class="card-body">
              <h5
                v-t="'importMnemonic'"
                class="card-title"
              />
              <b-button
                v-t="'continue'"
                class="btn mt-3 btn-lg"
                variant="primary"
                @click="mnemonic()"
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
import { mapState } from 'vuex'

export default {
  name: 'ExportSeed',
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
        if (global && global.remote && global.writeFileSync) {
          const now = new Date()
          const prefix = 'SeedVault'
          global.remote.dialog.showSaveDialog(global.remote.getCurrentWindow(), {
            title: 'Export keyfile',
            defaultPath: `Logos${prefix}-${now
              .toISOString()
              .slice(0, 16)
              .replace(/[-:]/g, '')
              .replace('T', '-')}.lgsx`,
            buttonLabel: 'Export',
            filters: [{ name: 'SeedVault File', extensions: ['lgsx'] }]
          }).then((result) => {
            if (!result.filePath) {
              throw Error('Export cancelled')
            }
            global.writeFileSync(result.filePath, Buffer.from(this.wallet))
            this.$router.push({ name: 'locked' })
          })
        } else {
          const now = new Date()
          const prefix = 'SeedVault'
          const defaultPath = `Logos${prefix}-${now
            .toISOString()
            .slice(0, 16)
            .replace(/[-:]/g, '')
            .replace('T', '-')}.lgsx`
          const url = window.URL.createObjectURL(new Blob([this.wallet]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', defaultPath)
          document.body.appendChild(link)
          link.click()
          link.remove()
          this.$router.push({ name: 'locked' })
          return false
        }
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
    z-index: 2;
  }
  .export {
    width: 100%;
    max-width: 100vw
  }
  .icon {
    color: theme-color("base");
    max-width: 50%;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    background: theme-color("bg");
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
    border-right: 1px solid theme-color("base");
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .plan:last-child {
    border-right: none;
  }
</style>
