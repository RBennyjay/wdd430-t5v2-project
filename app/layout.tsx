import type { Metadata } from "next";
// Make sure these Geist imports are correct based on your setup (they look correct)
// Note: Geist is used for both font imports, which suggests a potential typo based on the font definition below.
// I have assumed 'Geist' corresponds to 'geistSans' and 'Geist_Mono' corresponds to 'geistMono' as defined below.
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTopButton from "@/app/ui/ScrollToTopButton";
// import MainHeader from "@/app/ui/home/main-header"; // ⬅ UNCOMMENTED
// import MainFooter from "@/app/ui/home/main-footer"; // ⬅ UNCOMMENTED
import { CartProvider } from "@/app/context/CartContext";
import "./globals.css";

// --- FONT DEFINITIONS MUST BE HERE ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// -------------------------------------

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Curated handcrafted products",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        // ⬅ ADDED suppressHydrationWarning to fix the cz-shortcut-listen error
        suppressHydrationWarning={true} 
        // The variables must be defined above this function to be used here
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          
          {/* HEADER ⬅ UNCOMMENTED */}
          {/* <MainHeader /> */}

          {/* MAIN CONTENT */}
          {/* The 'flex-1' class ensures this main section takes up all available vertical space */}
          <main className="flex-1">{children}</main>

          {/* FOOTER ⬅ UNCOMMENTED */}
          {/* <MainFooter /> */}

          {/* SCROLL TO TOP BUTTON */}
          <ScrollToTopButton />
        </CartProvider>
      </body>
    </html>
  );
}