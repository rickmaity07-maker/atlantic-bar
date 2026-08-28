"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(getClientAuth(), email, password);
      const idToken = await credential.user.getIdToken();

      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Sign-in failed.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      // Firebase throws its own error shapes; keep the message generic and safe to show.
      const message =
        err instanceof Error && err.message.includes("auth/")
          ? "Incorrect email or password."
          : err instanceof Error
          ? err.message
          : "Sign-in failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-charcoal/70 border border-gold/25 p-8 md:p-10"
      >
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-8">
          Admin Sign In
        </h1>

        <label className="block mb-5">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none transition-colors"
          />
        </label>

        <label className="block mb-8">
          <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none transition-colors"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        {error && <p className="mt-4 text-xs text-red-400 tracking-wide">{error}</p>}
      </form>
    </main>
  );
}
