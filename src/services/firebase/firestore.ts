import { getFirestore, type Firestore } from "firebase/firestore/lite";
import { getFirebaseApp } from "./app";

function getFirestoreDatabaseId() {
  const databaseId = import.meta.env.VITE_FIRESTORE_DATABASE_ID;

  if (typeof databaseId !== "string") {
    return null;
  }

  const trimmed = databaseId.trim();
  return trimmed ? trimmed : null;
}

export function getFirebaseFirestore(): Firestore | null {
  const app = getFirebaseApp();

  if (!app) {
    return null;
  }

  const databaseId = getFirestoreDatabaseId();
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
}
