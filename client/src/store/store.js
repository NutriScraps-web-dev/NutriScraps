import Vue from 'vue'
import Vuex from 'vuex'
import { Api } from '@/Api'
import Router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authToken: null,
    userRole: null,
    userId: null
  },
  getters: {
    isLoggedIn: state => {
      return state.authToken !== null
    }
  },
  mutations: {
    changeLogInStatus: state => {
      state.isLoggedIn = !state.isLoggedIn
    },
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
  },
  actions: {
    signUp(context, payload) {
      Api.post('/users/signup', payload)
        .then(res => {
          Router.push('/users/login')
          console.log(res, context)
        })
        .catch(err => console.log(err))
    },
    logIn(context, payload) {
      Api.post('/users/login', payload)
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            this.commit('authUser', {
              token: res.data.token,
              userId: res.data.userId,
              userRole: res.data.userRole
            })
            context.commit('changeLogInStatus')
            // ask the TA if this is in the right place since router has nothing to do with state management
            Router.push('/')
          }
        })
        .catch(err => console.log(err))
    },
    getUserInfo({ commit, state }) {
      if (!state.authToken) {
        return
      }
      Api.get('user/5f6d12f6d109e141603cf190', {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    logOut({ commit }) {
      commit('clearToken')
      Router.replace('/')
    }
  }
})
