import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cars | Premium Automotive Comparison",
  description: "A high-end discovery and comparison engine for Indian automotive specs.",
};

import { ThemeProvider } from "@/components/ThemeProvider";

import AIChatBot from "@/components/AIChatBot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Universal Global Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* Base Deep Gradient - Removed to keep it pitch black */}
          </div>

          <Header />
          {children}
          <AIChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
