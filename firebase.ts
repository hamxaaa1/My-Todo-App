// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLYN_YenedAi0vpUgh97s76BLcoXL2L38",
  authDomain: "my-notes-app-cfe84.firebaseapp.com",
  projectId: "my-notes-app-cfe84",
  storageBucket: "my-notes-app-cfe84.firebasestorage.app",
  messagingSenderId: "979780344418",
  appId: "1:979780344418:web:a49ec8ae964a76bcf88f3b",
  measurementId: "G-NNMFCZTF4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
