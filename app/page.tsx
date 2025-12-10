import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-#FAF9F6">
      
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 py-32 px-16 bg-white dark:bg-#FAF9F6 text-center">
        
        {/* Logo/Branding */}
        <Link href="/" className="text-4xl font-serif text-[#2C3E50] font-bold">
          Handcraft Co.
        </Link>
        
        {/* Content Title and Description */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            {/* Welcome to Handcraft Co. */}
          </h1>
          {/* <p className="max-w-md text-lg leading-7 text-b-600 dark:text-zinc-400"> */}
            <p className="max-w-md text-lg leading-7 text-black">
            Click the button below to proceed to the <strong>login</strong> page and access your account.
          </p>
        </div>

        {/* Login Button using modern Link */}
        <Link
          href="/login"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-white transition-colors hover:bg-[#203040] md:w-auto"
          style={{ 
            backgroundColor: 'var(--navy)',
            color: 'var(--cream)' 
          }}
        >
          <span className="cursor-pointer font-medium">Go to Login</span>
        </Link>

      </main>
    </div>
  );
}
