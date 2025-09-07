"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from './ui/MagneticButton';

interface MagneticCTAProps {
  title: string;
  description?: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * MagneticCTA - Компонент призыва к действию с эффектом магнитных кнопок
 * и интерактивным фоном
 */
export const MagneticCTA = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className = '',
  variant = 'primary'
}: MagneticCTAProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Обработка движения мыши для создания интерактивного фона
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseenter', () => setIsHovered(true));
      element.addEventListener('mouseleave', () => setIsHovered(false));
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', () => setIsHovered(true));
        element.removeEventListener('mouseleave', () => setIsHovered(false));
      }
    };
  }, []);

  // Определяем градиент в зависимости от варианта
  const gradientColors = variant === 'primary' 
    ? 'from-[#7C3AED]/30 via-transparent to-[#10B981]/20' 
    : 'from-[#10B981]/30 via-transparent to-[#7C3AED]/20';

  // Анимация фонового градиента при наведении
  const backgroundVariants = {
    idle: {
      background: `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1), rgba(15, 23, 42, 0))`,
    },
    hover: {
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.2), rgba(15, 23, 42, 0) 400px)`,
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-[#0F172A] border border-white/10 ${className}`}
      variants={backgroundVariants}
      animate={isHovered ? 'hover' : 'idle'}
      initial="idle"
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    >
      {/* Градиентная подсветка */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-30`} />
      
      {/* Эффект свечения за курсором */}
      {isHovered && (
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl bg-white/5"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{ type: 'spring', damping: 10, stiffness: 100, mass: 0.1 }}
        />
      )}
      
      {/* Плавающие частицы */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 rounded-full blur-xl"
          style={{
            background: i % 2 === 0 ? 'rgba(124, 58, 237, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: Math.random() * 10 + 10,
          }}
        />
      ))}

      {/* Содержимое */}
      <div className="relative z-10 p-12 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        
        {description && (
          <motion.p
            className="text-white/70 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
        
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MagneticButton
            href={primaryButtonLink}
            variant={variant === 'primary' ? 'primary' : 'secondary'}
            size="lg"
            strength={40}
            className="font-medium"
          >
            {primaryButtonText}
          </MagneticButton>
          
          {secondaryButtonText && secondaryButtonLink && (
            <MagneticButton
              href={secondaryButtonLink}
              variant="outline"
              size="lg"
              strength={30}
              className="font-medium"
            >
              {secondaryButtonText}
            </MagneticButton>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MagneticCTA;
