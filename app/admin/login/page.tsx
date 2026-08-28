"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(getClientAuth(), provider);
      const idToken = await credential.user.getIdToken();

      // Create admin session cookie
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Unauthorized admin access.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-charcoal/70 border border-gold/25 p-8 md:p-10 text-center">
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-8">
          Admin Sign In
        </h1>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="w-full border border-gold px-6 py-3.5 text-xs tracking-[0.2em] uppercase text-obsidian bg-gold hover:bg-gold-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In with Google"}
        </button>

        {error && <p className="mt-4 text-xs text-red-400 tracking-wide">{error}</p>}
      </div>
    </main>
  );
}