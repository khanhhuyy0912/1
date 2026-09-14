import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Languages, Search, FileText, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo } from '../../data/portfolioData';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenCommandPalette?: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
  onOpenSearch,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenSearch = onOpenCommandPalette || onOpenSearch || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home'), route: '/' },
    { label: t('nav.about'), route: '/about' },
    { label: t('nav.projects'), route: '/projects' },
    { label: t('nav.blog'), route: '/blog' },
    { label: t('nav.contact'), route: '/contact' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 no-print pt-3 sm:pt-4 px-3 sm:px-6"
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full transition-all duration-300 ${
          isScrolled
            ? 'ios-glass ios-specular-top shadow-xl shadow-black/5 dark:shadow-black/40'
            : 'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-white/40 dark:border-white/5'
        } flex items-center justify-between`}
      >
        {/* Brand / Logo */}
        <div
          id="navbar-brand"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-md shadow-indigo-500/25 relative overflow-hidden shrink-0 ring-1 ring-white/40 dark:ring-white/10"
          >
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
            {/* Liquid shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </motion.div>
          <div>
            <div className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-1.5 text-sm sm:text-base">
              <span>{personalInfo.name}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" title="Available for work" />
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono hidden sm:block">
              {personalInfo.role[language]}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links - iOS Liquid Glass Capsule */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center gap-1 ios-glass-pill p-1 rounded-full text-xs font-medium"
        >
          {navItems.map((item) => {
            const isActive =
              item.route === '/'
                ? currentRoute === '/'
                : currentRoute.startsWith(item.route);

            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`relative px-4 py-1.5 rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-300 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white dark:bg-zinc-800/90 rounded-full shadow-sm shadow-black/5 border border-white/80 dark:border-white/10 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities (iOS Glass Buttons) */}
        <div className="flex items-center gap-2">
          {/* Quick Search / Cmd+K Button */}
          <motion.button
            id="cmd-k-search-trigger"
            onClick={handleOpenSearch}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full ios-glass-pill text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            title="Command Palette (Ctrl + K / ⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden lg:inline">{t('nav.quickSearch')}</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-white/70 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded-md border border-white/40 dark:border-white/10 shadow-xs">
              ⌘K
            </kbd>
          </motion.button>

          {/* Language Switcher */}
          <motion.button
            id="lang-toggle-btn"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ios-glass-pill text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Chuyển đổi ngôn ngữ / Switch language"
          >
            <Languages className="w-3.5 h-3.5 text-indigo-500" />
            <span className="uppercase">{language}</span>
          </motion.button>

          {/* Dark / Light Mode Toggle */}
          <motion.button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-full ios-glass-pill text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
            )}
          </motion.button>

          {/* Resume Quick Action (iOS Primary Glass Button) */}
          <motion.button
            id="nav-resume-btn"
            onClick={() => handleNavClick('/resume')}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white ios-glass-btn-primary shadow-md transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </motion.button>

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl ios-glass-pill text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer - iOS Liquid Glass Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden mt-3 p-4 rounded-3xl ios-glass ios-specular-top shadow-2xl space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.route === '/'
                    ? currentRoute === '/'
                    : currentRoute.startsWith(item.route);

                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-2xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-indigo-600/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-white/40 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-xs" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/30 dark:border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => handleNavClick('/resume')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl ios-glass-btn-primary text-white text-xs font-semibold"
              >
                <FileText className="w-4 h-4" />
                <span>{t('nav.resume')}</span>
              </button>
              <button
                onClick={handleOpenSearch}
                className="py-2.5 px-4 rounded-2xl ios-glass-pill text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1.5"
              >
                <Search className="w-4 h-4 text-indigo-500" />
                <span>⌘K</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
