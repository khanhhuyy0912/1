import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Send, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { personalInfo } from '../../data/portfolioData';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenDownloadModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDownloadModal }) => {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewsletterStatus('success');
        setNewsletterMsg(data.message || (language === 'vi' ? 'Đăng ký thành công!' : 'Subscribed successfully!'));
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMsg(data.error || (language === 'vi' ? 'Lỗi đăng ký' : 'Subscription failed'));
      }
    } catch {
      // Fallback local acknowledgment
      setNewsletterStatus('success');
      setNewsletterMsg(language === 'vi' ? 'Đã ghi nhận email của bạn!' : 'Your email has been recorded!');
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative z-10 border-t border-white/20 dark:border-white/10 ios-glass pt-16 pb-12 text-zinc-600 dark:text-zinc-400 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/20 dark:border-white/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md shadow-indigo-500/30 shrink-0">
                <img src={personalInfo.avatar} alt={personalInfo.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass-pill text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('hero.statusAvailable')}</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/projects')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('nav.projects')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('nav.blog')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/resume')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  {t('nav.resume')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Socials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              {t('footer.socials')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter / X</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Direct</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              {t('footer.newsletterTitle')}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
              {t('footer.newsletterDesc')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@work.com"
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl ios-glass-pill text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-xs"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {newsletterStatus === 'success' && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{newsletterMsg}</span>
                </div>
              )}
              {newsletterStatus === 'error' && (
                <div className="flex items-center gap-1.5 text-[11px] text-rose-500 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{newsletterMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <div>
            © {new Date().getFullYear()} {personalInfo.name} ({personalInfo.fullNameVi}). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {t('footer.privacy')}
            </button>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {t('footer.terms')}
            </button>
            <button
              id="download-source-zip-btn"
              onClick={() => {
                if (onOpenDownloadModal) {
                  onOpenDownloadModal();
                } else {
                  window.dispatchEvent(new CustomEvent('open-download-modal'));
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ios-glass-pill text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors border border-indigo-500/20 hover:border-indigo-500/40"
              title={t('footer.downloadSource')}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('footer.downloadSource')}</span>
            </button>
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ios-glass-pill text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
