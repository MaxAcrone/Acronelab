"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sendContactEmail, ContactFormData } from '../../lib/emailService';
const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
import GrowTogether from '../../components/GrowTogether';
import { FaTelegram, FaTwitter, FaDiscord, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Contact page component with form and information sections
 * @returns {JSX.Element} Rendered contact page
 */
// Interactive 3D floating elements
const FloatingElement = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotateX: -15 }}
    animate={{ 
      opacity: [0.3, 0.8, 0.3], 
      y: [0, -20, 0],
      rotateX: [-15, 0, -15]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className="absolute pointer-events-none"
  >
    {children}
  </motion.div>
);

// Contact card with site colors
const ContactCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#111111] backdrop-blur-sm border border-white/10 ${className}`}
      style={{
        boxShadow: '16px 24px 20px 8px rgba(0, 0, 0, 0.4), inset 0 2px rgba(184, 180, 180, 0.08)'
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'social'>('form');
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Отправка формы через EmailJS
      const success = await sendContactEmail(formData);
      
      if (success) {
        // Очистить форму после успешной отправки
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('success');
        
        // Сбросить статус через несколько секунд
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Сбросить статус через несколько секунд
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <Header />
      
      {/* Floating 3D Elements */}
      <FloatingElement delay={0}>
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" style={{ top: '10%', left: '10%' }} />
      </FloatingElement>
      <FloatingElement delay={2}>
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" style={{ top: '20%', right: '15%' }} />
      </FloatingElement>
      
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 relative z-10" ref={sectionRef}>
        <motion.div 
          variants={FADE_IN_UP}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-20 mt-40"
        >
          <motion.div 
            variants={FADE_IN_UP}
            className="inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5 text-sm backdrop-blur-sm"
          >
            GET IN TOUCH
          </motion.div>
          <motion.h1 
            variants={FADE_IN_UP} 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">Connect</span>
          </motion.h1>
          <motion.p 
            variants={FADE_IN_UP} 
            className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to bring your vision to life? Let's create something extraordinary together.
          </motion.p>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div 
          variants={FADE_IN_UP}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'form' 
                  ? 'bg-white text-black' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Send Message
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'social' 
                  ? 'bg-white text-black' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Social Links
            </button>
          </div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
              >
                {/* Contact Info */}
                <div className="space-y-8">
                  <ContactCard className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <img src="/icons/email-white.svg" alt="Email" className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Email</h3>
                          <a href="mailto:beedbeedmax@gmail.com" className="text-white/70 hover:text-white transition-colors">
                            Acroneprod@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <img src="/icons/phone-white.svg" alt="Phone" className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Phone</h3>
                          <a href="tel:+79000802757" className="text-white/70 hover:text-white transition-colors">
                            +1 (980) ** ****
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <img src="/icons/location-white.svg" alt="Location" className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Location</h3>
                          <p className="text-white/70">North Carolina, USA</p>
                        </div>
                      </div>
                    </div>
                  </ContactCard>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <ContactCard className="p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">100+</div>
                      <div className="text-white/60 text-sm">Projects</div>
                    </ContactCard>
                    <ContactCard className="p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">24/7</div>
                      <div className="text-white/60 text-sm">Support</div>
                    </ContactCard>
                    <ContactCard className="p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">5★</div>
                      <div className="text-white/60 text-sm">Rating</div>
                    </ContactCard>
                  </div>
                </div>
                
                {/* Contact Form */}
                <ContactCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
                      <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                      <p className="text-red-400">Error sending message. Please try again.</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-white/50"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-white/50"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-white/50"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2" htmlFor="message">
                        Project Description
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none text-white placeholder-white/50"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </ContactCard>
              </motion.div>
            ) : (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <ContactCard className="p-12">
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Connect With Me</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { icon: FaTelegram, label: 'Telegram', href: 'https://t.me/maxacrone', color: 'from-blue-500 to-cyan-500' },
                      { icon: FaTwitter, label: 'X (Twitter)', href: 'https://x.com/MaxAcrone', color: 'from-sky-500 to-blue-500' },
                      { icon: FaDiscord, label: 'Discord', href: 'https://discord.gg/maxacrone', color: 'from-purple-500 to-indigo-500' },
                      { icon: FaGithub, label: 'GitHub', href: 'https://github.com/maxacrone', color: 'from-gray-500 to-gray-700' },
                      { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/maxacrone', color: 'from-blue-600 to-blue-800' },
                      { icon: FaEnvelope, label: 'Email', href: 'mailto:beedbeedmax@gmail.com', color: 'from-red-500 to-pink-500' }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group"
                      >
                        <div className={`w-full h-32 bg-gradient-to-br ${social.color} rounded-2xl flex flex-col items-center justify-center text-white hover:shadow-2xl transition-all duration-300`}>
                          <social.icon className="text-3xl mb-2 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold text-sm">{social.label}</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </ContactCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Grow Together Section */}
      <GrowTogether />
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
