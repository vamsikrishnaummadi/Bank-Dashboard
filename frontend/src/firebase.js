// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "bankdash-ceba5.firebaseapp.com",
    projectId: "bankdash-ceba5",
    storageBucket: "bankdash-ceba5.appspot.com",
    messagingSenderId: "499223957743",
    appId: "1:499223957743:web:75767c138d5ab4ee600b1a"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
