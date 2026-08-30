import { getDb } from "@/lib/firebaseAdmin";
import AdminDashboard, { type Reservation } from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const db = getDb();
  const snapshot = await db
    .collection("reservations")
    .orderBy("createdAt", "desc")
    .limit(200)
    .get();

  const reservations: Reservation[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      date: data.date ?? "",
      guests: data.guests ?? 0,
      status: data.status ?? "pending",
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
    };
  });

  return <AdminDashboard initialReservations={reservations} />;
}
