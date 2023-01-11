import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6-OdH3FBwH_4CXPzXhvuvUDMT-0FmYa0",
  authDomain: "clone-3a338.firebaseapp.com",
  projectId: "clone-3a338",
  storageBucket: "clone-3a338.appspot.com",
  messagingSenderId: "1082686276021",
  appId: "1:1082686276021:web:bffe38ea73dd6c64d519fc",
  measurementId: "G-YGLMXP5DTM",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
