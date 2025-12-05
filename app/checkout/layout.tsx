// 'use client';

// import React from 'react';
// import Link from 'next/link';
// // Note: Tailwind CSS is assumed to be configured globally or via the main layout.

// // --- Layout specific styles ---
// // These styles are repeated from the Cart/Checkout pages for immediate visualization
// // but ideally would be defined globally.
// const customStyles = (
//     <style jsx global>{`
//         :root {
//             --color-navy: #1f2937;
//         }
//         .text-navy { color: var(--color-navy); }
//         .bg-navy { background-color: var(--color-navy); }
//     `}</style>
// );

// /**
//  * CheckoutLayout component.
//  * This layout is specifically designed for the secure checkout process,
//  * featuring a simplified header to minimize distractions and improve conversion.
//  * @param children The current page component (page.tsx) to be rendered inside the layout.
//  */
// export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <>
//             {customStyles}
            
//             <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                
//                 {/* Simplified Header for Checkout */}
//                 <header className="w-full border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//                         {/* Simplified Logo/Title - Links back to Cart or Home */}
//                         {/* Logo/Branding - Serif Font */}
//                         <Link href="/home" className="text-3xl font-serif text-navy font-bold hover:text-sage transition-colors">
//                             Handcraft Co.
//                         </Link>
                        
//                         {/* Checkout Progress Indicator (Placeholder) */}
//                         <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500">
//                             <span className="text-navy font-bold">Shipping & Payment</span>
//                             {/* <span>→</span>
//                             <span>2. Review Order</span>
//                             <span>→</span>
//                             <span>3. Confirmation</span> */}
//                         </div>

//                         {/* Help Link */}
//                         <a href="/help" className="text-sm text-gray-500 hover:text-navy transition-colors hidden md:block">
//                             Need Help?
//                         </a>
//                     </div>
//                 </header>

//                 {/* Main Content Area */}
//                 <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
//                     {children}
//                 </main>

//                 {/* Simplified Footer for Checkout */}
//                 <footer className="w-full border-t border-gray-200 bg-white mt-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-500">
//                         <p>&copy; {new Date().getFullYear()} Artisan Shop. All rights reserved. | <Link href="/policy" className="hover:underline">Privacy Policy</Link></p>
//                     </div>
//                 </footer>
//             </div>
//         </>
//     );
// }