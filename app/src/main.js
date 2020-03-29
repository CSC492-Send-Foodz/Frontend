import Vue from 'vue'
import Vuex from 'vuex'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import router from "./router";
import vuetify from './plugins/vuetify';
import store from "../store/index.js";


import App from './App.vue'


Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')