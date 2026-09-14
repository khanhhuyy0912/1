import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { ResumePage } from './pages/ResumePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LiquidBackground } from './components/common/LiquidBackground';
import { GeminiChatbot } from './components/common/GeminiChatbot';
import { DownloadModal } from './components/common/DownloadModal';
import { initEasterEgg } from './utils/easterEgg';

export default function App() {
  // Simple SPA client router with history API support
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  useEffect(() => {
    // Fire developer easter egg message
    initEasterEgg();

    // Listen to browser forward/backward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    const handleOpenDownloadModal = () => {
      setDownloadModalOpen(true);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('open-download-modal', handleOpenDownloadModal);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('open-download-modal', handleOpenDownloadModal);
    };
  }, []);

  // Update dynamic document title based on active route
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      document.title = 'Tran Khanh Huy - Full-Stack Developer Portfolio';
    } else if (currentPath === '/about') {
      document.title = 'About — Tran Khanh Huy Portfolio';
    } else if (currentPath === '/projects') {
      document.title = 'Projects & Architecture Case Studies — Tran Khanh Huy';
    } else if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      document.title = `${slug.replace(/-/g, ' ')} — Case Study | Tran Khanh Huy`;
    } else if (currentPath === '/blog') {
      document.title = 'Technical Blog & Engineering Notes — Tran Khanh Huy';
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      document.title = `${slug.replace(/-/g, ' ')} — Blog | Tran Khanh Huy`;
    } else if (currentPath === '/resume') {
      document.title = 'Curriculum Vitae (CV) — Tran Khanh Huy';
    } else if (currentPath === '/contact') {
      document.title = 'Contact & Consultation — Tran Khanh Huy';
    } else if (currentPath === '/privacy') {
      document.title = 'Privacy Policy — Tran Khanh Huy';
    } else if (currentPath === '/terms') {
      document.title = 'Terms of Service — Tran Khanh Huy';
    } else {
      document.title = 'Page Not Found (404) — Tran Khanh Huy';
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route match dispatcher
  const renderRoute = () => {
    // Detail routes
    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      if (slug) {
        return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
      }
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      if (slug) {
        return <BlogPostPage slug={slug} onNavigate={navigate} />;
      }
    }

    switch (currentPath) {
      case '/':
      case '':
        return <HomePage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/projects':
        return <ProjectsPage onNavigate={navigate} />;
      case '/blog':
        return <BlogPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      case '/resume':
        return <ResumePage />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/terms':
        return <TermsPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-transparent text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300 relative">
          {/* iOS Liquid Frosted Ambient Mesh Background */}
          <LiquidBackground />

          {/* Skip link for Accessibility WCAG 2.1 AA */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>

          {/* Navigation Bar */}
          <Navbar
            currentRoute={currentPath}
            onNavigate={navigate}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          {/* Main Content Area */}
          <main id="main-content" className="flex-1 focus:outline-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {renderRoute()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <Footer
            onNavigate={navigate}
            onOpenDownloadModal={() => setDownloadModalOpen(true)}
          />

          {/* Gemini AI Multi-turn Chatbot (Ask about Tran Khanh Huy) */}
          <GeminiChatbot onNavigate={navigate} />

          {/* Command Palette (Cmd + K) */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onOpen={() => setCommandPaletteOpen(true)}
            onNavigate={navigate}
            onOpenDownloadModal={() => setDownloadModalOpen(true)}
          />

          {/* Full Source Code Download Modal */}
          <DownloadModal
            isOpen={downloadModalOpen}
            onClose={() => setDownloadModalOpen(false)}
          />
        </div>
      </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
