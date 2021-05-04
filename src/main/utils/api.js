import firebase from '@/firebase';
import Driver from '@/main/utils/Driver';
import Passenger from '@/main/utils/Passenger';
import store from '@/store/index';

export function read() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userId = firebase.default.auth().currentUser.uid;
                const dbRef = firebase.database().ref();

                dbRef.child("users").child(userId).get().then((data) => {
                    if (data.val()) {
                        let userDB = '';
                        if (data.val().role === "Driver") {
                            userDB = new Driver(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday, data.val().passport, data.val().profileImg);
                        } else if (data.val().role === "Passenger") {
                            userDB = new Passenger(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday, data.val().profileImg);
                        }
                        store.dispatch('skeleton/setLoading', false, { root: true })
                        resolve(userDB);
                    }
                }).catch((error) => {
                    store.dispatch('skeleton/setLoading', false, { root: true })
                    reject("api.js: " + error);
                });
            } else {
                store.dispatch('skeleton/setLoading', false, { root: true })
                reject('api.js: user not autorized');
            }
        });
    });
}