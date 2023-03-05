// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC43L6mOaiJCrOG3SwLd0bDXGoGRnRydKU",
  authDomain: "blog-aec2a.firebaseapp.com",
  projectId: "blog-aec2a",
  storageBucket: "blog-aec2a.appspot.com",
  messagingSenderId: "342233886868",
  appId: "1:342233886868:web:da6eeeeca1baeebd348481",
  measurementId: "G-3PQWBD8WRZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
