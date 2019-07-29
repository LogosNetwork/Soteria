<template>
  <div class="mh-100">
    <b-container>
      <div class="header mt-3 mb-1">
        <font-awesome-icon
          class="icon"
          size="5x"
          :icon="['fal','lambda']"
        />
        <h1 v-t="'logosnetwork'" />
      </div>
      <h4
        v-t="'writedownyourseed'"
        class="mt-3"
      />
      <div>
        <small v-t="'whywrite'" />
      </div>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="panel table text-base">
          <div class="card bg-secondary">
            <ol
              :class="mnemonicBorder"
              class="mnemonicList"
            >
              <li
                v-for="(item, index) in mnemonic"
                :key="item+'_'+index"
              >
                <span :class="mnemonicItem">{{ item }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <b-button-group
        class="w-100 justify-content-center align-items-center d-print-none"
        size="sm"
      >
        <b-button
          v-b-modal.seedModal
          v-t="'showSeed'"
          variant="link"
          class="btn-sm mb-3"
        />
        <b-modal
          id="seedModal"
          ref="showSeed"
          :title="$t('writedownyourseed')"
        >
          <ol>
            <li
              v-for="row in splitSeed"
              :key="row+'row'"
              class="seedRow"
            >
              <span
                v-for="seedItem in row"
                :key="seedItem+'column'"
              >
                {{ seedItem }}
              </span>
            </li>
          </ol>
        </b-modal>
        <b-button
          v-t="'printTemplate'"
          variant="link"
          class="btn-sm mb-3 "
          @click="printTemplate()"
        />
        <b-button
          v-b-tooltip.hover
          v-t="'printMnemonic'"
          :title="$t('printWarning')"
          variant="link"
          class="btn-sm mb-3"
          @click="print()"
        />
      </b-button-group>
    </b-container>
    <b-row class="fixed-row-bottom d-print-none">
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
import Vue from 'vue'
import { mapState } from 'vuex'
import bip39 from 'bip39'

export default {
  name: 'ExportPaper',
  data () {
    return {
      isPrintingTemplate: false
    }
  },
  computed: {
    ...mapState('Onboarding', {
      seed: state => state.seed
    }),
    splitSeed () {
      const vals = []
      const mySeedSplit = this.seed.match(/.{1,16}/g)
      for (const val of mySeedSplit) {
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
      this.isPrintingTemplate = false
      if (global && global.remote) {
        const contents = global.remote.webContents.getFocusedWebContents()
        contents.print()
      } else if (window) {
        Vue.nextTick(() => {
          window.print()
        })
      }
    },
    printTemplate () {
      this.isPrintingTemplate = true
      if (global && global.remote) {
        const contents = global.remote.webContents.getFocusedWebContents()
        contents.print()
      } else if (window) {
        Vue.nextTick(() => {
          window.print()
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @media print {
    .mnemonicBorder > li {
      border-bottom: 1px solid $black;
    }
    .mnemonicItem {
      display: none;
    }
    .header {
      display: block !important;
      padding-bottom: 3rem;
    }
    .header > .icon {
      color: theme-color("primary") !important;
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
      color: $black !important;
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
      background: theme-color("base") !important;
    }
    .bg-secondary {
      background: theme-color("base") !important;
      border: 0px solid $black;
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
