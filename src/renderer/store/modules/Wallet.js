const state = {
  tokenFilter: null,
  showFilter: false,
  activeAddress: null
}

const getters = {

}

const mutations = {
  setTokenFilter (state, tokenFilter) {
    state.tokenFilter = tokenFilter
  },
  setShowFilter (state, bool) {
    state.showFilter = bool
  },
  setActiveAddress (state, address) {
    state.activeAddress = address
  }
}

const actions = {
  setTokenFilter ({ commit }, tokenFilter) {
    commit('setTokenFilter', tokenFilter)
  },
  setShowFilter ({ commit, state }, bool = null) {
    if (bool === null) bool = !state.showFilter
    commit('setShowFilter', bool)
  },
  setActiveAddress ({ commit }, address) {
    commit('setActiveAddress', address)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
