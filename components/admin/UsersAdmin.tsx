"use client";

import { useEffect, useState } from "react";

type Role = "user" | "admin";

interface AdminUser {
  id: string;
  email: string | null;
  displayName: string | null;
  role: Role;
  phoneVerified: boolean;
  createdAt: string | null;
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      setUsers(data.users ?? []);
      setCurrentUid(data.currentUid ?? null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateRole(id: string, role: Role) {
    setError(null);
    setBusyId(id);
    const previous = users;
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, role } : u)));
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Could not update role.");
      }
    } catch (err) {
      setUsers(previous); // revert optimistic update on failure
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      {error && <p className="mb-4 text-xs text-red-400">{error}</p>}

      {loading ? (
        <p className="text-smoke text-sm">Loading…</p>
      ) : users.length === 0 ? (
        <p className="text-smoke text-sm">No accounts yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gold/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20 text-left text-[11px] tracking-[0.15em] uppercase text-smoke">
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Phone Verified</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === currentUid;
                return (
                  <tr key={u.id} className="border-b border-cream/10 text-cream">
                    <td className="px-4 py-3">{u.email ?? "—"}</td>
                    <td className="px-4 py-3">{u.displayName ?? "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        disabled={busyId === u.id || isSelf}
                        title={isSelf ? "You can't change your own role." : undefined}
                        onChange={(e) => updateRole(u.id, e.target.value as Role)}
                        className="border border-cream/20 px-2 py-1 text-xs bg-transparent outline-none disabled:opacity-50"
                      >
                        <option value="user" className="bg-charcoal">User</option>
                        <option value="admin" className="bg-charcoal">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-smoke text-xs">
                      {u.phoneVerified ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-smoke text-xs">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
