import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";
import { HttpsImageUrlSchema } from "@/lib/validation";

const MenuItemUpdateSchema = z.object({
  name: z.string().trim().min(1).max(80),
  note: z.string().trim().min(1).max(200),
  price: z.string().trim().min(1).max(10),
  imageUrl: HttpsImageUrlSchema,
  order: z.coerce.number().int().default(0),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const parsed = MenuItemUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await getDb()
    .collection("menuItems")
    .doc(id)
    .set({ ...parsed.data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await getDb().collection("menuItems").doc(id).delete();
  return NextResponse.json({ ok: true });
}