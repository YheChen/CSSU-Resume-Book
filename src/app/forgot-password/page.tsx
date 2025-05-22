"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    console.log("Trying to send reset email to:", email);

    if (!email.endsWith("@mail.utoronto.ca")) {
      setError("Please enter a valid @mail.utoronto.ca email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      console.error("Reset error:", err);
      setError(err.message || "Failed to send reset email.");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Reset Your Password
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your UofT email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
          {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Send Reset Link
          </button>
          <Link href="/">
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-6">
              ← Return to Home
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
