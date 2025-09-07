"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * MagneticButton - u041au043du043eu043fu043au0430 u0441 u044du0444u0444u0435u043au0442u043eu043c u043fu0440u0438u0442u044fu0436u0435u043du0438u044f u043a u043au0443u0440u0441u043eu0440u0443
 * u0441 u043du0430u0441u0442u0440u0430u0438u0432u0430u0435u043cu043eu0439 u0441u0438u043bu043eu0439 u0438 u0440u0430u0434u0438u0443u0441u043eu043c u0434u0435u0439u0441u0442u0432u0438u044f
 */
export default function MagneticButton({ 
  children, 
  className = '', 
  strength = 50, 
  radius = 300,
  onClick,
  href,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'md'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // u041eu043fu0440u0435u0434u0435u043bu044fu0435u043c u0441u0442u0438u043bu0438 u0432 u0437u0430u0432u0438u0441u0438u043cu043eu0441u0442u0438 u043eu0442 u0432u0430u0440u0438u0430u043du0442u0430 u0438 u0440u0430u0437u043cu0435u0440u0430
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white';
      case 'secondary':
        return 'bg-[#10B981] hover:bg-[#059669] text-white';
      case 'outline':
        return 'bg-transparent border border-white/20 hover:border-white/50 text-white';
      case 'ghost':
        return 'bg-transparent hover:bg-white/10 text-white';
      default:
        return 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-xs';
      case 'md': return 'px-6 py-3 text-sm';
      case 'lg': return 'px-8 py-4 text-base';
      default: return 'px-6 py-3 text-sm';
    }
  };

  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u0434u0432u0438u0436u0435u043du0438u044f u043au0443u0440u0441u043eu0440u0430 u0441 u0434u0435u0431u0430u0443u043du0441u0438u043du0433u043eu043c u0434u043bu044f u043fu0440u043eu0438u0437u0432u043eu0434u0438u0442u0435u043bu044cu043du043eu0441u0442u0438
  useEffect(() => {
    if (!buttonRef.current || disabled) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        if (!buttonRef.current) return;
        
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < radius) {
          // u0420u0430u0441u0441u0447u0438u0442u044bu0432u0430u0435u043c u0441u0438u043bu0443 u043fu0440u0438u0442u044fu0436u0435u043du0438u044f u0432 u0437u0430u0432u0438u0441u0438u043cu043eu0441u0442u0438 u043eu0442 u0440u0430u0441u0441u0442u043eu044fu043du0438u044f
          const force = (1 - distance / radius) * strength;
          
          // u041fu0440u0438u043cu0435u043du044fu0435u043c u0441u0438u043bu0443 u0432 u043du0430u043fu0440u0430u0432u043bu0435u043du0438u0438 u043au0443u0440u0441u043eu0440u0430
          const moveX = (distanceX / distance) * force;
          const moveY = (distanceY / distance) * force;
          
          setPosition({ x: moveX, y: moveY });
        } else {
          // u0412u043eu0437u0432u0440u0430u0449u0430u0435u043c u043au043du043eu043fu043au0443 u0432 u0438u0441u0445u043eu0434u043du043eu0435 u043fu043eu043bu043eu0436u0435u043du0438u0435
          setPosition({ x: 0, y: 0 });
        }
      }, 10); // u0414u0435u0431u0430u0443u043du0441u0438u043du0433 u0432 10 u043cu0441 u0434u043bu044f u043eu043fu0442u0438u043cu0438u0437u0430u0446u0438u0438 u043fu0440u043eu0438u0437u0432u043eu0434u0438u0442u0435u043bu044cu043du043eu0441u0442u0438
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    if (buttonRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', handleMouseEnter);
        buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(timeoutId);
    };
  }, [radius, strength, disabled]);

  // u0421u043eu0437u0434u0430u0435u043c u0441u043eu0434u0435u0440u0436u0438u043cu043eu0435 u043au043du043eu043fu043au0438
  const buttonContent = (
    <motion.div
      className={`relative overflow-hidden rounded-full transition-all duration-300 ${getVariantClasses()} ${getSizeClasses()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 150,
        mass: 0.1
      }}
    >
      <motion.div 
        className="relative z-10 flex items-center justify-center font-medium" 
        animate={{ scale: isHovered ? 1.02 : 1 }}
      >
        {children}
      </motion.div>
      
      {/* u0414u0438u043du0430u043cu0438u0447u0435u0441u043au0430u044f u043fu043eu0434u0441u0432u0435u0442u043au0430 u043fu0440u0438 u043du0430u0432u0435u0434u0435u043du0438u0438 */}
      <motion.div 
        className="absolute inset-0 bg-white/10" 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* u0421u0432u0435u0442u043eu0432u043eu0439 u0441u043bu0435u0434 u0437u0430 u043au0443u0440u0441u043eu0440u043eu043c */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full absolute bg-white/20 blur-xl"
            style={{
              left: position.x + 60,
              top: position.y + 10,
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );

  // u0412u0435u0440u043du0443u0442u044c u043bu0438u0431u043e u043au043du043eu043fu043au0443, u043bu0438u0431u043e u0441u0441u044bu043bu043au0443
  if (href && !disabled) {
    return (
      <div ref={buttonRef}>
        <a href={href}>
          {buttonContent}
        </a>
      </div>
    );
  }

  return (
    <div ref={buttonRef} onClick={!disabled ? onClick : undefined}>
      {buttonContent}
    </div>
  );
}
