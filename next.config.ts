import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonces here on purpose — that requires opting every page into dynamic
// rendering (see next/dist/docs/01-app/02-guides/content-security-policy.md),
// which would cost static optimization across the whole marketing site for
// a page that has almost no first-party inline scripts to begin with.
// 'unsafe-inline' on script-src is the tradeoff; everything else here is a
// real allowlist, and framer-motion/three.js animate via direct DOM style
// properties (not <style> tags or style="" attributes), so they don't need
// style-src 'unsafe-inline' to work — it's kept only for the rare inline
// style Next.js itself may emit.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.gstatic.com https://www.google.com https://apis.google.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.googleapis.com https://*.google.com https://*.firebaseio.com wss://*.firebaseio.com https://res.cloudinary.com https://api.cloudinary.com https://www.gstatic.com;
  frame-src 'self' https://*.firebaseapp.com https://www.google.com https://www.gstatic.com https://accounts.google.com https://www.facebook.com;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  images: {
    // Every <Image> in this app renders with `unoptimized`, so the Next.js
    // image optimizer's server-side fetch (the actual SSRF surface behind
    // this allowlist) is never invoked today — admin-pasted URLs are always
    // fetched client-side by the browser, not by this server. This list is
    // deliberately narrowed to the hosts real images actually come from
    // (Unsplash defaults, Cloudinary uploads) so that if a future <Image>
    // usage ever drops `unoptimized`, it can't silently turn into an
    // open SSRF proxy to arbitrary HTTPS hosts.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
