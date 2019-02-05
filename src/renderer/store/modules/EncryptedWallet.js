const state = {
  wallet: null,
  validated: false
}

const getters = {

}

const mutations = {
  setWallet (state, encryptedWalletData) {
    state.wallet = encryptedWalletData
  },
  setValidated (state, validated) {
    state.validated = validated
  }
}

const actions = {
  setWallet ({ commit }, encryptedWalletData) {
    commit('setWallet', encryptedWalletData)
  },
  setValidated ({ commit }, validated) {
    commit('setValidated', validated)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
