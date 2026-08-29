# Atlantic Lounge Bar - Menu & Gallery CMS setup script
# Run this from your project root (the folder containing package.json)
# e.g.: cd C:\Users\Test\Desktop\atlantic-lounge-with-backend\atlantic-lounge
#       .\setup-menu-gallery-cms.ps1

Write-Host "Setting up Menu & Gallery CMS files..." -ForegroundColor Cyan

# --- Create all needed folders (safe to run even if they already exist) ---
New-Item -ItemType Directory -Force -Path "app/admin/dashboard/gallery" | Out-Null
New-Item -ItemType Directory -Force -Path "app/admin/dashboard/menu" | Out-Null
New-Item -ItemType Directory -Force -Path "app/api/admin/gallery" | Out-Null
New-Item -ItemType Directory -Force -Path "app/api/admin/gallery/[id]" | Out-Null
New-Item -ItemType Directory -Force -Path "app/api/admin/menu" | Out-Null
New-Item -ItemType Directory -Force -Path "app/api/admin/menu/[id]" | Out-Null
New-Item -ItemType Directory -Force -Path "app/api/gallery" | Out-Null
New-Item -ItemType Directory -Force -Path "app/api/menu" | Out-Null
New-Item -ItemType Directory -Force -Path "components" | Out-Null
New-Item -ItemType Directory -Force -Path "components/admin" | Out-Null

# --- New files (skipped if already present) ---
if (Test-Path "app/api/menu/route.ts") {
    Write-Host "SKIP  (already exists): app/api/menu/route.ts" -ForegroundColor Yellow
} else {
    @'
import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

// Public — this is just the drink menu shown on the site, not sensitive data.
export async function GET() {
  const snap = await getDb().collection("menuItems").orderBy("order", "asc").get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}
'@ | Set-Content -Path "app/api/menu/route.ts" -Encoding UTF8
    Write-Host "CREATED: app/api/menu/route.ts" -ForegroundColor Green
}

if (Test-Path "app/api/gallery/route.ts") {
    Write-Host "SKIP  (already exists): app/api/gallery/route.ts" -ForegroundColor Yellow
} else {
    @'
import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebaseAdmin";

// Public — gallery photos shown on the site, not sensitive data.
export async function GET() {
  const snap = await getDb().collection("galleryImages").orderBy("order", "asc").get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}
'@ | Set-Content -Path "app/api/gallery/route.ts" -Encoding UTF8
    Write-Host "CREATED: app/api/gallery/route.ts" -ForegroundColor Green
}

if (Test-Path "app/api/admin/menu/route.ts") {
    Write-Host "SKIP  (already exists): app/api/admin/menu/route.ts" -ForegroundColor Yellow
} else {
    @'
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

const MenuItemSchema = z.object({
  name: z.string().trim().min(1).max(80),
  note: z.string().trim().min(1).max(200),
  price: z.string().trim().min(1).max(10),
  imageUrl: z.string().trim().url(),
  order: z.coerce.number().int().default(0),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const snap = await getDb().collection("menuItems").orderBy("order", "asc").get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const parsed = MenuItemSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const docRef = await getDb().collection("menuItems").add({
    ...parsed.data,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
}
'@ | Set-Content -Path "app/api/admin/menu/route.ts" -Encoding UTF8
    Write-Host "CREATED: app/api/admin/menu/route.ts" -ForegroundColor Green
}

if (Test-Path "app/api/admin/menu/[id]/route.ts") {
    Write-Host "SKIP  (already exists): app/api/admin/menu/[id]/route.ts" -ForegroundColor Yellow
} else {
    @'
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

const MenuItemUpdateSchema = z.object({
  name: z.string().trim().min(1).max(80),
  note: z.string().trim().min(1).max(200),
  price: z.string().trim().min(1).max(10),
  imageUrl: z.string().trim().url(),
  order: z.coerce.number().int().default(0),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const parsed = MenuItemUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await getDb()
    .collection("menuItems")
    .doc(id)
    .set({ ...parsed.data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await getDb().collection("menuItems").doc(id).delete();
  return NextResponse.json({ ok: true });
}
'@ | Set-Content -Path "app/api/admin/menu/[id]/route.ts" -Encoding UTF8
    Write-Host "CREATED: app/api/admin/menu/[id]/route.ts" -ForegroundColor Green
}

if (Test-Path "app/api/admin/gallery/route.ts") {
    Write-Host "SKIP  (already exists): app/api/admin/gallery/route.ts" -ForegroundColor Yellow
} else {
    @'
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

const GalleryItemSchema = z.object({
  label: z.string().trim().min(1).max(60),
  imageUrl: z.string().trim().url(),
  span: z.enum(["normal", "wide", "large"]).default("normal"),
  order: z.coerce.number().int().default(0),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const snap = await getDb().collection("galleryImages").orderBy("order", "asc").get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const parsed = GalleryItemSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const docRef = await getDb().collection("galleryImages").add({
    ...parsed.data,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
}
'@ | Set-Content -Path "app/api/admin/gallery/route.ts" -Encoding UTF8
    Write-Host "CREATED: app/api/admin/gallery/route.ts" -ForegroundColor Green
}

if (Test-Path "app/api/admin/gallery/[id]/route.ts") {
    Write-Host "SKIP  (already exists): app/api/admin/gallery/[id]/route.ts" -ForegroundColor Yellow
} else {
    @'
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminSession } from "@/lib/adminAuth";
import { getDb } from "@/lib/firebaseAdmin";

const GalleryItemUpdateSchema = z.object({
  label: z.string().trim().min(1).max(60),
  imageUrl: z.string().trim().url(),
  span: z.enum(["normal", "wide", "large"]).default("normal"),
  order: z.coerce.number().int().default(0),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const parsed = GalleryItemUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await getDb()
    .collection("galleryImages")
    .doc(id)
    .set({ ...parsed.data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await getDb().collection("galleryImages").doc(id).delete();
  return NextResponse.json({ ok: true });
}
'@ | Set-Content -Path "app/api/admin/gallery/[id]/route.ts" -Encoding UTF8
    Write-Host "CREATED: app/api/admin/gallery/[id]/route.ts" -ForegroundColor Green
}

if (Test-Path "app/admin/dashboard/menu/page.tsx") {
    Write-Host "SKIP  (already exists): app/admin/dashboard/menu/page.tsx" -ForegroundColor Yellow
} else {
    @'
import AdminSubNav from "@/components/admin/AdminSubNav";
import MenuAdmin from "@/components/admin/MenuAdmin";

export default function AdminMenuPage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-6">Admin</h1>
        <AdminSubNav />
        <MenuAdmin />
      </div>
    </main>
  );
}
'@ | Set-Content -Path "app/admin/dashboard/menu/page.tsx" -Encoding UTF8
    Write-Host "CREATED: app/admin/dashboard/menu/page.tsx" -ForegroundColor Green
}

if (Test-Path "app/admin/dashboard/gallery/page.tsx") {
    Write-Host "SKIP  (already exists): app/admin/dashboard/gallery/page.tsx" -ForegroundColor Yellow
} else {
    @'
import AdminSubNav from "@/components/admin/AdminSubNav";
import GalleryAdmin from "@/components/admin/GalleryAdmin";

export default function AdminGalleryPage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-6">Admin</h1>
        <AdminSubNav />
        <GalleryAdmin />
      </div>
    </main>
  );
}
'@ | Set-Content -Path "app/admin/dashboard/gallery/page.tsx" -Encoding UTF8
    Write-Host "CREATED: app/admin/dashboard/gallery/page.tsx" -ForegroundColor Green
}

if (Test-Path "components/admin/AdminSubNav.tsx") {
    Write-Host "SKIP  (already exists): components/admin/AdminSubNav.tsx" -ForegroundColor Yellow
} else {
    @'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/dashboard", label: "Reservations" },
  { href: "/admin/dashboard/menu", label: "Menu" },
  { href: "/admin/dashboard/gallery", label: "Gallery" },
];

export default function AdminSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 mb-10 border-b border-gold/15">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-xs tracking-[0.15em] uppercase border-b-2 -mb-px transition-colors ${
              active
                ? "border-gold text-gold-bright"
                : "border-transparent text-smoke hover:text-cream"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
'@ | Set-Content -Path "components/admin/AdminSubNav.tsx" -Encoding UTF8
    Write-Host "CREATED: components/admin/AdminSubNav.tsx" -ForegroundColor Green
}

if (Test-Path "components/admin/MenuAdmin.tsx") {
    Write-Host "SKIP  (already exists): components/admin/MenuAdmin.tsx" -ForegroundColor Yellow
} else {
    @'
"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

interface MenuItem {
  id: string;
  name: string;
  note: string;
  price: string;
  imageUrl: string;
  order: number;
}

const BLANK = { name: "", note: "", price: "", imageUrl: "", order: 0 };

export default function MenuAdmin() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menu", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({ name: item.name, note: item.note, price: item.price, imageUrl: item.imageUrl, order: item.order });
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
      const url = editingId ? `/api/admin/menu/${editingId}` : "/api/admin/menu";
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
    if (!confirm("Remove this item from the menu?")) return;
    await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
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
          {editingId ? "Edit Item" : "Add New Item"}
        </h2>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
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
        <label className="block mb-6 max-w-[140px]">
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
            disabled={saving}
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
      ) : items.length === 0 ? (
        <p className="text-smoke text-sm">
          No items yet — the site is showing its built-in default menu until you add some here.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="border border-gold/20 bg-charcoal/50">
              <div className="relative h-40 w-full">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-cream text-sm font-medium">{item.name}</h3>
                  <span className="text-gold-bright text-sm shrink-0">${item.price}</span>
                </div>
                <p className="text-smoke text-xs mt-2">{item.note}</p>
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
'@ | Set-Content -Path "components/admin/MenuAdmin.tsx" -Encoding UTF8
    Write-Host "CREATED: components/admin/MenuAdmin.tsx" -ForegroundColor Green
}

if (Test-Path "components/admin/GalleryAdmin.tsx") {
    Write-Host "SKIP  (already exists): components/admin/GalleryAdmin.tsx" -ForegroundColor Yellow
} else {
    @'
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
'@ | Set-Content -Path "components/admin/GalleryAdmin.tsx" -Encoding UTF8
    Write-Host "CREATED: components/admin/GalleryAdmin.tsx" -ForegroundColor Green
}

# --- Files that REPLACE existing ones (always overwritten) ---
@'
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSubNav from "./AdminSubNav";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface Reservation {
  id: string;
  name: string;
  date: string;
  guests: number;
  status: ReservationStatus;
  createdAt: string | null;
}

const STATUS_STYLES: Record<ReservationStatus, string> = {
  pending: "bg-gold/15 text-gold-bright border-gold/40",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function AdminDashboard({
  initialReservations,
}: {
  initialReservations: Reservation[];
}) {
  const router = useRouter();
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReservationStatus>("all");
  const [sortAsc, setSortAsc] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const filtered = useMemo(() => {
    let list = reservations;
    if (statusFilter !== "all") list = list.filter((r) => r.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) =>
      sortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    );
  }, [reservations, search, statusFilter, sortAsc]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      total: reservations.length,
      pending: reservations.filter((r) => r.status === "pending").length,
      today: reservations.filter((r) => r.date === today).length,
      totalGuests: reservations.reduce((sum, r) => sum + (r.guests || 0), 0),
    };
  }, [reservations]);

  async function refresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/reservations", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setReservations(data.reservations);
      }
    } finally {
      setRefreshing(false);
    }
  }

  async function updateStatus(id: string, status: ReservationStatus) {
    setBusyId(id);
    const previous = reservations;
    setReservations((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setReservations(previous); // revert optimistic update on failure
    } finally {
      setBusyId(null);
    }
  }

  async function deleteReservation(id: string) {
    if (!confirm("Delete this reservation permanently?")) return;
    setBusyId(id);
    const previous = reservations;
    setReservations((rs) => rs.filter((r) => r.id !== id));
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setReservations(previous);
    } finally {
      setBusyId(null);
    }
  }

  function exportCsv() {
    const header = ["Name", "Date", "Guests", "Status", "Submitted"];
    const rows = filtered.map((r) => [
      r.name,
      r.date,
      String(r.guests),
      r.status,
      r.createdAt ?? "",
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reservations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-obsidian px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
            <h1 className="font-display text-2xl uppercase tracking-wide text-cream">
              Reservations
            </h1>
          </div>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="text-xs tracking-[0.2em] uppercase text-smoke hover:text-gold-bright transition-colors disabled:opacity-50"
          >
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>

        <AdminSubNav />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Reservations", value: stats.total },
            { label: "Pending", value: stats.pending },
            { label: "Today", value: stats.today },
            { label: "Total Guests", value: stats.totalGuests },
          ].map((s) => (
            <div key={s.label} className="border border-gold/20 bg-charcoal/50 p-5">
              <p className="text-2xl font-display text-gold-bright">{s.value}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-smoke mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-charcoal/50 border border-cream/20 focus:border-gold px-4 py-2 text-sm text-cream outline-none flex-1 min-w-[180px]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="bg-charcoal/50 border border-cream/20 px-4 py-2 text-sm text-cream outline-none"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => setSortAsc((s) => !s)}
            className="text-xs tracking-[0.15em] uppercase text-smoke hover:text-gold-bright border border-cream/20 px-4 py-2"
          >
            Date {sortAsc ? "↑" : "↓"}
          </button>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="text-xs tracking-[0.15em] uppercase text-smoke hover:text-gold-bright border border-cream/20 px-4 py-2 disabled:opacity-50"
          >
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
          <button
            onClick={exportCsv}
            className="text-xs tracking-[0.15em] uppercase text-obsidian bg-gold hover:bg-gold-bright px-4 py-2"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto border border-gold/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20 text-left text-[11px] tracking-[0.15em] uppercase text-smoke">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Guests</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-cream/10 text-cream">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">{r.guests}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      disabled={busyId === r.id}
                      onChange={(e) =>
                        updateStatus(r.id, e.target.value as ReservationStatus)
                      }
                      className={`border px-2 py-1 text-xs bg-transparent outline-none ${STATUS_STYLES[r.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-smoke text-xs">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteReservation(r.id)}
                      disabled={busyId === r.id}
                      className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-smoke text-sm">
                    No reservations match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
'@ | Set-Content -Path "components/admin/AdminDashboard.tsx" -Encoding UTF8
Write-Host "REPLACED: components/admin/AdminDashboard.tsx" -ForegroundColor Green

@'
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PHOTOS } from "@/lib/images";
import SectionHeading from "./SectionHeading";

interface Drink {
  id?: string;
  name: string;
  note: string;
  price: string;
  imageUrl: string;
}

// Shown until (or unless) the client has added their own items in the
// admin dashboard — the site never shows an empty menu.
const DEFAULT_DRINKS: Drink[] = [
  {
    name: "Gilded Old Fashioned",
    note: "Bourbon, bitters, torched orange oil, single ice sphere.",
    price: "18",
    imageUrl: PHOTOS.whiskeyIce,
  },
  {
    name: "Atlantic Amber",
    note: "Aged rum, honey, smoked cinnamon, a slow amber pour.",
    price: "20",
    imageUrl: PHOTOS.heroPour,
  },
  {
    name: "Velvet Negroni",
    note: "Barrel-rested gin, sweet vermouth, bitter orange peel.",
    price: "19",
    imageUrl: PHOTOS.whiskeyOrange,
  },
];

export default function Cocktails() {
  const [drinks, setDrinks] = useState<Drink[]>(DEFAULT_DRINKS);

  useEffect(() => {
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items) && data.items.length > 0) {
          setDrinks(data.items);
        }
      })
      .catch(() => {
        // Keep the defaults on any failure — never show a broken/empty menu.
      });
  }, []);

  return (
    <section id="cocktails" className="relative bg-charcoal py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Handcrafted" title="Signature Pours" />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {drinks.map((d, i) => (
            <motion.div
              key={d.id ?? d.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative bg-obsidian border border-gold/15 hover:border-gold/50 transition-colors duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={d.imageUrl}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/10" />
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-cream tracking-wide">{d.name}</h3>
                  <span className="font-display text-gold-bright text-lg shrink-0">${d.price}</span>
                </div>
                <p className="text-smoke text-sm mt-3 leading-relaxed">{d.note}</p>
              </div>
              <span className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gold/40 bg-obsidian/60 backdrop-blur flex items-center justify-center text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                ✦
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Path "components/Cocktails.tsx" -Encoding UTF8
Write-Host "REPLACED: components/Cocktails.tsx" -ForegroundColor Green

@'
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PHOTOS } from "@/lib/images";
import SectionHeading from "./SectionHeading";

type Span = "normal" | "wide" | "large";

interface Shot {
  id?: string;
  label: string;
  imageUrl: string;
  span: Span;
}

const SPAN_CLASSES: Record<Span, string> = {
  normal: "",
  wide: "md:col-span-2",
  large: "md:col-span-2 md:row-span-2",
};

// Shown until (or unless) the client has added their own photos in the
// admin dashboard — the site never shows an empty gallery.
const DEFAULT_SHOTS: Shot[] = [
  { label: "The Main Room", imageUrl: PHOTOS.emptyRoom, span: "large" },
  { label: "Aperitivo Hour", imageUrl: PHOTOS.cocktailOlives, span: "normal" },
  { label: "Brass & Light", imageUrl: PHOTOS.pendantLamps, span: "normal" },
  { label: "Fireside Corner", imageUrl: PHOTOS.chairsTables, span: "normal" },
  { label: "Private Booths", imageUrl: PHOTOS.redChairs, span: "wide" },
  { label: "Late Seating", imageUrl: PHOTOS.eatery, span: "normal" },
  { label: "The Pour", imageUrl: PHOTOS.whiskeyWoodTable, span: "normal" },
];

export default function Gallery() {
  const [shots, setShots] = useState<Shot[]>(DEFAULT_SHOTS);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.items) && data.items.length > 0) {
          setShots(data.items);
        }
      })
      .catch(() => {
        // Keep the defaults on any failure — never show an empty gallery.
      });
  }, []);

  return (
    <section id="gallery" className="relative bg-obsidian py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Inside the Room" title="Gallery" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[160px] gap-4">
          {shots.map((s, i) => (
            <motion.div
              key={s.id ?? s.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden ${SPAN_CLASSES[s.span]}`}
            >
              <Image
                src={s.imageUrl}
                alt={s.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 transition-colors duration-500" />
              <p className="absolute bottom-3 left-4 font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-cream translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Path "components/Gallery.tsx" -Encoding UTF8
Write-Host "REPLACED: components/Gallery.tsx" -ForegroundColor Green

@'
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
'@ | Set-Content -Path "next.config.ts" -Encoding UTF8
Write-Host "REPLACED: next.config.ts" -ForegroundColor Green

Write-Host ""
Write-Host "Done. Run npm run build to verify everything compiles." -ForegroundColor Cyan