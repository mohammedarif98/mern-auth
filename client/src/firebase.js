
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authentication-8cbd2.firebaseapp.com",
  projectId: "mern-authentication-8cbd2",
  storageBucket: "mern-authentication-8cbd2.appspot.com",
  messagingSenderId: "920987200849",
  appId: "1:920987200849:web:a98aebf722ab457329b770"
};


export const app = initializeApp(firebaseConfig);