import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import { SITE_IMAGE_DEFAULTS } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export async function GET() {
  const snap = await getDb().collection("siteContent").get();
  const images: Record<string, string> = { ...SITE_IMAGE_DEFAULTS };

  for (const doc of snap.docs) {
    const data = doc.data();
    if (typeof data.imageUrl === "string" && data.imageUrl.trim() && doc.id in images) {
      images[doc.id] = data.imageUrl;
    }
  }

  return NextResponse.json({ images });
}

export async function PUT(req: NextRequest) {
  // Public reads are fine; writes are never accepted here.
  return NextResponse.json({ error: "Use the admin image endpoint." }, { status: 405 });
}
