import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTopButton from "@/app/ui/ScrollToTopButton";
// import MainHeader from "@/app/ui/home/main-header";
// import MainFooter from "@/app/ui/home/main-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* HEADER */}
        {/* <MainHeader /> */}

        {/* MAIN CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        {/* <MainFooter /> */}

        {/* SCROLL TO TOP BUTTON */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
