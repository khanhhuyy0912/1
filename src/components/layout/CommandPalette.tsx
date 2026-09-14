import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Compass, FolderKanban, BookOpen, Sun, Moon, Languages, ArrowRight, ExternalLink, Sparkles, MessageSquare, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { projectsData, blogPostsData } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onNavigate: (route: string) => void;
  onOpenDownloadModal?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpen,
  onNavigate,
  onOpenDownloadModal,
}) => {
  const [query, setQuery] = useState('');
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen?.();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const pages = [
    { label: t('nav.home'), route: '/' },
    { label: t('nav.about'), route: '/about' },
    { label: t('nav.projects'), route: '/projects' },
    { label: t('nav.blog'), route: '/blog' },
    { label: t('nav.contact'), route: '/contact' },
    { label: t('nav.resume'), route: '/resume' },
  ].filter((p) => !q || p.label.toLowerCase().includes(q));

  const filteredProjects = projectsData.filter(
    (p) =>
      !q ||
      p.title[language].toLowerCase().includes(q) ||
      p.subtitle[language].toLowerCase().includes(q) ||
      p.techStack.some((tech) => tech.toLowerCase().includes(q))
  );

  const filteredArticles = blogPostsData.filter(
    (a) =>
      !q ||
      a.title[language].toLowerCase().includes(q) ||
      a.summary[language].toLowerCase().includes(q) ||
      a.tags.some((tag) => tag.toLowerCase().includes(q))
  );

  return (
    <div id="command-palette-backdrop" className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/45 backdrop-blur-md animate-in fade-in duration-200" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div 
        id="command-palette-modal"
        className="w-full max-w-2xl ios-glass ios-specular-top rounded-3xl shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100 transition-all transform animate-in zoom-in-95 duration-150 ring-1 ring-inset ring-white/20"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/30 dark:border-white/10 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            id="cmd-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('cmd.placeholder')}
            className="w-full bg-transparent text-sm md:text-base placeholder:text-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-sm">
          {/* Quick Actions */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-1.5">
              {t('cmd.actions')}
            </div>
            <div className="space-y-1">
              <button
                id="cmd-open-chat-btn"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent('open-gemini-chat'));
                  setTimeout(() => {
                    const btn = document.getElementById('open-gemini-chat-btn');
                    if (btn) btn.click();
                  }, 50);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 transition-colors text-left text-indigo-700 dark:text-indigo-300"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                  <span className="font-medium">{language === 'vi' ? 'Hỏi về Trần Khánh Huy (AI Chatbot)' : 'Ask about Tran Khanh Huy (AI Chatbot)'}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 font-mono font-medium">Gemini 3.8</span>
              </button>

              <button
                id="cmd-toggle-theme-btn"
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>{t('cmd.toggleTheme')}</span>
                </div>
                <span className="text-xs text-zinc-400 font-mono capitalize">{theme}</span>
              </button>

              <button
                id="cmd-toggle-lang-btn"
                onClick={() => {
                  toggleLanguage();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Languages className="w-4 h-4 text-emerald-500" />
                  <span>{t('cmd.toggleLang')}</span>
                </div>
                <span className="text-xs text-zinc-400 font-mono uppercase">{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
              </button>

              <button
                id="cmd-download-source-link"
                onClick={() => {
                  onClose();
                  if (onOpenDownloadModal) {
                    onOpenDownloadModal();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-download-modal'));
                  }
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors text-left text-zinc-800 dark:text-zinc-200"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>{language === 'vi' ? 'Tải trọn bộ source code (.ZIP)' : 'Download Full Source Code (.ZIP)'}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-mono text-zinc-600 dark:text-zinc-400">ZIP</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          {pages.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {t('cmd.navigation')}
              </div>
              <div className="space-y-1">
                {pages.map((p) => (
                  <button
                    key={p.route}
                    onClick={() => {
                      onNavigate(p.route);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                  >
                    <span>{p.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-1.5 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5" />
                {t('cmd.projects')}
              </div>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onNavigate(`/projects/${proj.slug}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors text-left"
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {proj.title[language]}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {proj.techStack.slice(0, 4).join(' • ')}
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                      {proj.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Articles */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {t('cmd.articles')}
              </div>
              <div className="space-y-1">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      onNavigate(`/blog/${article.slug}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors text-left"
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {article.title[language]}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {article.readingTime} {t('blog.readTime')} • {article.tags[0]}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {pages.length === 0 && filteredProjects.length === 0 && filteredArticles.length === 0 && (
            <div className="py-8 text-center text-zinc-400">
              {language === 'vi' ? 'Không tìm thấy kết quả nào.' : 'No matching results found.'}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>{language === 'vi' ? 'Sử dụng phím mũi tên hoặc nhấp để điều hướng' : 'Use arrow keys or click to navigate'}</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
};
