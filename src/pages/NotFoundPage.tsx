import React from 'react';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div id="not-found-page" className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-20">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-sm text-indigo-600 dark:text-indigo-400 font-bold">
            ERROR 404
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {language === 'vi' ? 'Trang không tồn tại' : 'Page Not Found'}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === 'vi'
              ? 'Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển sang một tài nguyên khác.'
              : 'The requested route does not exist or has been relocated.'}
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'vi' ? 'Về Trang chủ' : 'Return Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
