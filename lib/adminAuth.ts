import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth, getDb } from "@/lib/firebaseAdmin";

export const SESSION_COOKIE_NAME = "session";
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5;

export interface SessionUser {
  uid: string;
  email: string | null;
}

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
 * Admin access is granted ONLY by users/{uid}.role === "admin" in Firestore.
 * To promote someone: they sign in normally (which creates their user doc),
 * then you edit role from "user" to "admin" in the Firebase Console.
 */
export async function getAdminSession(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;

  const doc = await getDb().collection("users").doc(session.uid).get();
  if (doc.data()?.role !== "admin") return null;

  return session;
}
