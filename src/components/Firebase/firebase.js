// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBigtfd1xeWfUtxe8XT5R2BIqWEoSoeTdw",
  authDomain: "cannacare-9a7de.firebaseapp.com",
  projectId: "cannacare-9a7de",
  storageBucket: "cannacare-9a7de.appspot.com",
  messagingSenderId: "329735665888",
  appId: "1:329735665888:web:b71696f1326728d8f9b885",
  measurementId: "G-WC12M31T8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)