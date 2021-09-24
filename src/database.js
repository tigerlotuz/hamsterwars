const admin = require("firebase-admin");
let serviceAccount;

if (process.env.FIREBASE_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
} else {
  serviceAccount = require("./secrets/firebase-key.json");
}

function connect() {
  const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();
  const db = admin.firestore();
  return db;
}

module.exports = { connect };
