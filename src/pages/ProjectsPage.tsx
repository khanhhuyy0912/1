import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, ExternalLink, Github, ArrowRight, Activity, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');

  // Extract all unique tech tags from projects
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const categories = [
    { id: 'all', label: t('projects.filterAll') },
    { id: 'fullstack', label: t('projects.filterFullstack') },
    { id: 'cloud', label: t('projects.filterCloud') },
    { id: 'frontend', label: t('projects.filterFrontend') },
    { id: 'ai', label: t('projects.filterAi') },
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category check
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }
      // Tech check
      if (selectedTech !== 'all' && !project.techStack.includes(selectedTech)) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = project.title[language].toLowerCase().includes(q);
        const subMatch = project.subtitle[language].toLowerCase().includes(q);
        const techMatch = project.techStack.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !subMatch && !techMatch) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedTech, searchQuery, language]);

  return (
    <div id="projects-page" className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Toàn bộ danh mục sản phẩm' : 'Engineering Portfolio & Showcase'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {language === 'vi' ? 'Dự án đã thực hiện' : 'Featured Projects'}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {language === 'vi'
            ? 'Tổng hợp các sản phẩm web thương mại, hệ thống phân tán chịu tải cao, bảng trắng thời gian thực và công cụ mã nguồn mở đã được triển khai thực tế.'
            : 'A curated directory of commercial platforms, high-throughput distributed microservices, real-time collaboration engines, and open-source tools.'}
        </p>
      </motion.div>

      {/* Filter and Search Bar Control Group */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs"
      >
        {/* Top bar: Search input + Category pills */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="projects-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('projects.searchPlaceholder')}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tech Tag Quick Pills */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-400 mr-1 font-mono text-[11px]">Filter by tech:</span>
          <button
            onClick={() => setSelectedTech('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
              selectedTech === 'all'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            All Techs
          </button>
          {allTechs.slice(0, 10).map((tech) => (
            <motion.button
              key={tech}
              onClick={() => setSelectedTech(tech === selectedTech ? 'all' : tech)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors ${
                selectedTech === tech
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {t('projects.noResults')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTech('all');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium"
          >
            Reset filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-xl transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={project.thumbnail}
                      alt={project.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-950/80 text-white backdrop-blur-md uppercase">
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/60 text-zinc-300 backdrop-blur-md">
                        {project.year}
                      </span>
                    </div>

                    {project.metricsSummary && (
                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 text-[11px] text-white bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800/80 font-mono">
                        <Activity className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{project.metricsSummary}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {project.title[language]}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {project.subtitle[language]}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 mt-3">
                  <motion.button
                    onClick={() => onNavigate(`/projects/${project.slug}`)}
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                  >
                    <span>{t('projects.viewCaseStudy')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title={t('projects.liveDemo')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
