<template>
  <div>
    <b-container class="h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div
          id="jumbotron"
          class="p-3"
        >
          <h4
            v-t="'thankyou'"
            class="mb-3"
          />
          <div class="text-left">
            <label
              v-t="'language'"
              for="selectLang"
            />
            <b-form-select
              id="selectLang"
              v-model="$i18n.locale"
              :options="languages"
              @change="setLang"
            />
          </div>
        </div>
      </div>
    </b-container>
    <b-row class="fixed-row-bottom">
      <b-col class="p-0 w-100">
        <b-button-group
          class="w-100"
          size="lg"
        >
          <b-button
            v-t="'continue'"
            class="w-100"
            variant="primary"
            @click="generateSeedPage()"
          />
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LocaleChanger',
  computed: {
    ...mapState('Language', {
      languages: state => state.languages,
      selectedLanguageCode: state => state.selectedLanguageCode
    })
  },
  methods: {
    ...mapActions('Language', [
      'changeLanguage'
    ]),
    setLang (code) {
      this.changeLanguage(code)
    },
    generateSeedPage () {
      this.$router.push({ path: '/onboarding/seed' })
    }
  }
}
</script>

<style scoped lang="scss">
  #jumbotron {
    max-width:450px;
    width:100vw;
  }
</style>
