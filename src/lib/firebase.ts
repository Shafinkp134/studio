import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYk0O8yBnkX53YUM3tNaUtqMbBEm6MAaM",
  authDomain: "pusshy-74dd5.firebaseapp.com",
  projectId: "pusshy-74dd5",
  storageBucket: "pusshy-74dd5.appspot.com",
  messagingSenderId: "878254098469",
  appId: "1:878254098469:web:8be4176a790d9b39e257cc",
  measurementId: "G-SD2ZY2J0FM"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
