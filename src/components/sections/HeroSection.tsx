import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, FileText, Check, Copy, Sparkles, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { personalInfo } from '../../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero-section" className="relative pt-36 sm:pt-44 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Personal Brand Identity & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Status Pill - iOS Liquid Glass Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-xs font-semibold text-indigo-700 dark:text-indigo-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Headline with Animated Verified Badge */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15] flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <span>{personalInfo.name}</span>
              <motion.span
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 350, damping: 15 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-sky-500 cursor-pointer drop-shadow-md"
                title="Verified Developer Profile"
                aria-label="Verified Developer Profile"
              >
                <BadgeCheck className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 fill-sky-500 text-white dark:text-zinc-950 stroke-[2.2]" />
              </motion.span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {personalInfo.tagline[language]}
            </motion.p>

            {/* Core Specialties Pills - iOS Liquid Glass Capsules */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
            >
              {['Claude 3.5 Sonnet', 'OpenAI Codex', 'Antigravity Platform', 'React 19 / Next.js', 'Node.js & Go', 'PostgreSQL & Docker'].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3.5 py-1 rounded-xl text-xs font-mono ios-glass-pill text-zinc-700 dark:text-zinc-300 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            {/* Action CTAs - iOS Liquid Glass Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <motion.button
                id="hero-cta-projects"
                onClick={() => onNavigate('/projects')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl ios-glass-btn-primary text-white font-semibold text-sm shadow-xl transition-all"
              >
                <span>{t('hero.ctaProjects')}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                id="hero-cta-contact"
                onClick={() => onNavigate('/contact')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl ios-glass-btn-secondary text-zinc-900 dark:text-zinc-100 font-semibold text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{t('hero.ctaContact')}</span>
              </motion.button>

              <motion.button
                id="hero-cta-ask-ai"
                onClick={() => {
                  const btn = document.getElementById('open-gemini-chat-btn');
                  if (btn) btn.click();
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl ios-glass-pill text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 font-semibold text-sm transition-all"
                title={language === 'vi' ? 'Hỏi trợ lý AI về kinh nghiệm và dự án của Huy' : 'Ask AI Persona about Huy\'s work and skills'}
              >
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span>{language === 'vi' ? 'Hỏi về Huy (AI)' : 'Ask Huy AI'}</span>
              </motion.button>

              <motion.button
                id="hero-cta-resume"
                onClick={() => onNavigate('/resume')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl ios-glass-pill text-zinc-700 dark:text-zinc-200 font-semibold text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-sky-500" />
                <span>{t('hero.ctaResume')}</span>
              </motion.button>
            </div>

            {/* Quick Email Copy bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span>Email:</span>
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="font-mono text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 ios-glass-pill px-3 py-1 rounded-full transition-colors"
                title="Click to copy email"
              >
                <span>{personalInfo.email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-zinc-400" />}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: iOS Liquid Glass Terminal & Profile Window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Decorative Liquid Glow behind terminal */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/30 to-sky-500/30 blur-xl opacity-70 -z-10" />

              {/* Terminal Frame - Apple Liquid Glass Window */}
              <div className="rounded-3xl bg-zinc-950/75 backdrop-blur-2xl border border-white/20 text-zinc-100 shadow-2xl overflow-hidden font-mono text-xs ios-specular-top ring-1 ring-inset ring-white/10">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
                    <span className="text-[11px] text-zinc-400 ml-2 font-mono">huy@agentic-core:~</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
                    <span>ONLINE</span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 space-y-3.5 text-zinc-300">
                  <div>
                    <span className="text-indigo-400">const</span>{' '}
                    <span className="text-sky-300">fullStackDev</span> = {'{'}
                    <div className="pl-4 space-y-1 py-1 text-zinc-300">
                      <div><span className="text-zinc-400">name:</span> <span className="text-emerald-300">"{personalInfo.name}"</span>,</div>
                      <div><span className="text-zinc-400">role:</span> <span className="text-emerald-300">"Full-Stack Developer"</span>,</div>
                      <div><span className="text-zinc-400">experience:</span> <span className="text-amber-300">"{personalInfo.stats.yearsExp}"</span>,</div>
                      <div><span className="text-zinc-400">coreSkills:</span> [
                        <span className="text-amber-200">"Claude"</span>,{' '}
                        <span className="text-amber-200">"Codex"</span>,{' '}
                        <span className="text-amber-200">"Antigravity"</span>,{' '}
                        <span className="text-amber-200">"React 19"</span>,{' '}
                        <span className="text-amber-200">"Node.js"</span>
                      ],</div>
                      <div><span className="text-zinc-400">status:</span> <span className="text-emerald-300">"READY_FOR_DEPLOYMENT"</span>,</div>
                      <div><span className="text-zinc-400">metrics:</span> {'{'}</div>
                      <div className="pl-4 space-y-0.5 text-zinc-400">
                        <div>peakRPS: <span className="text-purple-300">12500</span>,</div>
                        <div>p99Latency: <span className="text-purple-300">"48ms"</span>,</div>
                        <div>slaUptime: <span className="text-purple-300">"99.995%"</span></div>
                      </div>
                      <div>{'}'}</div>
                    </div>
                    {'}'};
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="text-zinc-400 flex items-center gap-2">
                      <span className="text-emerald-400">$</span>
                      <span>systemctl status engineering_rigor.service</span>
                    </div>
                    <div className="text-emerald-400 mt-1 pl-4 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Active: running (Zero memory leaks, 100% test coverage)</span>
                    </div>
                  </div>
                </div>

                {/* Terminal Footer Quick Metric Strip */}
                <div className="px-5 py-3 bg-zinc-950/90 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-base font-bold text-white font-sans">15M+</div>
                    <div className="text-[10px] text-zinc-400 font-sans">Daily Ops</div>
                  </div>
                  <div className="border-x border-white/10">
                    <div className="text-base font-bold text-indigo-400 font-sans">&lt;65ms</div>
                    <div className="text-[10px] text-zinc-400 font-sans">p99 Target</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-emerald-400 font-sans">99.99%</div>
                    <div className="text-[10px] text-zinc-400 font-sans">Reliability</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Key Metrics Band - iOS Liquid Glass Widgets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-8 border-t border-white/40 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-5 text-center"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-5 rounded-3xl ios-glass-card ios-specular-top transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {personalInfo.stats.yearsExp}
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
              {t('hero.metricsExp')}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-5 rounded-3xl ios-glass-card ios-specular-top transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              {personalInfo.stats.projectsCount}
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
              {t('hero.metricsProjects')}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-5 rounded-3xl ios-glass-card ios-specular-top transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {personalInfo.stats.systemUptime}
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
              {t('hero.metricsUptime')}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-5 rounded-3xl ios-glass-card ios-specular-top transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">
              {personalInfo.stats.dailyRequests}
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
              {t('hero.metricsThroughput')}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
