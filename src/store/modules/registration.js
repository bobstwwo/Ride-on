export default {
  namespaced: true,
  state: () => {
    return {
      name: '',
      surname: '',
      secondName: '',
      phone: '',
      birthday: '',
      documents: '',
      email: '',
      allChecked: false,
      password: '',
    };
  },
  actions: {},
  mutations: {
    setName(state, value) {
      state.name = value;
    },
    setSurname(state, value) {
      state.surname = value;
    },
    setSecondName(state, value) {
      state.secondName = value;
    },
    setPhone(state, value) {
      state.phone = value;
    },
    setBirthday(state, value) {
      state.birthday = value;
    },
    setDocuments(state, value) {
      state.documents = value;
    },
    setEmail(state, value) {
      state.email = value;
    },
    setPassword(state, value) {
      state.password = value;
    },
    setAllChecked(state, value) {
      state.allChecked = value;
    },
  },
  getters: {
    name: (state) => state.name,
    surname: (state) => state.surname,
    secondName: (state) => state.secondName,
    phone: (state) => state.phone,
    birthday: (state) => state.birthday,
    documents: (state) => state.documents,
    email: (state) => state.email,
    password: (state) => state.password,
    allChecked: (state) => state.allChecked,
  },
};
