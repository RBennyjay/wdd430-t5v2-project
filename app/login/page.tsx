"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg("Login successful! Redirecting...");
    setTimeout(() => router.push("/home"), 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">

        <h1 className="text-3xl font-bold text-center text-neutral-800">
          Welcome Back
        </h1>
        <p className="text-center text-neutral-500 mt-1">
          Sign in to your account
        </p>

        {/* error */}
        {errorMsg && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            {errorMsg}
          </p>
        )}

        {/* success */}
        {successMsg && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-xl border border-neutral-300 focus:border-black focus:ring-2 focus:ring-black outline-none"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-neutral-600 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
