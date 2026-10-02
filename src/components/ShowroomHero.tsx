"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ROSTER = [
  {
    id: 'sierra',
    title: 'TATA SIERRA',
    subtitle: 'The New Benchmark',
    desc: 'Discover the future of Indian automotive design. Pure electric, unapologetically bold.',
    exterior: '/tata-sierra-hero.jpg',
    interior: '/interior-hero.jpg',
  },
  {
    id: '7xo',
    title: 'MAHINDRA XUV 7XO',
    subtitle: 'Unmatched Presence',
    desc: 'Command the road with advanced tech and uncompromising power.',
    exterior: '/xuv-hero.jpg',
    interior: '/interior-hero.jpg',
  },
  {
    id: 'safari',
    title: 'SAFARI DARK',
    subtitle: 'The Night is Yours',
    desc: 'Embrace the darkness with stealth styling and premium comfort.',
    exterior: '/safari-dark-hero.jpg',
    interior: '/interior-hero.jpg',
  },
  {
    id: 'scorpio',
    title: 'SCORPIO N',
    subtitle: 'The Big Daddy of SUVs',
    desc: 'Unapologetic capability meets refined luxury for the ultimate driving experience.',
    exterior: '/scorpio-hero.jpg',
    interior: '/interior-hero.jpg',
  },
  {
    id: 'verna',
    title: 'HYUNDAI VERNA',
    subtitle: 'Futuristic Elegance',
    desc: 'Aerodynamic precision and class-leading performance in a sleek sedan package.',
    exterior: '/verna-hero.jpg',
    interior: '/interior-hero.jpg',
  },
  {
    id: 'nexon',
    title: 'TATA NEXON',
    subtitle: 'Next-Gen Dynamics',
    desc: 'India\'s favorite compact SUV, reimagined for the modern era.',
    exterior: '/nexon-hero.jpg',
    interior: '/interior-hero.jpg',
  }
];

export default function ShowroomHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [car, setCar] = useState<typeof ROSTER[0] | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ROSTER.length);
    setCar(ROSTER[randomIndex]);
    setIsHydrated(true);
  }, []);
  
  // Always hook useScroll to the containerRef unconditionally
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const sierraOpacity = useTransform(smoothProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const sierraScale = useTransform(smoothProgress, [0, 0.5], [1, 1.15]);
  const sierraY = useTransform(smoothProgress, [0, 0.5], ["0%", "10%"]);

  const interiorOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const interiorScale = useTransform(smoothProgress, [0.4, 1], [1.15, 1]);

  const textOpacity1 = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textOpacity2 = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const uiOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]); 

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-black -mt-20">
      
      {/* Loading Screen of Wheels (Shows until Hydration is complete) */}
      {!isHydrated && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full"
            />
          </div>
          <p className="text-gray-500 uppercase tracking-widest mt-6 font-semibold text-sm">Firing up engines...</p>
        </div>
      )}

      {/* Sticky Scroll Wrapper (Only visible once car is selected to prevent flash of generic content) */}
      {isHydrated && car && (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* --- IMAGE 1: Exterior --- */}
          <motion.div 
            style={{ scale: sierraScale, opacity: sierraOpacity, y: sierraY }}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10" />
            <img 
              src={car.exterior} 
              alt={car.title} 
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* --- IMAGE 2: Futuristic Interior --- */}
          <motion.div 
            style={{ scale: interiorScale, opacity: interiorOpacity }}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10" />
            <img 
              src={car.interior} 
              alt="Cabin Interior" 
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* --- TEXT 1 (Exterior) --- */}
          <motion.div 
            style={{ opacity: textOpacity1 }}
            className="absolute z-20 flex flex-col items-center mt-32 px-4 w-full pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-sm md:text-base font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">
                {car.subtitle}
              </p>
              <h2 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-6 text-white drop-shadow-2xl">
                {car.title}
              </h2>
              <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl font-light">
                {car.desc}
              </p>
            </motion.div>
          </motion.div>

          {/* --- TEXT 2 (Interior) --- */}
          <motion.div 
            style={{ opacity: textOpacity2 }}
            className="absolute z-20 flex flex-col items-center px-4 w-full pointer-events-none"
          >
            <div className="flex flex-col items-center text-center">
              <p className="text-sm md:text-base font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">
                Step Inside
              </p>
              <h2 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-6 text-white drop-shadow-2xl">
                LUXURY REDEFINED
              </h2>
              <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl font-light">
                Immersive glowing ambient light, premium leather, and intelligent displays.
              </p>
            </div>
          </motion.div>
          
          {/* Quick Compare Bar (Only on Section 1) */}
          <motion.div 
            style={{ opacity: uiOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            className="absolute bottom-24 z-30 pointer-events-auto flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-black/40 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10"
          >
            <div className="relative">
              <select defaultValue={car.id} className="appearance-none bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors py-3 px-6 pr-12 rounded-xl focus:outline-none min-w-[200px] text-black dark:text-white [&>option]:bg-white dark:[&>option]:bg-black [&>option]:text-black dark:[&>option]:text-white">
                <option value="" disabled>Select Car 1</option>
                <option value="sierra">Tata Sierra</option>
                <option value="7xo">Mahindra XUV 7XO</option>
                <option value="safari">Tata Safari Dark</option>
                <option value="scorpio">Mahindra Scorpio N</option>
                <option value="verna">Hyundai Verna</option>
                <option value="nexon">Tata Nexon</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <span className="hidden sm:flex items-center justify-center font-mono text-sm text-gray-500 px-2">VS</span>

            <div className="relative">
              <select defaultValue="" className="appearance-none bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors py-3 px-6 pr-12 rounded-xl focus:outline-none min-w-[200px] text-black dark:text-white [&>option]:bg-white dark:[&>option]:bg-black [&>option]:text-black dark:[&>option]:text-white">
                <option value="" disabled>Select Competitor</option>
                <option value="scorpio">Mahindra Scorpio N</option>
                <option value="xuv700">Mahindra XUV 7XO</option>
                <option value="safari">Tata Safari</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <Link href="/compare" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center ml-2">
              Matchup
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
