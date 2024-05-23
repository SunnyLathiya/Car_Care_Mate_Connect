import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBV1houUWoiTApwYId-Gwa23uoK42vEywY",
  authDomain: "carservices-ac00c.firebaseapp.com",
  projectId: "carservices-ac00c",
  storageBucket: "carservices-ac00c.appspot.com",
  messagingSenderId: "1042279475181",
  appId: "1:1042279475181:web:3839e39010f73502b2a9e4",
  measurementId: "G-49V8B3EEQV",
};

export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const messaging = getMessaging();


export const onMessgeListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("onMessage Payload", payload);

      resolve(payload);
    });
  });
};
