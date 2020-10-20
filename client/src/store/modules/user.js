import { Api } from '@/Api'
import auth from './auth'
import Router from '@/router'

const state = {
  user: null
}

const getters = {
  userInfo: state => {
    return state.user
  }
}

const mutations = {
  storeUser: (state, user) => {
    state.user = user
  },
  deleteUser: state => {
    state.user = null
    auth.state.authToken = null
    auth.state.userId = null
    auth.state.userRole = null
    localStorage.clear()
  }
}

const actions = {
  getUserInfo({ commit }) {
    if (!auth.state.authToken) {
      return
    }
    Api.get(`users/${auth.state.userId}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        commit('storeUser', res.data)
      })
  },
  changePassword({ commit }, payload) {
    Api.patch(`users/${auth.state.userId}/password`, payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
      })
  },
  updateProfile({ commit }, payload) {
    Api.patch(`users/${auth.state.userId}`, payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        if (res.state === 200) {
          commit('storeUser')
        }
      })
  },
  deleteUser({ commit }) {
    Api.delete(`users/${auth.state.userId}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        Router.replace('/')
        commit('deleteUser')
      })
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
