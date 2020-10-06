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
      .catch(err => console.log(err))
  },
  changePassword({ commit }, payload) {
    console.log(payload)
    Api.patch(`users/${auth.state.userId}/password`, payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  },
  updateProfile({ commit }, payload) {
    console.log(payload)
    Api.patch(`users/${auth.state.userId}`, payload, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        if (res.state === 200) {
          console.log(res)
          commit('storeUser')
        }
      })
      .catch(err => console.log(err))
  },
  deleteUser({ commit }) {
    Api.delete(`users/${auth.state.userId}`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        console.log(res)
        Router.replace('/')
        commit('deleteUser')
      })
      .catch(err => console.log(err))
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
