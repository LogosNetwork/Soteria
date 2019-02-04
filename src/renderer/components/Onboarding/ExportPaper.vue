<template>
  <div class="mh-100">
    <b-container>
      <div class="header mt-3 mb-1">
        <font-awesome-icon class="icon" size="5x" :icon="['fal','lambda']" />
        <h1 v-t="'logosnetwork'"></h1>
      </div>
      <h4 class="mt-3" v-t="'writedownyourseed'"></h4>
      <div>
        <small v-t="'whywrite'"></small>
      </div>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="panel table">
          <div class="card bg-secondary">
            <ol v-bind:class="mnemonicBorder" class="mnemonicList">
              <li v-for="item in mnemonic" :key="item">
                <span v-bind:class="mnemonicItem">{{ item }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <b-button-group class="w-100 justify-content-center align-items-center d-print-none" size="sm">
        <b-button v-b-modal.seedModal variant="link" class="btn-sm mb-3" v-t="'showSeed'"></b-button>
        <b-modal id="seedModal" ref="showSeed" :title="$t('writedownyourseed')">
          <ol>
            <li class="seedRow" v-for="row in splitSeed" :key="row+'row'">
              <span v-for="seedItem in row" :key="seedItem+'column'">
                {{seedItem}}
              </span>
            </li>
          </ol>
        </b-modal>
        <b-button v-on:click="printTemplate()" variant="link" class="btn-sm mb-3 " v-t="'printTemplate'"></b-button>
        <b-button v-b-tooltip.hover :title="$t('printWarning')" v-on:click="print()" variant="link" class="btn-sm mb-3" v-t="'printMnemonic'"></b-button>
      </b-button-group>
    </b-container>
    <b-row class="fixed-row-bottom d-print-none">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-50" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
          <b-button class="w-50" variant="primary" v-t="'validate'"  v-on:click="validateMnemonic()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bip39 from 'bip39'
import { remote } from 'electron'

export default {
  name: 'export-paper',
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    splitSeed () {
      let vals = []
      let mySeedSplit = this.seed.match(/.{1,16}/g)
      for (let val of mySeedSplit) {
        vals.push(val.match(/.{1,4}/g))
      }
      return vals
    },
    mnemonic () {
      return bip39.entropyToMnemonic(this.seed).split(' ')
    },
    mnemonicItem () {
      if (this.isPrintingTemplate === true) return 'mnemonicItem'
      return ''
    },
    mnemonicBorder () {
      if (this.isPrintingTemplate === true) return 'mnemonicBorder'
      return ''
    }
  },
  methods: {
    previous () {
      this.$router.go(-1)
    },
    validateMnemonic () {
      this.$router.push({ name: 'insertMnemonic' })
    },
    print () {
      const contents = remote.webContents.getFocusedWebContents()
      this.isPrintingTemplate = false
      contents.print()
    },
    printTemplate () {
      const contents = remote.webContents.getFocusedWebContents()
      this.isPrintingTemplate = true
      contents.print()
    }
  },
  data () {
    return {
      isPrintingTemplate: false
    }
  }
}
</script>

<style scoped lang="scss">
  @media print {
    .mnemonicBorder > li {
      border-bottom: 1px solid #000;
    }
    .mnemonicItem {
      display: none;
    }
    .header {
      display: block !important;
      padding-bottom: 3rem;
    }
    .header > .icon {
      color: var(--primary) !important;
    }
    .header > h1 {
      position: relative;
      top: -2rem;
      display: inline-block;
      padding-left: 1rem;
    }
    .container {
      position: absolute;
      font-size: 1.5rem;
      top: 0px;
      left: 0px;
      height: 100% !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 3rem !important;
      color: #000 !important;
    }
    ol.mnemonicList {
      -moz-column-count: 2 !important;
      -webkit-column-count: 2 !important;
      column-count: 2 !important;
      -moz-column-gap: 8rem !important;
      -webkit-column-gap: 8rem !important;
      column-gap: 8rem !important;
    }
    #app {
      background: var(--white) !important;
    }
    .bg-secondary {
      background: var(--white) !important;
      border: 0px solid #000;
    }
  }
  .header {
    display: none;
  }
  ol.mnemonicList {
    -moz-column-count: 2;
    -moz-column-gap: 4rem;
    -webkit-column-count: 2;
    -webkit-column-gap: 4rem;
    column-count: 2;
    column-gap: 4rem;
    padding-top: 1rem;
    padding-right: 1rem;
  }
  @media (min-width: 768px) {
    ol.mnemonicList {
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
    }
  }
  li {
    margin-bottom: 1rem;
  }
  .mh-100 {
    max-height: 100%;
  }
</style>
