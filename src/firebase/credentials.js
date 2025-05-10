// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOPKNwIaklPJCk4ivIwtkA0bo50V1uOn4",
  authDomain: "sis-ventas-e772a.firebaseapp.com",
  projectId: "sis-ventas-e772a",
  storageBucket: "sis-ventas-e772a.firebasestorage.app",
  messagingSenderId: "299754083975",
  appId: "1:299754083975:web:49719d8abe0c2f2cf68a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };