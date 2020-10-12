import { Api } from '@/Api'
import Router from '@/router'
import auth from './auth'
import toast from '../../assets/toast'

const state = {
  authToken: null,
  userRole: null,
  userId: null,
  isAdmin: false
}

const getters = {
  isLoggedIn: state => {
    return state.authToken !== null
  },
  isAdmin: state => {
    return state.isAdmin
  }
}

const mutations = {
  authUser(state, userData) {
    state.authToken = userData.token
    state.userId = userData.userId
    state.userRole = userData.userRole
  },
  clearToken(state) {
    state.authToken = null
    state.userId = null
    state.userRole = null
    state.isAdmin = false
  },
  isAdmin(state, adminData) {
    state.isAdmin = adminData.isAdmin
  }
}

const actions = {
  signUp({ commit }, payload) {
    Api.post('/auth/signup', payload, { errorHandle: false })
      .then(res => {
        Router.push('/auth/login')
      })
      .catch(error => {
        toast.warn(error.response.data.error, error.response.status)
      })
  },
  autoLogIn({ commit }) {
    const token = localStorage.getItem('token')
    const expireDate = localStorage.getItem('expiresIn')
    const userRole = localStorage.getItem('userRole')
    const userId = localStorage.getItem('userId')
    const now = new Date()
    if (!token || now >= expireDate) {
      return
    }
    commit('authUser', {
      token,
      userRole,
      userId
    })
  },
  logIn(context, payload) {
    Api.post('/auth/login', payload)
      .then(res => {
        if (res.status === 200) {
          context.commit('authUser', {
            token: res.data.token,
            userId: res.data.userId,
            userRole: res.data.userRole
          })
          const now = new Date()
          const expireDate = new Date(now.getTime() + 3600000)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('expiresIn', expireDate)
          localStorage.setItem('userRole', res.data.userRole)
          localStorage.setItem('userId', res.data.userId)
          context.dispatch('logOutTimer')
          context.dispatch('isAdmin')
          Router.push('/')
        }
      })
  },
  logOut({ commit }) {
    commit('clearToken')
    localStorage.clear()
    Router.replace('/')
  },
  logOutTimer({ commit }) {
    setTimeout(() => {
      commit('clearToken')
      localStorage.clear()
      Router.push('/')
    }, 3600000)
  },
  isAdmin({ commit }) {
    if (!auth.state.authToken) {
      return
    }
    Api.get(`auth/${auth.state.userId}/role`, {
      headers: {
        Authorization: `Bearer ${auth.state.authToken}`
      }
    })
      .then(res => {
        console.log('res.data')
        console.log(res.data)
        commit('isAdmin', res.data)
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
