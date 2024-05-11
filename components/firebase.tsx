// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCwdIYBqRWLdjPYfdIsTMH07Exf7zeKm2w",
//   authDomain: "carcaremateconnect.firebaseapp.com",
//   projectId: "carcaremateconnect",
//   storageBucket: "carcaremateconnect.appspot.com",
//   messagingSenderId: "104137145277",
//   appId: "1:104137145277:web:a91dcc9b55ddad7f9570d4",
//   measurementId: "G-ENL1MZPFTG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// web app's Firebase configuratio
const firebaseConfig = {
  apiKey: "AIzaSyCBHk5T5x9eCR8Du1iRHK347zyUCVxspFA",
  authDomain: "crms-a8fa8.firebaseapp.com",
  projectId: "crms-a8fa8",
  storageBucket: "crms-a8fa8.appspot.com",
  messagingSenderId: "314295375081",
  appId: "1:314295375081:web:f6b0f617b5ee8ca9cbcc78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)