import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router";
import vuetify from './plugins/vuetify'

import App from './App.vue'


// import axios from 'axios'
// import VueAxios from 'vue-axios'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
// import '../node_modules/bulma/css/bulma.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(vuetify)

// Vue.use(VueAxios, axios, Vuex, BootstrapVue, IconsPlugin, Vuetify)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
