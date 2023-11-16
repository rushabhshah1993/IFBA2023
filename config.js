// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYVaLavnBr_CXSXOSUS-rS313zW2BLEdk",
  authDomain: "ifba-23.firebaseapp.com",
  projectId: "ifba-23",
  storageBucket: "ifba-23.appspot.com",
  messagingSenderId: "372777313947",
  appId: "1:372777313947:web:746121aa1f7448b247483e",
  measurementId: "G-27Q3DRRL92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);