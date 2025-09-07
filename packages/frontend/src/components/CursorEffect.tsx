"use client";

import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CursorEffect = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const dotControls = useAnimation();
  const ringControls = useAnimation();
  const rafId = useRef<number>();
  const lastPosition = useRef({ x: 0, y: 0 });

  // Проверка на мобильные устройства
  const isMobile = useRef(false);

  // Функция проверки мобильного устройства
  const checkIsMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  };

  const updateCursor = () => {
    if (!dotRef.current || !ringRef.current) return;
    
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    const update = () => {
      dot.style.transform = `translate3d(${lastPosition.current.x - 4}px, ${lastPosition.current.y - 4}px, 0)`;
      ring.style.transform = `translate3d(${lastPosition.current.x - 20}px, ${lastPosition.current.y - 20}px, 0)`;
      rafId.current = requestAnimationFrame(update);
    };
    
    rafId.current = requestAnimationFrame(update);
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  };

  useEffect(() => {
    // Проверяем, является ли устройство мобильным
    isMobile.current = checkIsMobile();
    
    // Если мобильное устройство, не инициализируем курсор
    if (isMobile.current) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastPosition.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible.current) {
        isVisible.current = true;
        dotControls.start('visible');
        ringControls.start('visible');
      }
    };

    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';
      if (visible) {
        dotControls.start('visible');
        ringControls.start('visible');
      } else {
        dotControls.start('hidden');
        ringControls.start('hidden');
      }
    };

    const cleanup = updateCursor();
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (cleanup) cleanup();
    };
  }, [dotControls, ringControls]);

  // Не рендерим курсор на мобильных устройствах
  if (isMobile.current) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        initial="hidden"
        animate={dotControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.2 } }
        }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        initial="hidden"
        animate={ringControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.5, transition: { duration: 0.3 } }
        }}
      />
    </>
  );
};

export default CursorEffect;
