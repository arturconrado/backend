import * as admin from 'firebase-admin';

const serviceAccount = require('../config/firebaseServiceAccountKey.json'); // Verifique se o caminho está correto

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const auth = admin.auth();

export { auth };
