import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    icon,
    iconPosition = 'left',
    helperText,
    className = '',
    ...props
  },
  ref
) => {
  // Base input styles
  const inputBaseStyles = `
    w-full bg-[#0a0a0a] rounded-lg p-3 focus:outline-none transition-colors 
    border border-white/10 focus:border-white/30
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${error ? 'border-red-500/50 focus:border-red-500' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#888] mb-2 text-sm">
          {label.toUpperCase()}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888]">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputBaseStyles}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#888]">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
      
      {helperText && !error && (
        <p className="text-[#888] text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
