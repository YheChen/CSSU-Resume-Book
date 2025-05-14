"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const uoftEmailPattern = /^[a-zA-Z0-9._%+-]+@mail\.utoronto\.ca$/;

    if (!uoftEmailPattern.test(formData.email)) {
      setError("Please enter your @mail.utoronto.ca email.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    // TODO: Authenticate with backend
    console.log("Logging in with", formData);

    // Simulate successful login
    router.push("/dashboard");
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

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
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Sign In
        </button>
        <Link
          href="/signup"
          className="text-sm text-black hover:underline mt-4 block text-center"
        >
          Don't have an account? Sign up
        </Link>
        <Link
          href="/forgot-password"
          className="text-sm text-black hover:underline mt-2 block text-center"
        >
          Forgot Password?
        </Link>
      </form>
    </main>
  );
}
