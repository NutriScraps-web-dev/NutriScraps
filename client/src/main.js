import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vueCountryRegionSelect from 'vue-country-region-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(vueCountryRegionSelect)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
