import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, Sparkles, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { blogPostsData } from '../data/portfolioData';

interface BlogPageProps {
  onNavigate: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPostsData.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      if (selectedTag !== 'all' && !post.tags.includes(selectedTag)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = post.title[language].toLowerCase().includes(q);
        const summaryMatch = post.summary[language].toLowerCase().includes(q);
        const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!titleMatch && !summaryMatch && !tagMatch) return false;
      }
      return true;
    });
  }, [selectedTag, searchQuery, language]);

  return (
    <div id="blog-page" className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Kiến trúc & Chia sẻ thực chiến' : 'Engineering Notes & Deep Dives'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {language === 'vi' ? 'Bài viết Kỹ thuật' : 'Technical Articles'}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {language === 'vi'
            ? 'Những phân tích chuyên sâu về tối ưu hóa hiệu năng React, thiết kế hệ thống phân tán, xử lý thanh toán Idempotent và kinh nghiệm vận hành production.'
            : 'Deep dives into React rendering mechanics, event-driven microservices migration, idempotent transactional systems, and production reliability.'}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="blog-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'vi' ? 'Tìm bài viết theo từ khóa...' : 'Search articles by keywords...'}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedTag === 'all'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? 'all' : tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {language === 'vi' ? 'Không tìm thấy bài viết phù hợp.' : 'No articles found matching your query.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
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
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-950/80 text-white backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} {t('blog.readTime')}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {post.title[language]}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {post.summary[language]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  {t('blog.readArticle')}
                </span>
                <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
