"use client"
import React, { useEffect, useState } from 'react';
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { toast } from 'react-toastify';
import { onMessgeListener } from './firebase';
import { Toast } from 'react-bootstrap';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV1houUWoiTApwYId-Gwa23uoK42vEywY",
  authDomain: "carservices-ac00c.firebaseapp.com",
  projectId: "carservices-ac00c",
  storageBucket: "carservices-ac00c.appspot.com",
  messagingSenderId: "1042279475181",
  appId: "1:1042279475181:web:3839e39010f73502b2a9e4",
  measurementId: "G-49V8B3EEQV"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestForToken = async () => {
  try {
    console.log("0")
    const serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const currentToken = await getToken(messaging, {
      vapidKey: "BHCIBPG7bC1J4e9PxKAxHWvFIS3UIxDOcOjG25Zs0JcVvxwPz2nkwcqCGvMj91LlFPXdPzlTs56jngkjkLdn80M",
      serviceWorkerRegistration
    });

    if (currentToken) {
      console.log("Token client:", currentToken);
    } else {
      console.log("No registration token available");
    }
  } catch (err) {
    console.error("Error while register token", err);
  }
};

const Notification = () => {
    const [notification, setNotification] = useState({title:"", body:""})

    const notify = () => toast(<ToastDisplay/>)

    const ToastDisplay = () => {
        return(
            <div>
                <p><b> {notification?.title}</b></p>
                <p> {notification?.body}</p>
            </div>
        )
    }

    useEffect(() => {
        if(notification?.title){
            notify()
        }
    }, [notification])

    requestForToken();

    onMessgeListener()
    .then((payload: any) => {
        setNotification({title : payload?.notification?.title, body : payload?.notification?.body})
    })
    .catch(err => console.log("error..............."))

  return <Toast/>
};

export default Notification;
