import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * AI Secure Password Manager - Firebase Configuration
 * 
 * IMPORTANT: Replace the placeholder values with your real Firebase Project configuration.
 * You can find these in the Firebase Console: Project Settings > General > Your apps.
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);
