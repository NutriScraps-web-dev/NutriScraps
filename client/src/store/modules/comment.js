import { Api } from '@/Api'
import auth from './auth'

const state = {
  comment: null
}

const getters = {
  getComment(state) {
    console.log('getCommentGetter', state.comment)
    return state.comment
  }
}

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
      console.log('comment', res.data)
      commit('createComment', res.data)
    })
  }
}

const mutations = {
  createComment(state, payload) {
    state.comment = payload
    console.log('state.comment', state.comment)
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
