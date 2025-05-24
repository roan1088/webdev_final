// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBD6RW9eNHEp6JqcqUi-CbcAzFsnQIjrE",
  authDomain: "webdev-final-e9788.firebaseapp.com",
  projectId: "webdev-final-e9788",
  storageBucket: "webdev-final-e9788.firebasestorage.app",
  messagingSenderId: "97543641556",
  appId: "1:97543641556:web:f6d41918e724eab4629e41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();