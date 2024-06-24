// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIdO1sfPFLKz46kpWxTWSE39Gm0WHgQSE",
  authDomain: "phishing-dashboard-dfb4e.firebaseapp.com",
  projectId: "phishing-dashboard-dfb4e",
  storageBucket: "phishing-dashboard-dfb4e.appspot.com",
  messagingSenderId: "693259460131",
  appId: "1:693259460131:web:fd6fefe2974ab7a9309b96",
  measurementId: "G-MEHV5G841M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };