import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebaseAdmin";

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

export function getConfiguredAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getConfiguredAdminEmails().includes(email.trim().toLowerCase());
}

export async function getAdminSession(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) return null;
  return session;
}
