import Vue from 'vue'

const state = {
  tokenFilter: null,
  showFilter: false,
  activeAddress: null,
  contacts: [],
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
  },
  setContacts (state, contacts) {
    state.contacts = contacts
  },
  addContact (state, contact) {
    let index = state.contacts.findIndex(existingContact => existingContact.address === contact.address)
    if (index !== -1) {
      Vue.$set(state.contacts, index, contact)
    } else {
      state.contacts.push(contact)
    }
  },
  removeContact (state, address) {
    state.contacts = state.contacts.filter(contact => contact.address !== address)
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
  },
  setContacts ({ commit }, contacts) {
    commit('setContacts', contacts)
  },
  addContact ({ commit }, contact) {
    commit('addContact', contact)
  },
  removeContact ({ commit }, address) {
    commit('removeContract', address)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
