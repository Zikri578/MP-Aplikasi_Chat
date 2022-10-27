// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZztlxIgkTVN4MQaJQOLMxu6Qh1Doojzc",
    authDomain: "mt-aplikasichat.firebaseapp.com",
    projectId: "mt-aplikasichat",
    storageBucket: "mt-aplikasichat.appspot.com",
    messagingSenderId: "943377889887",
    appId: "1:943377889887:web:d42a3d9a686478d15d79ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// db
export const db = getFirestore(app)
