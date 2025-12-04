import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDmDdMJHjh_3CxRdIiZn6gpVFTWc18Gogw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "docketmarketingtools.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "docketmarketingtools",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "docketmarketingtools.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "816013396582",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:816013396582:web:ef1ddd413e4a97e9ebbba7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HCG4TVT83E"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Restrict to docketai.com domain
googleProvider.setCustomParameters({
  hd: 'docketai.com' // This hints to Google to show only docketai.com accounts
})
