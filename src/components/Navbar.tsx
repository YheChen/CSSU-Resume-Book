"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">CSSU Resume Book</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
            Student Login
          </button>
        </Link>
        <Link href="/sponsor-login">
          <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
            Sponsor Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
