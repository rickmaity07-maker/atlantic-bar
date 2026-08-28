import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebaseAdmin";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5; // 5 days (Firebase's cap is 14 days)

function getAllowedAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(email: string | undefined | null): boolean {
  if (!email) return false;
  return getAllowedAdminEmails().includes(email.toLowerCase());
}

/**
 * Reads and verifies the admin session cookie on the server. Returns the
 * session (uid + email) if valid AND the email is on the ADMIN_EMAILS
 * allowlist, otherwise null. Use this in server components/route handlers
 * to gate access — never trust a signed-in Firebase user alone, since
 * anyone can create an account unless email/password sign-up is restricted
 * in the Firebase Console.
 */
export async function getAdminSession(): Promise<{ uid: string; email: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    if (!isEmailAllowed(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email! };
  } catch {
    return null;
  }
}
