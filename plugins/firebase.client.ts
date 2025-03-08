import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: "foreset-vuetify",
    storageBucket: "foreset-vuetify.appspot.com",
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId as string,
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
return {
  provide: {
    firebaseApp: app,
    db
  }
}
})

