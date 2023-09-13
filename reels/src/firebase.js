
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-_y1b1iK9iwC4M6QZATprOel9igWqvvg",
  authDomain: "reels-ee86f.firebaseapp.com",
  projectId: "reels-ee86f",
  storageBucket: "reels-ee86f.appspot.com",
  messagingSenderId: "505207107305",
  appId: "1:505207107305:web:2e702e4f0db1d9959bca78"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore=firebase.firestore();
export const database={
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  comments : firestore.collection('comments'),
  getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}

export const storage= firebase.storage()