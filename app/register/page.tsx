"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("buyer");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setLoading(false);
      setErrorMsg(authError.message);
      return;
    }

    const user = authData.user;
    if (!user) {
      setLoading(false);
      setErrorMsg("Could not retrieve user data.");
      return;
    }

    await supabase.from("users_extra").insert({
      user_id: user.id,
      role: role,
    });

    if (role === "seller") {
      await supabase.from("sellers").insert({
        id: user.id,
        store_name: "",
        bio: "",
      });
    }

    setSuccessMsg("Account created! Redirecting...");
    setTimeout(() => router.push("/login"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
        <h1 className="text-3xl font-bold text-center text-neutral-800">
          Create Account
        </h1>
        <p className="text-center text-neutral-500 mt-1">
          Join the marketplace
        </p>

        {errorMsg && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border"
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
              className="w-full p-3 rounded-xl border"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-xl border"
              placeholder="•••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* role select */}
          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              I want to register as:
            </label>
            <select
              className="w-full p-3 rounded-xl border"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-neutral-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
