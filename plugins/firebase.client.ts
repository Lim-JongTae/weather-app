import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDuFzkASHv71vgeolW4OxKUVPpH7hn7uKQ",
    authDomain: "foreset-vuetify.firebaseapp.com",
    databaseURL: "https://foreset-vuetify-default-rtdb.firebaseio.com",
    projectId: "foreset-vuetify",
    storageBucket: "foreset-vuetify.appspot.com",
    messagingSenderId: "442636137598",
    appId: "1:442636137598:web:21f11c7fcf89d3a47ed42f",
    measurementId: "G-C46M0LPZ4C"
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

