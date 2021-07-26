// import User from '@/main/utils/User.js';
import { db, firebase } from '@/firebase';
// import { firebase } from '@/firebase';
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
      console.log(store.state.user);
      await firebase.database().ref('users/' + userId).set(store.state.user);
    },

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
            store.dispatch('uploadUrl', downloadURL);
          } else if (path === "passport-url") {
            store.state.user.passport = downloadURL;
          }
          store.dispatch('update', store.state.user);
        });
      });
    },
    async uploadUrl(store, url) {
      const userId = await firebase.default.auth().currentUser.uid;
      await db.collection('users').doc(userId).set({ imageUrl: url }, { merge: true });
    }
  },
  getters: {
    user: (state) => state.user,
    checkUser: (state) => state.user !== null,
  },
};
