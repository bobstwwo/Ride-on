import User from '@/main/utils/User.js';
import firebase from '@/firebase';

// const db = firebase.database().ref('/users');

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
      const userId = await firebase.default.auth().currentUser.uid;
      const dbRef = firebase.database().ref();
      dbRef.child("users").child(userId).get().then((data) => {
        console.log(data);
      }).catch((error) => {
        console.error(error);
      });
    },

    async update(key, value) {
      await db.child(key).update(value);
    }
  },
  getters: {
    user: (state) => state.user,
    checkUser: (state) => state.user !== null,
  },
};
