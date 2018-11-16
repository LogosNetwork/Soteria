<template>
  <b-container>
    <div class="mt-5">
      <h1 v-t="'logosnetwork'" class="mb-2"></h1>
      <div class="text-left">
        <label for="selectLang" v-t="'language'"></label>
        <b-form-select id="selectLang" v-model="$i18n.locale" :options="languages" @change="setLang"/>
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
      selectedLanguage: state => state.selectedLanguage
    })
  },
  created: function () {
    if (this.selectedLanguage === null) {
      this.setLanguage('en')
    }
  },
  methods: {
    ...mapActions('Language', [
      'setLanguage'
    ]),
    setLang (code) {
      this.setLanguage(code)
    }
  }
}
</script>
