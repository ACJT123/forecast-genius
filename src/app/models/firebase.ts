// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAQgGmyaUhVe5hki7qEXRgP5mUQRSeHeJ0",
//   authDomain: "forecast-genius.firebaseapp.com",
  authDomain: "localhost:3000",
  projectId: "forecast-genius",
  storageBucket: "forecast-genius.appspot.com",
  messagingSenderId: "576029616915",
  appId: "1:576029616915:web:ec8fd9787f8fa2d16a08e6",
  measurementId: "G-30FM932JG6",

  clientId:
    "155408969199-isq8poe4lkj059130sf6vgsjj0lcsa2e.apps.googleusercontent.com",

  scopes: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
