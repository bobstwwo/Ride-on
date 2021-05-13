import { firebase } from '@/firebase';
export default {
    namespaced: true,
    state: {
        chatRooms: [],
        userNames: [],
    },
    mutations: {
        setRooms(state, chatRooms) {
            state.chatRooms = chatRooms;
        },
        setUserNames(state, userNames) {
            state.userNames = userNames;
        }
    },
    actions: {
    },
    getters: {
        chatRooms: (state) => state.chatRooms,
        userNames: (state) => state.userNames,
    },
};