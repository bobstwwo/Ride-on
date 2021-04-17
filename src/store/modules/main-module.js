export default {
  namespaced: true,
  state: () => {
    return {
      isAutorized: false,
    };
  },
  actions: {},
  mutations: {
    setAutorized(state) {
      state.isAutorized = !state.isAutorized;
    },
  },
  getters: {
    isAutorized: (state) => state.isAutorized,
  },
};
