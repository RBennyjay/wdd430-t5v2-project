import { NextResponse } from "next/server";
import { createServer } from "@/app/lib/supabase";

export async function GET() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("buyer_id", user.id);

  return NextResponse.json({ ok: !error, data, error });
}
