import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { getDb, getAdminAuth } from "@/lib/firebaseAdmin";

// Basic in-memory rate limit (per server instance). Good enough to stop
// accidental double-submits and light abuse; not a substitute for a WAF.
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

const ReservationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  date: z
    .string()
    .trim()
    .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid date"),
  guests: z.coerce.number().int().min(1).max(50),
  // honeypot field — real users never fill this in
  company: z.string().max(0).optional().default(""),
});

export async function POST(req: NextRequest) {
  // Require a signed-in customer — every reservation must be tied to a
  // real account so the form can't be spammed anonymously.
  const authHeader = req.headers.get("authorization");
  const idToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json({ error: "Your sign-in has expired — please sign in again." }, { status: 401 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const lastSubmit = recentSubmissions.get(ip);
  if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { error: "Please wait a moment before submitting again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = ReservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }
  const { name, date, guests } = parsed.data;

  try {
    const db = getDb();
    const docRef = await db.collection("reservations").add({
      name,
      date,
      guests,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
      sourceIp: ip,
      userId: decoded.uid,
      userEmail: decoded.email ?? null,
    });

    // Email notification — non-fatal if it fails; the reservation is
    // already saved in Firestore either way.
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.RESERVATION_NOTIFY_EMAIL;
    if (resendKey && notifyEmail) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "Atlantic Lounge Bar <onboarding@resend.dev>",
          to: notifyEmail,
          subject: `New reservation request — ${name}`,
          text: [
            `New reservation request via the website:`,
            ``,
            `Name: ${name}`,
            `Date: ${date}`,
            `Guests: ${guests}`,
            `Reservation ID: ${docRef.id}`,
          ].join("\n"),
        });
      } catch (emailErr) {
        console.error("Reservation email failed to send:", emailErr);
      }
    }

    recentSubmissions.set(ip, Date.now());
    return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("Reservation submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your reservation. Please try again." },
      { status: 500 }
    );
  }
}
