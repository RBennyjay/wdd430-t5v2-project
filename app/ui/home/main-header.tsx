// "use client";

// import Link from 'next/link';
// import NavLinks from '@/app/ui/home/nav-links';

// // --- SVG Icons ---
// // Primary stroke color: deep, warm navy (#2C3E50)

// // Search Icon (Magnifying Glass)
// const SearchIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
//         <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//     </svg>
// );

// // User Icon (Account)
// const UserIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//     </svg>
// );

// // Shopping Cart Icon (REPLACED BAG ICON)
// const ShoppingCartIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.835L7.5 14.25c.07.493.435.867.925.968l11.517 1.732a.75.75 0 0 0 .75-.684V6.75a2.25 2.25 0 0 0-2.25-2.25H16.5m0 18A2.25 2.25 0 1 1 12.75 21a2.25 2.25 0 0 1 4.5 0ZM20.25 18A2.25 2.25 0 1 1 16.5 21a2.25 2.25 0 0 1 3.75 0Z" />
//     </svg>
// );

// // Menu Icon (Hamburger)
// const MenuIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//     </svg>
// );

// export default function MainHeader() {
//     // Primary accent color: Warm Sage Green (#7E9F8E)
//     // Secondary accent color: deep, warm navy (#2C3E50)
//     // Tertiary accent color: Golden Yellow (#E7BB41)
//     // Background color: Off-white/Cream (#FAF9F6)
    
//     // Hardcoded cart count for display purposes, will be replaced with context later.
//     const cartItemCount = 3;

//     return (
//         <header className="sticky top-0 z-50 bg-[#FAF9F6] shadow-sm border-b border-gray-100">
//             <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                
//                 {/* Logo/Branding - Use a Serif Font for the Brand Name */}
//                 <Link href="/home" className="text-2xl font-serif text-[#2C3E50] font-bold">
//                     Handcraft Co.
//                 </Link>

//                 {/* Primary Navigation Links */}
//                 <nav className="hidden md:flex space-x-8">
//                     <NavLinks />
//                 </nav>

//                 {/* Icons - Simple Line-Art Style */}
//                 <div className="flex items-center space-x-4">
                    
//                     {/* Account Button */}
//                     <button
//                         aria-label="Account"
//                         className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
//                     >
//                         <UserIcon />
//                     </button>
                    
//                     {/* Cart Link */}
//                     <Link
//                         href="/cart"
//                         aria-label="Cart"
//                         className="relative focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
//                     >
            
//                         <ShoppingCartIcon />
                        
//                         {/* Cart Badge - Conditional display */}
//                         {cartItemCount > 0 && (
//                             <span className="absolute top-0 right-0 h-5 w-5 bg-[#E7BB41] rounded-full text-xs text-white flex items-center justify-center -mt-1 -mr-1 font-sans font-bold shadow-md">
//                                 {cartItemCount}
//                             </span>
//                         )}
//                     </Link>
                    
//                     {/* Menu for Mobile */}
//                     <button
//                         aria-label="Menu"
//                         className="md:hidden focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
//                     >
//                         <MenuIcon />
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }

"use client";

import Link from 'next/link';
import NavLinks from '@/app/ui/home/nav-links';
import { useCart } from '@/app/context/CartContext'; // <-- NEW IMPORT

// --- SVG Icons ---
// Primary stroke color: deep, warm navy (#2C3E50)

// Search Icon (Magnifying Glass)
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

// User Icon (Account)
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

// Shopping Cart Icon (REPLACED BAG ICON)
const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.023.835L7.5 14.25c.07.493.435.867.925.968l11.517 1.732a.75.75 0 0 0 .75-.684V6.75a2.25 2.25 0 0 0-2.25-2.25H16.5m0 18A2.25 2.25 0 1 1 12.75 21a2.25 2.25 0 0 1 4.5 0ZM20.25 18A2.25 2.25 0 1 1 16.5 21a2.25 2.25 0 0 1 3.75 0Z" />
    </svg>
);

// Menu Icon (Hamburger)
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#2C3E50]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export default function MainHeader() {
    
    // Primary accent color: Warm Sage Green (#7E9F8E)
    // Secondary accent color: deep, warm navy (#2C3E50)
    // Tertiary accent color: Golden Yellow (#E7BB41)
    // Background color: Off-white/Cream (#FAF9F6)
    
    // Use dynamic cart count from context
    const { cartCount } = useCart(); // <-- DYNAMIC COUNT

    return (
        <header className="sticky top-0 z-50 bg-[#FAF9F6] shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                
                {/* Logo/Branding - Use a Serif Font for the Brand Name */}
                <Link href="/home" className="text-2xl font-serif text-[#2C3E50] font-bold">
                    Handcraft Co.
                </Link>

                {/* Primary Navigation Links */}
                <nav className="hidden md:flex space-x-8">
                    <NavLinks />
                </nav>

                {/* Icons - Simple Line-Art Style */}
                <div className="flex items-center space-x-4">
                    
                    {/* Search Icon (Hidden for now, but keeping button structure) */}
                    {/* <button 
                        aria-label="Search" 
                        className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
                    >
                        <SearchIcon />
                    </button> */}

                    {/* Account Button */}
                    <button 
                        aria-label="Account" 
                        className="focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
                    >
                        <UserIcon />
                    </button>
                    
                    {/* Cart Link */}
                    <Link 
                        href="/home/cart" // <-- UPDATED PATH TO /home/cart
                        aria-label="Cart" 
                        className="relative focus:outline-none focus:ring-2 focus:ring-[#7E9F8E] p-2 rounded-md transition hover:bg-gray-100"
                    >
            
                        <ShoppingCartIcon />
                        
                        {/* Cart Badge - Conditional display */}
                        {cartCount > 0 && ( // <-- USING DYNAMIC cartCount
                            <span className="absolute top-0 right-0 h-5 w-5 bg-[#E7BB41] rounded-full text-xs text-white flex items-center justify-center -mt-1 -mr-1 font-sans font-bold shadow-md">
                                {cartCount}
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