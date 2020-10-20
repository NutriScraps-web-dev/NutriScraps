import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import recipe from './modules/recipe'
import user from './modules/user'
import role from './modules/admin/role'
import comment from './modules/comment'
import userManagement from './modules/admin/userManagement'
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
    recipe,
    userManagement,
    comment,
    rating
  }
})
