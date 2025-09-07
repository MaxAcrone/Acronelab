"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
}

/**
 * ParallaxSection - Высокопроизводительный компонент для создания параллакс-эффектов
 * с настраиваемым направлением и скоростью движения элементов при скролле.
 */
export default function ParallaxSection({ 
  children, 
  offset = 50, 
  className = "", 
  direction = 'up',
  speed = 1.0
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Используем useScroll для отслеживания скролла с оптимизированной производительностью
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Настраиваем трансформацию в зависимости от направления
  let transform;
  const adjustedOffset = offset * speed;

  switch(direction) {
    case 'up':
      transform = useTransform(scrollYProgress, [0, 1], [`0px, ${adjustedOffset}px`, `0px, ${-adjustedOffset}px`]);
      break;
    case 'down':
      transform = useTransform(scrollYProgress, [0, 1], [`0px, ${-adjustedOffset}px`, `0px, ${adjustedOffset}px`]);
      break;
    case 'left':
      transform = useTransform(scrollYProgress, [0, 1], [`${adjustedOffset}px, 0px`, `${-adjustedOffset}px, 0px`]);
      break;
    case 'right':
      transform = useTransform(scrollYProgress, [0, 1], [`${-adjustedOffset}px, 0px`, `${adjustedOffset}px, 0px`]);
      break;
    default:
      transform = useTransform(scrollYProgress, [0, 1], [`0px, ${adjustedOffset}px`, `0px, ${-adjustedOffset}px`]);
  }

  return (
    <motion.div
      ref={sectionRef}
      style={{ 
        translate: transform 
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
