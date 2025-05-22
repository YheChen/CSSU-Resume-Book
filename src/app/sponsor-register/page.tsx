import Link from "next/link";

export default function SponsorRegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Become a Sponsor</h1>
        <p className="text-lg">
          If you’re interested in sponsoring the CSSU Resume Book, please email
          us at:
        </p>
        <p className="mt-4 text-blue-600 font-medium break-all">
          utcssu@gmail.com
        </p>

        <a
          href="/sponsorshippackage.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-white bg-black px-5 py-2 rounded hover:bg-gray-800 transition"
        >
          View Sponsorship Package
        </a>
        <Link href="/">
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-6">
            ← Return to Home
          </button>
        </Link>
      </div>
    </main>
  );
}
