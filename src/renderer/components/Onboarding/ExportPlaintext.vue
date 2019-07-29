<template>
  <div class="mh-100">
    <b-container>
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
          </div>
        </div>
      </div>
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
            @click="validateSeed()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    }
  },
  methods: {
    previous () {
      this.$router.go(-1)
    },
    validateSeed () {
      this.$router.push({ name: 'insertSeed' })
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
