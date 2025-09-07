"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FADE_IN_LEFT = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const FADE_IN_RIGHT = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "Microsoft",
    rating: 5,
    text: "Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations. The attention to detail and innovative solutions they provided helped us achieve our business goals."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Google",
    rating: 5,
    text: "The level of creativity and technical expertise this team brings to the table is unmatched. They transformed our vision into a stunning reality that our users love. Highly recommended!"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Apple",
    rating: 5,
    text: "Outstanding results! Our conversion rates increased by 40% after implementing their design recommendations. The team's strategic thinking and execution were exceptional."
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder",
    company: "Amazon",
    rating: 5,
    text: "From concept to launch, this team guided us through every step. Their expertise in modern web technologies and user experience design is world-class."
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial(prev => 
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial(prev => 
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 bg-[#0a0a0a] relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute h-[500px] w-[500px] rounded-full blur-[120px] bg-purple-500/10"
          style={{ top: '-5%', right: '-10%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute h-[300px] w-[300px] rounded-full blur-[100px] bg-blue-500/10"
          style={{ bottom: '10%', left: '5%' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          variants={FADE_IN_UP}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-sm text-white/80 font-medium mb-5">
            💬 Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
            What <span className="text-white/60">Clients</span> Say
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0">
            Read what our clients have to say about their experience working with us and the results we've delivered for their businesses.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Featured testimonial */}
          <motion.div 
            variants={FADE_IN_LEFT}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-lg">
              <div className="flex items-start gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-xl">{TESTIMONIALS[activeTestimonial].name}</h4>
                  <p className="text-sm text-[#888]">{TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}</p>
                  
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-sm ${i < TESTIMONIALS[activeTestimonial].rating ? 'text-yellow-400' : 'text-white/20'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <FaQuoteLeft className="absolute -top-2 -left-2 text-white/10 text-4xl -z-10" />
              <p className="text-white/80 text-lg leading-relaxed relative z-10">
                {TESTIMONIALS[activeTestimonial].text}
              </p>
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    prevTestimonial();
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft className="text-white/60" />
                </button>
                
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setActiveTestimonial(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeTestimonial ? 'bg-white' : 'bg-white/20'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    nextTestimonial();
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight className="text-white/60" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Testimonials list */}
          <motion.div 
            variants={FADE_IN_RIGHT}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  index === activeTestimonial 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                }`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveTestimonial(index);
                }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-white/60 mb-2">{testimonial.role}, {testimonial.company}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-xs ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/20'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-white/80 text-sm line-clamp-3">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
