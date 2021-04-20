import firebase from './firebase'
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import JQuery from 'jquery'
import anime from 'animejs/lib/anime.es.js';
window.$ = JQuery
window.anime = anime

const VueInputMask = require('vue-inputmask').default;

Vue.use(VueInputMask);

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged((user) => {
  console.log('User: ', user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

