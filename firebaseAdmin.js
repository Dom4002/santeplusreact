// firebaseAdmin.js
const admin = require("firebase-admin");

if (!admin.apps.length) {
  // Correction : remplacer les \n littéraux par de vraies sauts de ligne
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  if (privateKey) {
    // Remplacer les \n par des retours à la ligne réels
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey
    })
  });
  console.log("✅ Firebase Admin initialisé");
}

const messaging = admin.messaging();

async function sendPush(token, title, body) {
    try {
        await messaging.send({
            token,
            notification: { title, body }
        });
        console.log("🔔 Notification envoyée");
        return true;
    } catch (err) {
        console.error("❌ Erreur push:", err.message);
        return false;
    }
}

module.exports = { sendPush };
