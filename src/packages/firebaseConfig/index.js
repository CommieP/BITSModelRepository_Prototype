import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4-HZs_d0QJKIgFWlvEqG0uRtoW1rSUlw",
    authDomain: "bitsmodelrepository.firebaseapp.com",
    projectId: "bitsmodelrepository",
    storageBucket: "bitsmodelrepository.appspot.com",
    messagingSenderId: "1010122534305",
    appId: "1:1010122534305:web:88227caf60b8648b1fafe0",
    measurementId: "G-2H0H9260NZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };