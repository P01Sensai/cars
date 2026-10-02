"use client";

import { use, useEffect, useState } from "react";
import { getCarBySlug, CarDetails } from "@/data/cars";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrapping params using React.use for Next.js 15+ compatibility
  const resolvedParams = use(params);
  const [car, setCar] = useState<CarDetails | null>(null);

  useEffect(() => {
    const foundCar = getCarBySlug(resolvedParams.slug);
    if (foundCar) {
      setCar(foundCar);
    } else {
      notFound();
    }
  }, [resolvedParams.slug]);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!car) return null;

  return (
    <main className="min-h-screen bg-background">
      
      {/* Parallax Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img 
            src={car.heroImage} 
            alt={car.model} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl text-white/80 font-bold tracking-widest uppercase mb-4">{car.brand}</h3>
            <h1 className="text-6xl md:text-9xl font-black text-white font-heading tracking-tighter drop-shadow-2xl mb-6">
              {car.model.toUpperCase()}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light italic">
              "{car.tagline}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing & Description */}
      <section className="relative z-20 bg-background -mt-20 pt-20 pb-16 px-6">
        <div className="site-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl font-heading font-black mb-6">THE ESSENCE</h2>
              <p className="text-xl text-foreground/70 leading-relaxed font-light">
                {car.description}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-3xl p-8 min-w-[300px]"
            >
              <p className="text-sm font-bold tracking-widest text-foreground/50 uppercase mb-2">Ex-Showroom Price</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black">{car.basePrice}</span>
                <span className="text-foreground/50">onwards</span>
              </div>
              <p className="text-sm text-foreground/60 mb-8">Top model goes up to {car.topPrice}</p>
              
              <Link href="/compare" className="block w-full text-center bg-foreground text-background py-4 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
                Compare {car.model}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications Bento Grid */}
      <section className="py-20 px-6 bg-black/5 dark:bg-white/5">
        <div className="site-max mx-auto">
          <h2 className="text-4xl font-heading font-black mb-12 text-center">TECHNICAL SPECIFICATIONS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Engine Block */}
            <div className="bg-background rounded-3xl p-8 shadow-sm border border-black/5 dark:border-white/5">
              <h3 className="text-lg font-bold tracking-widest text-foreground/50 uppercase mb-6">Performance</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Engine</p>
                  <p className="font-bold text-xl">{car.specs.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Max Power</p>
                  <p className="font-bold text-xl">{car.specs.power}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Max Torque</p>
                  <p className="font-bold text-xl">{car.specs.torque}</p>
                </div>
              </div>
            </div>

            {/* Drivetrain Block */}
            <div className="bg-background rounded-3xl p-8 shadow-sm border border-black/5 dark:border-white/5">
              <h3 className="text-lg font-bold tracking-widest text-foreground/50 uppercase mb-6">Drivetrain</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Drivetrain</p>
                  <p className="font-bold text-xl">{car.specs.drivetrain}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Transmission Options</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {car.specs.transmission.map(t => (
                      <span key={t} className="px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full text-sm font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dimensions Block */}
            <div className="bg-background rounded-3xl p-8 shadow-sm border border-black/5 dark:border-white/5">
              <h3 className="text-lg font-bold tracking-widest text-foreground/50 uppercase mb-6">Dimensions</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Length</p>
                  <p className="font-bold text-lg">{car.dimensions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Width</p>
                  <p className="font-bold text-lg">{car.dimensions.width}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Height</p>
                  <p className="font-bold text-lg">{car.dimensions.height}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Ground Clearance</p>
                  <p className="font-bold text-lg">{car.dimensions.groundClearance}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-foreground/60 mb-1">Boot Space</p>
                  <p className="font-bold text-lg">{car.dimensions.bootSpace}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
