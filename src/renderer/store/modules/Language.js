const state = {
  languages: [
    {
      code: 'en',
      name: 'English (International)'
    },
    {
      code: 'ru',
      name: 'Pусский - Russian'
    }
  ],
  selectedLanguage: null
}

const getters = {

}

const mutations = {
  setSelectedLanguage (state, lang) {
    state.selectedLanguage = lang
  }
}

const actions = {
  setLanguage ({state, commit}, lang) {
    if (state.languages.indexOf(lang) !== -1) {
      commit('setSelectedLanguage', lang)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
