import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// const serviceKey = require("@/service_key.json");

let app: App;

// if(getApps().length === 0){
//     app = initializeApp({
//         credential: cert(serviceKey)
//     })
// } else{
//     app = getApp();
// }

if (getApps().length === 0) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    app = getApp();
  }

const adminDb = getFirestore(app);

export {app as adminApp, adminDb}
