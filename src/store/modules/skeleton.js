export default {
  namespaced: true,
  state: {
    loading: false,
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
