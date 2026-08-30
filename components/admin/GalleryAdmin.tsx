"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

type Span = "normal" | "wide" | "large";

interface GalleryItem {
  id: string;
  label: string;
  imageUrl: string;
  span: Span;
  order: number;
}

const BLANK: { label: string; imageUrl: string; span: Span; order: number } = {
  label: "",
  imageUrl: "",
  span: "normal",
  order: 0,
};

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(item: GalleryItem) {
    setEditingId(item.id);
    setForm({ label: item.label, imageUrl: item.imageUrl, span: item.span, order: item.order });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(BLANK);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Could not save.");
      }
      cancelEdit();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this photo from the gallery?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    await load();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-charcoal/70 border border-gold/25 p-6 md:p-8 mb-10"
      >
        <h2 className="font-display text-lg text-cream uppercase tracking-wide mb-6">
          {editingId ? "Edit Photo" : "Add New Photo"}
        </h2>
        <label className="block mb-5">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Label</span>
          <input
            required
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="The Main Room"
            className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
          />
        </label>
        <label className="block mb-5">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Image URL</span>
          <input
            required
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="https://..."
            className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
          />
        </label>
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Tile Size</span>
            <select
              value={form.span}
              onChange={(e) => setForm({ ...form, span: e.target.value as Span })}
              className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
            >
              <option value="normal" className="bg-charcoal">Normal</option>
              <option value="wide" className="bg-charcoal">Wide (2 columns)</option>
              <option value="large" className="bg-charcoal">Large (2×2)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Order</span>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="border border-gold px-8 py-3 text-xs tracking-[0.2em] uppercase text-obsidian bg-gold disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save Changes" : "Add to Gallery"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="border border-cream/20 px-8 py-3 text-xs tracking-[0.2em] uppercase text-smoke hover:text-cream"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
      </form>

      {loading ? (
        <p className="text-smoke text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-smoke text-sm">
          No photos yet — the site is showing its built-in default gallery until you add some here.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="border border-gold/20 bg-charcoal/50">
              <div className="relative h-40 w-full">
                <Image src={item.imageUrl} alt={item.label} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-cream text-sm font-medium">{item.label}</h3>
                <p className="text-smoke text-xs mt-1 capitalize">{item.span}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-xs text-gold-bright hover:text-cream"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
