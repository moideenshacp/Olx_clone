// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwhvcc8EP4UqPXeLPbv0aGhWn20oQ86ow",
  authDomain: "olx-clone-df6b6.firebaseapp.com",
  projectId: "olx-clone-df6b6",
  storageBucket: "olx-clone-df6b6.appspot.com",
  messagingSenderId: "1096910426826",
  appId: "1:1096910426826:web:3d4585a537d9d1710f5a33"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)