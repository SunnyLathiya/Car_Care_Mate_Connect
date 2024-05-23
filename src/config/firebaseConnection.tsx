import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

// Ensure serviceAccount is of type any since TypeScript doesn't support JSON as a type assertion.
const serviceAccountKey: any = serviceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: 'gs://carserviceproject-51b11.appspot.com'
});

// Type assertion to specify the type of mauth
const mauth = admin as unknown as admin.app.App;

export { mauth };
