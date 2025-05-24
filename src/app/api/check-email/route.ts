// src/app/api/check-email/route.ts
export const config = { runtime: "nodejs" };

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const { email } = await request.json();
  if (typeof email !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid email" },
      { status: 400 }
    );
  }

  let page = 1;
  const perPage = 1000;
  let exists = false;

  try {
    while (!exists) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });
      if (error) {
        console.error("Admin listUsers error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
      }
      // if no users returned, we’re done
      if (!data.users.length) break;

      // check this batch
      exists = data.users.some((u) => u.email === email);
      if (exists) break;

      // otherwise go to the next page
      page += 1;
    }

    return NextResponse.json({ exists });
  } catch (err) {
    console.error("Unexpected error listing users:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
