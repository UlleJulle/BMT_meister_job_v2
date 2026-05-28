import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFirebaseApp } from "./app";

export function getFirebaseStorage(): FirebaseStorage | null {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
}
