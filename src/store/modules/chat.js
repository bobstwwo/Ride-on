import { firebase } from '@/firebase';
export default {
    namespaced: true,
    state: {
        chatRooms: [],
        userNames: [],
        myID: null,
    },
    mutations: {
        setRooms(state, chatRooms) {
            state.chatRooms = chatRooms;
        },
        setUserNames(state, userNames) {
            state.userNames = userNames;
        },
        setMyID(state, id) {
            state.myID = id;
        }
    },
    actions: {
    },
    getters: {
        chatRooms: (state) => state.chatRooms,
        userNames: (state) => state.userNames,
        myID: (state) => state.myID,
    },
};