import firebase from '@/firebase';

export default {
    namespaced: true,
    state: {
        trips: {
            unfinished: [],
            finished: [],
        },
        firstTime: false,
        role: '',
    },
    mutations: {
        addTrip(state, obj) {
            state.firstTime = false;
            state.trips.unfinished.push(obj);
        },
        changeTrip(state, obj) {
            const index = obj.index;
            const value = obj.value;
            state.trips.unfinished[index] = value;
        },
        deleteTrip(state, index) {
            state.trips.unfinished.splice(index, 1);
        },
        setRole(state, val) {
            console.log("add.js - setRole:");
            state.role = val;
        },
        destroy(state) {
            state.trips.unfinished = [];
            state.trips.finished = [];
            state.firstTime = false;
            state.role = '';
        }
    },
    actions: {
        async create(store) {
            const userId = await firebase.default.auth().currentUser.uid;
            await firebase.database().ref(store.state.role + '/' + userId).set(store.state.trips);
        },

        read(store) {
            return new Promise((resolve, reject) => {
                // store.dispatch('skeleton/setLoading', true, { root: true })
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        const userId = firebase.default.auth().currentUser.uid;
                        const dbRef = firebase.database().ref();
                        console.log("add.js - read:");
                        dbRef.child(store.state.role).child(userId).get().then((data) => {
                            if (data.val()) {
                                store.state.trips = data.val()
                                resolve();
                            } else {
                                store.state.firstTime = true;
                                resolve();
                            }
                            store.dispatch('skeleton/setLoading', false, { root: true })
                        }).catch((error) => {
                            console.log("----");
                            store.dispatch('skeleton/setLoading', false, { root: true })
                            reject();
                        });
                    } else {
                        store.dispatch('skeleton/setLoading', false, { root: true })
                        reject();
                    }
                });
            });
        },

        update(store) {
            return new Promise((resolve, reject) => {
                store.dispatch('skeleton/setLoading', true, { root: true })
                const userId = firebase.default.auth().currentUser.uid;
                const dbRef = firebase.database().ref();
                dbRef.child(store.state.role).child(userId).update(store.state.trips).then(() => {
                    store.dispatch('skeleton/setLoading', false, { root: true })
                    resolve();
                }).catch((error) => {
                    console.error(error);
                    store.dispatch('skeleton/setLoading', false, { root: true })
                    reject();
                });
            });
        },
        changeTrip(store, obj) {
            store.commit('changeTrip', obj)
            store.dispatch('add/update', null, { root: true })
        },
        deleteTrip(store, index) {
            store.commit("deleteTrip", index);
            store.dispatch('add/update', null, { root: true })
        }
    },
    getters: {
        trips: (state) => state.trips,
        firstTime: (state) => state.firstTime,
        role: (state) => state.role,
    },
};
