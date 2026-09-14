import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Sparkles, CheckCircle, AlertTriangle, Lightbulb, UserCheck, TrendingUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/portfolioData';
import { NotFoundPage } from './NotFoundPage';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const { language, t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <NotFoundPage onNavigate={onNavigate} />;
  }

  const relatedProjects = projectsData.filter((p) => p.slug !== project.slug).slice(0, 2);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  return (
    <div id="project-detail-page" className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      {/* Back Navigation Link */}
      <div>
        <button
          onClick={() => onNavigate('/projects')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{language === 'vi' ? 'Quay lại danh sách dự án' : 'Back to Projects'}</span>
        </button>
      </div>

      {/* Hero / Header Section */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {project.year}
          </span>
          {project.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              Featured Case Study
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {project.title[language]}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
          {project.subtitle[language]}
        </p>

        {/* Action Buttons & Tech Tags */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/25 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('projects.liveDemo')}</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-semibold transition-colors border border-zinc-200 dark:border-zinc-700"
            >
              <Github className="w-4 h-4" />
              <span>{t('projects.sourceCode')}</span>
            </a>
          )}
        </div>
      </div>

      {/* Gallery with Lightbox trigger */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          {language === 'vi' ? 'Ảnh chụp giao diện & Sơ đồ kiến trúc (Nhấp để phóng to)' : 'Screenshots & System Architecture (Click to expand)'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.gallery.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs"
            >
              <img
                src={imgUrl}
                alt={`${project.title[language]} preview ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-md transition-opacity">
                  {language === 'vi' ? 'Phóng to ảnh' : 'Expand Image'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Measurable Results Highlight Boxes */}
      <div className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-10 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" />
          <span>{language === 'vi' ? 'Kết quả & Chỉ số đo lường thực tế' : 'Key Performance & Business Outcomes'}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {project.results.map((res, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-sans">
                {res.metric}
              </div>
              <div className="text-xs text-zinc-300 mt-1 leading-snug">
                {res.label[language]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Case Study Deep Dive: Vấn đề → Giải pháp → Vai trò → Công nghệ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Sections */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section: Overview */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>{language === 'vi' ? 'Tổng quan dự án' : 'Project Overview'}</span>
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {project.overview[language]}
            </p>
          </div>

          {/* Section 1: Problem (Vấn đề) */}
          <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>{language === 'vi' ? '1. Thách thức & Bài toán hóc búa (Problem)' : '1. The Core Engineering Challenge'}</span>
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.problem[language]}
            </p>
          </div>

          {/* Section 2: Solution (Giải pháp kỹ thuật) */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'vi' ? '2. Giải pháp kỹ thuật & Kiến trúc (Solution)' : '2. Architectural Solution'}</span>
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.solution[language]}
            </p>
          </div>

          {/* Section 3: My Role (Vai trò của bạn) */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'vi' ? '3. Vai trò & Trách nhiệm kỹ thuật (My Role)' : '3. My Direct Contributions & Role'}</span>
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.myRole[language]}
            </p>
          </div>
        </div>

        {/* Sidebar: Tech Stack Specs & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              {language === 'vi' ? 'Thông số kỹ thuật' : 'Technical Specifications'}
            </h3>

            <div>
              <div className="text-xs text-zinc-400 uppercase font-mono mb-2">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Category:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase font-mono">
                  {project.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Year:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
                  {project.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Client / Product:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Production Commercial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects Recommendations */}
      {relatedProjects.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? 'Dự án liên quan' : 'Related Case Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/projects/${rel.slug}`)}
                className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    {rel.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{rel.year}</span>
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {rel.title[language]}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {rel.subtitle[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.gallery[lightboxIndex]}
              alt="Fullscreen preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
