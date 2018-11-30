<template>
  <b-container class="h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div id="jumbotron">
        <h4 v-t="'thankyou'" class="mb-3"></h4>
        <div class="text-left">
          <label for="selectLang" v-t="'language'"></label>
          <b-form-select id="selectLang" v-model="$i18n.locale" :options="languages" @change="setLang"/>
        </div>
      </div>
    </div>

  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'locale-changer',
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
    }
  }
}
</script>

<style scoped lang="scss">
  #jumbotron {
    width:450px;
  }
</style>
