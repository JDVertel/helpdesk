// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyBNONgNVG8dJX-A52EAa_53RMvq3jO-Njg",
    authDomain: "extramuraleseb.firebaseapp.com",
    databaseURL: "https://extramuraleseb-default-rtdb.firebaseio.com",
    projectId: "extramuraleseb",
    storageBucket: "extramuraleseb.firebasestorage.app",
    messagingSenderId: "820740673971",
    appId: "1:820740673971:web:4658893d8b911182153bc6",
    measurementId: "G-DNDD5STTWP"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);