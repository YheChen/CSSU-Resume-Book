// app/api/sponsor-logout/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // overwrite the cookie with an expired one
  res.headers.append(
    "Set-Cookie",
    serialize("sponsor_auth", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  return res;
}
