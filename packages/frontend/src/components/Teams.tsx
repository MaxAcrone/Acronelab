"use client";

import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

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

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const teamData = [
  { role: 'UI/UX Designers', count: 8, color: 'from-white/20 to-white/10' },
  { role: '3D Modelers', count: 3, color: 'from-white/20 to-white/10' },
  { role: 'Blockchain Developers', count: 4, color: 'from-white/20 to-white/10' },
  { role: 'Web3 Developers', count: 2, color: 'from-white/20 to-white/10' },
  { role: 'Motion Designer', count: 1, color: 'from-white/20 to-white/10' },
  { role: 'Full-Stack Developers', count: 3, color: 'from-white/20 to-white/10' }
];

// Online status component
const OnlineStatus = ({ isOnline }: { isOnline: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-white/30'}`} />
    <span className="text-xs text-white/60">
      {isOnline ? 'Online' : 'Offline'}
    </span>
  </div>
);

// Team role component
const TeamRole = ({ role, count, color, isOnline }: { 
  role: string; 
  count: number; 
  color: string; 
  isOnline: boolean;
}) => (
  <motion.div
    variants={FADE_IN_UP}
    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">{count}</span>
      </div>
      <OnlineStatus isOnline={isOnline} />
    </div>
    
    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
      {role}
    </h3>
    
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/60">
        {count} {count === 1 ? 'specialist' : 'specialists'}
      </span>
      <div className="flex -space-x-2">
        {[...Array(Math.min(count, 4))].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full bg-gradient-to-r ${color} border-2 border-[#0a0a0a] flex items-center justify-center`}
          >
            <span className="text-xs text-white font-medium">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}
        {count > 4 && (
          <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center">
            <span className="text-xs text-white/60">+{count - 4}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default function Teams() {
  const [onlineStatus, setOnlineStatus] = useState<boolean[]>([]);

  // Simulate online status changes
  useEffect(() => {
    const initialStatus = teamData.map(() => Math.random() > 0.3);
    setOnlineStatus(initialStatus);

    const interval = setInterval(() => {
      setOnlineStatus(prev => 
        prev.map(status => Math.random() > 0.1 ? status : !status)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="teams" 
      className="relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-20 md:py-28"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute h-[600px] w-[600px] rounded-full blur-[150px] bg-blue-500/10"
          style={{ top: '-10%', right: '-20%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute h-[400px] w-[400px] rounded-full blur-[120px] bg-purple-500/10"
          style={{ bottom: '10%', left: '-15%' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER_CONTAINER}
          className="text-center mb-16"
        >
          <motion.div variants={FADE_IN_UP} className="mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              Our Team
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Meet our talented specialists working around the clock to bring your ideas to life
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {teamData.map((team, index) => (
            <TeamRole
              key={team.role}
              role={team.role}
              count={team.count}
              color={team.color}
              isOnline={onlineStatus[index] || false}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {teamData.reduce((sum, team) => sum + team.count, 0)}
                </div>
                <div className="text-white/60 text-sm">Total Specialists</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {onlineStatus.filter(status => status).length}
                </div>
                <div className="text-white/60 text-sm">Currently Online</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {teamData.length}
                </div>
                <div className="text-white/60 text-sm">Specializations</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/60 text-sm">Availability</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
