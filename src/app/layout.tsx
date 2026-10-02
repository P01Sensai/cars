import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cars | Premium Automotive Comparison",
  description: "A high-end discovery and comparison engine for Indian automotive specs.",
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col pt-20 relative bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
        <ThemeProvider>
          {/* Universal Global Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* Base Deep Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f8fafc_0%,#ffffff_100%)] dark:bg-[radial-gradient(ellipse_at_top,#0f172a_0%,#000000_100%)] transition-colors duration-500" />
            {/* Global Texture Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 mix-blend-overlay transition-opacity duration-500"></div>
            {/* Global Architectural Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] opacity-100 dark:opacity-50 transition-colors duration-500"></div>
          </div>

          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
