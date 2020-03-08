import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from "./router";
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue } from 'bootstrap-vue';

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import BootstrapVue from '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bulma/css/bulma.css'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(VueAxios)
Vue.use(axios)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(vuetify)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
