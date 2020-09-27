import { Api } from '@/Api'
import Router from '@/router'

const state = {
  authToken: null,
  userRole: null,
  userId: null
}

const getters = {
  isLoggedIn: state => {
    return state.authToken !== null
  }
}

const mutations = {
  // changeLogInStatus: state => {
  //   state.isLoggedIn = !state.isLoggedIn
  // },
  authUser(state, userData) {
    state.authToken = userData.token
    state.userId = userData.userId
    state.userRole = userData.userRole
    console.log(userData)
  },
  clearToken(state) {
    state.authToken = null
    state.userId = null
    state.userRole = null
  }
}

const actions = {
  signUp(context, payload) {
    Api.post('/users/signup', payload)
      .then(res => {
        Router.push('/users/login')
        console.log(res, context)
      })
      .catch(err => console.log(err))
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
    Api.post('/users/login', payload)
      .then(res => {
        // console.log(res)
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

          // context.commit('changeLogInStatus')
          context.dispatch('logOutTimer')
          Router.push('/')
        }
      })
      .catch(err => console.log(err))
  },
  logOut({ commit }) {
    commit('clearToken')
    localStorage.clear()
    Router.replace('/')
  },
  logOutTimer({ commit }) {
    setTimeout(() => {
      commit('clearToken')
    }, 3600 * 1000)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
