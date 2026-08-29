import { z } from "zod";

// Requires https:// specifically (not just any URL scheme) — defense in
// depth alongside next.config.ts's images.remotePatterns, which is
// deliberately wildcarded to any https host so the admin can paste image
// links from anywhere. This stops http://, javascript:, data:, etc. from
// ever reaching Firestore.
export const HttpsImageUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((val) => val.startsWith("https://"), "Image URL must use https://");
