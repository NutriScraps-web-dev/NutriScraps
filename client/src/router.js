import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/modules/auth'
import Home from './views/Home.vue'
import ContactUs from './views/ContactUs.vue'
import Recipes from './views/Recipes.vue'
import Signup from './views/auth/Signup.vue'
import Login from './views/auth/Login.vue'
import Profile from './views/user/Profile.vue'
import Roles from './views/admin/RolesManagement.vue'
import Users from './views/admin/UsersManagement.vue'
import CreateRecipe from './components/CreateRecipe.vue'
import EditRecipe from './components/EditRecipe.vue'
import Recipe from './views/Recipe.vue'
import WebRecipe from './views/WebRecipe.vue'
import AboutUs from './views/AboutUs.vue'

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
      path: '/contact-us',
      name: 'contactUs',
      component: ContactUs
    },
    {
      path: '/about-us',
      name: 'aboutUs',
      component: AboutUs
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: Recipe
    },
    {
      path: '/web-recipe/:id',
      name: 'webRecipe',
      component: WebRecipe
    },
    {
      path: '/create-recipe',
      name: 'createRecipe',
      component: CreateRecipe,
      beforeEnter: (to, from, next) => {
        if (Store.state.authToken) {
          next()
        } else {
          next('users/login')
        }
      }
    },
    {
      path: '/recipes/:id/edit',
      name: 'editRecipe',
      component: EditRecipe,
      beforeEnter: (to, from, next) => {
        if (Store.state.authToken) {
          next()
        } else {
          next('users/login')
        }
      }
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
      component: Roles
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
    },
    {
      path: '/comments',
      name: 'comments',
      component: Comment
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
