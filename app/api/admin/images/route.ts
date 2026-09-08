import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";
import { SITE_IMAGE_DEFAULTS, type SiteImageKey } from "@/lib/siteContent";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const snap = await getDb().collection("siteContent").get();
  const images = Object.fromEntries(
    Object.entries(SITE_IMAGE_DEFAULTS).map(([key, fallback]) => [key, fallback])
  );

  for (const doc of snap.docs) {
    const data = doc.data();
    if (typeof data.imageUrl === "string" && data.imageUrl.trim() && doc.id in images) {
      images[doc.id as SiteImageKey] = data.imageUrl;
    }
  }
  return NextResponse.json({ images });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const key = String(body?.key ?? "");
  const imageUrl = typeof body?.imageUrl === "string" ? body.imageUrl.trim() : "";

  if (!(key in SITE_IMAGE_DEFAULTS) || !imageUrl) {
    return NextResponse.json({ error: "Invalid image key or URL." }, { status: 400 });
  }

  await getDb().collection("siteContent").doc(key).set(
    { imageUrl, updatedAt: FieldValue.serverTimestamp(), updatedBy: session.uid },
    { merge: true }
  );

  return NextResponse.json({ ok: true, key, imageUrl });
}
