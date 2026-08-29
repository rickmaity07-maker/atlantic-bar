import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Built from what this app's auth flows actually load: Firebase Auth's
// popup sign-in + hidden *.firebaseapp.com auth-helper iframe, Google and
// Facebook OAuth, invisible reCAPTCHA for phone verification
// (login/verify-phone), and next.config.ts's own wildcard-https image
// hosting (admin pastes image links from anywhere). No nonce-based CSP —
// that requires opting the whole app into dynamic rendering (see Next.js's
// CSP guide), not worth it for a mostly-static marketing site.
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://www.google.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https: data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.google.com https://www.gstatic.com https://connect.facebook.net https://graph.facebook.com",
  "frame-src https://accounts.google.com https://apis.google.com https://www.google.com https://*.firebaseapp.com https://staticxx.facebook.com https://www.facebook.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Wide open so the client can paste an image link from anywhere
      // (their phone's cloud storage, Imgur, Cloudinary, etc.) via the
      // admin dashboard without ever needing a code change.
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Superseded by CSP's frame-ancestors below, but kept for older
      // browsers that don't honor frame-ancestors.
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      { key: "Content-Security-Policy", value: CSP_DIRECTIVES },
    ];
    if (isProd) {
      // includeSubDomains only, not preload — preload is a separate,
      // hard-to-reverse submission to browsers' built-in HSTS list and
      // should be opted into deliberately, not defaulted here.
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      });
    }
    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
