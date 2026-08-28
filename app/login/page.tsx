"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getClientAuth, newGoogleProvider, newFacebookProvider } from "@/lib/firebaseClient";

type Mode = "signin" | "signup";

function friendlyAuthError(err: unknown): string {
  const code = err instanceof Error && "code" in err ? String((err as { code: unknown }).code) : "";
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with that email already exists — try signing in instead.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function CustomerLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"email" | "google" | "facebook" | null>(null);

  function afterSignIn(needsPhone: boolean) {
    router.push(needsPhone ? "/login/verify-phone" : "/#reserve");
    router.refresh();
  }

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading("email");
    try {
      const auth = getClientAuth();
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Email/password accounts don't need the phone-OTP step.
      afterSignIn(false);
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setLoading(null);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading("google");
    try {
      const cred = await signInWithPopup(getClientAuth(), newGoogleProvider());
      afterSignIn(!cred.user.phoneNumber);
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setLoading(null);
    }
  }

  async function handleFacebook() {
    setError(null);
    setLoading("facebook");
    try {
      const cred = await signInWithPopup(getClientAuth(), newFacebookProvider());
      afterSignIn(!cred.user.phoneNumber);
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm bg-charcoal/70 border border-gold/25 p-8 md:p-10">
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-2">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-xs text-smoke mb-8">
          An account keeps table requests genuine — one login, one guest.
        </p>

        <div className="flex gap-2 mb-8">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 text-[11px] tracking-[0.2em] uppercase border ${
              mode === "signin"
                ? "border-gold text-gold-bright"
                : "border-cream/20 text-smoke hover:text-cream"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-[11px] tracking-[0.2em] uppercase border ${
              mode === "signup"
                ? "border-gold text-gold-bright"
                : "border-cream/20 text-smoke hover:text-cream"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleEmailSubmit}>
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
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-cream/25 focus:border-gold py-2 text-cream outline-none transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={loading !== null}
            className="w-full border border-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase text-obsidian bg-gold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "email"
              ? "Please wait…"
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-7">
          <span className="h-px flex-1 bg-cream/15" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-smoke">or</span>
          <span className="h-px flex-1 bg-cream/15" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading !== null}
            className="w-full border border-cream/25 py-3 text-xs tracking-[0.15em] uppercase text-cream hover:border-gold hover:text-gold-bright transition-colors disabled:opacity-60"
          >
            {loading === "google" ? "Please wait…" : "Continue with Google"}
          </button>
          <button
            type="button"
            onClick={handleFacebook}
            disabled={loading !== null}
            className="w-full border border-cream/25 py-3 text-xs tracking-[0.15em] uppercase text-cream hover:border-gold hover:text-gold-bright transition-colors disabled:opacity-60"
          >
            {loading === "facebook" ? "Please wait…" : "Continue with Facebook"}
          </button>
        </div>

        <p className="mt-6 text-[11px] text-smoke leading-relaxed">
          Signing in with Google or Facebook will ask you to confirm your
          phone number by SMS code before you can request a table.
        </p>

        {error && <p className="mt-4 text-xs text-red-400 tracking-wide">{error}</p>}
      </div>
    </main>
  );
}
