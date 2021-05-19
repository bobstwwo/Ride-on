import { firebase } from './firebase'
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import JQuery from 'jquery'
import anime from 'animejs/lib/anime.es.js';
import Antd from 'ant-design-vue';
import YmapPlugin from 'vue-yandex-maps'

window.$ = JQuery
window.anime = anime

const settings = {
  apiKey: 'e44fe465-761b-495e-9e8c-b91042469060',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

Vue.use(YmapPlugin, settings)

const VueInputMask = require('vue-inputmask').default;

Vue.use(VueInputMask);
Vue.use(Antd);

Vue.config.productionTip = false;

let app;


firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

