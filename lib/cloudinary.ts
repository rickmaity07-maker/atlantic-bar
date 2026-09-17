import "server-only";
import { v2 as cloudinary, type UploadApiErrorResponse, type UploadApiResponse } from "cloudinary";

let configured = false;

function ensureConfigured() {
  if (configured) return;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  configured = true;
}

/**
 * Upload an image buffer to Cloudinary and return the secure HTTPS URL.
 * folder is namespaced under atlantic-lounge/ so assets stay organized.
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  options: {
    folder: string;
    publicId?: string;
    contentType?: string;
  }
): Promise<{ imageUrl: string; publicId: string }> {
  ensureConfigured();

  const folder = `atlantic-lounge/${options.folder}`.replace(/\/+/g, "/");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: options.publicId,
        resource_type: "image",
        overwrite: true,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Cloudinary upload returned no URL."));
          return;
        }
        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
}