import { Api } from '@/Api'
import auth from './auth'

const state = {
  recipe: null
}

const getters = {
  recipeState(state) {
    return state.recipe
  }
}

const mutations = {
  setRecipe(state, payload) {
    state.recipe = payload
  }
}

const actions = {
  deletePost({ commit, dispatch }, payload) {
    Api.delete(`recipes/${payload}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getUserInfo')
    })
  },
  getRecipe({ commit }, payload) {
    Api.get(`/recipes/${payload}`)
      .then(response => {
        commit('setRecipe', response.data)
      })
  }
}

export default {
  actions,
  state,
  mutations,
  getters
}
