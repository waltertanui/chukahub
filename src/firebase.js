// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import authentication module
import { getStorage } from 'firebase/storage';
//import 'firebase/compat/auth'
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnWxYrZRg7WzqEpCeYNXJvnSEfb5mSFa4",
    authDomain: "schoolr-2e423.firebaseapp.com",
    projectId: "schoolr-2e423",
    storageBucket: "schoolr-2e423.appspot.com",
    messagingSenderId: "59911700438",
    appId: "1:59911700438:web:833a889c64dabce0dbee77",
    measurementId: "G-9TS4H5M9HQ"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize authentication module
const storage = getStorage(app); // Initialize storage module

export { app, db, auth,  storage};