
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js";
import { getMessaging, getToken, onMessage, subscribeToTopic } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js";

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
          subscribeToTopic('noticias');

          // Envía el token al servidor
          sendTokenToServer(currentToken);
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



// Función para enviar el token al servidor
function sendTokenToServer(token) {
  fetch('./notificaction-server/send-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })  // Envía el token en el cuerpo de la solicitud
  })
    .then(response => {
      if (response.ok) {
        console.log('Token enviado al servidor correctamente');
      } else {
        console.error('Error al enviar el token al servidor');
      }
    })
    .catch(error => {
      console.error('Error al enviar el token al servidor:', error);
    });
}

// Función para suscribirse a un tema
function subscribeToTopic(topic) {
  fetch('./notificaction-server/suscribirse-al-tema', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      registrationTokens: [currentToken], // Usa el token actual del dispositivo
      topic: topic 
    })
  })
  .then(response => {
    if (response.ok) {
      console.log('Suscrito al tema ' + topic + ' correctamente');
    } else {
      console.error('Error al suscribirse al tema ' + topic);
    }
  })
  .catch(error => {
    console.error('Error al suscribirse al tema ' + topic + ':', error);
  });
}

// Función para desuscribirse de un tema
function unsubscribeFromTopic(topic) {
  fetch('./notificaction-server/desuscribirse-del-tema', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      registrationTokens: [currentToken], // Usa el token actual del dispositivo
      topic: topic
    })
  })
  .then(response => {
    if (response.ok) {
      console.log('Desuscrito del tema ' + topic + ' correctamente');
    } else {
      console.error('Error al desuscribirse del tema ' + topic);
    }
  })
  .catch(error => {
    console.error('Error al desuscribirse del tema ' + topic + ':', error);
  });
}

  function suscribirseAlTema() {
    const temaSeleccionado = document.getElementById('tema-select').value;
    subscribeToTopic(temaSeleccionado); 
  }
