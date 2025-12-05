"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { createClient } from "@/app/lib/supabase/client";

// SVG Icons (los dejo igual)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export default function MainHeader() {
  const { user } = useAuth();
  const supabase = createClient();

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const username = user?.user_metadata?.full_name || user?.email?.split("@")[0];

  const cartItemCount = 3;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6] shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

        <Link href="/home" className="text-2xl font-serif text-[#2C3E50] font-bold">
          Handcraft Co.
        </Link>

        <nav className="hidden md:flex space-x-8">
          {/* tus nav-links */}
        </nav>

        <div className="flex items-center space-x-4">

          {/* 🔥 SI NO HAY USER → ICONO DE LOGIN */}
          {!user && (
            <Link
              href="/login"
              aria-label="Account"
              className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
            >
              <UserIcon />
            </Link>
          )}

          {/* 🔥 SI HAY USER → MOSTRAR NOMBRE + MENÚ */}
          {user && (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
              >
                <UserIcon />
                <span className="font-semibold text-[#2C3E50] hidden md:block">
                  {username}
                </span>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-200 p-2">
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Mi cuenta
                  </Link>

                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Mis órdenes
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* carrito */}
          <Link href="/cart" className="relative p-2 rounded-md hover:bg-gray-100">
            🛒
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-[#E7BB41] rounded-full text-xs text-white flex items-center justify-center -mt-1 -mr-1 font-bold shadow-md">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
