import Vue from 'vue'

const state = {
  favorites: {
    logos: {
      tokenID: 'logos'
    }
  },
  tokenFilter: null,
  activeAddress: null,
  contacts: [],
  synced: false
}

const getters = {

}

const mutations = {
  addFavorite (state, tokenID) {
    const favorite = { tokenID }
    if (tokenID !== 'logos') favorite.tokenAddress = Vue.$Utils.keyFromAccount(tokenID)
    Vue.set(state.favorites, tokenID, favorite)
  },
  removeFavorite (state, tokenID) {
    Vue.delete(state.favorites, tokenID)
  },
  setFavorites (state, favorites) {
    state.favorites = favorites
  },
  setTokenFilter (state, tokenID) {
    state.tokenFilter = tokenID // null is all | logos is 'logos' | Tokens are filtered by tokenID
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
    const index = state.contacts.findIndex(existingContact => existingContact.address === contact.address)
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
  addFavorite ({ commit }, tokenID) {
    commit('addFavorite', tokenID)
  },
  removeFavorite ({ commit }, tokenID) {
    commit('removeFavorite', tokenID)
  },
  setFavorites ({ commit }, favorites) {
    commit('setFavorites', favorites)
  },
  setTokenFilter ({ commit }, tokenID) {
    commit('setTokenFilter', tokenID)
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
