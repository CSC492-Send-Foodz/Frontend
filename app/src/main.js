import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router";
import vuetify from './plugins/vuetify';

import App from './App.vue'


Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')