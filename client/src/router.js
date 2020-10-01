import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ContactUs from './views/ContactUs.vue'
import Recipes from './views/Recipes.vue'

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
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    }
  ]
})
