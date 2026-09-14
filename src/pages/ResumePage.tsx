import React from 'react';
import { Printer, Download, Mail, Phone, MapPin, Globe, Github, Linkedin, Award, CheckCircle2, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo, experienceData, educationData, skillsData } from '../data/portfolioData';

export const ResumePage: React.FC = () => {
  const { language, t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="resume-page" className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            {t('resume.title')}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {language === 'vi'
              ? 'Tài liệu định dạng chuẩn A4. Bạn có thể in trực tiếp hoặc lưu dưới dạng PDF.'
              : 'Standard A4 formatted curriculum vitae. Print or export to PDF.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="print-resume-btn"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{t('resume.print')}</span>
          </button>

          <button
            id="download-resume-btn"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>{t('resume.downloadPdf')}</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet Container (Optimized for A4 Print) */}
      <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl print:border-none print:shadow-none print:p-0 print:m-0 space-y-10">
        {/* Header Information */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {personalInfo.name}
              </h2>
              <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {personalInfo.role[language]}
              </div>
            </div>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {personalInfo.location}
            </div>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-zinc-600 dark:text-zinc-400 pt-2 font-mono">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>{personalInfo.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>{personalInfo.phone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>{personalInfo.github.replace('https://', '')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-sky-500" />
              <span>{personalInfo.linkedin.replace('https://', '')}</span>
            </span>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t('resume.summary')}
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {language === 'vi'
              ? 'Kỹ sư Full-Stack & Kiến trúc sư hệ thống hơn 4 năm kinh nghiệm thực chiến trong việc thiết kế, xây dựng và vận hành các nền tảng thương mại điện tử, công nghệ tài chính (FinTech) và ứng dụng thời gian thực quy mô hàng triệu người dùng. Chuyên sâu về vi dịch vụ phân tán chịu tải cao (Go, Node.js, Kafka, PostgreSQL, Redis), kiến trúc frontend hiện đại (React, Next.js, TypeScript), cùng quy trình CI/CD và hạ tầng đám mây chuẩn hóa (AWS, Kubernetes, Terraform).'
              : 'Senior Full-Stack Engineer and System Architect with 4+ years of track record building high-throughput FinTech, enterprise e-commerce, and real-time collaboration engines. Expert in scalable distributed backend services (Go, Node.js, Kafka, PostgreSQL), modern React/Next.js frontend systems, and cloud-native observability across AWS and Kubernetes environments.'}
          </p>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t('resume.skills')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Languages & Runtimes:</span>
              <p className="text-zinc-600 dark:text-zinc-400 font-mono">TypeScript, JavaScript (ESNext), Go (Golang), Python, Node.js, SQL</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Frontend Engineering:</span>
              <p className="text-zinc-600 dark:text-zinc-400 font-mono">React 19, Next.js 14+, Tailwind CSS, Zustand, TanStack Query, Redux Toolkit, WebSockets</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Databases & Streaming:</span>
              <p className="text-zinc-600 dark:text-zinc-400 font-mono">PostgreSQL, Redis, Apache Kafka, MongoDB, DynamoDB, Elasticsearch, Prisma, Drizzle</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Cloud, DevOps & Observability:</span>
              <p className="text-zinc-600 dark:text-zinc-400 font-mono">AWS (ECS, EKS, Lambda, SQS, RDS), Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana</p>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t('resume.experience')}
          </h3>

          <div className="space-y-8">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-base font-bold text-zinc-900 dark:text-white">
                      {exp.role[language]}
                    </span>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 ml-2">
                      @ {exp.company}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-zinc-500">
                    {exp.period} • {exp.location}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
                  {exp.description[language]}
                </p>

                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 pt-1">
                  {exp.achievements[language].map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {t('resume.education')}
            </h3>

            {educationData.map((edu) => (
              <div key={edu.id} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                  <span>{edu.degree[language]}</span>
                  <span className="font-mono text-zinc-500">{edu.period}</span>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {edu.institution}
                </div>
                {edu.gpa && (
                  <div className="font-mono text-zinc-500">GPA: {edu.gpa} (Honors Degree)</div>
                )}
                <div className="text-zinc-500 leading-relaxed whitespace-pre-line">
                  {edu.details[language]}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {t('resume.certifications')}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-0.5">
                <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                  <span>AWS Certified Solutions Architect – Professional</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">2023</span>
                </div>
                <div className="text-zinc-500">Amazon Web Services • Validation ID: AWS-SAP-74892</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-0.5">
                <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                  <span>CKA: Certified Kubernetes Administrator</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">2022</span>
                </div>
                <div className="text-zinc-500">Cloud Native Computing Foundation (CNCF)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
