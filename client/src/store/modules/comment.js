import { Api } from '@/Api'
import auth from './auth'

const state = {}

const getters = {}

const actions = {
  deleteComment({ commit, dispatch }, payload) {
    Api.delete(`comments/${payload}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    }).then(res => {
      dispatch('getUserInfo')
    })
  }
}

const mutations = {
}

export default {
  actions,
  state,
  getters,
  mutations
}
