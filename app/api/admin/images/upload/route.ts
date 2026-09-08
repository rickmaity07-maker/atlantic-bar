import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { getAdminSession } from "@/lib/adminAuth";
import { getAdminApp, getDb } from "@/lib/firebaseAdmin";
import { SITE_IMAGE_DEFAULTS } from "@/lib/siteContent";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const form = await req.formData();
  const key = String(form.get("key") ?? "");
  const file = form.get("file");

  if (!(key in SITE_IMAGE_DEFAULTS)) {
    return NextResponse.json({ error: "Invalid image key." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose an image." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Use JPG, PNG, WEBP or AVIF." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 400 });
  }

  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucketName) {
    return NextResponse.json(
      { error: "FIREBASE_STORAGE_BUCKET is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1] ?? "bin";
    const path = `site-images/${key}-${Date.now()}.${extension}`;
    const bucket = getStorage(getAdminApp()).bucket(bucketName);
    const object = bucket.file(path);

    await object.save(bytes, {
      metadata: {
        contentType: file.type,
        cacheControl: "public,max-age=31536000,immutable",
      },
      resumable: false,
    });
    await object.makePublic();

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${path
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`;

    await getDb().collection("siteContent").doc(key).set(
      { imageUrl, updatedAt: new Date(), updatedBy: session.uid },
      { merge: true }
    );

    return NextResponse.json({ ok: true, key, imageUrl });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed. Check Firebase Storage and FIREBASE_STORAGE_BUCKET." },
      { status: 500 }
    );
  }
}
