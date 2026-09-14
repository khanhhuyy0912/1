import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink, Github, Sparkles, Activity } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { projectsData } from '../../data/portfolioData';

interface ProjectsSectionProps {
  onNavigate: (route: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'cloud' | 'frontend' | 'ai'>('all');

  const filters = [
    { id: 'all', label: t('projects.filterAll') },
    { id: 'fullstack', label: t('projects.filterFullstack') },
    { id: 'cloud', label: t('projects.filterCloud') },
    { id: 'frontend', label: t('projects.filterFrontend') },
    { id: 'ai', label: t('projects.filterAi') },
  ];

  const featuredProjects = projectsData.filter((p) => {
    if (filter === 'all') return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('projects.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* iOS Segmented Filter Capsule */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full ios-glass-pill">
            {filters.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-300'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-project-filter"
                      className="absolute inset-0 bg-white dark:bg-zinc-800/95 rounded-full shadow-sm border border-white/80 dark:border-white/10 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects 2x2 Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl ios-glass-card ios-specular-top overflow-hidden hover:border-indigo-400/60 dark:hover:border-indigo-500/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Project Image Box with Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={project.thumbnail}
                      alt={project.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-zinc-950/70 text-white backdrop-blur-md border border-white/20 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-zinc-950/50 text-zinc-200 backdrop-blur-md border border-white/10">
                        {project.year}
                      </span>
                    </div>

                    {project.metricsSummary && (
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-xs text-white bg-zinc-950/70 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 font-mono">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                        <span className="truncate font-medium">{project.metricsSummary}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title[language]}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                        {project.subtitle[language]}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono ios-glass-pill text-zinc-700 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-white/30 dark:border-white/10 mt-4">
                  <motion.button
                    onClick={() => onNavigate(`/projects/${project.slug}`)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>{t('projects.viewCaseStudy')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-full ios-glass-pill text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title={t('projects.sourceCode')}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-full ios-glass-pill text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title={t('projects.liveDemo')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects Button */}
        <div className="text-center mt-14">
          <motion.button
            id="browse-all-projects-btn"
            onClick={() => onNavigate('/projects')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl ios-glass-btn-secondary text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-all shadow-md"
          >
            <span>{t('projects.allProjectsCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
