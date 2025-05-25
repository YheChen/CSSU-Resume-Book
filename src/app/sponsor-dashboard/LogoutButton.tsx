// app/sponsor-dashboard/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/sponsor-logout", { method: "POST" });
    router.push("/"); // or router.replace("/sponsor-login")
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
    >
      Logout
    </button>
  );
}
