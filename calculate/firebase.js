// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzZVKeHHLGIdgrYz7Np3XHEPsk7FbhLIE",
  authDomain: "healthy-food-938d3.firebaseapp.com",
  projectId: "healthy-food-938d3",
  storageBucket: "healthy-food-938d3.appspot.com",
  messagingSenderId: "88881865492",
  appId: "1:88881865492:web:0957c85928202e9c8d9801",
  measurementId: "G-YJ7VXRSBK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);