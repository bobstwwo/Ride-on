import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStart: true,
  },
  mutations: {
    changeStart(state) {
      state.isStart = !state.isStart;
    },
  },
  actions: {},
  modules: {},
  getters: {
    isStart: (state) => state.isStart,
  },
});
