import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

const serviceAccountKey: any = serviceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: 'gs://carserviceproject-51b11.appspot.com'
});

const mauth = admin as unknown as admin.app.App;

export { mauth };
