import { Api } from '@/Api'
import auth from './auth'

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
        this.user = res.data
        commit('storeUser', res.data)
        console.log(this.user)
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
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}
