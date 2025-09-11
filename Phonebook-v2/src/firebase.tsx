// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDKn9saNI2nv5tRhOmNG16FybfFhNk1fk",
    authDomain: "phonebookv2-4df17.firebaseapp.com",
    projectId: "phonebookv2-4df17",
    storageBucket: "phonebookv2-4df17.firebasestorage.app",
    messagingSenderId: "561280573329",
    appId: "1:561280573329:web:50bf411914bcd5a22d8430",
    measurementId: "G-662HWZ3XS2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);