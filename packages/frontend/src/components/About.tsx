"use client";

import { motion, Variants } from 'framer-motion';
import { FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';
import Image from 'next/image';

const FADE_IN_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const FADE_IN_LEFT: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const FADE_IN_RIGHT: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

interface WorkExperience {
  role: string;
  company: string;
  year: string;
}

const EXPERIENCE_DATA: WorkExperience[] = [
  { role: 'Art Director', company: 'Binance', year: '2020-2023' },
  { role: 'Motion Designer', company: 'Lazada', year: '2018-2020' },
  { role: 'Web3 Game Developer', company: 'Blockchain Innovations', year: '2023-2024' },
  { role: 'NFT Project Lead', company: 'Acronelab', year: '2024-Present' }
];

const SKILLS = [
  'Web3 Development', 'Blockchain', 'NFT', 'Python', 'Motion Design', 'Art Direction'
];

// Social media component with memoization
const SocialButton = ({ icon: Icon, label, href }: { icon: React.ElementType; label: string; href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0A0A0A] hover:bg-[#1A1A1A] transition-colors"
    aria-label={label}
  >
    <Icon className="text-white/80 hover:text-white transition-colors" />
  </a>
);

// Experience item component
const ExperienceItem = ({ role, company, year }: WorkExperience) => (
  <motion.div 
        variants={FADE_IN_UP}
    className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0"
  >
    <div className="w-3 h-3 rounded-full bg-white/10 mt-1.5 flex-shrink-0" />
    <div>
      <h4 className="font-medium text-white">{role}</h4>
      <p className="text-sm text-white/60">{company} · {year}</p>
    </div>
  </motion.div>
);

export default function About() {
  return (
    <section 
      id="about" 
      className="relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-20 md:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER_CONTAINER}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
        >
          {/* Left column - photo, info, and skills */}
          <motion.div 
            variants={FADE_IN_LEFT} 
            className="lg:w-5/12"
          >
            {/* Profile card */}
            <div className="bg-[#111111] rounded-3xl p-6 border border-white/5 shadow-2xl mb-8">
              {/* Profile photo */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-square">
                <Image 
                  src="/Acrone.jpg" 
                  alt="Max" 
                  width={600} 
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
                
                {/* Availability indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span className="text-xs text-white font-medium">Open to collaboration</span>
                </div>
              </div>
              
              {/* Name and title */}
              <h2 className="text-2xl font-bold text-white mb-1">Hello I am Max</h2>
              <p className="text-[#AAAAAA] mb-6">Web3 Developer & Motion Design Expert & Blockchain Expert</p>
              
              {/* Social media */}
              <div className="flex gap-4 mb-6">
                <SocialButton icon={FaTelegram} label="Telegram" href="https://t.me/maxacrone" />
                <SocialButton icon={FaTwitter} label="X (Twitter)" href="https://x.com/MaxAcrone" />
                <SocialButton icon={FaDiscord} label="Discord" href="https://discord.gg/maxacrone" />
              </div>
            </div>

            {/* Skills section */}
            <div className="bg-[#111111] rounded-3xl p-6 border border-white/5 shadow-2xl">
              {/* Blockchain Expert badge */}
              <div className="inline-block px-4 py-1 rounded-full bg-[#111] text-sm mb-5">
                ⭐ Blockchain Expert
              </div>
              
              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/60 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {SKILLS.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={tagVariants}
                      className="inline-block px-3 py-1.5 text-xs rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Contact button */}
              <button 
                className="w-full py-3 px-6 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
                onClick={() => window.location.href = '#contact'}
              >
                Contact Me
              </button>
            </div>
          </motion.div>
          
          {/* Right column - about text and experience */}
          <motion.div 
            variants={FADE_IN_RIGHT} 
            className="lg:w-7/12"
          >
            <motion.div variants={FADE_IN_UP} className="mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                About Me
              </h2>
              
              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  I'm a passionate Web3 Developer and Motion Design expert with over 5 years of experience creating 
                  immersive digital experiences. My journey in tech started with motion design, which evolved into 
                  a deep interest in blockchain technology and decentralized applications.
                </p>
                
                <p>
                  Currently leading NFT projects at Acronelab, I specialize in bridging the gap between 
                  stunning visual design and cutting-edge blockchain technology to create engaging user experiences.
                </p>
              </div>
            </motion.div>
            
            {/* Experience */}
            <motion.div variants={FADE_IN_UP}>
              <h3 className="text-xl font-bold text-white mb-6">Work Experience</h3>
              <div className="space-y-1">
                {EXPERIENCE_DATA.map((exp, index) => (
                  <ExperienceItem 
                    key={`${exp.role}-${index}`}
                    role={exp.role}
                    company={exp.company}
                    year={exp.year}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
