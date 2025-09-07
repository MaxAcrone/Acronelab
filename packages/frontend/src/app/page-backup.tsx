"use client";

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Teams from '../components/Teams';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import GrowTogether from '../components/GrowTogether';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="glow-bg">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Projects Section */}
      <Projects />
      
      {/* About Section */}
      <About />
      
      {/* Teams Section */}
      <Teams />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Grow Together Section */}
      <GrowTogether />
      
      {/* Footer */}
      <Footer />
      
      {/* Background Elements */}
      <div className="gradient-overlay animate-pulse-glow"></div>
      
      {/* Light Beams */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[-1] overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.13] bg-white/60"
            style={{
              width: `${Math.random() * 25 + 10}px`,
              height: '100vh',
              left: `${Math.random() * 100}%`,
              opacity: 0.13,
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(171, 171, 171, 0) 100%)'
            }}
            initial={{ opacity: 0.05 }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </main>
  );
}
