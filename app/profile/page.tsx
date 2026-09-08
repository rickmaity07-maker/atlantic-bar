"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/app/context/AuthContext";

interface Reservation {
  id: string;
  date: string;
  guests: number;
  status: string;
}

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/my-reservations", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error())))
      .then((data) => setReservations(data.reservations ?? []))
      .catch(() => setReservations([]));
  }, [user]);

  if (loading) {
    return <main className="min-h-screen bg-obsidian" />;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-cream mb-5">Please sign in to view your profile.</p>
          <Link href="/login" className="border border-gold bg-gold px-8 py-3 text-xs tracking-[0.2em] uppercase text-obsidian">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-obsidian pt-32 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="font-script text-3xl text-gold-bright">Atlantic Lounge Bar</p>
          <h1 className="font-display text-3xl uppercase tracking-wide text-cream mt-1">My Profile</h1>

          <section className="mt-10 border border-gold/20 bg-charcoal/60 p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-smoke">Account</p>
            <p className="text-cream mt-3">{user.displayName || "Atlantic Lounge Guest"}</p>
            <p className="text-smoke text-sm mt-1">{user.email}</p>
            <p className="text-xs text-smoke mt-4">
              {profile?.role === "admin" ? "Administrator account" : "Customer account"}
            </p>
          </section>

          <section className="mt-8 border border-gold/20 bg-charcoal/60 p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl uppercase tracking-wide text-cream">My Reservations</h2>
              <Link href="/#reserve" className="text-xs uppercase tracking-[0.15em] text-gold-bright">
                Reserve a table
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {reservations.length === 0 ? (
                <p className="text-sm text-smoke">You do not have any reservations yet.</p>
              ) : (
                reservations.map((reservation) => (
                  <div key={reservation.id} className="border border-cream/10 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-cream">{reservation.date}</p>
                      <p className="text-smoke text-xs mt-1">{reservation.guests} guests</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.12em] text-gold-bright">{reservation.status}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
