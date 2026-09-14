import React from 'react';
import { Sparkles, GraduationCap, Briefcase, Award, CheckCircle2, Code2, Server, Cloud, Cpu, ArrowRight, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo, experienceData, educationData, skillsData } from '../data/portfolioData';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <div id="about-page" className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Hành trình chuyên môn & Giá trị cốt lõi' : 'Personal Journey & Core Values'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {language === 'vi' ? 'Giới thiệu về tôi' : 'About Me'}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {language === 'vi'
            ? 'Từ những dòng code đầu tiên thời đại học đến vai trò Lead Architect thiết kế các cụm vi dịch vụ xử lý hàng chục triệu giao dịch mỗi ngày.'
            : 'From writing early algorithmic prototypes in college to architecting multi-region microservice clusters handling millions of financial operations daily.'}
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Story Text */}
        <div className="lg:col-span-7 space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? 'Câu chuyện cá nhân & Đam mê kỹ thuật' : 'My Story & Engineering Passion'}
          </h2>

          <p>
            {language === 'vi'
              ? `Tôi bắt đầu sự nghiệp với niềm đam mê sâu sắc về kỹ thuật phần mềm web hiện đại, hệ thống phân tán và ứng dụng AI (Claude, OpenAI Codex, Antigravity) vào chu trình phát triển sản phẩm. Trong suốt hơn 4 năm qua, tôi đã trải qua các vị trí Full-Stack Developer phát triển các hệ thống thương mại điện tử, cổng dữ liệu thời gian thực và các ứng dụng web phức tạp đạt tiêu chuẩn cao.`
              : `I started my engineering career with an obsession for modern web architectures, distributed systems, and integrating agentic AI tooling (Claude, OpenAI Codex, Antigravity) into full-stack development cycles. Over the past 4+ years, I have engineered resilient web platforms, real-time data pipelines, and scalable enterprise applications.`}
          </p>

          <p>
            {language === 'vi'
              ? `Tôi tin rằng một Full-Stack Developer giỏi không chỉ là người viết code chạy được, mà là người biết tận dụng các công nghệ tiên tiến nhất để xây dựng hệ thống có thể mở rộng (scalable), dễ bảo trì (maintainable), an toàn (secure) và mang lại giá trị thực tiễn cao nhất.`
              : `I firmly believe that exceptional full-stack engineering is about building scalable, maintainable, and robust digital solutions that accelerate business delivery through smart modern tools.`}
          </p>

          <p>
            {language === 'vi'
              ? `Khi không ngồi lập trình hoặc tối ưu hệ thống, bạn có thể tìm thấy tôi đang thử nghiệm các mô hình AI agentic mới, đóng góp vào cộng đồng mã nguồn mở hoặc trao đổi kiến trúc kỹ thuật cùng đồng nghiệp.`
              : `When not developing high-impact applications, you will find me experimenting with next-gen agentic workflows, contributing to developer tooling, or collaborating on software architecture.`}
          </p>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => onNavigate('/resume')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'vi' ? 'Xem Sơ yếu lý lịch (CV)' : 'View Curriculum Vitae'}</span>
            </button>

            <button
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-medium transition-colors"
            >
              <span>{t('hero.ctaContact')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Card & Highlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-zinc-100 dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
              />
              <div>
                <h3 className="font-bold text-xl text-zinc-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {personalInfo.location}
                </div>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Full-Time / Consulting</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Email:</span>
                <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 dark:text-indigo-400 font-mono hover:underline">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">{language === 'vi' ? 'Kinh nghiệm:' : 'Experience:'}</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{personalInfo.stats.yearsExp} Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">{language === 'vi' ? 'Bằng cấp:' : 'Degree:'}</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">B.S. Computer Science (HCMUT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Engineering Methodologies */}
      <div className="space-y-8 pt-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {language === 'vi' ? 'Phương pháp làm việc & Tiêu chuẩn kỹ thuật' : 'Engineering Principles & Methodologies'}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {language === 'vi' ? 'Những nguyên tắc bất biến trong quá trình xây dựng sản phẩm của tôi.' : 'The guiding tenets behind my engineering decisions and architectures.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalInfo.workPhilosophy.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 shadow-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {item.title[language]}
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.desc[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications Timeline */}
      <div className="space-y-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>{t('resume.education')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                  {edu.period}
                </span>
                {edu.gpa && (
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                {edu.degree[language]}
              </h3>

              <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {edu.institution}
              </div>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 whitespace-pre-line leading-relaxed">
                {edu.details[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
