import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import BootstrapVue from '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bulma/css/bulma.css'
import Vuetify from 'vuetify'


Vue.config.productionTip = false

Vue.use(VueAxios, axios, Vuex, VueRouter, BootstrapVue, Vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app')
