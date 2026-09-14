import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { blogPostsData } from '../../data/portfolioData';

interface BlogPreviewSectionProps {
  onNavigate: (route: string) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section id="blog-preview-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('blog.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {t('blog.title')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          <motion.button
            id="view-all-articles-btn"
            onClick={() => onNavigate('/blog')}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 shrink-0 group"
          >
            <span>{t('blog.viewAll')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPostsData.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
              className="group cursor-pointer rounded-3xl ios-glass-card ios-specular-top overflow-hidden hover:border-indigo-400/60 dark:hover:border-indigo-500/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={post.coverImage}
                    alt={post.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-zinc-950/70 text-white backdrop-blur-md border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      {post.readingTime} {t('blog.readTime')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {post.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {post.summary[language]}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 sm:p-7 pt-0 border-t border-white/30 dark:border-white/10 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  {t('blog.readArticle')}
                </span>
                <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
