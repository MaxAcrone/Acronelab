"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import BriefModal from './BriefModal';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-5 left-0 right-0 z-50 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'} transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center" data-component-name="Header">
        <Link href="/" className="flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <img src="/images/projects/Logo Acronelab.png" alt="Acronelab Logo" className="h-8" />
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex items-center justify-center flex-1 mx-6" data-component-name="Header">
          {[
            { name: 'Projects', href: '/#projects' },
            { name: 'About', href: '/#about', isSpecial: true },
            { name: 'Testimonials', href: '/#testimonials' },
            { name: 'Price', href: '/#grow-together' },
          ].map((item) => (
            <motion.div key={item.name}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative mx-4"
            >
              <Link 
                href={item.href} 
                className="hover:text-white text-white/90 transition-colors text-sm font-medium"
              >
                {/* Мерцающая точка убрана */}
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="hidden md:flex relative group"
        >
          <button 
            onClick={() => setIsBriefModalOpen(true)}
            className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full text-xs font-medium hover:bg-white/15 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white" />
            </svg>
            <span>Get for Brief</span>
          </button>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.span 
            className="w-5 h-0.5 bg-white/80 block"
            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
          <motion.span 
            className="w-5 h-0.5 bg-white/80 block"
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
          <motion.span 
            className="w-5 h-0.5 bg-white/80 block"
            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5"
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex flex-col space-y-4">
            {[
              { name: 'Projects', href: '/#projects' },
              { name: 'About', href: '/#about' },
              { name: 'Testimonials', href: '/#testimonials' },
              { name: 'Price', href: '/#grow-together' },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-white/90 hover:text-white transition-colors text-base font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20
              }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="pt-2"
            >
              <button 
                onClick={() => {
                  setIsBriefModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/15 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white" />
                </svg>
                <span>Get for Brief</span>
              </button>
            </motion.div>
          </nav>
        </div>
      </motion.div>
      
      {/* Brief Modal */}
      <BriefModal 
        isOpen={isBriefModalOpen} 
        onClose={() => setIsBriefModalOpen(false)} 
      />
    </motion.header>
  );
}
