// app/sponsor-dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import LogoutButton from "./LogoutButton";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function SponsorDashboard() {
  // 1. Auth check
  const cookieStore = await cookies();
  const auth = cookieStore.get("sponsor_auth")?.value; // sync .get()
  if (auth !== "true") {
    redirect("/sponsor-login");
  }

  // 2. Fetch your data (example: student profiles)
  const { data: students, error } = await supabase
    .from("profiles")
    .select(
      "id, name, contactEmail, phone, program, year, linkedin, github, website"
    );

  if (error) {
    return <p className="p-8 text-red-600">Error: {error.message}</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sponsor Dashboard</h1>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Program</th>
            <th className="py-2 px-4 border">Year</th>
            <th className="py-2 px-4 border">Linkedin</th>
            <th className="py-2 px-4 border">GitHub</th>
            <th className="py-2 px-4 border">Website</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((s) => (
            <tr key={s.id}>
              <td className="py-2 px-4 border">{s.name}</td>
              <td className="py-2 px-4 border">{s.contactEmail}</td>
              <td className="py-2 px-4 border">{s.phone}</td>
              <td className="py-2 px-4 border">{s.program}</td>
              <td className="py-2 px-4 border">{s.year}</td>
              <td className="py-2 px-4 border">{s.linkedin}</td>
              <td className="py-2 px-4 border">{s.github}</td>
              <td className="py-2 px-4 border">{s.website}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Logout button */}
      <section className="mt-8">
        <LogoutButton />
      </section>
    </main>
  );
}
