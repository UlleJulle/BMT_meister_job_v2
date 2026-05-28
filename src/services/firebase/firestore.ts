import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp } from "./app";

export function getFirebaseFirestore(): Firestore | null {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}
