import type { Metadata } from "next";
// NOTE: Make sure these font imports are correct based on your setup.
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTopButton from "@/app/ui/ScrollToTopButton";
// import MainHeader from "@/app/ui/home/main-header"; // Header commented out per request
// import MainFooter from "@/app/ui/home/main-footer"; // Footer commented out per request
import { CartProvider } from "@/app/context/CartContext";
import { AuthProvider } from "@/app/context/AuthContext";
import "./globals.css";

// --- FONT DEFINITIONS ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// ------------------------

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Curated handcrafted products",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Cleaned up whitespace to fix Hydration Error
    <html lang="en">
      <body
        suppressHydrationWarning={true} 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        
        <AuthProvider> 
          <CartProvider>
            
            {/* HEADER (Commented out) */}
            {/* <MainHeader /> */}

            {/* MAIN CONTENT */}
            <main className="flex-1">{children}</main>

            {/* FOOTER (Commented out) */}
            {/* <MainFooter /> */}

            {/* SCROLL TO TOP BUTTON */}
            <ScrollToTopButton />
          
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}