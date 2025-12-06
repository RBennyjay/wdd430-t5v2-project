import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  const publicRoutes = [
    "/",
    "/products",
    "/sellers",
    "/cart",
    "/checkout",
    "/login",
    "/register",
  ];

  if (publicRoutes.some((route) => url.startsWith(route))) {
    return NextResponse.next();
  }

  const protectedRoutes = ["/profile", "/orders", "/account"];

  const adminRoutes = ["/admin"];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (key) => req.cookies.get(key)?.value } }
  );

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user && protectedRoutes.some((r) => url.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (adminRoutes.some((r) => url.startsWith(r))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = user.user_metadata.role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
