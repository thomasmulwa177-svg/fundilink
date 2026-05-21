import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOa2Btp04MwIby6epGndMbqgu2qIkpIdQ",
  authDomain: "fundilink-chat.firebaseapp.com",
  projectId: "fundilink-chat",
  storageBucket: "fundilink-chat.firebasestorage.app",
  messagingSenderId: "71381605004",
  appId: "1:71381605004:web:9c8b12f52715083e3fb9a9",
  measurementId: "G-1T1R4ZPHHE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
