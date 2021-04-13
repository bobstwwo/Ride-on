import Vue from 'vue';
import Vuex from 'vuex';


import Registration from "./modules/registration";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    "registration": Registration,
  },
});


// state: {},
// mutations: {},
// actions: {},
// modules: {},
// getters: {},