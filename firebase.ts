// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLYN_YenedAi0vpUgh97s76BLcoXL3X12",
  authDomain: "my-notees-app-cfe84.firebaseapp.com",
  projectId: "my-notees-app-cfe24",
  storageBucket: "my-notees-app-cfe14.firebasestorage.app",
  messagingSenderId: "979780312414",
  appId: "1:979781354711:web:a49ec8ae964a76bcf88f3b",
  measurementId: "G-NNMFCMTF9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
