const state = {
  tokenFilter: null,
  showFilter: false
}

const getters = {

}

const mutations = {
  setTokenFilter (state, tokenFilter) {
    state.tokenFilter = tokenFilter
  },
  setShowFilter (state, bool) {
    state.showFilter = bool
  }
}

const actions = {
  setTokenFilter ({ commit }, tokenFilter) {
    commit('setTokenFilter', tokenFilter)
  },
  setShowFilter ({ commit, state }, bool = null) {
    if (bool === null) bool = !state.showFilter
    commit('setShowFilter', bool)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
