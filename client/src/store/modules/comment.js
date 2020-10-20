import { Api } from '@/Api'
import auth from './auth'

const state = {}

const getters = {}

const actions = {
  deleteComment({ commit, dispatch }, payload) {
    Api.delete(`recipes/comments/${payload}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getUserInfo')
    })
  },
  createComment({ commit, dispatch }, payload) {
    Api.post(`recipes/${payload.recipeId}/comments`, payload.comment, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getRecipe', payload.recipeId)
    })
  },
  createSubComment({ commit, dispatch }, payload) {
    Api.post(`recipes/subcomments/${payload.parentId}`, payload.comment, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      console.log('subcomment', res)
      // dispatch('getRecipe', payload.recipeId)
    })
  },
  getRecipeComments({ commit, dispatch }, payload) {
    Api.get(`recipes/subcomments/${payload.parentId}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      console.log('subcomment', res)
      // dispatch('getRecipe', payload.recipeId)
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
