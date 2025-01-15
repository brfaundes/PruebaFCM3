// Importa los scripts de Firebase
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');

// Inicializa Firebase en el Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyAy8KHTG-vxVDL2zQAngqVMfm65_kjl_2c",
    authDomain: "pruebafcm2-1ff55.firebaseapp.com",
    projectId: "pruebafcm2-1ff55",
    storageBucket: "pruebafcm2-1ff55.firebasestorage.app",
    messagingSenderId: "629866553995",
    appId: "1:629866553995:web:5348a020e2b51ad11fea8e",
    measurementId: "G-G0HBWKNCQE"
});

// Obtén una instancia de Firebase Messaging
const messaging = firebase.messaging();

// Maneja los mensajes entrantes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = 'Título de notificación';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});