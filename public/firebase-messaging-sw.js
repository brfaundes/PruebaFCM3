import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAy8KHTG-vxVDL2zQAngqVMfm65_kjl_2c",
    authDomain: "pruebafcm2-1ff55.firebaseapp.com",
    projectId: "pruebafcm2-1ff55",
    storageBucket: "pruebafcm2-1ff55.firebasestorage.app",
    messagingSenderId: "629866553995",
    appId: "1:629866553995:web:5348a020e2b51ad11fea8e",
    measurementId: "G-G0HBWKNCQE"
});

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});