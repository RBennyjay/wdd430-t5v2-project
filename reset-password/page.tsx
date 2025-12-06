"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: Integrate Supabase reset password
        console.log("Reset request:", email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                
                <h1 className="text-3xl font-semibold text-center text-[#2C3E50] mb-6">
                    Reset Password
                </h1>

                <form onSubmit={handleReset} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 
                                       focus:outline-none focus:ring-2 focus:ring-[#7E9F8E]"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-[#7E9F8E] rounded-lg font-medium
                                   hover:opacity-90 transition shadow-md"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-gray-700 text-sm mt-6">
                    Remember your password?{" "}
                    <Link href="/login" className="text-[#E7BB41] font-semibold hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
