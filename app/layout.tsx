import type { Metadata } from "next";
// Make sure these Geist imports are correct based on your setup (they look correct)
import { Geist, Geist_Mono } from "next/font/google"; 
import ScrollToTopButton from "@/app/ui/ScrollToTopButton";
import MainHeader from "@/app/ui/home/main-header";
// import MainFooter from "@/app/ui/home/main-footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "@/app/context/CartContext";
import "./globals.css";

// --- FONT DEFINITIONS MUST BE HERE ---
// This is where 'geistSans' and 'geistMono' are defined.
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
        // The variables must be defined above this function to be used here
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>  
          <CartProvider>
            {/* HEADER */}
            {/* <MainHeader /> */}

            {/* MAIN CONTENT */}
            <main className="flex-1">{children}</main>

            {/* FOOTER */}
            {/* <MainFooter /> */}

            {/* SCROLL TO TOP BUTTON */}
            <ScrollToTopButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}