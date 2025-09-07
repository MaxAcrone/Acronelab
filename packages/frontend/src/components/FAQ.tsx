"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Простые анимации
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

// Простые данные FAQ
const faqItems = [
  {
    question: 'What services do you offer?',
    answer: 'We offer comprehensive Web3 development services including blockchain games, NFT projects, smart contracts, and digital experiences.'
  },
  {
    question: 'How long does a project take?',
    answer: 'Project timelines vary depending on complexity. Simple projects take 2-4 weeks, while complex Web3 applications can take 2-6 months.'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer post-launch support and maintenance services to ensure your project continues to perform optimally.'
  },
  {
    question: 'What technologies do you use?',
    answer: 'We work with modern Web3 technologies including Solidity, React, Next.js, Framer Motion, and various blockchain platforms.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={FADE_IN_UP}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto"
          >
            Find answers to common questions about our services and process
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
          className="max-w-4xl mx-auto"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              className="mb-4"
            >
              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium">{item.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/60"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-white/70">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}