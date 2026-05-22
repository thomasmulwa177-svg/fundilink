import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 PASTE YOUR CONFIG HERE (from Firebase console)
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE",
};

const app = initializeApp(firebaseConfig);

// export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
