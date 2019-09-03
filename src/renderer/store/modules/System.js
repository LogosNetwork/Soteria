const state = {
  operatingSystem: null,
  hasDocker: false
}

const getters = {

}

const mutations = {
  setOperatingSystem (state, os) {
    state.operatingSystem = os
  },
  setHasDocker (state, bool) {
    state.hasDocker = bool
  }
}

const actions = {
  setOperatingSystem ({ commit }, os) {
    commit('setOperatingSystem', os)
  },
  setHasDocker ({ commit }, bool) {
    commit('setHasDocker', bool)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
