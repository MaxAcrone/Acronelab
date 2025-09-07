"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const SERVICES = [
  {
    id: 'web-design',
    title: 'Web Design',
    price: 'From $2,500',
    description: 'Custom website design with modern UI/UX principles',
    features: ['Responsive Design', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Design System'],
    duration: '2-4 weeks'
  },
  {
    id: 'web3-development',
    title: 'Web3 Development',
    price: 'From $8,000',
    description: 'Blockchain applications, smart contracts, and DeFi solutions',
    features: ['Smart Contracts', 'DApp Development', 'NFT Integration', 'DeFi Protocols', 'Blockchain Consulting'],
    duration: '6-12 weeks'
  },
  {
    id: 'nft-collection',
    title: 'NFT Collection',
    price: 'From $5,000',
    description: 'Complete NFT project development and launch',
    features: ['Art Generation', 'Smart Contract', 'Minting Website', 'Community Building', 'Marketing Strategy'],
    duration: '4-8 weeks'
  },
  {
    id: 'motion-design',
    title: 'Motion Design',
    price: 'From $1,500',
    description: 'Animated content and interactive experiences',
    features: ['2D Animation', '3D Motion', 'Video Production', 'Interactive Elements', 'Brand Animation'],
    duration: '1-3 weeks'
  }
];

// Modal component
const ServiceModal = ({ service, isOpen, onClose }: { 
  service: typeof SERVICES[0] | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && service && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#111] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-xl text-white/70">{service.price}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FaTimes className="text-white" />
            </button>
          </div>
          
          <p className="text-white/80 text-lg mb-6">{service.description}</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="text-white/60">
              Duration: <span className="text-white">{service.duration}</span>
            </div>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function GrowTogether() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  return (
    <>
      <section id="grow-together" className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black opacity-90 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-white/10 text-white/90 text-xs py-1 px-3 rounded-full inline-block backdrop-blur-sm mb-6">
              ⚡ Our Services
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8">
              Let's Grow <span className="text-white/70">Together</span>
            </h2>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#111] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all group cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <div className="bg-white/10 text-white/90 text-xs py-1 px-3 rounded-full backdrop-blur-sm">
                    {service.price}
                  </div>
                </div>
                
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-4">
                  <div className="text-white/80 text-sm transition-all group-hover:translate-x-1">
                    Learn more →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
