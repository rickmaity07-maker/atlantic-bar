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
            {loggingOut ? "Signing outâ€¦" : "Sign Out"}
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
            placeholder="Search by nameâ€¦"
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
            Date {sortAsc ? "â†‘" : "â†“"}
          </button>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="text-xs tracking-[0.15em] uppercase text-smoke hover:text-gold-bright border border-cream/20 px-4 py-2 disabled:opacity-50"
          >
            {refreshing ? "Refreshingâ€¦" : "Refresh"}
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
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "â€”"}
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
