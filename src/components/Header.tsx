"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Showroom", href: "/" },
    { name: "Matchup", href: "/compare" },
    { name: "Brochures", href: "/brochures" },
  ];

  const isTransparent = !scrolled && pathname === '/';
  const textColorClass = isTransparent ? "text-white" : "text-foreground";
  const linkColorClass = isTransparent ? "text-white/70 hover:text-white" : "text-foreground/60 hover:text-foreground";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 1, ease: "easeOut" }} // Delays until splash screen finishes
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        isTransparent 
          ? "bg-transparent border-transparent py-4"
          : "bg-background/80 dark:bg-black/80 backdrop-blur-xl border-foreground/10 py-0" 
      }`}
    >
      <div className={`site-max mx-auto px-8 h-20 flex items-center justify-between relative ${textColorClass}`}>
        
        {/* Animated Car with Dust Driving Along Bottom of Header */}
        <motion.div
          initial={{ x: "-20vw" }}
          animate={{ x: "120vw" }}
          transition={{ duration: 7, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="absolute -bottom-3 left-0 z-0 pointer-events-none flex items-end opacity-40"
        >
          {/* Dust Particles */}
          <div className="relative w-8 h-4 mr-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0], 
                  scale: [0.5, 2, 3], 
                  x: [0, -20 - (i * 5)], 
                  y: [0, -5 - (i * 2)] 
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
                className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400 rounded-full blur-[2px]"
              />
            ))}
          </div>

          {/* High-Quality Car Silhouette with Bounce */}
          <motion.div
            animate={{ y: [0, -2, 0, -1, 0] }}
            transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
            className={textColorClass}
          >
            <svg width="80" height="24" viewBox="0 0 500 150" fill="currentColor">
              {/* Sleek Hypercar Body */}
              <path d="M 20 100 L 20 60 C 20 55 30 50 50 50 C 80 40 120 20 200 20 L 280 20 C 340 20 380 40 420 55 C 460 65 480 70 480 80 L 480 100 L 430 100 A 30 30 0 0 0 370 100 L 150 100 A 30 30 0 0 0 90 100 L 20 100 Z" />
              {/* Spoiler */}
              <path d="M 20 60 L 5 35 L 45 45 Z" />
              {/* Windows (Negative Space) */}
              <path d="M 220 25 L 270 25 L 340 45 L 220 45 Z" fill="#000" />
              {/* Rear Wheels */}
              <circle cx="120" cy="100" r="26" fill="#111" />
              <circle cx="120" cy="100" r="14" fill="#888" />
              <circle cx="120" cy="100" r="6" fill="#fff" />
              {/* Front Wheels */}
              <circle cx="400" cy="100" r="26" fill="#111" />
              <circle cx="400" cy="100" r="14" fill="#888" />
              <circle cx="400" cy="100" r="6" fill="#fff" />
            </svg>
          </motion.div>
        </motion.div>

        <Link href="/" className="relative z-10 text-2xl font-black tracking-tighter uppercase">
          CARS
        </Link>
        
        <nav className="relative z-10 hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors ${
                  isActive 
                    ? (isTransparent ? "text-white" : "text-foreground") 
                    : linkColorClass
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            {mounted && (
              <>
                {/* Sun Icon (Visible in Dark Mode to switch to Light) */}
                <svg className="hidden dark:block w-5 h-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {/* Moon Icon (Visible in Light Mode to switch to Dark) */}
                <svg className="block dark:hidden w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </>
            )}
          </button>
          
          <button className="md:hidden text-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
