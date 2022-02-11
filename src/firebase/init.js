import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCQkHgoKAgaLj7F4xOOUfBSZV2x2hZ7ris",
    authDomain: "vue-chat-app-fb1db.firebaseapp.com",
    databaseURL: "https://vue-chat-app-fb1db-default-rtdb.firebaseio.com",
    projectId: "vue-chat-app-fb1db",
    storageBucket: "vue-chat-app-fb1db.appspot.com",
    messagingSenderId: "692017182879",
    appId: "1:692017182879:web:abee3a3ffd0529be8d0aaa",
    measurementId: "G-ZEM2DLE7WD"
};

export default firebase.initializeApp(firebaseConfig)
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

