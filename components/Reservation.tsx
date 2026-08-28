"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { PHOTOS } from "@/lib/images";
import { useCustomerAuth } from "@/lib/useCustomerAuth";

const FIELDS = ["Name", "Date", "Guests"];

export default function Reservation() {
  const { user, loading: authLoading, needsPhoneVerification } = useCustomerAuth();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      if (!user) throw new Error("Please sign in first.");
      const idToken = await user.getIdToken();

      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: data.get("name"),
          date: data.get("date"),
          guests: data.get("guests"),
          company: data.get("company") ?? "", // honeypot
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Could not submit your reservation.");
      }

      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reserve" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={PHOTOS.cigarFire}
          alt="Warm firelit table at Atlantic Lounge Bar"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/60" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-10 text-center">
        <p className="font-script text-3xl text-gold-bright mb-1">Join Us Tonight</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-cream">
          Reserve Your Table
        </h2>
        <p className="text-smoke mt-5 max-w-lg mx-auto">
          Seats are poured out slowly. Tell us when you&apos;d like to arrive
          and we&apos;ll hold your corner of the room.
        </p>

        {authLoading ? null : !user ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-charcoal/70 backdrop-blur border border-gold/25 p-8 md:p-10 text-center"
          >
            <p className="text-cream mb-6">
              Sign in to request a table — it keeps things fair and helps us
              reach you if plans change.
            </p>
            <Link
              href="/login"
              className="inline-block border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold hover:bg-gold-bright transition-colors"
            >
              Sign In to Reserve
            </Link>
          </motion.div>
        ) : needsPhoneVerification ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-charcoal/70 backdrop-blur border border-gold/25 p-8 md:p-10 text-center"
          >
            <p className="text-cream mb-6">
              Almost there — confirm your phone number to finish setting up
              your account.
            </p>
            <Link
              href="/login/verify-phone"
              className="inline-block border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold hover:bg-gold-bright transition-colors"
            >
              Verify Phone Number
            </Link>
          </motion.div>
        ) : (
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="mt-12 bg-charcoal/70 backdrop-blur border border-gold/25 p-8 md:p-10 text-left"
        >
          <div className="grid sm:grid-cols-3 gap-6">
            {FIELDS.map((f) => (
              <label key={f} className="block">
                <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">{f}</span>
                <input
                  name={f.toLowerCase()}
                  required
                  type={f === "Date" ? "date" : f === "Guests" ? "number" : "text"}
                  min={f === "Guests" ? 1 : undefined}
                  placeholder={f === "Name" ? "Your name" : undefined}
                  className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none transition-colors placeholder:text-smoke/50"
                />
              </label>
            ))}
          </div>

          {/* Honeypot — hidden from real visitors, catches simple bots */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-9 w-full sm:w-auto overflow-hidden border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {submitting ? "Sending…" : sent ? "Table Requested ✦" : "Request Reservation"}
            </span>
            <span className="absolute inset-0 bg-gold-bright scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </button>

          {sent && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-xs text-gold-bright tracking-wide"
            >
              Your table request has been sent — we&apos;ll confirm shortly.
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-xs text-red-400 tracking-wide"
            >
              {error}
            </motion.p>
          )}
        </motion.form>
        )}
      </div>
    </section>
  );
}
