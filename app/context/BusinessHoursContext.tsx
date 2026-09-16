"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BUSINESS_HOURS_DEFAULTS, type BusinessHours } from "@/lib/businessHours";

const BusinessHoursContext = createContext<BusinessHours>(BUSINESS_HOURS_DEFAULTS);

export function BusinessHoursProvider({ children }: { children: React.ReactNode }) {
  const [hours, setHours] = useState<BusinessHours>(BUSINESS_HOURS_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/hours", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error())))
      .then((data) => {
        if (!cancelled && data?.hours) setHours(data.hours);
      })
      .catch(() => {
        // Keep the real defaults if the database is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <BusinessHoursContext.Provider value={hours}>{children}</BusinessHoursContext.Provider>
  );
}

export const useBusinessHours = () => useContext(BusinessHoursContext);
