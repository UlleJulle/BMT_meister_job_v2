import { getFunctions, type Functions } from "firebase/functions";
import { getFirebaseApp } from "./app";

export function getFirebaseFunctions(): Functions | null {
  const app = getFirebaseApp();
  return app ? getFunctions(app) : null;
}
