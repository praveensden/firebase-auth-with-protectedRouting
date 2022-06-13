import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyA4kqFDCIoO6vxwyfnOgozxOFSUgF8GmOI",
  authDomain: "react-auth-c4d58.firebaseapp.com",
  projectId: "react-auth-c4d58",
  storageBucket: "react-auth-c4d58.appspot.com",
  messagingSenderId: "363525138978",
  appId: "1:363525138978:web:e75529e59d43dee8d5b87b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
