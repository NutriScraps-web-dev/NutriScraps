import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vueCountryRegionSelect from 'vue-country-region-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faKey,
  faUserEdit,
  faUserCircle,
  faUsersCog,
  faPlus,
  faTasks,
  faUsers,
  faTrashAlt,
  faEdit,
  faCaretSquareDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { store } from './store/store'
import Vuelidate from 'vuelidate'
import VueFormulate from '@braid/vue-formulate'
import { Api } from './Api'
import toast from './assets/toast'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(vueCountryRegionSelect)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)
Vue.use(VueFormulate)

library.add(
  faKey,
  faUserEdit,
  faUserCircle,
  faUsersCog,
  faPlus,
  faTasks,
  faUsers,
  faTrashAlt,
  faEdit,
  faCaretSquareDown
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.config.errorHandler = (msg, vm, info) => {
  console.log('msg', msg)
  toast.error(`${msg}! \r\n Please Try Again`)
}

Api.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status >= 500) {
      toast.error('Something Went Terribly Wrong. Please Try Again', '500')
      return Promise.reject(error)
    }
    if (
      // eslint-disable-next-line no-prototype-builtins
      error.config.hasOwnProperty('errorHandle') &&
      error.config.errorHandle === false
    ) {
      return Promise.reject(error)
    }
    if (error.response) {
      toast.error(error.response.data.message, `${error.response.status}`)
    }
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
