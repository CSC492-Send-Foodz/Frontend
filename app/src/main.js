import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bulma/css/bulma.css'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = falsew

Vue.config.productionTip = false

Vue.use(VueAxios, axios, Vuex, VueRouter, BootstrapVue, vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app')
