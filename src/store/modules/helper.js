import { firebase } from '@/firebase';
export default {
    namespaced: true,
    state: {
        pointA: '',
        pointB: '',
        dataFromBD: '',
        routeInfo: null,
    },
    mutations: {
        setA(state, value) {
            state.pointA = value;
        },
        setB(state, value) {
            state.pointB = value;
        },
        setRouteInfo(state, info) {
            state.routeInfo = info;
        }
    },
    actions: {
        readAll(store, role) {
            return new Promise((resolve, reject) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        const dbRef = firebase.database().ref(role);
                        dbRef.on('value', (snapshot) => {
                            const data = snapshot.val();
                            if (data) {
                                // store.state.dataFromBD = data;
                                store.dispatch('skeleton/setLoading', false, { root: true })
                                resolve(data);
                            } else {
                                store.dispatch('skeleton/setLoading', false, { root: true })
                                reject("There is no trips");
                            }
                        });
                    } else {
                        store.dispatch('skeleton/setLoading', false, { root: true })
                        reject("User not autorised");
                    }
                })
            });
        },
    },
    getters: {
        pointA: (state) => state.pointA,
        pointB: (state) => state.pointB,
        dataFromBD: (state) => state.dataFromBD,
        routeInfo: (state) => state.routeInfo,
    },
};