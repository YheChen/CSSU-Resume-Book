"use client";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-6 text-sm text-gray-500 border-t border-gray-200">
      © {new Date().getFullYear()} UofT CSSU External Relations Team
    </footer>
  );
}
