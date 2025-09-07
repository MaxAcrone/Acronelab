"use client";

import { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Импортируем реальные данные проектов
import projectsData from '../data/projects.json';

// Получаем проекты из JSON файла
const projects = projectsData.projects;

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    category: string;
    image?: string;
    featured?: boolean;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  
  return (
    <motion.div
      ref={cardRef}
      variants={FADE_IN_UP}
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full" aria-label={`View ${project.title} project`}>
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 3}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-black/40 to-black/20">
              <div className="text-center">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/60 to-white/30">
                  {index + 1}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-wider mt-1">Project</div>
              </div>
            </div>
          )}
          
          {/* Featured Badge */}
          {project.featured && (
            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
              ⭐ Featured
            </span>
          )}
          
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/80">
            {project.category}
          </span>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
          
          <div className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors">
            View Case Study
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visibleProjects = useMemo(() => projects.slice(0, 6), []);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  
  // Используем первые 3 проекта как featured
  const displayProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="projects-section py-16 sm:py-20 md:py-28 relative" ref={sectionRef}>
      {/* Remove divider */}
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute h-[500px] w-[500px] rounded-full blur-[120px] bg-purple-500/10"
          style={{ top: '5%', left: '10%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.18, 0.12],
            x: [0, 20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute h-[400px] w-[400px] rounded-full blur-[150px] bg-blue-500/10"
          style={{ bottom: '5%', right: '10%' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute h-[300px] w-[300px] rounded-full blur-[100px] bg-cyan-500/10"
          style={{ top: '40%', right: '30%' }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Light beams simulation */}
        <motion.div 
          className="absolute h-[800px] w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
          style={{ left: '35%', top: '-10%' }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1], 
            height: ['70%', '80%', '70%'],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute h-[600px] w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent"
          style={{ left: '65%', top: '10%' }}
          animate={{ 
            opacity: [0.05, 0.1, 0.05], 
            height: ['60%', '70%', '60%'],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        style={{ opacity, scale: 1, y: 0 }} 
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10"
        >
          <div className="text-center max-w-3xl mx-auto mb-20" ref={titleRef}>
            <motion.div 
              variants={FADE_IN_UP}
              className="inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5 text-sm backdrop-blur-sm"
            >
              FEATURED WORK
            </motion.div>
            <motion.h2 
              variants={FADE_IN_UP} 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">Projects</span>
            </motion.h2>
            <motion.p 
              variants={FADE_IN_UP} 
              className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              A showcase of my finest work across various disciplines including design, development, and branding.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            style={{ opacity }}
          >
            {displayProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>
          
          {/* View All Projects Button */}
          <motion.div 
            variants={FADE_IN_UP}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
            >
              View All Projects
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
