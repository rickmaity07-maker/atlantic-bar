import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

const RoleUpdateSchema = z.object({ role: z.enum(["user", "admin"]) });

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const parsed = RoleUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }
  const { role } = parsed.data;

  const db = getDb();
  const targetRef = db.collection("users").doc(id);
  const targetSnap = await targetRef.get();
  if (!targetSnap.exists) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  const targetWasAdmin = targetSnap.data()?.role === "admin";

  if (role === "user" && targetWasAdmin) {
    if (id === session.uid) {
      return NextResponse.json(
        { error: "You can't remove your own admin role." },
        { status: 400 }
      );
    }

    // Small accepted race window on two concurrent demotions targeting
    // different admins — acceptable at this app's scale (a single
    // location's admin panel, not a high-concurrency system).
    const adminCountSnap = await db.collection("users").where("role", "==", "admin").get();
    if (adminCountSnap.size <= 1) {
      return NextResponse.json(
        { error: "Cannot demote the last remaining admin." },
        { status: 400 }
      );
    }
  }

  await targetRef.set({ role, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return NextResponse.json({ ok: true });
}
