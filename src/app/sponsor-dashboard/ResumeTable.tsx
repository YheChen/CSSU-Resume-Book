"use client";

import React, { useState, Fragment } from "react";

export interface Student {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  program: string;
  year: number;
  resumeUrl: string | null;
  linkedin: string;
  github: string;
  website: string;
}

interface Props {
  students: Student[];
}

export default function ResumeTable({ students }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border">Resume</th>
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">Email</th>
          <th className="py-2 px-4 border">Phone</th>
          <th className="py-2 px-4 border">Program</th>
          <th className="py-2 px-4 border">Year</th>
          <th className="py-2 px-4 border">LinkedIn</th>
          <th className="py-2 px-4 border">GitHub</th>
          <th className="py-2 px-4 border">Website</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <Fragment key={s.id}>
            <tr>
              <td className="py-2 px-4 border text-center">
                {s.resumeUrl ? (
                  <button
                    onClick={() => toggle(s.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {expandedId === s.id ? "Hide" : "View"}
                  </button>
                ) : (
                  "No resume"
                )}
              </td>
              <td className="py-2 px-4 border">{s.name}</td>
              <td className="py-2 px-4 border">{s.contactEmail}</td>
              <td className="py-2 px-4 border">{s.phone}</td>
              <td className="py-2 px-4 border">{s.program}</td>
              <td className="py-2 px-4 border">{s.year}</td>
              <td className="py-2 px-4 border">
                {s.linkedin ? (
                  <a
                    href={s.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {s.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                ) : (
                  "No LinkedIn"
                )}
              </td>
              <td className="py-2 px-4 border">
                {s.github ? (
                  <a
                    href={s.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {s.github.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                ) : (
                  "No GitHub"
                )}
              </td>
              <td className="py-2 px-4 border">
                {s.website ? (
                  <a
                    href={s.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {s.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                ) : (
                  "No Website"
                )}
              </td>
            </tr>

            {expandedId === s.id && s.resumeUrl && (
              <tr>
                <td colSpan={9} className="p-0 border-t-0">
                  <iframe
                    src={s.resumeUrl}
                    className="w-full h-96"
                    title={`Resume for ${s.name}`}
                  />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
