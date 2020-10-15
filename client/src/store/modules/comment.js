import { Api } from '@/Api'
import auth from './auth'

const state = {
  comment: null
}

const getters = {
  getComments(state) {
    return state.comment
  }
}

const actions = {
  getCommentsForReceipe({ commit }, payload) {
  },
  getComment({ commit }, payload) {
    Api.get(`comments/${payload}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(response => {
      console.log(response)
      commit('storeComment', response)
    })
  },
  createComment({ commit }, payload) {
    console.log('payload ', payload)
    Api.post('comments', payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(response => {
      console.log(response)
      commit('storeComment', response)
    })
  },
  deleteComment({ commit }, payload) {
    Api.delete(`comments/${payload}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      console.log(res)
    })
  }
}

const mutations = {
  storeComment(state, payload) {
    state.comment = payload
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
