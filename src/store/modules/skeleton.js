export default {
  namespaced: true,
  state: {
    loading: false,
  },
  actions: {
    setLoading(store, payload) {
      store.commit('setLoading', payload);
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  getters: {
    loading: (state) => state.loading,
  },
};
