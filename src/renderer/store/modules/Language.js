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
  selectedLanguageCode: null
}

const getters = {

}

const mutations = {
  setSelectedLanguageCode (state, code) {
    state.selectedLanguageCode = code
  }
}

const actions = {
  changeLanguage ({commit}, code) {
    commit('setSelectedLanguageCode', code)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
