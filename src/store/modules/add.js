import { firebase } from '@/firebase';

export default {
    namespaced: true,
    state: {
        trips: {
            unfinished: [],
            finished: [],
        },
        firstTime: false,
    },
    mutations: {
        addTrip(state, obj) {
            state.firstTime = false;
            state.trips.unfinished.push(obj);
        },
        changeTrip(state, obj) {
            const index = obj.index;
            const value = obj.value;
            console.log(value);
            state.trips.unfinished[index] = value;
        },
        deleteTrip(state, index) {
            state.trips.unfinished.splice(index, 1);
        },
        destroy(state) {
            state.trips.unfinished = [];
            state.trips.finished = [];
            state.firstTime = false;
            state.role = '';
        },
        setStateTrip(state, trips) {
            state.trips = trips;
        },
        setFirstTime(state, val) {
            state.firstTime = val;
        }
    },
    actions: {
        async create(store, role) {
            const userId = await firebase.auth().currentUser.uid;
            await firebase.database().ref(role + '/' + userId).set(store.state.trips);
        },
        update(store) {
            return new Promise((resolve, reject) => {
                store.dispatch('skeleton/setLoading', true, { root: true })
                const userId = firebase.auth().currentUser.uid;
                const dbRef = firebase.database().ref();
                dbRef.child(localStorage.getItem('role')).child(userId).update(store.state.trips).then(() => {
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
