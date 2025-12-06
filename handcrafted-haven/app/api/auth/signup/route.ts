import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password
  });

  if (authError) {
    return NextResponse.json({ ok: false, error: authError.message });
  }

  if (authData.user) {
    await supabase
      .from("profiles")
      .update({ name })
      .eq("id", authData.user.id);
  }

  return NextResponse.json({
    ok: true,
    message: "User registered successfully",
    user: authData.user
  });
}
