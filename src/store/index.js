import Vue from 'vue';
import Vuex from 'vuex';

import Registration from './modules/registration';
import MainModule from './modules/main-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    'registration': Registration,
    'main-module': MainModule,
  },
});

// state: {},
// mutations: {},
// actions: {},
// modules: {},
// getters: {},
