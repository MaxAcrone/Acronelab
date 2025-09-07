"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LayoutStabilizerProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  aspectRatio?: string;
  className?: string;
  placeholder?: React.ReactNode;
  loadingTime?: number;
  fadeIn?: boolean;
}

/**
 * LayoutStabilizer - u041au043eu043cu043fu043eu043du0435u043du0442 u0434u043bu044f u043fu0440u0435u0434u043eu0442u0432u0440u0430u0449u0435u043du0438u044f u0441u0434u0432u0438u0433u043eu0432 u043cu0430u043au0435u0442u0430 (CLS = 0)
 * u0437u0430 u0441u0447u0435u0442 u0444u0438u043au0441u0438u0440u043eu0432u0430u043du043du044bu0445 u0440u0430u0437u043cu0435u0440u043eu0432 u043au043eu043du0442u0435u0439u043du0435u0440u043eu0432.
 */
export function LayoutStabilizer({
  children,
  width = '100%',
  height = 'auto',
  minHeight,
  aspectRatio,
  className = '',
  placeholder,
  loadingTime = 0,
  fadeIn = true
}: LayoutStabilizerProps) {
  const [isLoaded, setIsLoaded] = useState(loadingTime === 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u0438u043cu0438u0442u0430u0446u0438u0438 u0437u0430u0433u0440u0443u0437u043au0438, u0435u0441u043bu0438 u0443u043au0430u0437u0430u043du043e u0432u0440u0435u043cu044f
  useEffect(() => {
    if (loadingTime > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, loadingTime);
      return () => clearTimeout(timer);
    }
  }, [loadingTime]);

  // u0418u0437u043cu0435u0440u0435u043du0438u0435 u0440u0435u0430u043bu044cu043du044bu0445 u0440u0430u0437u043cu0435u0440u043eu0432 u0434u043bu044f u043fu043bu0435u0439u0441u0445u043eu043bu0434u0435u0440u0430
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    // u041du0430u0447u0430u043bu044cu043du043eu0435 u0438u0437u043cu0435u0440u0435u043du0438u0435
    updateDimensions();

    // u041eu0431u043du043eu0432u043bu0435u043du0438u0435 u043fu0440u0438 u0438u0437u043cu0435u043du0435u043du0438u0438 u0440u0430u0437u043cu0435u0440u0430 u043eu043au043du0430
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isLoaded]);

  // u0421u0442u0438u043bu0438 u043au043eu043du0442u0435u0439u043du0435u0440u0430
  const containerStyle: React.CSSProperties = {
    width,
    height,
    minHeight: minHeight || undefined,
    aspectRatio: aspectRatio || undefined,
    position: 'relative',
    overflow: 'hidden',
  };

  // u0421u0442u0438u043bu0438 u043fu043bu0435u0439u0441u0445u043eu043bu0434u0435u0440u0430
  const placeholderStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      ref={containerRef}
      className={`layout-stabilizer ${className}`}
      style={containerStyle}
      data-testid="layout-stabilizer"
    >
      {/* u041eu0441u043du043eu0432u043du043eu0439 u043au043eu043du0442u0435u043du0442 u0441 u043fu043bu0430u0432u043du044bu043c u043fu043eu044fu0432u043bu0435u043du0438u0435u043c */}
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ height: '100%', width: '100%' }}
      >
        {children}
      </motion.div>

      {/* u041fu043bu0435u0439u0441u0445u043eu043bu0434u0435u0440, u043au043eu0442u043eu0440u044bu0439 u043fu043eu043au0430u0437u044bu0432u0430u0435u0442u0441u044f u0434u043e u0437u0430u0433u0440u0443u0437u043au0438 */}
      {!isLoaded && (
        <motion.div
          style={placeholderStyle}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {placeholder ? (
            placeholder
          ) : (
            <div className="animate-pulse w-full h-full bg-gradient-to-r from-[#0F172A]/5 to-[#0F172A]/10" />
          )}
        </motion.div>
      )}
    </div>
  );
}
