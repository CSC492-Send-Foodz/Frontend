import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router";
import vuetify from './plugins/vuetify';
import store from "../store/index.js";


import App from './App.vue'


Vue.config.productionTip = false

Vue.use(Vuex)

//define view with vuex, router and vuetify
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')