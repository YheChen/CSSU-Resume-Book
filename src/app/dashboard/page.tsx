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
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
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
          .select(
            "name, contactEmail, phone, program, year, linkedin, github, website, resume_url"
          )
          .eq("id", user.id)
          .single();

        if (error) throw error;
        if (data) {
          const { resume_url, ...rest } = data;
          setForm((prev) => ({ ...prev, ...rest }));
          if (resume_url) {
            // Generate signed URL for private bucket
            const { data: signed, error: signErr } = await supabase.storage
              .from("resumes")
              .createSignedUrl(`${user.id}/resume.pdf`, 60);
            if (signErr) {
              console.error("Failed to generate signed URL", signErr);
            } else {
              setResumeUrl(signed.signedUrl);
            }
          }
        }
      } catch (err: unknown) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) {
      setStatus("❌ Save failed: user is not authenticated.");
      console.error("Missing Supabase user");
      return;
    }

    const validationErrors: string[] = [];

    // Name
    if (!form.name.trim()) {
      validationErrors.push("Name is required.");
    } else if (form.name.length > 25) {
      validationErrors.push("Name must be 25 characters or less");
    }

    // Email
    if (!form.contactEmail.trim()) {
      validationErrors.push("Preferred contact email is required.");
    } else {
      const atCount = (form.contactEmail.match(/@/g) || []).length;
      if (atCount !== 1) {
        validationErrors.push("Email must contain exactly one '@'.");
      } else if (form.contactEmail.length > 25) {
        validationErrors.push("Email must be 25 characters or less.");
      }
    }

    // Phone
    if (form.phone && form.phone.length > 11) {
      validationErrors.push("Phone number must be 11 digits or less");
    }

    // LinkedIn
    if (form.linkedin) {
      const li = form.linkedin;
      if (li.length > 50) {
        validationErrors.push("LinkedIn URL must be 50 characters or less");
      }
      // must start with linkedin.com/in/
      else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/.+$/.test(li)) {
        validationErrors.push("LinkedIn URL must start with linkedin.com/in/");
      }
    }

    // GitHub
    if (form.github) {
      const gh = form.github;
      if (gh.length > 50) {
        validationErrors.push("GitHub URL must be 50 characters or less");
      }
      // must start with github.com/
      else if (!/^https?:\/\/(www\.)?github\.com\/.+$/.test(gh)) {
        validationErrors.push("GitHub URL must start with github.com/");
      }
    }

    // Website
    if (form.website && form.website.length > 50) {
      validationErrors.push("Website URL must be 50 characters or less");
    }

    // Resume
    if (!resumeFile && !resumeUrl) {
      validationErrors.push("Resume is required.");
    }
    if (resumeFile) {
      if (resumeFile.type !== "application/pdf") {
        validationErrors.push("Resume must be a PDF.");
      } else if (resumeFile.size > 1024 * 1024) {
        validationErrors.push("Resume size must be under 1MB.");
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setStatus("");
      return;
    }

    try {
      setIsSaving(true);
      setStatus("Uploading resume (if any) and saving profile...");

      let uploadedUrl = resumeUrl;
      if (resumeFile) {
        const { error: uploadErr } = await supabase.storage
          .from("resumes")
          .upload(`${user.id}/resume.pdf`, resumeFile, {
            upsert: true,
            contentType: "application/pdf",
          });
        if (uploadErr) throw uploadErr;

        const { data: signed, error: signErr } = await supabase.storage
          .from("resumes")
          .createSignedUrl(`${user.id}/resume.pdf`, 60);
        if (signErr) throw signErr;

        uploadedUrl = signed.signedUrl;
        setResumeUrl(uploadedUrl);
      }

      const { error: dbError } = await supabase.from("profiles").upsert({
        id: user.id,
        ...form,
        resume_url: uploadedUrl,
      });

      if (dbError) throw dbError;

      setStatus("✅ Profile saved successfully.");
      setErrors([]);
    } catch (err: unknown) {
      console.error("Save failed:", err);
      setStatus(
        `❌ ${
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message?: string }).message
            : "Unexpected error"
        }`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (err: unknown) {
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

        <h2 className="text-xl font-semibold mb-2">Resume Upload</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="mb-3"
        />

        {/* Embed PDF Viewer */}
        {resumeUrl && (
          <div className="mb-4">
            <iframe
              src={resumeUrl}
              className="w-full h-64 border"
              title="Uploaded Resume"
            />
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-4 disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Profile"}
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
