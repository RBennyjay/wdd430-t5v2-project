"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import NavLinks from "@/app/ui/home/nav-links";

// --- SVG Icons ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.835L7.5 14.25c.07.493.435.867.925.968l11.517 1.732a.75.75 0 0 0 .75-.684V6.75a2.25 2.25 0 0 0-2.25-2.25H16.5m0 18A2.25 2.25 0 1 1 12.75 21a2.25 2.25 0 0 1 4.5 0ZM20.25 18A2.25 2.25 0 1 1 16.5 21a2.25 2.25 0 0 1 3.75 0Z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export default function MainHeader() {
  const { user, logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const username = user?.email?.split("@")[0] || "User";

  const cartItemCount = 3;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6] shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo/Branding */}
        <Link href="/home" className="text-2xl font-serif text-[#2C3E50] font-bold">
          Handcraft Co.
        </Link>

        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-4">
          
          {!user && (
            <Link
              href="/login"
              aria-label="Account"
              className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
            >
              <UserIcon />
            </Link>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-[#7E9F8E]"
                aria-label="User menu"
              >
                <UserIcon />
                <span className="font-semibold text-[#2C3E50] hidden md:block">
                  {username}
                </span>
              </button>

              {/* Dropdown Menu */}
              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-200 p-2">
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md transition text-[#2C3E50]"
                    onClick={() => setOpenMenu(false)}
                  >
                    My Account
                  </Link>

                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md transition text-[#2C3E50]"
                    onClick={() => setOpenMenu(false)}
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-red-600 transition"
                  >
                    Log Out 
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart Link */}
          <Link 
            href="/cart" 
            aria-label="Cart" 
            className="relative focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
          >
            <ShoppingCartIcon />
            
            {/* Cart Badge */}
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-[#E7BB41] rounded-full text-xs text-white flex items-center justify-center -mt-1 -mr-1 font-sans font-bold shadow-md">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Menu for Mobile */}
          <button 
            aria-label="Menu" 
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}