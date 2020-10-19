import { Api } from '@/Api'
// import Router from '@/router'

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
