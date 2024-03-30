// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAkrPWysag-OI5HTqWqFkYcmcWJMno8L4",
  authDomain: "login-page-48195.firebaseapp.com",
  projectId: "login-page-48195",
  storageBucket: "login-page-48195.appspot.com",
  messagingSenderId: "536390189993",
  appId: "1:536390189993:web:701f2539190762865f3ab8",
  measurementId: "G-7EKP9PRWT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore() 