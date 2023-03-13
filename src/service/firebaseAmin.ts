export const admin = require("firebase-admin");

const serviceAccount = require("../secrets/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
