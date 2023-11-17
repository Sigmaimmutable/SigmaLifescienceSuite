import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
//import { signInWithPopup } from "firebase/auth";
//import { GoogleAuthProvider } from "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAtM98J3ZUJGrKZR88kznAazeaJiOO3zHY",
  authDomain: "binance-cbdc.firebaseapp.com",
  databaseURL: "https://binance-cbdc-default-rtdb.firebaseio.com",
  projectId: "binance-cbdc",
  storageBucket: "binance-cbdc.appspot.com",
  messagingSenderId: "336184276192",
  appId: "1:336184276192:web:3d543527a9ea0ac7c74c85",
  measurementId: "G-X94GF4S0QX"
};// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const firebases=firebase.initializeApp(firebaseConfig);
//const provider = new firebase.auth.GoogleAuthProvider()
// export const signInWithGoogle = () => {
//         signInWithPopup(auth, provider)
//           .then((result) => {
//             const name = result.user.displayName;
//             const email = result.user.email;
//             const profilePic = result.user.photoURL;      
//             localStorage.setItem("name", name);
//             localStorage.setItem("email", email);
//             localStorage.setItem("profilePic", profilePic);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
// };

export const auth = firebase.auth()
// firebase.initializeApp(firebaseConfig);
  
// export default firebase
export default firebase
