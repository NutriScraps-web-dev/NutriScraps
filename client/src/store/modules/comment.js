import { Api } from '@/Api'
import auth from './auth'

const state = {}

const getters = {}

const actions = {
  deleteComment({ commit, dispatch }, payload) {
    Api.delete(`recipe/comments/${payload}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getUserInfo')
    })
  },
  createComment({ commit, dispatch }, payload) {
    Api.post(`recipe/${payload.recipeId}/comments`, payload.comment, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getRecipe', payload.recipeId)
    })
  },
  createSubComment({ commit, dispatch }, payload) {
    Api.post(`recipe/subcomments/${payload.parentId}`, payload.comment, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getRecipe', payload.recipeId)
    })
  }
}

const mutations = {}

export default {
  actions,
  state,
  getters,
  mutations
}
