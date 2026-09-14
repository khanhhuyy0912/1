import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Database, Shield, Users, GitCommit, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { personalInfo } from '../../data/portfolioData';

interface AboutPreviewSectionProps {
  onNavigate: (route: string) => void;
}

export const AboutPreviewSection: React.FC<AboutPreviewSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const iconMap = [Code2, Database, Shield, Users];

  return (
    <section id="about-preview-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('about.badge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-snug">
              {t('about.title')}
            </h2>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
              <p>{t('about.desc1')}</p>
              <p>{t('about.desc2')}</p>
            </div>

            <div className="pt-2">
              <motion.button
                id="about-preview-learn-more"
                onClick={() => onNavigate('/about')}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm group"
              >
                <span>{t('about.learnMore')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Work Philosophy Pillars & GitHub Contribution Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.workPhilosophy.map((pillar, idx) => {
                const Icon = iconMap[idx % iconMap.length];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-5 rounded-3xl ios-glass-card ios-specular-top hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 border border-indigo-500/20 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                      {pillar.title[language]}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {pillar.desc[language]}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* GitHub Contributions Preview Widget - iOS Glass Widget */}
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-3xl ios-glass-card ios-specular-top text-zinc-700 dark:text-zinc-300 text-xs shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-mono font-semibold text-zinc-900 dark:text-white">
                  <GitCommit className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>GitHub Contributions (2024 - 2025)</span>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono font-medium">1,842 commits this year</span>
              </div>
              
              {/* Git Heatmap Grid */}
              <div className="grid grid-flow-col grid-rows-4 gap-1.5 overflow-x-auto py-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const levels = [
                    'bg-black/5 dark:bg-white/5',
                    'bg-emerald-500/30',
                    'bg-emerald-500/55',
                    'bg-emerald-500/80',
                    'bg-emerald-400'
                  ];
                  const levelIdx = ((i * 7 + 3) % 11 < 3) ? 0 : ((i * 3 + 2) % 5);
                  return (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-sm ${levels[levelIdx]} transition-all hover:scale-125 hover:ring-1 hover:ring-white`}
                      title={`Week ${i + 1}: Active commits`}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 mt-2.5 font-mono">
                <span>Less</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-xs bg-black/5 dark:bg-white/5" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/30" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/55" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/80" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                </div>
                <span>More</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
