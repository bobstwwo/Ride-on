import { db, firebase, roomsRef, admin, messagesRef, usersRef, filesRef, deleteDbField } from '@/firebase';
import axios from 'axios';
import store from '@/store/index';
import router from '@/router/index';

export async function sendMessage(roomID, senderID, text) {
    await roomsRef.doc(roomID).update({
        messages: firebase.firestore.FieldValue.arrayUnion({ senderID: senderID, text: text, time: Date.now() }),
        lastUpdate: Date.now()
    });
}

export async function addNewUserChat(name) {
    const userId = await firebase.default.auth().currentUser.uid;
    await db.collection('users').doc(userId).set({ username: name, chatRooms: [] });
}

export async function createRoomChat(oppositeUserId) {
    const userId = await firebase.default.auth().currentUser.uid;
    isThereChat(userId, oppositeUserId).then(async isAlreadyChat => {
        if (!isAlreadyChat) {
            store.dispatch('skeleton/setLoading', true, { root: true })
            const res = await roomsRef.add({
                users: [userId, oppositeUserId],
                messages: [],
                creationTime: Date.now(),
                lastUpdate: Date.now(),
            });

            try {
                await usersRef.doc(userId).update({
                    chatRooms: firebase.firestore.FieldValue.arrayUnion(res.id)
                })
                await usersRef.doc(oppositeUserId).update({
                    chatRooms: firebase.firestore.FieldValue.arrayUnion(res.id)
                })
            } catch (error) {
                console.log(error);
            }

            store.dispatch('skeleton/setLoading', false, { root: true })
            router.push({ name: 'chat' });
        } else {
            router.push({ name: 'chat' });
        }
    });

}

async function isThereChat(firstUserId, secondUserId) {
    const user = await db.collection('users').doc(firstUserId).get();
    const roomIds = user.data().chatRooms;

    let bool = false;

    roomIds.forEach(async roomId => {
        const room = await roomsRef.doc(roomId).get();
        if (room.data().users.includes(secondUserId)) {
            console.log(2);
            bool = true;
        }
    });

    return bool;
}

export async function fetchRoomsChat() {
    const userId = await firebase.default.auth().currentUser.uid;
    await store.commit('chat/setMyID', userId, { root: true });
    const user = await db.collection('users').doc(userId).get();
    const roomIds = user.data().chatRooms;
    const snapshot = await roomsRef.get();
    const chatRooms = [];
    snapshot.forEach(doc => {
        if (roomIds.includes(doc.id)) {
            chatRooms.push({ id: doc.id, data: doc.data() });
        }
    });
    await store.commit('chat/setRooms', chatRooms, { root: true });
}

export async function fetchUsernames(chatRooms) {
    const arr = [];
    const myId = await firebase.default.auth().currentUser.uid;
    const userIds = [];
    chatRooms.forEach(room => {
        room.data.users.forEach(userId => {
            if (myId !== userId) {
                userIds.push(userId);
            }
        })
    });
    let querySnapshot = await usersRef.get();
    querySnapshot.forEach((doc) => {
        if (userIds.includes(doc.id)) {
            arr.push({
                userId: doc.id,
                username: doc.data().username
            });
        }
    });
    await store.commit('chat/setUserNames', arr, { root: true });
}