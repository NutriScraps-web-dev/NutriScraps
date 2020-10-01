import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/modules/auth'
import Home from './views/Home.vue'
import Signup from './views/auth/Signup.vue'
import Login from './views/auth/Login.vue'
import Profile from './views/user/Profile.vue'
import Roles from './views/admin/RolesManagement.vue'
import Users from './views/admin/UsersManagement.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/users/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (Store.state.authToken) {
          next()
        } else {
          next('users/login')
        }
      }
    },
    {
      path: '/admins/roles',
      name: 'Roles Management',
      component: Roles,
      beforeEnter: (to, from, next) => {
        if (Store.state.authToken) {
          next()
        } else {
          next('users/login')
        }
      }
    },
    {
      path: '/admins/users',
      name: 'Users Management',
      component: Users,
      beforeEnter: (to, from, next) => {
        if (Store.state.authToken) {
          next()
        } else {
          next('users/login')
        }
      }
    }
  ]
})
