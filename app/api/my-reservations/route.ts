import { NextResponse } from "next/server";
import { getSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const snap = await getDb()
    .collection("reservations")
    .where("userId", "==", session.uid)
    .limit(100)
    .get();

  const reservations = snap.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "",
        date: data.date ?? "",
        guests: data.guests ?? 0,
        status: data.status ?? "pending",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  return NextResponse.json({ reservations });
}
