"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image: string;
}

export default function NewsCarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (data.articles) {
          // Double the articles array to create a seamless infinite loop
          setNews([...data.articles, ...data.articles]);
        }
      } catch (error) {
        console.error("Failed to load news", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Infinite Scroll Logic using Framer Motion
  const x = useRef(0);
  
  useAnimationFrame((time, delta) => {
    if (!scrollerRef.current || news.length === 0) return;
    
    // Adjust speed here
    x.current -= 0.5 * (delta / 16); 
    
    // Reset when half the duplicated list is scrolled
    // Assuming each card is ~400px wide + 32px gap
    const cardWidth = 432; 
    const totalWidth = (news.length / 2) * cardWidth;
    
    if (Math.abs(x.current) >= totalWidth) {
      x.current = 0;
    }
    
    scrollerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 site-max mx-auto px-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-black/5 dark:bg-white/5 rounded-2xl mb-6"></div>
            <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-full mb-2"></div>
            <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      {/* Left/Right Fade Gradients for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <div 
        ref={scrollerRef}
        className="flex gap-8 px-8 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]"
      >
        {news.map((item, idx) => (
          <a 
            key={`${item.id}-${idx}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[400px] group block"
          >
            <div className="h-64 bg-black/5 dark:bg-white/5 rounded-2xl mb-6 overflow-hidden relative border border-black/5 dark:border-white/10">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/safari-dark-hero.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            <p className="text-[10px] font-bold text-foreground/50 mb-3 tracking-[0.2em] uppercase">
              {new Date(item.pubDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <h4 className="font-bold text-xl leading-snug group-hover:text-foreground/70 transition-colors text-foreground mb-3 line-clamp-2">
              {item.title}
            </h4>
            <p className="text-sm text-foreground/60 line-clamp-3 font-light">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
