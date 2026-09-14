import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div id="privacy-page" className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
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
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {language === 'vi' ? 'Chính sách Bảo mật' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
          Last updated: January 2025
        </p>
      </div>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? '1. Thu thập thông tin' : '1. Information Collection'}
          </h2>
          <p>
            {language === 'vi'
              ? 'Website cá nhân này chỉ thu thập thông tin do chính bạn tự nguyện cung cấp thông qua biểu mẫu liên hệ (Họ tên, Email, Tiêu đề và Nội dung tin nhắn) hoặc đăng ký nhận bản tin kỹ thuật.'
              : 'This portfolio website only collects personal data that you voluntarily provide through the contact form (Name, Email, Subject, Message) or newsletter subscription.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? '2. Mục đích sử dụng' : '2. Purpose of Use'}
          </h2>
          <p>
            {language === 'vi'
              ? 'Thông tin liên hệ của bạn chỉ được sử dụng duy nhất cho mục đích phản hồi các câu hỏi hợp tác công việc, trao đổi kỹ thuật hoặc gửi các cập nhật bài viết mới. Chúng tôi cam kết tuyệt đối không chia sẻ, bán hoặc phân phối thông tin cho bên thứ ba.'
              : 'Your contact information is strictly used to reply to technical discussions, job opportunities, or deliver architectural article updates. We never sell, rent, or share personal data with third parties.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'vi' ? '3. Lưu trữ dữ liệu cục bộ' : '3. Local Storage'}
          </h2>
          <p>
            {language === 'vi'
              ? 'Trang web sử dụng LocalStorage của trình duyệt để lưu tùy chọn giao diện (sáng / tối) và ngôn ngữ (Tiếng Việt / English) nhằm mang lại trải nghiệm tối ưu nhất cho lần truy cập tiếp theo.'
              : 'This site uses browser LocalStorage solely to persist your visual theme (light / dark) and language preference (Vietnamese / English).'}
          </p>
        </section>
      </div>
    </div>
  );
};
