const state = {
  seed: null
}

const getters = {

}

const mutations = {
  setSeed (state, seed) {
    state.seed = seed
  }
}

const actions = {
  setSeed ({ commit }, seed) {
    commit('setSeed', seed)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
