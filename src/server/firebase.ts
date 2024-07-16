// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "fir-blog-21e6e.firebaseapp.com",
  projectId: "fir-blog-21e6e",
  storageBucket: "fir-blog-21e6e.appspot.com",
  messagingSenderId: "765135257656",
  appId: "1:765135257656:web:52a5f75013f583a78466cd",
  measurementId: "G-HJ7VN1L5CL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

