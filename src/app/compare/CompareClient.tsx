"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ArrowLeftRight, Zap } from "lucide-react";
import Link from "next/link";

// ─── Car Database ────────────────────────────────────────────
type CarSpec = {
  engine: string;
  displacement: string;
  power: string;
  torque: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  airbags: string;
  ncap: string;
  abs: string;
  esc: string;
  length: string;
  width: string;
  height: string;
  wheelbase: string;
  groundClearance: string;
  bootSpace: string;
  seating: string;
  price: string;
  segment: string;
  img: string;
};

const CAR_DATABASE: Record<string, CarSpec> = {
  "Mahindra Scorpio N": {
    engine: "2.0L mStallion Turbo Petrol",
    displacement: "1997 cc",
    power: "200 bhp @ 5000 rpm",
    torque: "370 Nm @ 1500-3000 rpm",
    transmission: "6-Speed Automatic",
    fuelType: "Petrol / Diesel",
    mileage: "11.99 kmpl",
    airbags: "6",
    ncap: "5 Star (Global NCAP)",
    abs: "Standard",
    esc: "Standard",
    length: "4662 mm",
    width: "1917 mm",
    height: "1857 mm",
    wheelbase: "2750 mm",
    groundClearance: "187 mm",
    bootSpace: "460 L",
    seating: "7",
    price: "₹13.60 - ₹24.54 Lakh",
    segment: "Mid-Size SUV",
    img: "/scorpio-hero.jpg",
  },
  "Maruti Brezza": {
    engine: "1.5L K15C Smart Hybrid",
    displacement: "1462 cc",
    power: "103 bhp @ 6000 rpm",
    torque: "137 Nm @ 4400 rpm",
    transmission: "6-Speed Automatic",
    fuelType: "Petrol",
    mileage: "19.80 kmpl",
    airbags: "6",
    ncap: "4 Star (Global NCAP)",
    abs: "Standard",
    esc: "Standard",
    length: "3995 mm",
    width: "1790 mm",
    height: "1685 mm",
    wheelbase: "2500 mm",
    groundClearance: "198 mm",
    bootSpace: "328 L",
    seating: "5",
    price: "₹8.34 - ₹14.14 Lakh",
    segment: "Sub-Compact SUV",
    img: "",
  },
  "Tata Safari Dark": {
    engine: "2.0L Kryotec Turbocharged Diesel",
    displacement: "1956 cc",
    power: "168 bhp @ 3750 rpm",
    torque: "350 Nm @ 1750-2500 rpm",
    transmission: "6-Speed Automatic",
    fuelType: "Diesel",
    mileage: "14.08 kmpl",
    airbags: "6",
    ncap: "5 Star (Global NCAP)",
    abs: "Standard",
    esc: "Standard",
    length: "4661 mm",
    width: "1894 mm",
    height: "1786 mm",
    wheelbase: "2741 mm",
    groundClearance: "205 mm",
    bootSpace: "382 L",
    seating: "7",
    price: "₹16.19 - ₹27.34 Lakh",
    segment: "Mid-Size SUV",
    img: "/safari-dark-hero.jpg",
  },
  "Mahindra XUV 7XO": {
    engine: "2.0L mStallion Turbo Petrol",
    displacement: "1997 cc",
    power: "197 bhp @ 5000 rpm",
    torque: "380 Nm @ 1750-3000 rpm",
    transmission: "6-Speed Automatic",
    fuelType: "Petrol / Diesel",
    mileage: "12.37 kmpl",
    airbags: "7",
    ncap: "5 Star (Global NCAP)",
    abs: "Standard",
    esc: "Standard",
    length: "4695 mm",
    width: "1890 mm",
    height: "1755 mm",
    wheelbase: "2750 mm",
    groundClearance: "200 mm",
    bootSpace: "451 L",
    seating: "7",
    price: "₹14.00 - ₹25.50 Lakh",
    segment: "Mid-Size SUV",
    img: "/xuv-hero.jpg",
  },
  "Hyundai Verna": {
    engine: "1.5L MPi Petrol",
    displacement: "1497 cc",
    power: "113 bhp @ 6300 rpm",
    torque: "144 Nm @ 4500 rpm",
    transmission: "CVT Automatic",
    fuelType: "Petrol",
    mileage: "18.60 kmpl",
    airbags: "6",
    ncap: "5 Star (Global NCAP)",
    abs: "Standard",
    esc: "Standard",
    length: "4535 mm",
    width: "1765 mm",
    height: "1475 mm",
    wheelbase: "2600 mm",
    groundClearance: "170 mm",
    bootSpace: "528 L",
    seating: "5",
    price: "₹11.00 - ₹17.44 Lakh",
    segment: "Mid-Size Sedan",
    img: "/verna-hero.jpg",
  },
  "Tata Nexon": {
    engine: "1.2L Revotron Turbo Petrol",
    displacement: "1199 cc",
    power: "118 bhp @ 5500 rpm",
    torque: "170 Nm @ 1750-4000 rpm",
    transmission: "6-Speed AMT",
    fuelType: "Petrol / Diesel",
    mileage: "17.44 kmpl",
    airbags: "6",
    ncap: "5 Star (Global NCAP)",
    abs: "Standard",
    esc: "Standard",
    length: "3993 mm",
    width: "1811 mm",
    height: "1606 mm",
    wheelbase: "2498 mm",
    groundClearance: "209 mm",
    bootSpace: "350 L",
    seating: "5",
    price: "₹8.00 - ₹15.50 Lakh",
    segment: "Sub-Compact SUV",
    img: "/nexon-hero.jpg",
  },
};

const CAR_NAMES = Object.keys(CAR_DATABASE);

// ─── Spec Layout Definition ─────────────────────────────────
type SpecRow = { label: string; key: keyof CarSpec };
type SpecSection = { category: string; icon: string; specs: SpecRow[] };

const SPEC_SECTIONS: SpecSection[] = [
  {
    category: "Powertrain",
    icon: "⚡",
    specs: [
      { label: "Engine Type", key: "engine" },
      { label: "Displacement", key: "displacement" },
      { label: "Max Power", key: "power" },
      { label: "Max Torque", key: "torque" },
      { label: "Transmission", key: "transmission" },
      { label: "Fuel Type", key: "fuelType" },
      { label: "Mileage (ARAI)", key: "mileage" },
    ],
  },
  {
    category: "Safety",
    icon: "🛡️",
    specs: [
      { label: "Airbags", key: "airbags" },
      { label: "NCAP Rating", key: "ncap" },
      { label: "ABS + EBD", key: "abs" },
      { label: "ESC", key: "esc" },
    ],
  },
  {
    category: "Dimensions",
    icon: "📐",
    specs: [
      { label: "Length", key: "length" },
      { label: "Width", key: "width" },
      { label: "Height", key: "height" },
      { label: "Wheelbase", key: "wheelbase" },
      { label: "Ground Clearance", key: "groundClearance" },
      { label: "Boot Space", key: "bootSpace" },
      { label: "Seating Capacity", key: "seating" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────
export default function CompareClient() {
  const [car1Name, setCar1Name] = useState("Mahindra Scorpio N");
  const [car2Name, setCar2Name] = useState("Tata Safari Dark");
  const [showUniqueOnly, setShowUniqueOnly] = useState(false);

  const car1 = CAR_DATABASE[car1Name];
  const car2 = CAR_DATABASE[car2Name];

  // Build comparison data dynamically
  const comparisonData = useMemo(() => {
    return SPEC_SECTIONS.map((section) => ({
      ...section,
      specs: section.specs.map((spec) => ({
        label: spec.label,
        car1: car1[spec.key],
        car2: car2[spec.key],
        isIdentical: car1[spec.key] === car2[spec.key],
      })),
    }));
  }, [car1, car2]);

  // Smart alternatives — cars in a similar price segment, excluding the selected ones
  const alternatives = useMemo(() => {
    return CAR_NAMES.filter(
      (name) => name !== car1Name && name !== car2Name
    ).slice(0, 3);
  }, [car1Name, car2Name]);

  const handleSwap = () => {
    setCar1Name(car2Name);
    setCar2Name(car1Name);
  };

  return (
    <div className="w-full">
      {/* Sticky Header with Dynamic Selectors */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-6 mb-12">
        <div className="site-max flex flex-col md:flex-row items-center justify-between gap-6 px-8 mx-auto">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase hidden md:block hover:opacity-70 transition">
            Cars
          </Link>

          <div className="flex-1 flex items-center justify-center gap-4 max-w-3xl w-full">
            {/* Car 1 Selector */}
            <div className="flex-1 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Car 1</p>
              <div className="relative">
                <select
                  value={car1Name}
                  onChange={(e) => setCar1Name(e.target.value)}
                  className="w-full appearance-none bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 rounded-xl py-3 px-4 pr-10 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors text-black dark:text-white [&>option]:bg-white dark:[&>option]:bg-black [&>option]:text-black dark:[&>option]:text-white"
                >
                  {CAR_NAMES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center transition-colors shrink-0 mt-6"
              title="Swap cars"
            >
              <ArrowLeftRight size={18} />
            </button>

            {/* Car 2 Selector */}
            <div className="flex-1 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Car 2</p>
              <div className="relative">
                <select
                  value={car2Name}
                  onChange={(e) => setCar2Name(e.target.value)}
                  className="w-full appearance-none bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 rounded-xl py-3 px-4 pr-10 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors text-black dark:text-white [&>option]:bg-white dark:[&>option]:bg-black [&>option]:text-black dark:[&>option]:text-white"
                >
                  {CAR_NAMES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 hidden lg:block">Unique Only</span>
            <button
              onClick={() => setShowUniqueOnly(!showUniqueOnly)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                showUniqueOnly ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <motion.span
                layout
                className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
                animate={{ x: showUniqueOnly ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Car Image Hero Banner */}
      <div className="site-max mx-auto px-8 mb-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="relative h-56 bg-gray-200 dark:bg-[#111] rounded-3xl overflow-hidden">
            {car1.img && (
              <img src={car1.img} alt={car1Name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider">{car1.segment}</p>
              <p className="text-white font-bold text-xl">{car1.price}</p>
            </div>
          </div>
          <div className="relative h-56 bg-gray-200 dark:bg-[#111] rounded-3xl overflow-hidden">
            {car2.img && (
              <img src={car2.img} alt={car2Name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider">{car2.segment}</p>
              <p className="text-white font-bold text-xl">{car2.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spec Comparison Table */}
      <div className="site-max mx-auto px-8 pb-20">
        {comparisonData.map((section) => {
          const hasVisibleSpecs = section.specs.some(
            (spec) => !showUniqueOnly || !spec.isIdentical
          );
          if (!hasVisibleSpecs) return null;

          return (
            <div key={section.category} className="mb-16">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-3">
                <span>{section.icon}</span>
                {section.category}
              </h3>

              <div className="flex flex-col">
                <AnimatePresence>
                  {section.specs.map((spec) => {
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
                        <div
                          className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 py-5 border-b border-gray-100 dark:border-gray-900 items-center ${
                            !spec.isIdentical
                              ? "bg-indigo-50/50 dark:bg-indigo-950/10 rounded-lg px-4 -mx-4"
                              : ""
                          }`}
                        >
                          <div className="font-semibold text-gray-500 text-sm md:text-base flex items-center gap-2">
                            {!spec.isIdentical && <Zap size={14} className="text-indigo-500" />}
                            {spec.label}
                          </div>
                          <div
                            className={`text-base md:text-lg font-medium ${
                              !spec.isIdentical
                                ? "text-black dark:text-white"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {spec.car1}
                          </div>
                          <div
                            className={`text-base md:text-lg font-medium ${
                              !spec.isIdentical
                                ? "text-black dark:text-white"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
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
        <h3 className="text-2xl font-bold tracking-tight mb-2">Smart Alternatives</h3>
        <p className="text-gray-500 mb-8">Other vehicles you might want to compare</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alternatives.map((carName) => {
            const car = CAR_DATABASE[carName];
            return (
              <button
                key={carName}
                onClick={() => setCar2Name(carName)}
                className="flex items-center justify-between bg-gray-50 dark:bg-[#050505] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition cursor-pointer text-left group"
              >
                <div>
                  <h4 className="font-bold text-xl mb-1 text-black dark:text-white">{carName}</h4>
                  <p className="text-sm text-gray-500">{car.segment} · {car.price}</p>
                </div>
                <div className="bg-black/5 dark:bg-white/10 group-hover:bg-indigo-600 group-hover:text-white text-black dark:text-white p-3 rounded-full transition-colors">
                  <ArrowLeftRight size={18} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
