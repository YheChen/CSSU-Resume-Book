"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SponsorLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Call your App Router API route
    const res = await fetch("/api/sponsor-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      // Redirect to the protected dashboard
      router.push("/sponsor-dashboard");
    } else {
      const body = await res.json();
      setError(body.error || "Login failed");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sponsor Login</h1>

        <input
          type="email"
          name="email"
          placeholder="you@mail.utoronto.ca"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Sign In
        </button>

        <Link
          href="/sponsor-register"
          className="text-sm text-black hover:underline mt-4 block text-center"
        >
          Become a Sponsor
        </Link>

        <Link href="/" className="block mt-6 text-center">
          <button
            type="button"
            className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300 transition"
          >
            ← Return to Home
          </button>
        </Link>
      </form>
    </main>
  );
}
