// app/api/sponsor-login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { serialize } from "cookie";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Select the plain password and active flag
  const { data, error } = await supabase
    .from("sponsors")
    .select("password, active")
    .eq("email", email)
    .single();

  // If no row, inactive, or mismatch, reject
  if (error || !data || !data.active || data.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // On success, set the cookie
  const res = NextResponse.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    serialize("sponsor_auth", "true", {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  return res;
}
