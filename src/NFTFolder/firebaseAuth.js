import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
//import firebase from "firebase/";
//import { initializeApp } from "firebase/app";
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import firebase from '@firebase/app';
// require('firebase/auth');
// import { auth } from "firebase/app";
//import 'firebase/compat/auth';
//import "firebase/auth";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
//import { GoogleAuthProvider, getAuth,  signInWithPopup,  signInWithEmailAndPassword,  createUserWithEmailAndPassword,  sendPasswordResetEmail,  signOut} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDrd6K6rgiDwbCb-X5ytTKtCiqLXIOk004",
    authDomain: "testproject-50b11.firebaseapp.com",
    databaseURL: "https://testproject-50b11-default-rtdb.firebaseio.com",
    projectId: "testproject-50b11",
    storageBucket: "testproject-50b11.appspot.com",
    messagingSenderId: "869026201510",
    appId: "1:869026201510:web:1308437873297656031967",
    measurementId: "G-D2V5S5FNHV"
};
const fireDbAuth = firebase.initializeApp(firebaseConfig);
export default fireDbAuth;  