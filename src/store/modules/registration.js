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
        };
    },
    actions: {

    },
    mutations: {
        setName(state, value) { state.name = value; },
        setSurname(state, value) { state.surname = value; },
        setSecondName(state, value) { state.secondName = value; },
        setPhone(state, value) { state.phone = value; },
        setBirthday(state, value) { state.birthday = value; },
        setDocuments(state, value) { state.documents = value; },
    },
    getters: {
        name: (state) => state.name,
        surname: (state) => state.surname,
        secondName: (state) => state.secondName,
        phone: (state) => state.phone,
        birthday: (state) => state.birthday,
        documents: (state) => state.documents,
    },
};
