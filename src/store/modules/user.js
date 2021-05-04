// import User from '@/main/utils/User.js';
import firebase from '@/firebase';
import Driver from '@/main/utils/Driver';
import Passenger from '@/main/utils/Passenger';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, { role, name, surname, secondName, phone, email, birthday, passport, profileImg }) {
      if (role === "Driver")
        state.user = new Driver(role, name, surname, secondName, phone, email, birthday, passport, profileImg);
      else if (role === "Passenger") {
        state.user = new Passenger(role, name, surname, secondName, phone, email, birthday, profileImg);
      }
    },
    setStateUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async create(store) {
      const userId = await firebase.default.auth().currentUser.uid;
      await firebase.database().ref('users/' + userId).set(store.state.user);
    },

    // async read(store) {
    //   return new Promise((resolve, reject) => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {
    //         const userId = firebase.default.auth().currentUser.uid;
    //         const dbRef = firebase.database().ref();

    //         dbRef.child("users").child(userId).get().then((data) => {
    //           if (data.val()) {
    //             if (data.val().role === "Driver") {
    //               store.state.user = new Driver(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday, data.val().passport, data.val().profileImg);
    //             } else if (data.val().role === "Passenger") {
    //               store.state.user = new Passenger(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday, data.val().profileImg);
    //             }
    //             store.dispatch('skeleton/setLoading', false, { root: true })
    //             resolve(store.state.user);
    //           }
    //         }).catch((error) => {
    //           console.error(error);
    //           store.dispatch('skeleton/setLoading', false, { root: true })
    //           reject();
    //         });
    //       } else {
    //         store.dispatch('skeleton/setLoading', false, { root: true })
    //         reject();
    //       }
    //     });
    //   });
    // },


    async update(store, user) {
      const userId = await firebase.default.auth().currentUser.uid;
      const dbRef = firebase.database().ref();
      dbRef.child("users").child(userId).update(user).then(() => {
        store.dispatch('skeleton/setLoading', false, { root: true })
      }).catch((error) => {
        console.error(error);
        store.dispatch('skeleton/setLoading', false, { root: true })
      });
    },

    async uploadFile(store, { file, path }) {
      const filename = file.name;
      const ext = filename.slice(filename.lastIndexOf('.'));
      const userId = await firebase.default.auth().currentUser.uid;
      firebase.storage().ref('files/' + userId + ext).put(file).then((response) => {
        response.ref.getDownloadURL().then((downloadURL) => {
          if (path === "profile-url") {
            store.state.user.profileImg = downloadURL;
          } else if (path === "passport-url") {
            store.state.user.passport = downloadURL;
          }
          store.dispatch('update', store.state.user);
        });
      });
    },
  },
  getters: {
    user: (state) => state.user,
    checkUser: (state) => state.user !== null,
  },
};
