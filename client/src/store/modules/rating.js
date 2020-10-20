import { Api } from '@/Api'

const state = {
  rating: null
}

const getters = {
  getRating(state) {
    return state.rating
  }
}

const actions = {
  getRatings({ commit }, payload) {
    Api.get('ratings/')
  }
}

const mutations = {
  storeRatings(state, payload) {
    state.rating = payload
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
