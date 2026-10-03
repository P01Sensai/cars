"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ShowroomHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      
      {/* Cinematic Background */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0 bg-black"
      >
        <img 
          src="/safari-dark-hero.jpg" 
          alt="Premium SUV" 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      </motion.div>

      {/* Seamless blend gradient that only fades at the very bottom 20% */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 80%, #000 100%)' }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center px-8 site-max mx-auto pt-10 perspective-[1000px]">
        <motion.div 
          style={{ 
            rotateX: useTransform(scrollYProgress, [0, 1], [0, 45]),
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
          }}
          className="max-w-3xl transform-gpu"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/60 uppercase tracking-[0.3em] font-bold text-sm mb-6 font-mono"
          >
            [ SYST_MSG: THE NEW STANDARD IN AUTOMOTIVE DISCOVERY ]
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white font-heading tracking-tighter leading-[0.9] mb-8"
          >
            FIND YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">PERFECT</span> <br />
            DRIVE.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-xl mb-12"
          >
            Verified specifications, accurate on-road pricing, and deep comparisons—powered by advanced AI.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth"
                });
              }}
              className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              Explore Models
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </button>
            <a 
              href="/compare"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold uppercase tracking-wider hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center"
            >
              Compare Cars
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </div>
  );
}
