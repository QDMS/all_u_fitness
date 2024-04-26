// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHqyX06lao03WwcHFPGDmL-cUzFna_94w",
  authDomain: "allufitness-54a10.firebaseapp.com",
  projectId: "allufitness-54a10",
  storageBucket: "allufitness-54a10.appspot.com",
  messagingSenderId: "559913110799",
  appId: "1:559913110799:web:e160dc471d36c4cbf1827a",
  measurementId: "G-HYJK0EQ84F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);