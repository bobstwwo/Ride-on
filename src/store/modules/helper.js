export default {
    namespaced: true,
    state: {
        pointA: '',
        pointB: '',
    },
    mutations: {
        setA(state, value) {
            state.pointA = value;
        },
        setB(state, value) {
            state.pointB = value;
        }
    },
    actions: {},
    getters: {
        pointA: (state) => state.pointA,
        pointB: (state) => state.pointB,
    },
};
