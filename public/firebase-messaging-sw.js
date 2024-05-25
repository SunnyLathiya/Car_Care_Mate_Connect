importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBV1houUWoiTApwYId-Gwa23uoK42vEywY",
  authDomain: "carservices-ac00c.firebaseapp.com",
  projectId: "carservices-ac00c",
  storageBucket: "carservices-ac00c.appspot.com",
  messagingSenderId: "1042279475181",
  appId: "1:1042279475181:web:3839e39010f73502b2a9e4",
  measurementId: "G-49V8B3EEQV"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
