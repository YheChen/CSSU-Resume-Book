"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    contactEmail: "",
    phone: "",
    program: "",
    year: "",
    linkedin: "",
    github: "",
    website: "",
    intro: "",
    resumeURL: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        if (data) setForm((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) {
      setStatus("❌ Upload failed: user is not authenticated.");
      console.error("Missing Supabase user");
      return;
    }

    const validationErrors = [];
    if (!form.name.trim()) validationErrors.push("Name is required.");
    if (!form.contactEmail.trim())
      validationErrors.push("Preferred contact email is required.");
    if (!form.program) validationErrors.push("Program of study is required.");
    if (!form.year) validationErrors.push("Year of study is required.");

    if (resumeFile) {
      if (resumeFile.type !== "application/pdf") {
        validationErrors.push("Resume must be a PDF file.");
      } else if (resumeFile.size > 2 * 1024 * 1024) {
        validationErrors.push("Resume must be under 2MB.");
      }
    }

    if (!form.resumeURL && !resumeFile) {
      validationErrors.push("Resume upload is required.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setStatus("");
      return;
    }

    try {
      setIsSaving(true);
      setStatus("Uploading resume and saving profile...");

      if (resumeFile) {
        const { data, error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(`${user.id}/resume.pdf`, resumeFile, {
            upsert: true,
            contentType: "application/pdf",
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("resumes")
          .getPublicUrl(`${user.id}/resume.pdf`);

        form.resumeURL = publicUrl;
      }

      const { error: dbError } = await supabase.from("profiles").upsert({
        id: user.id,
        ...form,
      });

      if (dbError) throw dbError;

      setStatus("✅ Profile and resume saved successfully.");
      setErrors([]);
    } catch (err: any) {
      console.error("Save failed:", err);
      setStatus(`❌ ${err.message || "Unexpected error"}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">Welcome, {user.email}!</p>

      <div className="w-full max-w-lg text-left bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {errors.length > 0 && (
          <ul className="mb-4 text-red-600 text-sm list-disc list-inside">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          name="contactEmail"
          placeholder="Preferred Contact Email"
          value={form.contactEmail}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <select
          name="program"
          value={form.program}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        >
          <option value="">Select Program</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Statistics">Statistics</option>
          <option value="Physics">Physics</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        >
          <option value="">Select Year of Study</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>

        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          name="github"
          placeholder="GitHub URL"
          value={form.github}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          name="website"
          placeholder="Personal Website"
          value={form.website}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <textarea
          name="intro"
          placeholder="Brief Introduction (max 150 characters)"
          maxLength={150}
          value={form.intro}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <h2 className="text-xl font-semibold mb-2">Resume Upload</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="mb-3"
        />

        {form.resumeURL && (
          <a
            href={form.resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 hover:underline text-center"
          >
            View Uploaded Resume
          </a>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-4 disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Profile & Upload Resume"}
        </button>

        {status && <p className="mt-4 text-sm text-blue-600">{status}</p>}
      </div>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mt-8"
      >
        Logout
      </button>

      <Link href="/">
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-4">
          ← Return to Home
        </button>
      </Link>
    </main>
  );
}
