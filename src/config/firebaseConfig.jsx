import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO5SZiR8Sj9Iv5ZEZbwROnTXKU6aZWa2o",
  authDomain: "prepwise-7760f.firebaseapp.com",
  projectId: "prepwise-7760f",
  storageBucket: "prepwise-7760f.firebasestorage.app",
  messagingSenderId: "654359795034",
  appId: "1:654359795034:web:f93692e180d8d66f414f63",
  measurementId: "G-RLPH4GHQ6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
