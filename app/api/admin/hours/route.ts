import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";
import { BUSINESS_HOURS_DEFAULTS, DAY_ORDER, type BusinessHours } from "@/lib/businessHours";

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

function validDay(value: unknown): value is { open: string; close: string; closed: boolean } {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.closed === "boolean" &&
    typeof v.open === "string" &&
    typeof v.close === "string" &&
    TIME_RE.test(v.open) &&
    TIME_RE.test(v.close)
  );
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const doc = await getDb().collection("siteContent").doc("businessHours").get();
  const saved = doc.data()?.days as Partial<BusinessHours> | undefined;

  const hours: BusinessHours = { ...BUSINESS_HOURS_DEFAULTS };
  if (saved) {
    for (const day of DAY_ORDER) {
      if (validDay(saved[day])) hours[day] = saved[day]!;
    }
  }

  return NextResponse.json({ hours });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const days = body?.days;
  if (!days || typeof days !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  for (const day of DAY_ORDER) {
    if (!validDay(days[day])) {
      return NextResponse.json({ error: `Missing or invalid hours for ${day}.` }, { status: 400 });
    }
  }

  await getDb().collection("siteContent").doc("businessHours").set(
    {
      days,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: session.uid,
    },
    { merge: true }
  );

  return NextResponse.json({ ok: true });
}
