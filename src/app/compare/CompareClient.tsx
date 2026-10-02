"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";

type SpecCategory = {
  category: string;
  specs: {
    label: string;
    car1: string;
    car2: string;
    isIdentical: boolean;
  }[];
};

const DUMMY_DATA: SpecCategory[] = [
  {
    category: "Powertrain",
    specs: [
      { label: "Engine Type", car1: "2.0L mStallion Turbo", car2: "1.5L K15C Smart Hybrid", isIdentical: false },
      { label: "Displacement", car1: "1997 cc", car2: "1462 cc", isIdentical: false },
      { label: "Cylinders", car1: "4", car2: "4", isIdentical: true },
      { label: "Transmission", car1: "6-Speed Automatic", car2: "6-Speed Automatic", isIdentical: true },
    ]
  },
  {
    category: "Safety",
    specs: [
      { label: "Airbags", car1: "6", car2: "6", isIdentical: true },
      { label: "NCAP Rating", car1: "5 Star (Global NCAP)", car2: "4 Star (Global NCAP)", isIdentical: false },
      { label: "ABS + EBD", car1: "Standard", car2: "Standard", isIdentical: true },
    ]
  },
  {
    category: "Dimensions",
    specs: [
      { label: "Length", car1: "4662 mm", car2: "3995 mm", isIdentical: false },
      { label: "Ground Clearance", car1: "187 mm", car2: "198 mm", isIdentical: false },
      { label: "Seating Capacity", car1: "7", car2: "5", isIdentical: false },
    ]
  }
];

export default function CompareClient() {
  const [showUniqueOnly, setShowUniqueOnly] = useState(false);

  return (
    <div className="w-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-6 mb-12">
        <div className="site-max flex flex-col md:flex-row items-center justify-between gap-6 px-8 mx-auto">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase hidden md:block hover:opacity-70 transition">
            Cars
          </Link>
          
          <div className="flex-1 grid grid-cols-2 gap-8 items-center justify-center max-w-2xl w-full">
            <div className="text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Car 1</p>
              <h2 className="text-2xl font-bold">Scorpio N</h2>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Car 2</p>
              <h2 className="text-2xl font-bold">Brezza</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Show Unique Specs Only</span>
            <button 
              onClick={() => setShowUniqueOnly(!showUniqueOnly)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                showUniqueOnly ? 'bg-foreground' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <motion.span
                layout
                className="inline-block h-5 w-5 rounded-full bg-background shadow-md transform"
                animate={{ x: showUniqueOnly ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Layout */}
      <div className="site-max mx-auto px-8 pb-20">
        {DUMMY_DATA.map((section) => {
          // Check if section has any visible items
          const hasVisibleSpecs = section.specs.some(spec => !showUniqueOnly || !spec.isIdentical);
          
          if (!hasVisibleSpecs) return null;

          return (
            <div key={section.category} className="mb-16">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                {section.category}
              </h3>
              
              <div className="flex flex-col">
                <AnimatePresence>
                  {section.specs.map((spec, i) => {
                    if (showUniqueOnly && spec.isIdentical) return null;
                    
                    return (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 py-5 border-b border-gray-100 dark:border-gray-900 items-center ${!spec.isIdentical && showUniqueOnly ? 'bg-gray-50 dark:bg-[#0a0a0a] rounded-lg px-4 -mx-4' : ''}`}>
                          <div className="font-semibold text-gray-500 text-sm md:text-base">
                            {spec.label}
                          </div>
                          <div className={`text-base md:text-lg font-medium ${!spec.isIdentical ? 'text-foreground' : 'text-gray-600 dark:text-gray-400'}`}>
                            {spec.car1}
                          </div>
                          <div className={`text-base md:text-lg font-medium ${!spec.isIdentical ? 'text-foreground' : 'text-gray-600 dark:text-gray-400'}`}>
                            {spec.car2}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart Alternatives Shelf */}
      <div className="site-max mx-auto px-8 pb-32">
        <h3 className="text-2xl font-bold tracking-tight mb-8">Smart Alternatives</h3>
        <p className="text-gray-500 mb-6 -mt-6">Vehicles in the similar price bracket (₹10L - ₹15L)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Tata Nexon", "Kia Sonet"].map((car) => (
            <div key={car} className="flex items-center justify-between bg-gray-50 dark:bg-[#050505] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition cursor-pointer">
              <div>
                <h4 className="font-bold text-xl mb-1">{car}</h4>
                <p className="text-sm text-gray-500">Compact SUV Segment</p>
              </div>
              <div className="bg-foreground text-background p-3 rounded-full">
                <Check size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
