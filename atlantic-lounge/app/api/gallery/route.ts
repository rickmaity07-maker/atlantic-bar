import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

// Public — gallery photos shown on the site, not sensitive data.
export async function GET() {
  const snap = await getDb().collection("galleryImages").orderBy("order", "asc").get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}
