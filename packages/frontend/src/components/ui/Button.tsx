import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import Link from 'next/link';
import { buttonAnimation } from '../../lib/animations';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

// Используем более простой подход к типизации без наследования
interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  isLoading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Styles based on variant
  const variantStyles = {
    primary: 'bg-white hover:bg-gray-100 text-black',
    secondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/10',
    outline: 'bg-transparent hover:bg-white/5 text-white border border-white/20',
    text: 'bg-transparent hover:bg-white/5 text-white'
  };

  // Styles based on size
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  // Base button styles
  const baseStyles = `
    font-medium rounded-lg relative overflow-hidden transition-colors
    ${fullWidth ? 'w-full' : ''}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  // Loading indicator
  const loadingIndicator = (
    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Button content with icon
  const buttonContent = (
    <span className="flex items-center justify-center gap-2">
      {isLoading ? loadingIndicator : iconPosition === 'left' && icon}
      {children}
      {!isLoading && iconPosition === 'right' && icon}
    </span>
  );

  // Use Link for href, otherwise button
  if (href) {
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
      <Link href={href} {...linkProps} className="inline-block">
        <motion.a
          className={baseStyles}
          {...buttonAnimation}
          {...props}
        >
          {buttonContent}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      disabled={isLoading || props.disabled}
      {...buttonAnimation}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;
