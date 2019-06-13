const state = {
  tokenFilter: null,
  showFilter: false,
  activeAddress: null,
  synced: false
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
  },
  setSynced (state, synced) {
    state.synced = synced
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
  },
  setSynced ({ commit }, synced) {
    commit('setSynced', synced)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
