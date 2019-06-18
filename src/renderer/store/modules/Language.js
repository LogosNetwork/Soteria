const state = {
  languages: [
    {
      value: 'en',
      text: 'English (International)'
    },
    {
      value: 'ru',
      text: 'Pусский - Russian'
    },
    {
      value: 'zh',
      text: '中文 - Chinese (Simplified)'
    }
  ],
  selectedLanguageCode: 'en'
}

const getters = {

}

const mutations = {
  setSelectedLanguageCode (state, code) {
    state.selectedLanguageCode = code
  }
}

const actions = {
  changeLanguage ({ commit }, code) {
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
