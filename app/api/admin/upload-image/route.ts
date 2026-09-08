import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { getAdminSession } from "@/lib/adminAuth";
import { getAdminApp } from "@/lib/firebaseAdmin";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "uploads").replace(/[^a-z0-9_-]/gi, "");

  if (!(file instanceof File)) return NextResponse.json({ error: "Please choose an image." }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: "Use JPG, PNG, WEBP or AVIF." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 400 });

  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucketName) return NextResponse.json({ error: "FIREBASE_STORAGE_BUCKET is not configured." }, { status: 500 });

  try {
    const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1] ?? "bin";
    const path = `admin-uploads/${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const bucket = getStorage(getAdminApp()).bucket(bucketName);
    const object = bucket.file(path);

    await object.save(Buffer.from(await file.arrayBuffer()), {
      metadata: { contentType: file.type, cacheControl: "public,max-age=31536000,immutable" },
      resumable: false,
    });
    await object.makePublic();

    return NextResponse.json({
      ok: true,
      imageUrl: `https://storage.googleapis.com/${bucket.name}/${path.split("/").map(encodeURIComponent).join("/")}`,
    });
  } catch (error) {
    console.error("Generic image upload failed:", error);
    return NextResponse.json({ error: "Upload failed. Check Firebase Storage configuration." }, { status: 500 });
  }
}
