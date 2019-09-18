const state = {
  seed: null,
  nodeOptions: null
}

const getters = {

}

const mutations = {
  setSeed (state, seed) {
    state.seed = seed
  },
  setNodeOptions (state, options) {
    state.nodeOptions = options
  }
}

const actions = {
  setSeed ({ commit }, seed) {
    commit('setSeed', seed)
  },
  setNodeOptions ({ commit }, options) {
    commit('setNodeOptions', options)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
