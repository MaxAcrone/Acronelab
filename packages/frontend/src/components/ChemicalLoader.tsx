"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChemicalLoaderProps {
  isLoading: boolean;
  color1?: string;
  color2?: string;
  duration?: number;
}

/**
 * ChemicalLoader - Анимированный прелоадер в стиле химических реакций,
 * с плавным появлением и исчезновением при загрузке контента.
 */
export default function ChemicalLoader({
  isLoading,
  color1 = '#7C3AED',
  color2 = '#10B981',
  duration = 2.5
}: ChemicalLoaderProps) {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, delay: number, color: string}[]>([]);
  
  // Генерация частиц при монтировании компонента
  useEffect(() => {
    if (isLoading) {
      const newParticles = [];
      const count = 30; // Количество частиц
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100 - 50, // Позиция X относительно центра
          y: Math.random() * 100 - 50, // Позиция Y относительно центра
          size: Math.random() * 12 + 4, // Размер от 4 до 16
          delay: Math.random() * 0.5, // Задержка анимации
          color: Math.random() > 0.5 ? color1 : color2 // Случайный выбор цвета
        });
      }
      
      setParticles(newParticles);
    }
  }, [isLoading, color1, color2]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/90 backdrop-blur-md"
        >
          <div className="relative w-64 h-64">
            {/* Основное свечение в центре */}
            <motion.div
              className="absolute rounded-full bg-white/30 blur-xl"
              style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
              animate={{
                width: [0, 100, 60, 80, 50],
                height: [0, 100, 60, 80, 50],
                backgroundColor: ['rgba(255,255,255,0.3)', 'rgba(124,58,237,0.2)', 'rgba(16,185,129,0.2)', 'rgba(124,58,237,0.3)', 'rgba(255,255,255,0.2)'],
              }}
              transition={{
                repeat: Infinity,
                duration: duration,
                ease: "easeInOut",
              }}
            />
            
            {/* Частицы химической реакции */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full will-change-transform"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: particle.color,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  width: 1,
                  height: 1,
                }}
                animate={{
                  x: [0, particle.x * 0.5, particle.x],
                  y: [0, particle.y * 0.5, particle.y],
                  opacity: [0, 0.8, 0],
                  width: [1, particle.size, particle.size * 0.5],
                  height: [1, particle.size, particle.size * 0.5],
                  filter: ['blur(0px)', 'blur(2px)', 'blur(3px)'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: duration * 0.8,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Текст лоадера */}
            <motion.div 
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-widest uppercase"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              Loading
            </motion.div>
            
            {/* Круги, пульсирующие от центра */}
            {[1, 2, 3].map((index) => (
              <motion.div 
                key={`ring-${index}`} 
                className="absolute rounded-full border-2 border-white/10"
                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                animate={{
                  width: [0, 200 * index],
                  height: [0, 200 * index],
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: duration * 1.2,
                  delay: index * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
