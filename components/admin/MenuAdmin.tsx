"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

type Category =
  | "signature"
  | "classics"
  | "spirits"
  | "wine"
  | "champagne"
  | "nonAlcoholic"
  | "barSnacks";

interface MenuItem {
  id: string;
  category: Category;
  name: string;
  note: string;
  price: string;
  imageUrl: string;
  order: number;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "signature", label: "Signature" },
  { value: "classics", label: "Classics" },
  { value: "spirits", label: "Spirits" },
  { value: "wine", label: "Wine" },
  { value: "champagne", label: "Champagne" },
  { value: "nonAlcoholic", label: "Non-Alcoholic" },
  { value: "barSnacks", label: "Bar Snacks" },
];

const BLANK = {
  category: "signature" as Category,
  name: "",
  note: "",
  price: "",
  imageUrl: "",
  order: 0,
};

export default function MenuAdmin() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menu", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load menu.");
      setItems(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load menu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      category: item.category,
      name: item.name,
      note: item.note,
      price: item.price,
      imageUrl: item.imageUrl,
      order: item.order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(BLANK);
  }

  async function uploadImage(file: File) {
    setUploadingImage(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "menu");
      const res = await fetch("/api/admin/upload-image", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed.");
      setForm((current) => ({ ...current, imageUrl: data.imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.imageUrl) {
      setError("Please upload an image before saving.");
      return;
    }

    setSaving(true);
    try {
      const url = editingId ? `/api/admin/menu/${editingId}` : "/api/admin/menu";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload.error ?? "Could not save.");

      cancelEdit();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this item from the live menu?")) return;
    const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      setError(payload.error ?? "Could not delete.");
      return;
    }
    if (editingId === id) cancelEdit();
    await load();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-charcoal/70 border border-gold/25 p-6 md:p-8 mb-10">
        <h2 className="font-display text-lg text-cream uppercase tracking-wide mb-6">
          {editingId ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Category</span>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="mt-2 w-full bg-charcoal border border-cream/20 px-3 py-2 text-cream outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
            />
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Price</span>
            <input
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="18"
              className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
            />
          </label>
        </div>

        <label className="block mb-5">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Description</span>
          <input
            required
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
          />
        </label>

        <div className="mb-6">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke block mb-3">Image</span>
          {form.imageUrl ? (
            <div className="relative h-40 w-full max-w-md mb-3 border border-cream/10 overflow-hidden">
              <Image src={form.imageUrl} alt="Preview" fill unoptimized className="object-cover" />
            </div>
          ) : null}
          <label className="inline-flex border border-cream/20 px-4 py-2 text-[10px] tracking-[0.16em] uppercase text-smoke hover:text-cream cursor-pointer">
            {uploadingImage ? "Uploading…" : form.imageUrl ? "Replace Image" : "Upload Image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              disabled={uploadingImage}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) uploadImage(file);
              }}
            />
          </label>
          {!form.imageUrl && (
            <p className="mt-2 text-xs text-smoke">Upload a JPG, PNG, WEBP or AVIF file.</p>
          )}
        </div>

        <label className="block mb-6 max-w-35">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Order</span>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none"
          />
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || uploadingImage}
            className="border border-gold px-8 py-3 text-xs tracking-[0.2em] uppercase text-obsidian bg-gold disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save Changes" : "Add to Menu"}
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
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="border border-gold/20 bg-charcoal/50">
              <div className="relative h-40 w-full">
                <Image src={item.imageUrl} alt={item.name} fill unoptimized className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold-bright mb-2">{item.category}</p>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-cream text-sm font-medium">{item.name}</h3>
                  <span className="text-gold-bright text-sm shrink-0">€{item.price}</span>
                </div>
                <p className="text-smoke text-xs mt-2">{item.note}</p>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => startEdit(item)} className="text-xs text-gold-bright hover:text-cream">
                    Edit / Replace
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:text-red-300">
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