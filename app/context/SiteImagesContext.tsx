"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SITE_IMAGE_DEFAULTS, type SiteImages } from "@/lib/siteContent";

const SiteImagesContext = createContext<SiteImages>(SITE_IMAGE_DEFAULTS);

export function SiteImagesProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<SiteImages>(SITE_IMAGE_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site-content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error())))
      .then((data) => {
        if (!cancelled && data?.images) {
          setImages({ ...SITE_IMAGE_DEFAULTS, ...data.images });
        }
      })
      .catch(() => {
        // Keep the built-in template images if the database is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteImagesContext.Provider value={images}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export const useSiteImages = () => useContext(SiteImagesContext);
