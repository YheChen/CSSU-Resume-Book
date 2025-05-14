"use client";

import { useRouter } from "next/navigation";

export default function SponsorDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Clear sponsor auth/session
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Sponsor Dashboard</h1>
      <p className="text-lg mb-8">
        View and download student resumes or manage your sponsorship
        preferences.
      </p>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </main>
  );
}
