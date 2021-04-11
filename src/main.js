import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyDdSsrixYFAXGs6MjzWhaSn9XjnG7qRZYI",
      authDomain: "rideon-82115.firebaseapp.com",
      projectId: "rideon-82115",
      storageBucket: "rideon-82115.appspot.com",
      messagingSenderId: "859562939789",
      appId: "1:859562939789:web:09107a35d7d7b055d919c4",
      databaseURL: "https://rideon-82115-default-rtdb.firebaseio.com/",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }
}).$mount("#app");

// Get a reference to the database service
// var database = firebase.database();
