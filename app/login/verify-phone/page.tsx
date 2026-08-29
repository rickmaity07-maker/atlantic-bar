"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  RecaptchaVerifier,
  linkWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";
import { useAuth } from "@/app/context/AuthContext";

function friendlyPhoneError(err: unknown): string {
  const code = err instanceof Error && "code" in err ? String((err as { code: unknown }).code) : "";
  switch (code) {
    case "auth/operation-not-allowed":
      return "Phone sign-in isn't enabled for this project yet — enable \"Phone\" under Firebase Console → Authentication → Sign-in method.";
    case "auth/invalid-phone-number":
      return "That phone number doesn't look valid — include the country code, e.g. +49 151 23456789.";
    case "auth/billing-not-enabled":
    case "auth/quota-exceeded":
      return "SMS codes need the Blaze (pay-as-you-go) plan enabled on this Firebase project.";
    case "auth/too-many-requests":
      return "Too many attempts — please wait a few minutes and try again.";
    case "auth/captcha-check-failed":
    case "auth/invalid-app-credential":
      return "Verification check failed — refresh the page and try again.";
    case "auth/invalid-verification-code":
      return "That code doesn't match — check the SMS and try again.";
    case "auth/code-expired":
      return "That code expired — request a new one.";
    case "auth/credential-already-in-use":
      return "That phone number is already linked to a different account.";
    default:
      return err instanceof Error ? err.message : "Something went wrong.";
  }
}

export default function VerifyPhonePage() {
  const router = useRouter();
  const { user, loading: authLoading, needsPhoneVerification, refreshProfile } = useAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
    if (!authLoading && user && !needsPhoneVerification) router.replace("/#reserve");
  }, [authLoading, user, needsPhoneVerification, router]);

  useEffect(() => {
    if (!recaptchaContainerRef.current || verifierRef.current) return;
    verifierRef.current = new RecaptchaVerifier(getClientAuth(), recaptchaContainerRef.current, {
      size: "invisible",
    });
    return () => {
      verifierRef.current?.clear();
      verifierRef.current = null;
    };
  }, []);

  async function sendCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      if (!user) throw new Error("Not signed in.");
      if (!verifierRef.current) throw new Error("Verifier not ready — refresh and try again.");
      const result = await linkWithPhoneNumber(user, phone, verifierRef.current);
      setConfirmation(result);
    } catch (err) {
      setError(friendlyPhoneError(err));
      // A failed attempt leaves the invisible reCAPTCHA in a used state —
      // reset it so the next attempt doesn't silently fail.
      verifierRef.current?.clear();
      verifierRef.current = null;
      if (recaptchaContainerRef.current) {
        verifierRef.current = new RecaptchaVerifier(getClientAuth(), recaptchaContainerRef.current, {
          size: "invisible",
        });
      }
    } finally {
      setSending(false);
    }
  }

  async function confirmCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setConfirming(true);
    try {
      if (!confirmation || !user) throw new Error("Request a code first.");
      await confirmation.confirm(code);

      // Force-refresh so the ID token carries the new phone_number claim,
      // then sync it to Firestore + the session cookie.
      const idToken = await user.getIdToken(true);
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      await refreshProfile();

      router.push("/#reserve");
      router.refresh();
    } catch (err) {
      setError(friendlyPhoneError(err));
    } finally {
      setConfirming(false);
    }
  }

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm bg-charcoal/70 border border-gold/25 p-8 md:p-10">
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-2">
          Confirm Your Phone
        </h1>
        <p className="text-xs text-smoke mb-8">
          One quick step — we&apos;ll text you a 6-digit code to confirm
          it&apos;s really you before you can request a table.
        </p>

        {!confirmation ? (
          <form onSubmit={sendCode}>
            <label className="block mb-8">
              <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">
                Phone number
              </span>
              <input
                type="tel"
                required
                placeholder="+49 151 23456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none transition-colors"
              />
              <span className="mt-1 block text-[10px] text-smoke/70">
                Include the country code, e.g. +49 for Germany.
              </span>
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={confirmCode}>
            <label className="block mb-8">
              <span className="text-[11px] tracking-[0.2em] uppercase text-smoke">
                6-digit code
              </span>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none transition-colors tracking-[0.3em]"
              />
            </label>
            <button
              type="submit"
              disabled={confirming}
              className="w-full border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold disabled:opacity-60"
            >
              {confirming ? "Confirming…" : "Confirm Code"}
            </button>
          </form>
        )}

        {/* Invisible reCAPTCHA anchor required by Firebase Phone Auth */}
        <div ref={recaptchaContainerRef} />

        {error && <p className="mt-4 text-xs text-red-400 tracking-wide">{error}</p>}
      </div>
    </main>
  );
}
