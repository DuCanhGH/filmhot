import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import invariant from "tiny-invariant";

invariant(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG,
  "Environment variable NEXT_PUBLIC_FIREBASE_CONFIG must be set."
);

export const firebaseApp = initializeApp(
  JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string)
);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
