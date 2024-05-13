// import { initializeApp } from "firebase/app";
// import {getStorage} from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyCBHk5T5x9eCR8Du1iRHK347zyUCVxspFA",
//   authDomain: "crms-a8fa8.firebaseapp.com",
//   projectId: "crms-a8fa8",
//   storageBucket: "crms-a8fa8.appspot.com",
//   messagingSenderId: "314295375081",
//   appId: "1:314295375081:web:f6b0f617b5ee8ca9cbcc78"
// };

// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app)



import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAnqGw9wMsnZB4udbDvhw64_1bzMLUFKFg",
//   authDomain: "carservice-832a4.firebaseapp.com",
//   projectId: "carservice-832a4",
//   storageBucket: "carservice-832a4.appspot.com",
//   messagingSenderId: "211967033948",
//   appId: "1:211967033948:web:98b6c2a97d4ef2e8ec5c99"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAmKi-PJEfZq79xxIbcWZuMi3HXOQbcXFk",
  authDomain: "carserviceproject-51b11.firebaseapp.com",
  projectId: "carserviceproject-51b11",
  storageBucket: "carserviceproject-51b11.appspot.com",
  messagingSenderId: "326612265513",
  appId: "1:326612265513:web:746e84bca3cd4aea4b0a38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
