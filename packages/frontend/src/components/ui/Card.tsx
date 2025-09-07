import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cardAnimation } from '../../lib/animations';

// Исключаем свойства из HTMLAttributes, которые конфликтуют с MotionProps
type HTMLAttributesWithoutMotionProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>;

interface CardProps extends HTMLAttributesWithoutMotionProps, MotionProps {
  variant?: 'default' | 'interactive' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hasHoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hasHoverEffect = true,
  ...props
}) => {
  // Base styles for different variants
  const variantStyles = {
    default: 'bg-[#111]/80',
    interactive: 'bg-[#111]/70 backdrop-blur-sm',
    bordered: 'bg-[#111]/80 border border-white/10',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10'
  };

  // Padding options
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };

  // Combine all styles
  const cardStyles = `
    rounded-xl overflow-hidden
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${className}
  `;

  // Apply hover animation conditionally
  const hoverProps = hasHoverEffect ? cardAnimation : {};

  return (
    <motion.div
      className={cardStyles}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
