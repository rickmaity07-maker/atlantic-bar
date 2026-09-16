import AdminSubNav from "@/components/admin/AdminSubNav";
import HoursAdmin from "@/components/admin/HoursAdmin";

export default function AdminHoursPage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-script text-2xl text-gold-bright mb-1">Atlantic Lounge Bar</p>
        <h1 className="font-display text-2xl uppercase tracking-wide text-cream mb-6">Admin</h1>
        <AdminSubNav />
        <HoursAdmin />
      </div>
    </main>
  );
}
