import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonialsData } from '../../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section
      id="testimonials-section"
      className="py-24 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('testimonials.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t('testimonials.title')}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonial Slider Card - iOS Liquid Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative ios-glass-card ios-specular-top rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden"
        >
          <Quote className="w-12 h-12 text-indigo-500/20 mb-6" />

          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-6 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-xs" />
            ))}
          </div>

          {/* Animated Quote Text & Author */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p className="text-lg sm:text-xl text-zinc-800 dark:text-zinc-200 font-normal leading-relaxed italic min-h-[120px]">
                "{current.content[language]}"
              </p>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/30 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                      {current.name}
                    </h4>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {current.role} • <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{current.company}</span>
                    </div>
                  </div>
                </div>

                {/* Slider Controls - iOS Glass Pills */}
                <div className="flex items-center gap-2">
                  <motion.button
                    id="testimonial-prev-btn"
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full ios-glass-pill text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    id="testimonial-next-btn"
                    onClick={handleNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full ios-glass-pill text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonialsData.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-7 bg-gradient-to-r from-indigo-500 to-sky-400 shadow-xs'
                    : 'w-2 bg-black/15 dark:bg-white/15'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
