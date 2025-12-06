// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfpEQzEWv4wzErgjMeAtbmJPg_aknrrNM",
  authDomain: "app-facturas-8ae2f.firebaseapp.com",
  projectId: "app-facturas-8ae2f",
  storageBucket: "app-facturas-8ae2f.firebasestorage.app",
  messagingSenderId: "859270147246",
  appId: "1:859270147246:web:68359827bd626743d8d13f",
  measurementId: "G-QGTYDCD072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);