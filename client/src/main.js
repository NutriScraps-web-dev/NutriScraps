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
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { store } from './store/store'
import Vuelidate from 'vuelidate'
import VueFormulate from '@braid/vue-formulate'
import { Api } from './Api'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'izitoast/dist/css/iziToast.min.css'

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
  faEdit
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Api.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      console.log('Api.interceptors.response.use')
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
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
