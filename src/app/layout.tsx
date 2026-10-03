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
        <ThemeProvider>
          {/* Universal Global Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* Base Deep Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f8fafc_0%,#ffffff_100%)] dark:bg-[radial-gradient(ellipse_at_top,#0f172a_0%,#000000_100%)] transition-colors duration-500" />
            {/* Global Texture Noise (Animated Cinematic Grain) */}
            <div className="absolute -inset-[100%] bg-[url('/noise.svg')] opacity-[0.03] dark:opacity-20 mix-blend-overlay animate-grain pointer-events-none"></div>
            {/* Modern Dot Matrix Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] dark:opacity-[0.05] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] transition-colors duration-500 pointer-events-none"></div>
          </div>

          <Header />
          {children}
          <AIChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
