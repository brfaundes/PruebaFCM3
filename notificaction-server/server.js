const express = require('express');
const admin = require('firebase-admin');

const app = express();

// Inicializa Firebase Admin SDK con tus credenciales
const serviceAccount = require('./firebase-credentials.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json()); 

// Ruta para enviar notificaciones (tu ruta existente)
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    await admin.messaging().send(message);
    res.status(200).send('Notificación enviada correctamente');
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
    res.status(500).send('Error al enviar la notificación');
  }
});

// Ruta para suscribirse a un tema
app.post('/suscribirse-al-tema', async (req, res) => {
  const { registrationTokens, topic } = req.body; 

  try {
    const response = await admin.messaging().subscribeToTopic(registrationTokens, topic);
    console.log('Suscrito al tema correctamente:', response);
    res.status(200).send('Suscrito al tema correctamente');
  } catch (error) {
    console.error('Error al suscribirse al tema:', error);
    res.status(500).send('Error al suscribirse al tema');
  }
});

// Rueva ruta para desuscribirse de un tema
app.post('/desuscribirse-del-tema', async (req, res) => {
  const { registrationTokens, topic } = req.body;

  try {
    const response = await admin.messaging().unsubscribeFromTopic(registrationTokens, topic);
    console.log('Desuscrito del tema correctamente:', response);
    res.status(200).send('Desuscrito del tema correctamente');
  } catch (error) {
    console.error('Error al desuscribirse del tema:', error);
    res.status(500).send('Error al desuscribirse del tema');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});