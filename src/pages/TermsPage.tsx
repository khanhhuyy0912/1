import React from 'react';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TermsPageProps {
  onNavigate: (route: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div id="terms-page" className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      <div>
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{language === 'vi' ? 'Quay lại Trang chủ' : 'Back to Home'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <FileCheck className="w-4 h-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {language === 'vi' ? 'Điều khoản Sử dụng' : 'Terms of Service'}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
          Last updated: January 2025
        </p>
      </div>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? '1. Quyền sở hữu trí tuệ' : '1. Intellectual Property'}
          </h2>
          <p>
            {language === 'vi'
              ? 'Tất cả các bài viết kỹ thuật, thiết kế giao diện, sơ đồ kiến trúc và nội dung case study trên trang web này thuộc quyền sở hữu của tác giả Tran Khanh Huy, trừ các thư viện mã nguồn mở có giấy phép riêng (như MIT, Apache 2.0).'
              : 'All articles, diagrams, case studies, and UI designs on this site are the intellectual property of Tran Khanh Huy, unless otherwise stated under open-source licenses (such as MIT or Apache 2.0).'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? '2. Giới hạn trách nhiệm' : '2. Disclaimer'}
          </h2>
          <p>
            {language === 'vi'
              ? 'Các hướng dẫn kỹ thuật và đoạn code được chia sẻ trên trang web nhằm mục đích tham khảo và chia sẻ kiến thức. Tác giả không chịu trách nhiệm đối với bất kỳ rủi ro phát sinh nào khi bạn áp dụng trực tiếp vào môi trường sản xuất của mình mà không kiểm thử cẩn thận.'
              : 'Technical guides and code examples are provided for educational reference. While tested in production, they are provided "as-is" without warranty of any kind.'}
          </p>
        </section>
      </div>
    </div>
  );
};
