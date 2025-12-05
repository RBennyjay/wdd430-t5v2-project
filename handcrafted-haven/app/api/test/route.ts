import { NextResponse } from "next/server";
import { createServer } from "@/app/lib/supabase/server";

export async function GET() {
  const supabase = await createServer(); 

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(5);

  return NextResponse.json({
    ok: !error,
    data,
    error,
  });
}
