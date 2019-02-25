const state = {
  wallet: null
}

const getters = {

}

const mutations = {
  setWallet (state, wallet) {
    state.wallet = wallet
  }
}

const actions = {
  setWallet ({ commit }, wallet) {
    commit('setWallet', wallet)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
