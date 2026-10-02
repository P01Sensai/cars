"use client";

import SplashScreen from "@/components/SplashScreen";
import ShowroomHero from "@/components/ShowroomHero";
import NewsCarousel from "@/components/NewsCarousel";
import { motion } from "framer-motion";

import Link from "next/link";

const TRENDING_CARS = [
  { id: 1, name: "Mahindra Scorpio N", price: "₹13.60 Lakh", img: "/scorpio-hero.jpg", slug: "mahindra-scorpio-n" },
  { id: 2, name: "Tata Safari Dark", price: "₹16.19 Lakh", img: "/safari-dark-hero.jpg", slug: "tata-safari-dark" },
  { id: 3, name: "Mahindra XUV 7XO", price: "₹14.00 Lakh", img: "/xuv-hero.jpg", slug: "mahindra-xuv-7xo" },
  { id: 4, name: "Hyundai Verna", price: "₹11.00 Lakh", img: "/verna-hero.jpg", slug: "hyundai-verna" },
];

export default function Home() {
  return (
    <main className="min-h-screen text-foreground relative z-0">
      <SplashScreen />
      
      {/* 3D Cinematic Hero */}
      <ShowroomHero />
      
      {/* Trending Bento Grid with Animated Background */}
      <section className="relative pt-12 pb-32 px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Highly Performant Static Radial Gradients sitting over the universal background */}
          <div className="absolute -top-[20vw] left-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
          <div className="absolute top-[20%] right-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="site-max relative z-10 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-4xl font-black tracking-tighter text-black dark:text-white mb-2 font-heading">TRENDING NOW</h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">The most searched premium models this week.</p>
            </div>
            <button className="text-sm font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest hidden md:block">
              Explore All Showrooms &rarr;
            </button>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TRENDING_CARS.map((car, i) => (
              <motion.div 
                key={car.id} 
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className={`relative bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 group cursor-pointer ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]' : 'h-[300px] md:h-auto md:min-h-[290px]'
                }`}
              >
                <Link href={`/cars/${car.slug}`} className="absolute inset-0 z-20" aria-label={`View details for ${car.name}`}></Link>
                <img 
                  src={car.img} 
                  alt={car.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glassmorphic content block that slides up */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                  <div>
                    <p className="text-xs font-bold text-white/70 tracking-wider uppercase mb-1">Starting at</p>
                    <p className="text-xl font-bold text-white mb-2">{car.price}</p>
                    <h4 className="font-bold text-2xl md:text-3xl text-white tracking-tight">{car.name}</h4>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex flex-shrink-0 items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:-rotate-45">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RSS News Grid Placeholder */}
      <section className="relative py-32 px-8 border-t border-black/5 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Highly Performant Static Radial Gradient sitting over the universal background */}
          <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1)_0%,transparent_70%)]" />
        </div>
        
        <div className="relative z-10 w-full overflow-hidden pb-12">
          <h3 className="text-4xl font-black tracking-tighter mb-16 text-center text-black dark:text-white font-heading">AUTOMOTIVE INSIGHTS</h3>
          <NewsCarousel />
        </div>
      </section>
    </main>
  );
}
