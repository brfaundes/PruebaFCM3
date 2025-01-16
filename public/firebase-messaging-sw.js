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
  
  const notificationTitle = payload.notification.title || 'Título de notificación';
  const notificationOptions = {
    body: payload.notification.body ||'Background Message body.',
    icon: payload.notification.image ||'/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// *** Manejar la suscripción a temas ***
self.addEventListener('message', (event) => {
  if (event.data.action === 'subscribeToTopic') {
    const topic = event.data.topic;

    // Obtener el token de registro en el service worker
    messaging.getToken({ vapidKey: 'BCeOs69A8M8kvXp4Bzp81bVfdQj8n80Mn0ui4kSLS2raawes1WS5ob4-F0Hx7Lk3UjQvO780T63fHg0Ow_eiuOw' })
      .then((token) => {
        if (token) {
          messaging.subscribeToTopic(token, topic)
            .then(() => {
              console.log('Suscrito al tema ' + topic + ' en el service worker');
            })
            .catch((error) => {
              console.error('Error al suscribirse al tema en el service worker: ', error);
            });
        } else {
          console.log('No se pudo obtener el token de registro en el service worker.');
        }
      })
      .catch((err) => {
        console.log('Error al obtener el token de registro en el service worker:', err);
      });
  }
});

// Maneja los mensajes entrantes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'Título de notificación';
  const notificationOptions = {
    body: payload.notification.body ||'Background Message body.',
    icon: payload.notification.image ||'/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

/*
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
  
  const notificationTitle = payload.notification.title || 'Título de notificación';
  const notificationOptions = {
    body: payload.notification.body ||'Background Message body.',
    icon: payload.notification.image ||'/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
*/