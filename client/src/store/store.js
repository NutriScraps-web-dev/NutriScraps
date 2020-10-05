import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import error from './modules/error'
import user from './modules/user'
import role from './modules/admin/role'
import userManagement from './modules/admin/userManagement'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    user,
    role,
    error,
    userManagement
  }
})
