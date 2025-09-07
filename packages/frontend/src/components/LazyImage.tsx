"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * LazyImage - Компонент для оптимизированной ленивой загрузки изображений
 * с плавным появлением и предварительной загрузкой в зависимости от видимости
 */
export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes = '100vw',
  objectFit = 'cover'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurUrl, setBlurUrl] = useState(blurDataURL || '');
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.1 });
  
  // Генерируем blur placeholder, если он не предоставлен
  useEffect(() => {
    if (!blurDataURL && placeholder === 'blur' && src) {
      // В реальном проекте здесь было бы обращение к API для генерации
      // blur placeholder, но для примера просто устанавливаем пустую строку
      setBlurUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jB5ikwAAAABJRU5ErkJggg==');
    }
  }, [src, blurDataURL, placeholder]);
  
  // Варианты анимации загрузки
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };
  
  return (
    <motion.div 
      ref={imageRef}
      initial="hidden"
      animate={isInView ? (isLoaded ? "visible" : "hidden") : "hidden"}
      variants={variants}
      className={`relative overflow-hidden ${className}`}
      style={{ position: 'relative', width: '100%', height: 'auto' }}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
          blurDataURL={blurUrl}
          sizes={sizes}
          style={{
            objectFit: objectFit as any,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
          className={`w-full h-auto transition-transform duration-500`}
        />
      )}
      
      {/* Placeholder анимация загрузки */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-gray-900/20 animate-pulse" />
      )}
    </motion.div>
  );
}
