import { Api } from '@/Api'
import auth from './auth'

const state = {
  recipe: null
}

const getters = {
  recipeState(state) {
    console.log('state.recipe', state.recipe)
    return state.recipe
  }
}

const mutations = {
  setRecipe(state, payload) {
    console.log(payload)
    state.recipe = payload
    console.log('state.recipe', state.recipe)
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
        console.log('response.data', response.data)
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
