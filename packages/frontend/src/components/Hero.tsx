"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const TESTIMONIAL_QUOTES = [
  {
    text: "Working with him changed the rules of the game.",
    author: "Mike.L Director of Marketing"
  },
  {
    text: "Just do it.",
    author: "King. Founder 'Genysys'"
  }
] as const;

// Testimonial quote component with memoization
const FloatingQuote = ({ quote, position }: { 
  quote: { text: string, author: string }, 
  position: { top: string, right: string } 
}) => (
  <motion.div 
    className="absolute bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-xs max-w-[200px] shadow-xl pointer-events-none"
    style={position}
    initial={{ opacity: 0, y: 20, x: 20 }}
    animate={{ 
      opacity: [0.7, 0.9, 0.7],
      y: [0, -10, 0],
      x: [0, 5, 0]
    }}
    transition={{ 
      repeat: Infinity, 
      duration: 10, 
      ease: "easeInOut",
    }}
    aria-hidden="true"
  >
    <div className="text-white/90">"{quote.text}"</div>
    <div className="text-white/50 text-right text-[10px] mt-1">{quote.author}</div>
  </motion.div>
);

// Optimized light beam component
const LightBeam = ({ index }: { index: number }) => {
  const left = 10 + index * 20;
  const opacity = 0.1 + (index * 0.05);
  
  return (
    <motion.div 
      className="absolute h-screen w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
      style={{ left: `${left}%`, opacity }}
      animate={{ 
        opacity: [opacity, opacity + 0.1, opacity], 
        height: ['80%', '90%', '80%'] 
      }}
      transition={{ 
        duration: 4 + index, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.5 
      }}
      aria-hidden="true"
    />
  );
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Transform hooks must be at the top level
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section 
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-8 sm:pt-28 sm:pb-0"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
      
      {/* Optimized light beams */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <LightBeam key={i} index={i} />
        ))}
      </div>
      
      {/* Floating testimonial quotes - hidden on mobile */}
      <div className="hidden sm:block">
        <FloatingQuote 
          quote={TESTIMONIAL_QUOTES[0]} 
          position={{ top: '28%', right: '10%' }} 
        />
        <FloatingQuote 
          quote={TESTIMONIAL_QUOTES[1]} 
          position={{ top: '60%', right: '20%' }} 
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div className="flex-1 max-w-xl">
            {/* Job title badge */}
            <motion.div
              variants={FADE_IN_UP}
              className="inline-block px-4 py-1 mb-6 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-sm"
            >
              <span className="text-xs text-white/80">Web3 Developer | Blockchain Expert</span>
            </motion.div>
            
            {/* Hero Heading */}
            <motion.h1
              variants={FADE_IN_UP}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 leading-tight"
            >
              Acrone<span className="text-white/80">lab</span>
              <motion.span
                className="inline-block ml-3 text-white/50"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              variants={FADE_IN_UP}
              className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto px-4 sm:px-0"
            >
              We create profitable NFT collections, DeFi platforms, and Web3 projects in 2-4 weeks — 120+ successful launches, $50M+ turnover, guaranteed results, and a free initial consultation.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 px-4 sm:px-0"
            >
              <motion.a
                href="#projects"
                className="w-full sm:w-auto text-center px-7 py-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-black/60 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>See All Projects</span>
                <motion.span 
                  className="absolute inset-0 bg-white/5" 
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0, originY: 0 }}
                />
              </motion.a>
              
              <motion.a
                href="/contact"
                className="w-full sm:w-auto text-center px-7 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Now
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right column: Will be used for images/graphics in desktop view */}
          <motion.div
            className="flex-1 relative hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* This is placeholder for project thumbnails or graphics */}
            <div className="relative w-full h-[400px] overflow-hidden">
              {/* You can add project thumbnails/graphics here later */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
