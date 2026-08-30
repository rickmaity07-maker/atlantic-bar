import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth, getDb } from "@/lib/firebaseAdmin";

export const SESSION_COOKIE_NAME = "session";
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5; // 5 days (Firebase's cap is 14 days)

export interface SessionUser {
  uid: string;
  email: string | null;
}

/**
 * Reads and verifies the session cookie set by /api/auth/session after any
 * sign-in (email/password, Google, or Facebook — same cookie for everyone).
 * Returns the signed-in user, or null if there's no valid session.
 */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    return { uid: decoded.uid, email: decoded.email ?? null };
  } catch {
    return null;
  }
}

/**
 * Same as getSession(), but additionally requires that the user's Firestore
 * profile (users/{uid}) has role === "admin". This is the ONLY thing that
 * grants admin access — there's no separate admin login anymore. To make
 * someone an admin: they sign in normally through /login, which creates
 * their users/{uid} document, then you open Firebase Console → Firestore →
 * users → their document → change role from "user" to "admin".
 */
export async function getAdminSession(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;

  const doc = await getDb().collection("users").doc(session.uid).get();
  if (doc.data()?.role !== "admin") return null;

  return session;
}
