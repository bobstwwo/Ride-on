import firebase from '@/firebase';
export default {
    namespaced: true,
    state: {
        pointA: '',
        pointB: '',
        allTripsOFDrivers: null,
        allTripsOFPassengers: null,
        dataFromBD: '',
    },
    mutations: {
        setA(state, value) {
            state.pointA = value;
        },
        setB(state, value) {
            state.pointB = value;
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
                            store.state.dataFromBD = data;
                            let arrTrips = [];
                            Object.values(data).forEach(element => {
                                element.unfinished.forEach(trip => {
                                    arrTrips.push(trip);
                                });
                            });
                            if (role === "driver") {
                                store.state.allTripsOFDrivers = arrTrips;
                            } else {
                                store.state.allTripsOFPassengers = arrTrips;
                            }
                            resolve();
                            console.log(store.state.allTripsOFPassengers);
                            store.dispatch('skeleton/setLoading', false, { root: true })
                        });
                    } else {
                        store.dispatch('skeleton/setLoading', false, { root: true })
                        reject();
                    }
                })
            });
        },
    },
    getters: {
        pointA: (state) => state.pointA,
        pointB: (state) => state.pointB,
        dataFromBD: (state) => state.dataFromBD,
        allTripsOFDrivers: (state) => state.allTripsOFDrivers,
        allTripsOFPassengers: (state) => state.allTripsOFPassengers,
    },
};
