import "server-only";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";

/**
 * Firestore-backed fixed-window rate limiter, safe across multiple
 * serverless instances (an in-memory Map only limits requests within a
 * single instance's memory, which doesn't hold on typical serverless
 * hosting). Runs as a transaction so two near-simultaneous requests from
 * the same key can't both slip through the same window.
 */
export async function checkRateLimit(
  key: string,
  { windowMs, maxRequests }: { windowMs: number; maxRequests: number }
): Promise<{ allowed: boolean }> {
  const db = getDb();
  const ref = db.collection("rateLimits").doc(key);
  const now = Date.now();

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data();
    const windowStartMs =
      data?.windowStart instanceof Timestamp ? data.windowStart.toMillis() : 0;

    if (!data || now - windowStartMs >= windowMs) {
      tx.set(ref, { count: 1, windowStart: FieldValue.serverTimestamp() });
      return { allowed: true };
    }

    if (data.count >= maxRequests) {
      return { allowed: false };
    }

    tx.update(ref, { count: FieldValue.increment(1) });
    return { allowed: true };
  });
}
