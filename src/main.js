import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

import './scss/rtstck-datepicker.scss'
import App from './App.vue'

import _ from 'lodash'
window._ = _
import moment from 'moment'
window.moment = moment

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
