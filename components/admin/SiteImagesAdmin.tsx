"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import { SITE_IMAGE_LABELS, SITE_IMAGE_DEFAULTS, type SiteImageKey } from "@/lib/siteContent";

type Images = Record<SiteImageKey, string>;

export default function SiteImagesAdmin() {
  const [images, setImages] = useState<Images>(SITE_IMAGE_DEFAULTS);
  const [saving, setSaving] = useState<SiteImageKey | null>(null);
  const [uploading, setUploading] = useState<SiteImageKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/images", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Could not load images.");
    setImages({ ...SITE_IMAGE_DEFAULTS, ...data.images });
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function saveUrl(key: SiteImageKey) {
    setSaving(key);
    setError(null);
    try {
      const res = await fetch("/api/admin/images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, imageUrl: images[key] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not save image.");
      setImages((current) => ({ ...current, [key]: data.imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save image.");
    } finally {
      setSaving(null);
    }
  }

  async function upload(key: SiteImageKey, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(key);
    setError(null);
    try {
      const form = new FormData();
      form.append("key", key);
      form.append("file", file);

      const res = await fetch("/api/admin/images/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed.");
      setImages((current) => ({ ...current, [key]: data.imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(null);
    }
  }

  const groups: { title: string; keys: SiteImageKey[] }[] = [
    {
      title: "3D Intro World",
      keys: [
        "introFrame1", "introFrame2", "introFrame3", "introFrame4",
        "introFrame5", "introFrame6", "introFrame7",
      ],
    },
    {
      title: "Website Sections",
      keys: [
        "hero", "about", "cocktails1", "cocktails2", "cocktails3",
        "nights", "testimonials", "reservation",
        "spielzeug1", "spielzeug2", "spielzeug3", "spielzeug4",
        "spielzeug5", "spielzeug6", "spielzeug7",
      ],
    },
  ];

  return (
    <div>
      <div className="mb-8 border border-gold/20 bg-charcoal/40 p-5 text-smoke text-sm leading-relaxed">
        Upload a new image or paste an image URL. Saving changes the database value;
        the existing layout, animation, sizing and styling are not changed.
      </div>

      {error && <p className="mb-6 text-sm text-red-400">{error}</p>}

      {groups.map((group) => (
        <section key={group.title} className="mb-12">
          <h2 className="font-display text-xl uppercase tracking-wide text-cream mb-5">{group.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {group.keys.map((key) => (
              <div key={key} className="border border-gold/20 bg-charcoal/50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gold-bright mb-3">
                  {SITE_IMAGE_LABELS[key]}
                </p>

                <div className="relative h-44 mb-4 overflow-hidden border border-cream/10">
                  <Image src={images[key]} alt={SITE_IMAGE_LABELS[key]} fill unoptimized className="object-cover" />
                </div>

                <input
                  value={images[key]}
                  onChange={(e) => setImages((current) => ({ ...current, [key]: e.target.value }))}
                  className="w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-xs text-cream outline-none"
                  placeholder="https://..."
                />

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => saveUrl(key)}
                    disabled={saving === key}
                    className="border border-gold px-4 py-2 text-[10px] tracking-[0.16em] uppercase text-obsidian bg-gold disabled:opacity-60"
                  >
                    {saving === key ? "Saving…" : "Save URL"}
                  </button>

                  <label className="border border-cream/20 px-4 py-2 text-[10px] tracking-[0.16em] uppercase text-smoke hover:text-cream cursor-pointer">
                    {uploading === key ? "Uploading…" : "Upload Image"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(e) => upload(key, e)}
                      disabled={uploading === key}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
