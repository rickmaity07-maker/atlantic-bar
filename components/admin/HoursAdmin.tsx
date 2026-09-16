"use client";

import { useEffect, useState } from "react";
import {
  BUSINESS_HOURS_DEFAULTS,
  DAY_ORDER,
  DAY_LABELS,
  type BusinessHours,
  type DayKey,
} from "@/lib/businessHours";

export default function HoursAdmin() {
  const [hours, setHours] = useState<BusinessHours>(BUSINESS_HOURS_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/hours", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.hours) setHours(data.hours);
      })
      .catch(() => setError("Could not load hours."))
      .finally(() => setLoading(false));
  }, []);

  function updateDay(day: DayKey, patch: Partial<BusinessHours[DayKey]>) {
    setSaved(false);
    setHours((current) => ({ ...current, [day]: { ...current[day], ...patch } }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: hours }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload.error ?? "Could not save.");
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-smoke text-sm">Loading…</p>;

  return (
    <div className="bg-charcoal/70 border border-gold/25 p-6 md:p-8 max-w-2xl">
      <h2 className="font-display text-lg text-cream uppercase tracking-wide mb-2">
        Opening Hours
      </h2>
      <p className="text-smoke text-xs mb-6">
        A close time past midnight (e.g. 5:00) means the venue stays open into the next day.
      </p>

      <div className="space-y-3">
        {DAY_ORDER.map((day) => (
          <div key={day} className="flex items-center gap-4 flex-wrap">
            <span className="w-28 shrink-0 text-cream text-sm">{DAY_LABELS.en[day]}</span>

            <label className="flex items-center gap-2 text-xs text-smoke">
              <input
                type="checkbox"
                checked={hours[day].closed}
                onChange={(e) => updateDay(day, { closed: e.target.checked })}
              />
              Closed
            </label>

            {!hours[day].closed && (
              <>
                <label className="flex items-center gap-2 text-xs text-smoke">
                  Open
                  <input
                    type="time"
                    value={hours[day].open}
                    onChange={(e) => updateDay(day, { open: e.target.value })}
                    className="bg-obsidian border border-cream/20 px-2 py-1 text-cream outline-none focus:border-gold"
                  />
                </label>
                <label className="flex items-center gap-2 text-xs text-smoke">
                  Close
                  <input
                    type="time"
                    value={hours[day].close}
                    onChange={(e) => updateDay(day, { close: e.target.value })}
                    className="bg-obsidian border border-cream/20 px-2 py-1 text-cream outline-none focus:border-gold"
                  />
                </label>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="border border-gold px-8 py-3 text-xs tracking-[0.2em] uppercase text-obsidian bg-gold disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Hours"}
        </button>
        {saved && <span className="text-xs text-gold-bright">Saved — live on the site now.</span>}
      </div>
      {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
    </div>
  );
}
