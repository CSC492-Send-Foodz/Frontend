import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#000000',
            secondary: '#747474',
            background: '#FDFDFD',
            action: '#EBEBEB',
            error: '#b71c1c',
          },
        },
      },
});