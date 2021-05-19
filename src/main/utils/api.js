import { firebase } from '@/firebase';
import Driver from '@/main/utils/Driver';
import Passenger from '@/main/utils/Passenger';
import store from '@/store/index';

export function readUser() {
    return new Promise((resolve, reject) => {
        firebase.default.auth().onAuthStateChanged((user) => {
            if (user) {
                const userId = firebase.default.auth().currentUser.uid;
                const dbRef = firebase.database().ref();

                dbRef.child("users").child(userId).get().then((data) => {
                    if (data.val()) {
                        let userDB = '';
                        if (data.val().role === "Driver") {
                            userDB = new Driver(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday, data.val().passport, data.val().profileImg, userId);
                        } else if (data.val().role === "Passenger") {
                            userDB = new Passenger(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday, data.val().profileImg, userId);
                        }
                        readTrips(data.val().role.toLowerCase());
                        store.commit('user/setStateUser', userDB, { root: true });
                        store.dispatch('skeleton/setLoading', false, { root: true })
                        resolve(userDB);
                    }
                }).catch((error) => {
                    store.dispatch('skeleton/setLoading', false, { root: true })
                    reject("readUser: " + error);
                });
            } else {
                store.dispatch('skeleton/setLoading', false, { root: true })
                reject('readUser: user not autorized');
            }
        });
    });
}

export function readTrips(role) {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userId = firebase.default.auth().currentUser.uid;
                const dbRef = firebase.database().ref();
                dbRef.child(role).child(userId).get().then((data) => {
                    if (data.val()) {
                        store.commit('add/setStateTrip', data.val(), { root: true });
                        resolve(data.val());
                    } else {
                        store.commit('add/setFirstTime', true, { root: true });
                        resolve();
                    }
                }).catch(() => {
                    reject("Error in readTrips");
                });
            } else {
                reject("Error in readTrips");
            }
        });
    });
}

export async function makeRequest(url, options = {}) {
    const response = await fetch(url, options)
    if (response.status === 200) {
        const data = await response.json()
        console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject.description);
        return data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
    } else {
        return response.text()
    }
}

export async function makeOverviewRequest(url, options = {}) {
    const response = await fetch(url, options)
    if (response.status === 200) {
        const data = await response.json()
        return data.response.GeoObjectCollection.featureMember[0].GeoObject.description;
    } else {
        return response.text()
    }
}