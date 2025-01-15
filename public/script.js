import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging.js";

// Inicializa Firebase en el cliente
const firebaseConfig = {
    apiKey: "AIzaSyAy8KHTG-vxVDL2zQAngqVMfm65_kjl_2c",
    authDomain: "pruebafcm2-1ff55.firebaseapp.com",
    projectId: "pruebafcm2-1ff55",
    storageBucket: "pruebafcm2-1ff55.firebasestorage.app",
    messagingSenderId: "629866553995",
    appId: "1:629866553995:web:5348a020e2b51ad11fea8e",
    measurementId: "G-G0HBWKNCQE"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
window.currentToken = null;


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Navegador registrado:', registration);

      const token = getToken(messaging, {
        vapidKey: "BCeOs69A8M8kvXp4Bzp81bVfdQj8n80Mn0ui4kSLS2raawes1WS5ob4-F0Hx7Lk3UjQvO780T63fHg0Ow_eiuOw",
        serviceWorkerRegistration: registration
      });

      console.log(token);
    });
}



Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Permiso de notificaciones concedido.');
    getToken(messaging, { vapidKey: 'BCeOs69A8M8kvXp4Bzp81bVfdQj8n80Mn0ui4kSLS2raawes1WS5ob4-F0Hx7Lk3UjQvO780T63fHg0Ow_eiuOw' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token de registro:', currentToken);
          document.getElementById('token').textContent = currentToken; 
          // Envía el token a tu servidor si es necesario
        } else {
          document.getElementById('token').textContent = currentToken; 
          console.log('No se pudo obtener el token de registro.');
        }
      })
      .catch((err) => {
        console.log('Error al obtener el token de registro:', err);
      });
  } else {
    console.log('Permiso de notificaciones denegado.');
  }
});

// Manejo de mensajes en primer plano
onMessage(messaging, (payload) => {
  console.log('Mensaje recibido:', payload);
  // Muestra una notificación o realiza alguna acción con el mensaje
});


// Registrar el Service Worker
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registro correcto del service worker:', registration.scope);
    })
    .catch(function(error) {
      console.log('Error al registrar el Service Worker:', error);
    });
}
*/

/*
// Solicita permisos de notificación
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Permiso de notificaciones concedido.');
    getToken(messaging, { vapidKey: 'BCeOs69A8M8kvXp4Bzp81bVfdQj8n80Mn0ui4kSLS2raawes1WS5ob4-F0Hx7Lk3UjQvO780T63fHg0Ow_eiuOw' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token de registro:', currentToken);
          document.getElementById('token').textContent = currentToken; 
          // Envía el token a tu servidor si es necesario
        } else {
          document.getElementById('token').textContent = currentToken; 
          console.log('No se pudo obtener el token de registro.');
        }
      })
      .catch((err) => {
        console.log('Error al obtener el token de registro:', err);
      });
  } else {
    console.log('Permiso de notificaciones denegado.');
  }
});

// Manejo de mensajes en primer plano
onMessage(messaging, (payload) => {
  console.log('Mensaje recibido:', payload);
  // Muestra una notificación o realiza alguna acción con el mensaje
});
*/
