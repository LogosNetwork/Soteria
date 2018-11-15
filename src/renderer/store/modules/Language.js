const state = {
  languages: ['en'],
  selectedLanguage: null
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
  state,
  mutations,
  actions
}
