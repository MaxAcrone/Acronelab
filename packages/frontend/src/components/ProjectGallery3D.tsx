"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxSection from './ParallaxSection'; // Корректный импорт
import LazyImage from './LazyImage';
import Link from 'next/link';

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags?: string[];
}

interface ProjectGallery3DProps {
  projects: Project[];
  title?: string;
  description?: string;
}

/**
 * Компонент 3D-галереи проектов с эффектами вращения и параллакса
 */
export const ProjectGallery3D = ({ projects, title = 'Наши проекты', description = 'Исследуйте наши лучшие работы' }: ProjectGallery3DProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Эффект для начальной анимации загрузки
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Эффект перемещения мыши для вращения галереи
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!galleryRef.current) return;
      
      const rect = galleryRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const newMouseX = (e.clientX - centerX) / (rect.width / 2); // Нормализуем положение от -1 до 1
      
      setMouseX(newMouseX);
      
      if (!isInteracting) {
        // Плавное вращение галереи в зависимости от положения мыши
        setRotationY(newMouseX * 15); // Максимальный угол вращения 15 градусов
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInteracting]);

  // Функция перехода к следующему проекту
  const nextProject = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  // Функция перехода к предыдущему проекту
  const prevProject = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  // Варианты анимации для проектов
  const variants = {
    enter: (direction: number) => ({
      scale: 0.8,
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      z: -200,
    }),
    center: {
      scale: 1,
      y: 0,
      opacity: 1,
      rotateY: rotationY,
      z: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: (direction: number) => ({
      scale: 0.8,
      y: direction < 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      z: -200,
      transition: {
        duration: 0.5,
      },
    }),
  };

  // Варианты анимации для поворота карточки при наведении
  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' },
    hover: { 
      scale: 1.05, 
      boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.6)',
      rotateY: mouseX * 10, // Поворачиваем карточку в зависимости от положения мыши
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#121a2d]">
      <div className="absolute inset-0 z-0">
        {/* Анимированный фоновый градиент */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-[#7C3AED]/10 to-transparent"
          style={{ backgroundSize: '150% 150%', backgroundPosition: 'center' }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Плавающие частицы */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ParallaxSection className="text-center mb-16" direction="up" speed={1.2}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {description}
          </motion.p>
        </ParallaxSection>

        <div 
          ref={galleryRef} 
          className="relative h-[600px] perspective-1000 mb-20"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {/* 3D галерея проектов */}
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={activeIndex}
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 right-0 transform-style-3d"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                className="w-full max-w-3xl mx-auto bg-white/5 rounded-2xl overflow-hidden backdrop-blur-lg border border-white/10"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="grid md:grid-cols-2 overflow-hidden">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <LazyImage
                      src={projects[activeIndex].image}
                      alt={projects[activeIndex].title}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                      placeholder="blur"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 bg-[#7C3AED] text-white text-xs rounded-full">
                        {projects[activeIndex].category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {projects[activeIndex].title}
                      </h3>
                      <p className="text-white/70 mb-6">
                        {projects[activeIndex].description}
                      </p>
                      
                      {projects[activeIndex].tags && (
                        <div className="flex flex-wrap mb-6 gap-2">
                          {projects[activeIndex].tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      href={`/projects/${projects[activeIndex].slug}`} 
                      className="inline-flex items-center gap-2 text-[#10B981] hover:text-white transition-colors"
                    >
                      <span>Подробнее</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Навигационные кнопки */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-0 md:-translate-x-16 z-10">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 md:translate-x-16 z-10">
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Индикаторы */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-[#7C3AED] w-8' : 'bg-white/30'}`}
                aria-label={`View project ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Информация об оптимизации */}
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p className="text-white/50 text-sm">
            Галерея оптимизирована с использованием Draco compression для 3D-моделей (сжатие до 80%) и ленивой загрузки для максимальной производительности.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGallery3D;
