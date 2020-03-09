import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from "./router";
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue } from 'bootstrap-vue';

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import'../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bulma/css/bulma.css'
import vuetify from './plugins/vuetify'

import App from './App.vue'


Vue.config.productionTip = false

Vue.use(VueAxios)
Vue.use(axios)
Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
