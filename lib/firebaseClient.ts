"use client";

import { initializeApp, getApps, type FirebaseOptions, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, type Auth } from "firebase/auth";

// This config is safe to expose in the browser — it identifies the Firebase
// project, it doesn't grant access on its own. Actual access control happens
// server-side: the admin allowlist in lib/adminAuth.ts and Firestore's
// deny-all rules for everything except the Admin SDK.
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;

// Lazily initialized — never runs at import/build time, only when a
// component actually needs to sign in. Avoids build failures in
// environments where NEXT_PUBLIC_FIREBASE_* isn't set yet.
export function getClientAuth(): Auth {
  if (!authInstance) {
    if (!firebaseConfig.apiKey) {
      throw new Error(
        "Firebase client config is missing. Set NEXT_PUBLIC_FIREBASE_* env vars."
      );
    }
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
    authInstance = getAuth(app);
  }
  return authInstance;
}

export function newGoogleProvider() {
  return new GoogleAuthProvider();
}

export function newFacebookProvider() {
  return new FacebookAuthProvider();
}
