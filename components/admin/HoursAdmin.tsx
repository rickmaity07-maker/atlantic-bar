"use client";

import { useEffect, useState } from "react";
import {
  BUSINESS_HOURS_DEFAULTS,
  DAY_ORDER,
  DAY_LABELS,
  type BusinessHours,
  type DayKey,
} from "@/lib/businessHours";
import { useLanguage } from "@/app/context/LanguageContext";

export default function HoursAdmin() {
  const { locale, t } = useLanguage();
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
      .catch(() => setError(t.admin.hours.loadError))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch once on mount only, not on every language toggle
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
      if (!res.ok) throw new Error(payload.error ?? t.admin.hours.saveError);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.hours.saveError);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-smoke text-sm">{t.admin.hours.loading}</p>;

  return (
    <div className="bg-charcoal/70 border border-gold/25 p-6 md:p-8 max-w-2xl">
      <h2 className="font-display text-lg text-cream uppercase tracking-wide mb-2">
        {t.admin.hours.heading}
      </h2>
      <p className="text-smoke text-xs mb-6">{t.admin.hours.hint}</p>

      <div className="space-y-3">
        {DAY_ORDER.map((day) => (
          <div key={day} className="flex items-center gap-4 flex-wrap">
            <span className="w-28 shrink-0 text-cream text-sm">{DAY_LABELS[locale][day]}</span>

            <label className="flex items-center gap-2 text-xs text-smoke">
              <input
                type="checkbox"
                checked={hours[day].closed}
                onChange={(e) => updateDay(day, { closed: e.target.checked })}
              />
              {t.admin.hours.closed}
            </label>

            {!hours[day].closed && (
              <>
                <label className="flex items-center gap-2 text-xs text-smoke">
                  {t.admin.hours.open}
                  <input
                    type="time"
                    value={hours[day].open}
                    onChange={(e) => updateDay(day, { open: e.target.value })}
                    className="bg-obsidian border border-cream/20 px-2 py-1 text-cream outline-none focus:border-gold"
                  />
                </label>
                <label className="flex items-center gap-2 text-xs text-smoke">
                  {t.admin.hours.close}
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
          {saving ? t.admin.hours.saving : t.admin.hours.save}
        </button>
        {saved && <span className="text-xs text-gold-bright">{t.admin.hours.saved}</span>}
      </div>
      {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
    </div>
  );
}
