import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0OIMz-wGXLV5lJpjFQrMpIyhcbVCPajY",
    authDomain: "notion-clone-f3df1.firebaseapp.com",
    projectId: "notion-clone-f3df1",
    storageBucket: "notion-clone-f3df1.firebasestorage.app",
    messagingSenderId: "571837886506",
    appId: "1:571837886506:web:bec0266a3db38055e45353"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

  const db = getFirestore(app);

  export {db};