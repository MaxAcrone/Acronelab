"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from './LazyImage';
import { LayoutStabilizer } from './LayoutStabilizer'; // Корректный импорт
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  description: string;
}

interface SmartFilterGalleryProps {
  projects: Project[];
  title?: string;
  description?: string;
}

export const SmartFilterGallery = ({
  projects,
  title = 'u041fu0440u043eu0435u043au0442u044b',
  description = 'u0418u0441u0441u043bu0435u0434u0443u0439u0442u0435 u043du0430u0448u0438 u043fu043eu0441u043bu0435u0434u043du0438u0435 u0440u0430u0431u043eu0442u044b, u043eu0442u0444u0438u043bu044cu0442u0440u043eu0432u0430u043du043du044bu0435 u0441 u043fu043eu043cu043eu0449u044cu044e AI-u0442u0435u0433u043eu0432',
}: SmartFilterGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Получаем уникальные категории из проектов
  const categories = useMemo((): string[] => {
    // Использую Array.filter для обхода проблемы с Set
    const uniqueCategories: string[] = [];
    projects.forEach(project => {
      if (project.category && !uniqueCategories.includes(project.category)) {
        uniqueCategories.push(project.category);
      }
    });
    return ['all', ...uniqueCategories];
  }, [projects]);
  
  // u0421u043eu0431u0438u0440u0430u0435u043c u0432u0441u0435 u0443u043du0438u043au0430u043bu044cu043du044bu0435 u0442u0435u0433u0438 u0438u0437 u0432u0441u0435u0445 u043fu0440u043eu0435u043au0442u043eu0432
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(project => {
      project.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // u0424u0438u043bu044cu0442u0440u0443u0435u043c u043fu0440u043eu0435u043au0442u044b u043du0430 u043eu0441u043du043eu0432u0435 u0432u044bu0431u0440u0430u043du043du043eu0439 u043au0430u0442u0435u0433u043eu0440u0438u0438, u043fu043eu0438u0441u043au043eu0432u043eu0433u043e u0437u0430u043fu0440u043eu0441u0430 u0438 u0442u0435u0433u043eu0432
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // u0424u0438u043bu044cu0442u0440 u043fu043e u043au0430u0442u0435u0433u043eu0440u0438u0438
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      // u0424u0438u043bu044cu0442u0440 u043fu043e u043fu043eu0438u0441u043au0443
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // u0424u0438u043bu044cu0442u0440 u043fu043e u0442u0435u0433u0430u043c
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags?.includes(tag));
      
      return matchesCategory && matchesSearch && matchesTags;
    });
  }, [projects, selectedCategory, searchQuery, selectedTags]);

  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u0438u0437u043cu0435u043du0435u043du0438u044f u043au0430u0442u0435u0433u043eu0440u0438u0438
  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 300); // u0418u043cu0438u0442u0430u0446u0438u044f u0437u0430u0433u0440u0443u0437u043au0438
  };

  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u0438u0437u043cu0435u043du0435u043du0438u044f u043fu043eu0438u0441u043au0430
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u0432u044bu0431u043eu0440u0430 u0442u0435u0433u0430
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // u0410u043du0438u043cu0430u0446u0438u044f u0434u043bu044f u043au0430u0440u0442u043eu0447u0435u043a u043fu0440u043eu0435u043au0442u043eu0432
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    exit: { y: 50, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>

        {/* u0424u0438u043bu044cu0442u0440u044b */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* u041fu043eu0438u0441u043au043eu0432u0430u044f u0441u0442u0440u043eu043au0430 */}
            <div className="relative md:w-80">
              <input
                type="text"
                placeholder="u041fu043eu0438u0441u043a u043fu0440u043eu0435u043au0442u043eu0432..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* u041au0430u0442u0435u0433u043eu0440u0438u0438 */}
            <div className="flex overflow-x-auto space-x-2 py-2 md:justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-[#7C3AED] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 transition'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* u0422u0435u0433u0438 */}
          <div className="mt-6">
            <p className="text-white/70 mb-3">u0422u0435u0433u0438:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-[#10B981] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 transition'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* u0420u0435u0437u0443u043bu044cu0442u0430u0442u044b u0444u0438u043bu044cu0442u0440u0430u0446u0438u0438 */}
        <LayoutStabilizer 
          minHeight="400px" 
          className="my-6" 
          placeholder={
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/30" />
            </div>
          }
          loadingTime={isLoading ? 300 : 0}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div 
                key="grid"
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    custom={i}
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <Link href={`/projects/${project.slug}`} className="block">
                      <div className="relative pt-[60%] overflow-hidden">
                        <LazyImage
                          src={project.image}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          placeholder="blur"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-white group-hover:text-[#7C3AED] transition-colors">
                            {project.title}
                          </h3>
                          <span className="inline-block px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm line-clamp-2 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags && project.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="mb-4">
                  <svg width="64" height="64" className="mx-auto text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">u041du0438u0447u0435u0433u043e u043du0435 u043du0430u0439u0434u0435u043du043e</h3>
                <p className="text-white/70">u041fu043eu043fu0440u043eu0431u0443u0439u0442u0435 u0438u0437u043cu0435u043du0438u0442u044c u043fu0430u0440u0430u043cu0435u0442u0440u044b u0444u0438u043bu044cu0442u0440u0430u0446u0438u0438</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white transition rounded-lg"
                >
                  u0421u0431u0440u043eu0441u0438u0442u044c u0444u0438u043bu044cu0442u0440u044b
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutStabilizer>

        {/* u0418u043du0444u043eu0440u043cu0430u0446u0438u044f u043eu0431 AI-u0442u0435u0433u0438u0440u043eu0432u0430u043du0438u0438 */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/60 text-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#7C3AED]">
              <path d="M21.8309 13.4716C22.4793 12.3526 22.7582 11.075 22.6434 9.8002C22.5286 8.52539 22.0255 7.31952 21.2027 6.3518C20.38 5.38408 19.278 4.70088 18.0509 4.39814C16.8239 4.09539 15.534 4.18901 14.3634 4.66479C13.4187 3.78617 12.2186 3.24874 10.9452 3.13432C9.67187 3.0199 8.40511 3.33517 7.32791 4.0311C6.25072 4.72703 5.41284 5.76904 4.93394 6.99936C4.45504 8.22968 4.36055 9.58678 4.66486 10.8709C4.01647 11.99 3.73758 13.2675 3.85238 14.5423C3.96718 15.8171 4.47027 17.023 5.29305 17.9907C6.11582 18.9584 7.21776 19.6416 8.44484 19.9444C9.67192 20.2471 10.9618 20.1535 12.1324 19.6777C13.0771 20.5563 14.2773 21.0937 15.5506 21.2082C16.824 21.3226 18.0907 21.0073 19.1679 20.3114C20.2451 19.6154 21.083 18.5734 21.5619 17.3431C22.0408 16.1128 22.1353 14.7557 21.8309 13.4716Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11.5L11 13.5L15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>u0422u0435u0433u0438 u0430u0432u0442u043eu043cu0430u0442u0438u0447u0435u0441u043au0438 u0433u0435u043du0435u0440u0438u0440u0443u044eu0442u0441u044f u0441 u043fu043eu043cu043eu0449u044cu044e AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartFilterGallery;
