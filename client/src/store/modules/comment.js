import { Api } from '@/Api'
import auth from './auth'

const state = {}

const getters = {}

const actions = {
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
}

export default {
  actions,
  state,
  getters,
  mutations
}
