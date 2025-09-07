"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt, FaCalendar, FaTag, FaEye, FaRocket, FaTwitter, FaDiscord } from 'react-icons/fa';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  content: string;
  featured: boolean;
  date?: string;
  client?: string;
  services?: string[];
  goals?: string;
  screens?: string[];
  previewUrl?: string;
  twitterUrl?: string;
  discordUrl?: string;
}

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-50"
      >
        <Link
          href="/projects"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute h-[600px] w-[600px] rounded-full blur-[150px] bg-purple-500/10"
            style={{ top: '-10%', right: '-20%' }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Category Badge */}
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
              {project.category}
            </div>

            {/* Project Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              {project.title}
            </h1>

            {/* Project Description */}
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap justify-center gap-6 text-white/60">
              {project.date && (
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-sm" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-center gap-2">
                  <FaEye className="text-sm" />
                  <span>Client: {project.client}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {project.previewUrl && (
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors"
                >
                  <FaExternalLinkAlt />
                  Live Preview
                </a>
              )}
              {project.twitterUrl && (
                <a
                  href={project.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <FaTwitter />
                  Twitter
                </a>
              )}
              {project.discordUrl && (
                <a
                  href={project.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <FaDiscord />
                  Discord
                </a>
              )}
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Images */}
              {project.screens && project.screens.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Project Screenshots</h3>
                  
                  {/* Main Image */}
                  <div className="relative mb-4 rounded-2xl overflow-hidden bg-black/20">
                    <div className="aspect-video">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.screens[activeImage]}
                        alt={`${project.title} screenshot ${activeImage + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 overflow-x-auto">
                    {project.screens.map((screen: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === index 
                            ? 'border-white' 
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={screen}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Project Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Project Overview</h3>
                <div className="text-white/80 leading-relaxed space-y-4">
                  {project.content && (
                    <p className="text-lg">{project.content}</p>
                  )}
                  <p>
                    This project showcases our expertise in {project.category.toLowerCase()} development, 
                    combining cutting-edge technology with intuitive user experience design. 
                    We focused on creating a solution that not only meets the technical requirements 
                    but also delivers an engaging and memorable user experience.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Project Details */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">Project Details</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaTag className="text-white/60" />
                      <span className="text-white/80">{project.category}</span>
                    </div>
                    
                    {project.client && (
                      <div className="flex items-center gap-3">
                        <FaEye className="text-white/60" />
                        <span className="text-white/80">{project.client}</span>
                      </div>
                    )}
                    
                    {project.date && (
                      <div className="flex items-center gap-3">
                        <FaCalendar className="text-white/60" />
                        <span className="text-white/80">{new Date(project.date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                {project.tags && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-sm bg-white/10 rounded-full text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Goals */}
                {project.goals && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Project Goals</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {project.goals}
                    </p>
                  </div>
                )}

                {/* Services */}
                {project.services && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">Services Provided</h4>
                    <div className="space-y-2">
                      {project.services.map((service: string) => (
                        <div key={service} className="flex items-center gap-2">
                          <FaRocket className="text-white/60 text-xs" />
                          <span className="text-white/80 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-12 text-center">
                Related Projects
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/projects/${relatedProject.slug}`}
                    className="group block"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
                    >
                      <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-white/40 mb-2">
                            {relatedProject.id}
                          </div>
                          <div className="text-sm text-white/60 uppercase tracking-wider">Project</div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                          {relatedProject.title}
                        </h4>
                        <p className="text-white/70 text-sm line-clamp-2 mb-4">
                          {relatedProject.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">{relatedProject.category}</span>
                          <FaExternalLinkAlt className="text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's create something amazing together. Our team is ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
