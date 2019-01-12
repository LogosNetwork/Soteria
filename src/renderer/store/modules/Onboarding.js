const state = {
  wallet: null,
  seed: null
}

const getters = {

}

const mutations = {
  setWallet (state, encryptedWalletData) {
    state.wallet = encryptedWalletData
  },
  setSeed (state, seed) {
    state.seed = seed
  }
}

const actions = {
  setWallet ({ commit }, encryptedWalletData) {
    commit('setWallet', encryptedWalletData)
  },
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
