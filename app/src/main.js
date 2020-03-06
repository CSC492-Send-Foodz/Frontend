import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueAxios, axios, Vuex)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
