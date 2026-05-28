import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import type { FirebaseServiceStatus } from "../../types/firebase";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export function getFirebaseStatus(): FirebaseServiceStatus {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    return { state: "not_configured" };
  }

  return {
    state: "ready",
    projectId: firebaseConfig.projectId,
  };
}

export function getFirebaseApp(): FirebaseApp | null {
  if (getFirebaseStatus().state !== "ready") {
    return null;
  }

  return getApps()[0] ?? initializeApp(firebaseConfig);
}
