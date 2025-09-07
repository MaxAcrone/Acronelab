"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface SocialLink {
  name: string;
  icon: string;
  color: string;
}

const ContactInput = ({ type, placeholder, value, onChange }: { type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const InputComponent = type === 'textarea' ? 'textarea' as any : 'input';
  const props = type === 'textarea' ? { rows: 4 } : { type };
  
  return (
    <motion.div 
      className="relative"
      variants={fadeInUp}
    >
      <motion.div 
        className="absolute inset-0 border rounded-lg"
        initial={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        animate={{ 
          borderColor: isFocused ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isFocused ? '0 0 0 1px rgba(255, 255, 255, 0.2)' : 'none'
        }}
        transition={{ duration: 0.3 }}
      />
      <InputComponent
        {...props}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/5 rounded-lg p-3 focus:outline-none transition-colors relative z-10"
      />
    </motion.div>
  );
};

const SocialButton = ({ social }: { social: SocialLink }) => (
  <motion.a
    href="#"
    whileHover={{ y: -3, boxShadow: '0 10px 20px -10px rgba(0,0,0,0.2)' }}
    whileTap={{ y: 0 }}
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-colors relative overflow-hidden group"
  >
    <motion.div 
      className="absolute inset-0 opacity-0" 
      style={{ background: social.color }}
      whileHover={{ opacity: 0.15 }}
      transition={{ duration: 0.3 }}
    />
    <span className="relative z-10">{social.icon}</span>
  </motion.a>
);

export default function Contact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const socialLinks: SocialLink[] = [
    { name: 'Twitter', icon: 'X', color: 'linear-gradient(45deg, #1DA1F2, #14171A)' },
    { name: 'Instagram', icon: 'I', color: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)' },
    { name: 'Dribbble', icon: 'D', color: 'linear-gradient(45deg, #EA4C89, #C32361)' },
    { name: 'LinkedIn', icon: 'L', color: 'linear-gradient(45deg, #0077B5, #0e76a8)' }
  ];
  
  return (
    <section id="contact" className="contact-section py-20 relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute h-[350px] w-[350px] rounded-full blur-[150px] bg-blue-500/5"
          style={{ bottom: '20%', left: '15%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div style={{ opacity, scale }} className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-sm"
          >
            GET IN TOUCH
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Let's <span className="highlight">Connect</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-white/70"
          >
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello
          </motion.p>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="card border-card max-w-4xl mx-auto backdrop-blur-sm relative z-10 overflow-hidden"
        >
          {/* Background glow effect */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scaleY: [1, 1.5, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <motion.div variants={fadeInLeft}>
              <motion.h3 variants={fadeInUp} className="text-2xl font-semibold mb-6">Contact Info</motion.h3>
              
              <motion.div variants={fadeInUp} className="space-y-4 text-white/70">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <span>hello@polotemplate.com</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <span>
                    123 Design Street<br />Creative City, 12345
                  </span>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="mt-12">
                <h4 className="text-lg font-semibold mb-5">Connect With Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <SocialButton key={social.name} social={social} />
                  ))}
                </div>
              </motion.div>
              
              {/* Schedule call button */}
              <motion.div variants={fadeInUp} className="mt-12">
                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-5 py-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 font-medium relative overflow-hidden group flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className="relative z-10">Schedule a Call</span>
                  <motion.span 
                    className="absolute inset-0 bg-white/5 -z-0 opacity-0" 
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeInRight}>
              <motion.h3 variants={fadeInUp} className="text-2xl font-semibold mb-6">Send a Message</motion.h3>
              
              <motion.form variants={staggerContainer} className="space-y-5">
                <ContactInput 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange}
                />
                
                <ContactInput 
                  type="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange}
                />
                
                <ContactInput 
                  type="textarea" 
                  placeholder="Your Message" 
                  value={formData.message} 
                  onChange={handleChange}
                />
                
                <motion.div variants={fadeInUp}>
                  <motion.button 
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' 
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-full px-4 py-3.5 bg-white text-black font-semibold rounded-lg hover-card relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-white to-white/80 -z-0" 
                      initial={{ x: '0%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
