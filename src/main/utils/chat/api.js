import { db, firebase, roomsRef, admin, messagesRef, usersRef, filesRef, deleteDbField } from '@/firebase';
import axios from 'axios';
export async function addNewUserChat(name) {
    const userId = await firebase.default.auth().currentUser.uid;
    await db.collection('users').doc(userId).set({ username: name, chatRooms: [] });
}
export async function fetchRoomsChat() {

}

export async function createRoomChat(oppositeUserId) {
    const userId = await firebase.default.auth().currentUser.uid;
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
    // const response = await axios.post('http://localhost:8080/', {
    //     action: "chatRooms",
    //     userId: userId,
    //     oppositeUserId: oppositeUserId,
    //     roomId: res.id
    // });
    // console.log(response);
}

export async function fetchRooms() {
    const userId = await firebase.default.auth().currentUser.uid;
    const user = await db.collection('users').doc(userId).get();
    const roomIds = user.data().chatRooms;
    const snapshot = await roomsRef.get();
    const chatRooms = [];
    snapshot.forEach(doc => {
        if (roomIds.includes(doc.id)) {
            chatRooms.push({ id: doc.id, data: doc.data() });
        }
    });
    console.log(chatRooms);
}