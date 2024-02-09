import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'  
import { } from '@fortawesome/free-brands-svg-icons'

import 'selectize/dist/css/selectize.default.css'
import VSelectize from '@isneezy/vue-selectize'
Vue.component('v-selectize', VSelectize)

import Toasted from 'vue-toasted'
import toast from '@/mixins/toast'

import navigator from '@/mixins/navigate'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
Vue.component('v-phone-number-input', VuePhoneNumberInput)

Vue.use(BootstrapVue)
Vue.use(Toasted)
Vue.mixin(toast)
Vue.mixin(navigator)

library.add(faEllipsisV)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
