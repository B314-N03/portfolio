import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuADGIIf6JMQRB_m8x9J4183izi1vT6z0",
  authDomain: "portfoliowebsite-e6b8e.firebaseapp.com",
  projectId: "portfoliowebsite-e6b8e",
  storageBucket: "portfoliowebsite-e6b8e.appspot.com",
  messagingSenderId: "939267348733",
  appId: "1:939267348733:web:38994441cbd4160debc694",
  measurementId: "G-KJ8SJ0XE4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const auth = getAuth(app);

const functions = getFunctions(app);

const storage = getStorage(app);

const analytics = getAnalytics(app);

export { firestore, auth, functions, storage, analytics }