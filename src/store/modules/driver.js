import firebase from '@/firebase';

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
        }
    },
    actions: {
        async create(store) {
            const userId = await firebase.default.auth().currentUser.uid;
            await firebase.database().ref('drivers/' + userId).set(store.state.trips);
        },

        read(store) {
            return new Promise((resolve, reject) => {
                // store.dispatch('skeleton/setLoading', true, { root: true })
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        const userId = firebase.default.auth().currentUser.uid;
                        const dbRef = firebase.database().ref();

                        dbRef.child("drivers").child(userId).get().then((data) => {
                            if (data.val()) {
                                store.state.trips = data.val()
                                resolve();
                            } else {
                                store.state.firstTime = true;
                                resolve();
                            }
                            store.dispatch('skeleton/setLoading', false, { root: true })
                        }).catch((error) => {
                            console.error(error);
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
                dbRef.child("drivers").child(userId).update(store.state.trips).then(() => {
                    store.dispatch('skeleton/setLoading', false, { root: true })
                    resolve();
                }).catch((error) => {
                    console.error(error);
                    store.dispatch('skeleton/setLoading', false, { root: true })
                    reject();
                });
            });
        },

        // async uploadFile(store, { file, path }) {
        //     const filename = file.name;
        //     const ext = filename.slice(filename.lastIndexOf('.'));
        //     const userId = await firebase.default.auth().currentUser.uid;
        //     firebase.storage().ref('files/' + userId + ext).put(file).then((response) => {
        //         response.ref.getDownloadURL().then((downloadURL) => {
        //             if (path === "profile-url") {
        //                 store.state.user.profileImg = downloadURL;
        //             } else if (path === "passport-url") {
        //                 store.state.user.passport = downloadURL;
        //             }
        //             store.dispatch('update', store.state.user);
        //         });
        //     });
        // },
    },
    getters: {
        trips: (state) => state.trips,
        firstTime: (state) => state.firstTime,
    },
};
