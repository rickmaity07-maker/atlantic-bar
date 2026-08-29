import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";
import { HttpsImageUrlSchema } from "@/lib/validation";

const GalleryItemUpdateSchema = z.object({
  label: z.string().trim().min(1).max(60),
  imageUrl: HttpsImageUrlSchema,
  span: z.enum(["normal", "wide", "large"]).default("normal"),
  order: z.coerce.number().int().default(0),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const parsed = GalleryItemUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await getDb()
    .collection("galleryImages")
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
  await getDb().collection("galleryImages").doc(id).delete();
  return NextResponse.json({ ok: true });
}