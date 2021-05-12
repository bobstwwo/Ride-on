import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: 'AIzaSyDdSsrixYFAXGs6MjzWhaSn9XjnG7qRZYI',
    authDomain: 'rideon-82115.firebaseapp.com',
    projectId: 'rideon-82115',
    storageBucket: 'rideon-82115.appspot.com',
    messagingSenderId: '859562939789',
    appId: '1:859562939789:web:09107a35d7d7b055d919c4',
    databaseURL: 'https://rideon-82115-default-rtdb.firebaseio.com/',
};

app.initializeApp(config)



export const firebase = app
export const db = app.firestore()
export const storageRef = app.storage().ref()

export const usersRef = db.collection('users')
export const roomsRef = db.collection('chatRooms')
export const messagesRef = roomId => roomsRef.doc(roomId).collection('messages')

export const filesRef = storageRef.child('files')

export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const deleteDbField = firebase.firestore.FieldValue.delete()

