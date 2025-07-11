const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.resolve(__dirname, ''));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
