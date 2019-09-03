const state = {
  operatingSystem: null
}

const getters = {

}

const mutations = {
  setOperatingSystem (state, os) {
    state.operatingSystem = os
  }
}

const actions = {
  setOperatingSystem ({ commit }, os) {
    commit('setOperatingSystem', os)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
