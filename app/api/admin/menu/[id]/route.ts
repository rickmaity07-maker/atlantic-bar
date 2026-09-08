import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";
import { DEFAULT_ITEMS, type MenuCategory } from "@/lib/defaultMenu";

const CATEGORIES: MenuCategory[] = [
  "signature",
  "classics",
  "spirits",
  "wine",
  "champagne",
  "nonAlcoholic",
  "barSnacks",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const category = body?.category;
  const name = String(body?.name ?? "").trim();
  const note = String(body?.note ?? "").trim();
  const price = String(body?.price ?? "").trim();
  const imageUrl = String(body?.imageUrl ?? "").trim();
  const order = Number(body?.order ?? 0);

  if (!CATEGORIES.includes(category) || !name || !note || !price || !imageUrl || !Number.isInteger(order)) {
    return NextResponse.json({ error: "Please complete all menu fields." }, { status: 400 });
  }

  await getDb().collection("menuItems").doc(id).set(
    {
      category,
      name,
      note,
      price,
      imageUrl,
      order,
      hidden: false,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: session.uid,
    },
    { merge: true }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const isDefault = CATEGORIES.some((category) =>
    DEFAULT_ITEMS[category].some((item) => {
      const slug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return `${slug(category)}-${slug(item.name)}` === id;
    })
  );

  if (isDefault) {
    await getDb().collection("menuItems").doc(id).set(
      { hidden: true, updatedAt: FieldValue.serverTimestamp(), updatedBy: session.uid },
      { merge: true }
    );
  } else {
    await getDb().collection("menuItems").doc(id).delete();
  }

  return NextResponse.json({ ok: true });
}
