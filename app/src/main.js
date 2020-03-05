import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
import '../node_modules/bulma/css/bulma.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(BootstrapVue, vuetify);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
