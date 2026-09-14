import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Server, Cloud, Cpu, Sparkles, Bot } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { skillsData } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('skills.all') },
    { id: 'ai', label: 'Agentic AI & LLMs' },
    { id: 'frontend', label: t('skills.frontend') },
    { id: 'backend', label: t('skills.backend') },
    { id: 'cloud', label: t('skills.cloud') },
    { id: 'arch', label: t('skills.arch') },
  ];

  const displayedCategories =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter((c) => c.id === activeCategory);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'ai':
        return <Bot className="w-5 h-5 text-amber-500" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-indigo-500" />;
      case 'backend':
        return <Server className="w-5 h-5 text-emerald-500" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      default:
        return <Cpu className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <section id="skills-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('skills.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t('skills.subtitle')}
          </p>

          {/* Category Filter - iOS Segmented Glass Control */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4 p-1.5 rounded-2xl sm:rounded-full ios-glass-pill max-w-2xl mx-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-300'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-skill-category"
                      className="absolute inset-0 bg-white dark:bg-zinc-800/95 rounded-full shadow-sm border border-white/80 dark:border-white/10 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {displayedCategories.map((category) => (
                <div key={category.id} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/40 dark:border-white/10 pb-3">
                    <div className="p-2 rounded-xl ios-glass-pill shadow-xs">
                      {getCategoryIcon(category.id)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {category.title[language]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: sIdx * 0.05, duration: 0.4 }}
                        whileHover={{ y: -5, scale: 1.015 }}
                        className="p-5 rounded-3xl ios-glass-card ios-specular-top hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all group shadow-sm hover:shadow-xl"
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ios-glass-pill text-zinc-700 dark:text-zinc-300">
                            {skill.experience}
                          </span>
                        </div>

                        {/* Animated Liquid Proficiency Bar */}
                        <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-2 mb-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.1 + sIdx * 0.04, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 h-2 rounded-full shadow-xs"
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-medium">
                          <span>{t('skills.proficiency')}</span>
                          <span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">
                            {skill.level}%
                          </span>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-white/40 dark:border-white/10 pt-2.5">
                          {skill.description[language]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
