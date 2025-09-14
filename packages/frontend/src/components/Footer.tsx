"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface FooterLink {
  name: string;
  href: string;
}

const FooterNavLink = ({ link }: { link: FooterLink }) => (
  <motion.div whileHover={{ y: -2 }} className="relative">
    <Link 
      href={link.href} 
      className="text-white/70 hover:text-white transition-colors py-1"
    >
      {link.name}
      <motion.span 
        className="absolute left-0 right-0 bottom-0 h-[1px] bg-white/10"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  </motion.div>
);

const SocialLink = ({ icon: Icon, href, label }: { icon: React.ElementType, href: string, label: string }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    whileHover={{ y: -3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all"
    aria-label={label}
  >
    <Icon className="text-white/80" />
  </motion.a>
);

export default function Footer() {
  const navigationLinks: FooterLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/contact' },
  ];
  
  return (
    <footer className="py-12 sm:py-16 mt-16 sm:mt-20 border-t border-white/5 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER_CONTAINER}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12"
        >
          {/* Brand */}
          <motion.div variants={FADE_IN_UP} className="col-span-1 md:col-span-1">
            <Link href="/">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer inline-block"
              >
                <img src="/images/projects/Logo Acronelab.png" alt="Acronelab Logo" className="h-8" />
              </motion.div>
            </Link>
            <p className="text-white/50 mt-3 mb-4">Web3 Development & Design Studio</p>
            
            <div className="flex space-x-3 mt-6">
              <SocialLink icon={FaTelegram} href="https://t.me/maxacrone" label="Telegram" />
              <SocialLink icon={FaTwitter} href="https://x.com/MaxAcrone" label="X (Twitter)" />
              <SocialLink icon={FaDiscord} href="https://discord.gg/maxacrone" label="Discord" />
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div variants={FADE_IN_UP} className="col-span-1">
            <h3 className="text-lg font-medium mb-5 opacity-90">Navigation</h3>
            <div className="space-y-3">
              {navigationLinks.map((link) => (
                <FooterNavLink key={link.name} link={link} />
              ))}
            </div>
          </motion.div>
          
          {/* Services */}
          <motion.div variants={FADE_IN_UP} className="col-span-1">
            <h3 className="text-lg font-medium mb-5 opacity-90">Services</h3>
            <div className="space-y-3">
              <FooterNavLink link={{ name: 'Web Design', href: '/#services' }} />
              <FooterNavLink link={{ name: 'Web3 Development', href: '/#services' }} />
              <FooterNavLink link={{ name: 'NFT Collections', href: '/#services' }} />
              <FooterNavLink link={{ name: 'Motion Design', href: '/#services' }} />
            </div>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={FADE_IN_UP} className="col-span-1">
            <h3 className="text-lg font-medium mb-5 opacity-90">Contact</h3>
            <div className="space-y-3">
              <p className="text-white/50 text-sm">Ready to start your project?</p>
              <Link href="/contact">
                <motion.button 
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 border border-white/10 px-4 py-2 rounded-md font-medium text-sm"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Acronelab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
