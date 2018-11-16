const state = {
  languages: [
    {
      value: 'en',
      text: 'English (International)'
    },
    {
      value: 'ru',
      text: 'Pусский - Russian'
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
  setLanguage ({commit}, langIndex) {
    commit('setSelectedLanguage', langIndex)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
