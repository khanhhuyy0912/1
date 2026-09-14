import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Check, Copy, BookOpen, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { blogPostsData, personalInfo } from '../data/portfolioData';
import { NotFoundPage } from './NotFoundPage';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const { language, t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return <NotFoundPage onNavigate={onNavigate} />;
  }

  const postContent = post.content[language];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(idx);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const relatedPosts = blogPostsData.filter((p) => p.slug !== post.slug);

  return (
    <div id="blog-post-page" className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{t('blog.backToList')}</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.2]">
          {post.title[language]}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
            />
            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                {personalInfo.name}
              </div>
              <div className="text-xs text-zinc-400">
                {personalInfo.role[language]}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} {t('blog.readTime')}
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-3xl overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-lg">
        <img
          src={post.coverImage}
          alt={post.title[language]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layout Grid: Article + Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article Content */}
        <div className="lg:col-span-8 space-y-8 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
          {/* Intro callout */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-l-4 border-indigo-500 dark:border-indigo-400 text-base italic leading-relaxed text-zinc-800 dark:text-zinc-200">
            {postContent.intro}
          </div>

          {/* Sections */}
          {postContent.sections.map((sec, idx) => (
            <div key={idx} id={`section-${idx}`} className="space-y-4 pt-4 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {sec.heading}
              </h2>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                {sec.body}
              </p>

              {/* Code Snippet with Copy Button */}
              {sec.codeSnippet && (
                <div className="rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 overflow-hidden text-xs my-4 shadow-xl">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                    <span className="font-mono text-xs text-zinc-400 uppercase">
                      {sec.codeSnippet.language}
                    </span>
                    <button
                      onClick={() => handleCopyCode(sec.codeSnippet!.code, idx)}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
                      title="Copy code to clipboard"
                    >
                      {copiedSnippetIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300 bg-zinc-950">
                    <code>{sec.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              {language === 'vi' ? 'Kết luận & Bài học rút ra' : 'Key Takeaways & Conclusion'}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {postContent.conclusion}
            </p>
          </div>

          {/* Share Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mt-8">
            <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-500" />
              <span>{t('blog.share')}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                id="blog-copy-link-btn"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? t('blog.copied') : t('blog.copyLink')}</span>
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title[language])}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors"
                title="Share on Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar: Table of Contents */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>{t('blog.toc')}</span>
            </div>

            <nav className="space-y-2 text-xs">
              {postContent.sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className="block text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-relaxed py-1"
                >
                  {sec.heading}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? 'Bài viết liên quan' : 'Related Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/blog/${rel.slug}`)}
                className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-lg transition-all"
              >
                <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-1 font-semibold">
                  #{rel.tags[0]}
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {rel.title[language]}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                  {rel.summary[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
