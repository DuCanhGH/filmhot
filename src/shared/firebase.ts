import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import invariant from "tiny-invariant";

invariant(
  import.meta.env.VITE_FIREBASE_CONFIG,
  "Environment variable VITE_FIREBASE_CONFIG must be set.",
);

export const firebaseApp = initializeApp(
  JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string),
);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
