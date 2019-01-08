const state = {
  wallet: null
}

const getters = {

}

const mutations = {
  setWallet (state, encryptedWalletData) {
    state.wallet = encryptedWalletData
  }
}

const actions = {
  setWallet ({ commit }, encryptedWalletData) {
    commit('setWallet', encryptedWalletData)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
