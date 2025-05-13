import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Check if we're in a development/preview environment
const isDevelopment = process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY

// Use mock configuration for development/preview
const firebaseConfig = isDevelopment
  ? {
      // Mock values for development/preview
      apiKey: "demo-api-key",
      authDomain: "demo-app.firebaseapp.com",
      projectId: "demo-app",
      storageBucket: "demo-app.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef123456789",
    }
  : {
      // Real values from environment variables
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Set up mock implementations for development/preview
if (isDevelopment) {
  // Mock auth functions
  auth.currentUser = null

  // Override auth methods with mock implementations
  const originalCreateUserWithEmailAndPassword = auth.createUserWithEmailAndPassword
  const originalSignInWithEmailAndPassword = auth.signInWithEmailAndPassword
  const originalSignOut = auth.signOut

  // @ts-ignore - Mock implementation
  auth.createUserWithEmailAndPassword = async (email, password) => {
    console.log("Mock: Creating user with email", email)
    return {
      user: {
        uid: "mock-uid-" + Math.random().toString(36).substring(2, 9),
        email,
        emailVerified: false,
      },
    }
  }

  // @ts-ignore - Mock implementation
  auth.signInWithEmailAndPassword = async (email, password) => {
    console.log("Mock: Signing in user with email", email)
    return {
      user: {
        uid: "mock-uid-" + Math.random().toString(36).substring(2, 9),
        email,
        emailVerified: true,
      },
    }
  }

  // @ts-ignore - Mock implementation
  auth.signOut = async () => {
    console.log("Mock: Signing out user")
    return Promise.resolve()
  }
}

export { app, auth, db, storage }
