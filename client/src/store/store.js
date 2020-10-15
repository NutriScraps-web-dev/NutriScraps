import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import error from './modules/error'
import user from './modules/user'
import role from './modules/admin/role'
import comment from './modules/comment'
import userManagement from './modules/admin/userManagement'
import comment from './modules/comment'
import rating from './modules/rating'

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
    userManagement,
    comment,
    rating
  }
})
