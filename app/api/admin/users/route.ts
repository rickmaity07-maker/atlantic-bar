import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const snap = await getDb().collection("users").orderBy("createdAt", "desc").limit(500).get();
  const users = snap.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      email: d.email ?? null,
      displayName: d.displayName ?? null,
      role: d.role ?? "user",
      phoneVerified: d.phoneVerified === true,
      createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : null,
    };
  });

  // currentUid lets the client grey out the signed-in admin's own row — the
  // server enforces the same rule regardless in [id]/route.ts.
  return NextResponse.json({ users, currentUid: session.uid });
}
