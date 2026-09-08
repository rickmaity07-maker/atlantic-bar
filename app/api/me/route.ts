import { NextResponse } from "next/server";
import { getSession, isAdminEmail } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

/** Lets the client (Nav, AuthContext) find out its own role + phone-verified state. */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null });

  const doc = await getDb().collection("users").doc(session.uid).get();
  const data = doc.data();

  return NextResponse.json({
    user: {
      uid: session.uid,
      email: session.email,
      role: isAdminEmail(session.email) ? "admin" : "user",
      phoneVerified: data?.phoneVerified === true,
    },
  });
}
