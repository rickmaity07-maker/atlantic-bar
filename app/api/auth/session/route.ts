import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getDb } from "@/lib/firebaseAdmin";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS, isAdminEmail } from "@/lib/adminAuth";

/**
 * Called once right after every sign-in — email/password, Google, or
 * Facebook, doesn't matter which. It does two things:
 *  1. Creates (or updates) this user's profile at users/{uid} in Firestore.
 *     "role" is only ever set to "user" on first creation — later syncs
 *     never touch it, so an admin flag set by hand in the Firebase Console
 *     is never overwritten by a later login.
 *  2. Issues an httpOnly session cookie so server components (the admin
 *     dashboard, /api/me) can recognize the signed-in user without relying
 *     on client-side Firebase Auth state.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const idToken = body?.idToken;
  if (!idToken || typeof idToken !== "string") {
    return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });
  }

  const auth = getAdminAuth();
  let decoded;
  try {
    decoded = await auth.verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json({ error: "Invalid or expired sign-in." }, { status: 401 });
  }

  const db = getDb();
  const userRef = db.collection("users").doc(decoded.uid);
  const existing = await userRef.get();
  const phoneVerifiedNow = Boolean(decoded.phone_number);

  if (!existing.exists) {
    await userRef.set({
      email: decoded.email ?? null,
      displayName: decoded.name ?? null,
      role: isAdminEmail(decoded.email) ? "admin" : "user",
      phoneNumber: decoded.phone_number ?? null,
      phoneVerified: phoneVerifiedNow,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  } else {
    const prev = existing.data() ?? {};
    await userRef.set(
      {
        email: decoded.email ?? null,
        displayName: decoded.name ?? null,
        phoneNumber: decoded.phone_number ?? prev.phoneNumber ?? null,
        phoneVerified: phoneVerifiedNow || prev.phoneVerified === true,
        updatedAt: FieldValue.serverTimestamp(),
        role: isAdminEmail(decoded.email) ? "admin" : "user",
      },
      { merge: true }
    );
  }

  const profile = (await userRef.get()).data();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });

  const res = NextResponse.json({
    ok: true,
    role: isAdminEmail(decoded.email) ? "admin" : "user",
    phoneVerified: profile?.phoneVerified === true,
  });
  res.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_MS / 1000,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
