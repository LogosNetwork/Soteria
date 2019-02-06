<template>
  <div class="mh-100">
    <b-container>
      <h4 class="mt-3" v-t="'writedownyourseed'"></h4>
      <div>
        <small v-t="'whywrite'"></small>
      </div>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="panel table">
          <div class="card bg-secondary">
            <ol>
              <li class="seedRow" v-for="row in splitSeed" :key="row+'row'">
                <span v-for="seedItem in row" :key="seedItem+'column'">
                  {{seedItem}}
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </b-container>
    <b-row class="fixed-row-bottom d-print-none">
      <b-col class="p-0 w-100">
        <b-button-group class="w-100" size="lg">
          <b-button class="w-50" variant="secondary" v-t="'previous'"  v-on:click="previous()"></b-button>
          <b-button class="w-50" variant="primary" v-t="'validate'"  v-on:click="validateSeed()"></b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    }
  },
  methods: {
    previous () {
      this.$router.go(-1)
    },
    validateSeed () {
      this.$router.push({ name: 'insertSeed' })
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
  ol {
    margin-top: 1rem;
    padding-right: 2.5rem;
  }
  li {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  .mh-100 {
    max-height: 100%;
  }
</style>
