import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Wide open so the client can paste an image link from anywhere
      // (their phone's cloud storage, Imgur, Cloudinary, etc.) via the
      // admin dashboard without ever needing a code change.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;