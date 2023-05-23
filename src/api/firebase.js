import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHAzxauItc6Il5Rrl6TbjxQ0vsKaE4no8",
  authDomain: "oneclick-cf94d.firebaseapp.com",
  projectId: "oneclick-cf94d",
  storageBucket: "oneclick-cf94d.appspot.com",
  messagingSenderId: "841940651582",
  appId: "1:841940651582:web:6eddcdd01af9d687718b6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);