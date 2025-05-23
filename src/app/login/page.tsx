"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { email, password } = formData;

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Unexpected login error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="UofT Email"
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
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>

        <Link href="/forgot-password">
          <button
            type="button"
            className="w-full mt-4 text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </Link>

        <Link href="/">
          <button
            type="button"
            className="w-full mt-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            ← Return to Home
          </button>
        </Link>
      </form>
    </main>
  );
}
