import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

// Public â€” this is just the drink menu shown on the site, not sensitive data.
export async function GET() {
  const snap = await getDb().collection("menuItems").orderBy("order", "asc").get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}
