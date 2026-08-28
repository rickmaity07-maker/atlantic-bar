import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import { isEmailAllowed, SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const idToken = body?.idToken;
  if (!idToken || typeof idToken !== "string") {
    return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });
  }

  const auth = getAdminAuth();

  let decoded;
  try {
    // checkRevoked: true — respects revoked tokens immediately
    decoded = await auth.verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json({ error: "Invalid or expired sign-in." }, { status: 401 });
  }

  if (!isEmailAllowed(decoded.email)) {
    return NextResponse.json(
      { error: "This account is not authorized for admin access." },
      { status: 403 }
    );
  }

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });

  const res = NextResponse.json({ ok: true });
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
