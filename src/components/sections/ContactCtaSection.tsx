import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { personalInfo } from '../../data/portfolioData';

interface ContactCtaSectionProps {
  onNavigate: (route: string) => void;
}

export const ContactCtaSection: React.FC<ContactCtaSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section id="contact-cta-section" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl ios-glass-card ios-specular-top p-8 sm:p-14 overflow-hidden shadow-2xl"
        >
          {/* Internal Liquid Glow Orbs */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-500/35 to-purple-500/30 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-sky-400/30 to-teal-400/25 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t('hero.statusAvailable')}</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {language === 'vi'
                ? 'Bạn có dự án cần xây dựng hoặc bài toán tải cao cần giải quyết?'
                : 'Have a mission-critical project or high-throughput architecture challenge?'}
            </h2>

            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {language === 'vi'
                ? 'Tôi sẵn sàng tham gia tư vấn giải pháp kiến trúc phân tán, phát triển ứng dụng Full-Stack hoặc đồng hành cùng các đội ngũ kỹ sư nhiệt huyết.'
                : 'Open for senior technical leadership, distributed cloud advisory, and full-stack product engineering collaborations.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <motion.button
                id="contact-cta-action-btn"
                onClick={() => onNavigate('/contact')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl ios-glass-btn-primary text-white font-semibold text-sm shadow-xl transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{t('hero.ctaContact')}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl ios-glass-btn-secondary text-zinc-800 dark:text-zinc-200 font-semibold text-sm font-mono transition-all"
              >
                <span>{personalInfo.email}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
