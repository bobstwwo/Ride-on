import User from '@/main/utils/User.js';
import firebase from '@/firebase';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, { role, name, surname, secondName, phone, email, birthday }) {
      state.user = new User(role, name, surname, secondName, phone, email, birthday);
    },
  },
  actions: {
    async create(store) {
      const userId = await firebase.default.auth().currentUser.uid;
      await firebase.database().ref('users/' + userId).set(store.state.user);
    },

    async read(store) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch('skeleton/setLoading', true, { root: true })
          const userId = firebase.default.auth().currentUser.uid;
          const dbRef = firebase.database().ref();
          dbRef.child("users").child(userId).get().then((data) => {
            store.state.user = new User(data.val().role, data.val().name, data.val().surname, data.val().secondName, data.val().phone, data.val().email, data.val().birthday);
            store.dispatch('skeleton/setLoading', false, { root: true })
          }).catch((error) => {
            console.error(error);
            store.dispatch('skeleton/setLoading', false, { root: true })
          });
        }
      });
    },


    async update(store, user) {
      store.dispatch('skeleton/setLoading', true, { root: true })
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
