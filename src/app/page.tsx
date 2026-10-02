"use client";

import SplashScreen from "@/components/SplashScreen";
import ShowroomHero from "@/components/ShowroomHero";
import { motion } from "framer-motion";

const TRENDING_CARS = [
  { id: 1, name: "Mahindra Scorpio N", price: "₹13.60 Lakh", img: "/scorpio-hero.jpg" },
  { id: 2, name: "Tata Safari Dark", price: "₹16.19 Lakh", img: "/safari-dark-hero.jpg" },
  { id: 3, name: "Mahindra XUV 7XO", price: "₹14.00 Lakh", img: "/xuv-hero.jpg" },
  { id: 4, name: "Hyundai Verna", price: "₹11.00 Lakh", img: "/verna-hero.jpg" },
];

export default function Home() {
  return (
    <main className="min-h-screen text-foreground relative z-0">
      <SplashScreen />
      
      {/* 3D Cinematic Hero */}
      <ShowroomHero />
      
      {/* Trending Carousel with Animated Background */}
      <section className="relative pt-12 pb-32 px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Highly Performant Static Radial Gradients sitting over the universal background */}
          <div className="absolute -top-[20vw] left-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
          <div className="absolute top-[20%] right-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="site-max relative z-10 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-4xl font-black tracking-tighter text-black dark:text-white mb-2">TRENDING NOW</h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">The most searched premium models this week.</p>
            </div>
            <button className="text-sm font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest hidden md:block">
              Explore All Showrooms &rarr;
            </button>
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
            {TRENDING_CARS.map((car) => (
              <div 
                key={car.id} 
                className="min-w-[320px] md:min-w-[420px] bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-4 snap-center border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group cursor-pointer"
              >
                <div className="h-[220px] bg-gray-200 dark:bg-black rounded-2xl mb-6 overflow-hidden relative">
                  <img 
                    src={car.img} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 transform transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="text-xs font-bold text-white/70 tracking-wider uppercase mb-1">Starting at</p>
                    <p className="text-xl font-bold text-white">{car.price}</p>
                  </div>
                </div>
                <div className="px-2 flex items-center justify-between pb-2 transform transition-transform duration-500 group-hover:translate-x-1">
                  <h4 className="font-bold text-2xl text-black dark:text-white tracking-tight">{car.name}</h4>
                  <button className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSS News Grid Placeholder */}
      <section className="relative py-32 px-8 border-t border-black/5 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Highly Performant Static Radial Gradient sitting over the universal background */}
          <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1)_0%,transparent_70%)]" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-4xl font-black tracking-tighter mb-16 text-center text-black dark:text-white">AUTOMOTIVE INSIGHTS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 site-max mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-64 bg-black/5 dark:bg-white/5 rounded-2xl mb-6 group-hover:opacity-80 transition border border-black/5 dark:border-white/5"></div>
                <p className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">INDUSTRY NEWS</p>
                <h4 className="font-bold text-2xl leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition text-black dark:text-white">The Future of EVs in the Indian Market by 2026</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
