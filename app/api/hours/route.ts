import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";
import { BUSINESS_HOURS_DEFAULTS, DAY_ORDER, type BusinessHours } from "@/lib/businessHours";

export const dynamic = "force-dynamic";

export async function GET() {
  const doc = await getDb().collection("siteContent").doc("businessHours").get();
  const saved = doc.data()?.days as Partial<BusinessHours> | undefined;

  const hours: BusinessHours = { ...BUSINESS_HOURS_DEFAULTS };
  if (saved) {
    for (const day of DAY_ORDER) {
      const override = saved[day];
      if (
        override &&
        typeof override.open === "string" &&
        typeof override.close === "string" &&
        typeof override.closed === "boolean"
      ) {
        hours[day] = override;
      }
    }
  }

  return NextResponse.json({ hours });
}
