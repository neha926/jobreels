import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDb4ujQeIbY1OHx6-U--KK_kTRm8HWCckc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jobreels-c5a88.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jobreels-c5a88",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jobreels-c5a88.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "133150344995",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:133150344995:web:e903a22634c79d871aee96",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PLGX9XDZSD"
};

export const isFirebaseConfigured = true;

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
