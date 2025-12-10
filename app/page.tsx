import Link from "next/link";
// We still need Image for the login button if we use one, but we remove the next.svg usage.
import Image from "next/image"; 
import React from "react";

// NOTE: Since we are not using the full header, we remove the import for MainHeader.
// import MainHeader from "@/app/ui/home/main-header"; 

export default function Home() {
  return (
    // Outer container for the whole screen
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      {/* 1. Main Content Area */}
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 py-32 px-16 bg-white dark:bg-black text-center">
        
        {/* Logo/Branding - Text from MainHeader Component */}
        <Link href="/" className="text-4xl font-serif text-[#2C3E50] font-bold">
          Handcraft Co.
        </Link>
        
        {/* Content Title and Description */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
            Welcome to Handcraft Co.
          </h1>
          <p className="max-w-md text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            Click the button below to proceed to the **login** page and access your account.
          </p>
        </div>

        {/* Login Button using Next.js Link */}
        <Link href="/login" passHref legacyBehavior>
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-white transition-colors hover:bg-[#203040] md:w-auto"
            // Using the defined CSS variable for the Navy button background and Cream text color
            style={{ 
                backgroundColor: 'var(--navy)',
                color: 'var(--cream)' 
            }} 
          >
            <span className="cursor-pointer font-medium">Go to Login</span>
          </a>
        </Link>

      </main>
    </div>
  );
}