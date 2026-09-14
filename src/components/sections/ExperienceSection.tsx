import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { experienceData } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="experience-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('exp.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t('exp.title')}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t('exp.subtitle')}
          </p>
        </motion.div>

        {/* Chronological Timeline */}
        <div className="relative border-l-2 border-indigo-500/20 dark:border-indigo-500/30 ml-4 md:ml-36 space-y-12">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-6 md:pl-10 group"
            >
              {/* Timeline Indicator Dot with iOS Glow */}
              <motion.div
                whileHover={{ scale: 1.4 }}
                className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 border-2 border-white dark:border-zinc-900 shadow-md shadow-indigo-500/50 transition-transform"
              />

              {/* Date Badge on left in desktop */}
              <div className="md:absolute md:-left-40 md:top-1.5 mb-2 md:mb-0">
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full ios-glass-pill text-zinc-700 dark:text-zinc-300">
                  {exp.period.split('—')[0]}
                </span>
              </div>

              {/* Card Container - iOS Liquid Glass */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-6 sm:p-7 rounded-3xl ios-glass-card ios-specular-top hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/30 dark:border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role[language]}
                    </h3>
                    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ios-glass-pill">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ios-glass-pill">
                      <MapPin className="w-3.5 h-3.5 text-sky-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {exp.description[language]}
                </p>

                {/* Measurable Achievements Bullet Points */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {language === 'vi' ? 'Thành tựu chính & Đóng góp kỹ thuật:' : 'Key Engineering Achievements:'}
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    {exp.achievements[language].map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/30 dark:border-white/10">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono ios-glass-pill text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
