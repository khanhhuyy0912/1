import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.projects': 'Dự án',
    'nav.blog': 'Bài viết',
    'nav.contact': 'Liên hệ',
    'nav.resume': 'Hồ sơ / CV',
    'nav.search': 'Tìm kiếm...',
    'nav.quickSearch': 'Tìm nhanh',

    // Hero
    'hero.badge': 'Full-Stack Developer',
    'hero.greeting': 'Xin chào, tôi là',
    'hero.name': 'Trần Khánh Huy',
    'hero.vietnameseName': '(Tran Khanh Huy)',
    'hero.tagline': 'Xây dựng các hệ thống phân tán chịu tải cao & trải nghiệm web chuẩn Enterprise với tư duy tối ưu hiệu năng đến từng millisecond.',
    'hero.ctaProjects': 'Xem dự án thực chiến',
    'hero.ctaContact': 'Liên hệ hợp tác',
    'hero.ctaResume': 'Xem CV online',
    'hero.statusAvailable': 'Sẵn sàng nhận dự án & cơ hội mới',
    'hero.metricsExp': 'Năm kinh nghiệm',
    'hero.metricsProjects': 'Dự án đã triển khai',
    'hero.metricsUptime': 'Uptime hệ thống',
    'hero.metricsThroughput': 'Requests / ngày',

    // About Section
    'about.badge': 'Hành trình chuyên môn',
    'about.title': 'Kỹ sư cầu toàn, đam mê hệ thống quy mô lớn',
    'about.desc1': 'Với hơn 4 năm kinh nghiệm thực chiến trong lĩnh vực phát triển phần mềm toàn diện (Full-Stack), tôi chuyên sâu thiết kế kiến trúc vi dịch vụ (Microservices), hệ thống thanh toán phân tán chịu tải cao và xây dựng giao diện web phản hồi tức thì.',
    'about.desc2': 'Phương châm làm việc của tôi là: Code rõ ràng, kiến trúc kiểm chứng được, đo lường bằng kết quả kinh doanh thực tế, và luôn đặt trải nghiệm người dùng cuối lên hàng đầu.',
    'about.learnMore': 'Đọc câu chuyện chi tiết & triết lý làm việc',

    // Skills Section
    'skills.badge': 'Năng lực cốt lõi',
    'skills.title': 'Hệ sinh thái công nghệ & Công cụ thực chiến',
    'skills.subtitle': 'Được tôi rèn luyện qua các dự án thương mại thực tế phục vụ hàng triệu người dùng hoạt động hàng ngày.',
    'skills.all': 'Tất cả',
    'skills.frontend': 'Frontend & UI Engineering',
    'skills.backend': 'Backend & Distributed Systems',
    'skills.cloud': 'Cloud & DevOps CI/CD',
    'skills.arch': 'Kiến trúc & Kỹ năng bổ trợ',
    'skills.proficiency': 'Mức độ thông thạo',

    // Projects Section
    'projects.badge': 'Sản phẩm tiêu biểu',
    'projects.title': 'Các dự án thực chiến & Case Studies nổi bật',
    'projects.subtitle': 'Mỗi dự án là một bài toán hóc búa về kiến trúc, hiệu năng và giải pháp kỹ thuật đã được chứng minh hiệu quả.',
    'projects.filterAll': 'Tất cả dự án',
    'projects.filterFullstack': 'Full-Stack Apps',
    'projects.filterCloud': 'Cloud / Phân tán',
    'projects.filterFrontend': 'Frontend / 3D',
    'projects.filterAi': 'AI & Tooling',
    'projects.viewCaseStudy': 'Chi tiết Case Study',
    'projects.liveDemo': 'Xem Demo trực tiếp',
    'projects.sourceCode': 'Mã nguồn GitHub',
    'projects.allProjectsCta': 'Xem toàn bộ kho dự án',
    'projects.searchPlaceholder': 'Tìm kiếm theo tên công nghệ, từ khoá...',
    'projects.noResults': 'Không tìm thấy dự án phù hợp với từ khóa này.',

    // Experience Section
    'exp.badge': 'Lộ trình sự nghiệp',
    'exp.title': 'Kinh nghiệm làm việc thực tế',
    'exp.subtitle': 'Dấu ấn đóng góp tại các công ty công nghệ, từ Startup tăng trưởng nhanh đến Tập đoàn công nghệ đa quốc gia.',

    // Testimonials
    'testimonials.badge': 'Đánh giá & Đồng nghiệp',
    'testimonials.title': 'Đồng nghiệp & Khách hàng nói gì?',
    'testimonials.subtitle': 'Những nhận xét chân thực từ các Tech Lead, CTO và Product Director đã từng làm việc cùng tôi.',

    // Blog
    'blog.badge': 'Chia sẻ kỹ thuật',
    'blog.title': 'Bài viết & Kinh nghiệm kiến trúc hệ thống',
    'blog.subtitle': 'Những bài học đúc kết từ quá trình debug thực tế, tối ưu hiệu năng và thiết kế hệ thống phần mềm.',
    'blog.readArticle': 'Đọc bài viết',
    'blog.readTime': 'phút đọc',
    'blog.viewAll': 'Xem tất cả bài viết',
    'blog.backToList': 'Quay lại danh sách bài viết',
    'blog.toc': 'Mục lục bài viết',
    'blog.share': 'Chia sẻ bài viết',
    'blog.copyLink': 'Sao chép liên kết',
    'blog.copied': 'Đã sao chép!',

    // Contact
    'contact.badge': 'Kênh liên hệ',
    'contact.title': 'Bắt đầu một dự án mới hoặc trao đổi cơ hội',
    'contact.subtitle': 'Tôi luôn sẵn lòng trao đổi về các dự án tiềm năng, tư vấn kiến trúc giải pháp hoặc các vị trí Senior Full-Stack.',
    'contact.name': 'Họ và tên',
    'contact.namePlaceholder': 'Nguyễn Văn A',
    'contact.email': 'Địa chỉ Email',
    'contact.emailPlaceholder': 'you@example.com',
    'contact.subject': 'Chủ đề trao đổi',
    'contact.subjectPlaceholder': 'Ví dụ: Hợp tác dự án E-commerce, Cơ hội việc làm...',
    'contact.message': 'Nội dung tin nhắn',
    'contact.messagePlaceholder': 'Mô tả chi tiết về dự án, yêu cầu kỹ thuật hoặc thông tin bạn muốn trao đổi...',
    'contact.submit': 'Gửi tin nhắn ngay',
    'contact.submitting': 'Đang gửi tin nhắn...',
    'contact.success': 'Tin nhắn của bạn đã được gửi thành công! Tôi sẽ phản hồi trong 24 giờ.',
    'contact.error': 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại hoặc gửi trực tiếp qua email.',
    'contact.directContact': 'Thông tin liên hệ trực tiếp',
    'contact.location': 'Địa điểm',
    'contact.workingHours': 'Giờ làm việc linh hoạt (UTC+7 / Remote Global)',
    'contact.scheduleCall': 'Đặt lịch hẹn trao đổi 30 phút qua Google Meet',

    // Resume
    'resume.title': 'Sơ yếu lý lịch chuyên môn',
    'resume.downloadPdf': 'In / Tải CV dạng PDF',
    'resume.backHome': 'Về trang chủ',
    'resume.objective': 'Mục tiêu nghề nghiệp',
    'resume.techStack': 'Kỹ năng công nghệ',
    'resume.education': 'Học vấn & Bằng cấp',
    'resume.certifications': 'Chứng chỉ quốc tế',

    // Footer
    'footer.tagline': 'Thiết kế & phát triển với tâm huyết của một Senior Full-Stack Engineer. Mã nguồn sạch, bảo mật và tốc độ cao.',
    'footer.quickLinks': 'Điều hướng nhanh',
    'footer.socials': 'Mạng xã hội & Cộng đồng',
    'footer.newsletterTitle': 'Đăng ký nhận bản tin công nghệ',
    'footer.newsletterDesc': 'Nhận thông báo khi có bài viết phân tích kiến trúc chuyên sâu mới nhất.',
    'footer.subscribe': 'Đăng ký',
    'footer.privacy': 'Chính sách bảo mật',
    'footer.terms': 'Điều khoản sử dụng',
    'footer.rights': 'Bản quyền thuộc về Trần Khánh Huy (Tran Khanh Huy). Bảo lưu mọi quyền.',
    'footer.backToTop': 'Lên đầu trang',
    'footer.downloadSource': 'Tải trọn bộ mã nguồn (.ZIP)',

    // Chatbot (Ask Huy AI)
    'chat.floatingBtn': 'Hỏi về Huy',
    'chat.floatingSubtitle': 'Gemini 3.8 Flash',
    'chat.title': 'Hỏi về Trần Khánh Huy',
    'chat.status': 'Trợ lý AI chính chủ • Sẵn sàng',
    'chat.poweredBy': 'Powered by Gemini 3.8 Flash',
    'chat.inputPlaceholder': 'Hỏi về kinh nghiệm, dự án, kỹ năng của Huy...',
    'chat.send': 'Gửi',
    'chat.clear': 'Xóa đoạn chat',
    'chat.cleared': 'Đã làm mới cuộc hội thoại',
    'chat.minimize': 'Thu nhỏ',
    'chat.close': 'Đóng (Esc)',
    'chat.copy': 'Sao chép',
    'chat.copied': 'Đã sao chép!',
    'chat.voiceInput': 'Nhập bằng giọng nói',
    'chat.listening': 'Đang lắng nghe giọng nói...',
    'chat.quickTopics': 'Chủ đề tìm hiểu nhanh:',
    'chat.topicProjects': '🚀 Dự án nổi bật',
    'chat.topicTechStack': '🛠️ Kỹ năng & Công nghệ',
    'chat.topicExperience': '💼 Kinh nghiệm 4+ năm',
    'chat.topicBooking': '📅 Đặt lịch trao đổi 30p',
    'chat.topicContact': '✉️ Cách thức liên hệ',
    'chat.speakResponse': 'Đọc to phản hồi',
    'chat.stopSpeaking': 'Dừng đọc',
    'chat.thinking': 'Huy AI đang suy nghĩ...',
    'chat.disclaimer': 'Trợ lý AI trả lời dựa trên hồ sơ năng lực & dự án thực tế của Trần Khánh Huy.',
    'chat.suggestionsTitle': 'Gợi ý câu hỏi:',
    'chat.suggestion1': 'Kinh nghiệm thực chiến 4+ năm của Huy?',
    'chat.suggestion2': 'Kể về các dự án tiêu biểu (NexusCloud, FinTrack)?',
    'chat.suggestion3': 'Tech stack & thế mạnh kỹ thuật chính?',
    'chat.suggestion4': 'Cách liên hệ & đặt lịch trao đổi với Huy?',
    'chat.welcome': 'Xin chào! Tôi là Trợ lý AI đại diện cho **Trần Khánh Huy** (Full-Stack Developer).\n\nBạn có thể hỏi tôi bất cứ điều gì về **kinh nghiệm**, **dự án**, **công nghệ**, hoặc **cách liên hệ hợp tác** với Huy. Tôi có thể giúp gì cho bạn hôm nay?',

    // Command palette
    'cmd.title': 'Tìm kiếm nhanh / Điều hướng',
    'cmd.placeholder': 'Gõ lệnh hoặc từ khoá tìm kiếm...',
    'cmd.navigation': 'Trang & Mục điều hướng',
    'cmd.projects': 'Dự án',
    'cmd.articles': 'Bài viết',
    'cmd.actions': 'Hành động nhanh',
    'cmd.toggleTheme': 'Đổi giao diện Sáng / Tối',
    'cmd.toggleLang': 'Chuyển đổi ngôn ngữ',
    'cmd.close': 'Đóng (Esc)',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume / CV',
    'nav.search': 'Search...',
    'nav.quickSearch': 'Quick Search',

    // Hero
    'hero.badge': 'Full-Stack Developer',
    'hero.greeting': 'Hi there, I am',
    'hero.name': 'Tran Khanh Huy',
    'hero.vietnameseName': '(Trần Khánh Huy)',
    'hero.tagline': 'Architecting high-throughput distributed systems & enterprise-grade web experiences with an obsession for sub-second performance.',
    'hero.ctaProjects': 'View Featured Work',
    'hero.ctaContact': 'Get in Touch',
    'hero.ctaResume': 'View Interactive CV',
    'hero.statusAvailable': 'Available for Senior Roles & Consulting',
    'hero.metricsExp': 'Years Experience',
    'hero.metricsProjects': 'Production Systems',
    'hero.metricsUptime': 'System Reliability',
    'hero.metricsThroughput': 'Daily Requests',

    // About Section
    'about.badge': 'Professional Journey',
    'about.title': 'Crafting Scalable Systems with Engineering Rigor',
    'about.desc1': 'With over 4 years of specialized software engineering experience, I architect resilient microservices, high-volume payment processing pipelines, and ultra-responsive web applications.',
    'about.desc2': 'My core engineering principles: Clean code, verifiable architecture, measurable business impact, and relentless empathy for end users.',
    'about.learnMore': 'Read full story & engineering philosophy',

    // Skills Section
    'skills.badge': 'Core Competencies',
    'skills.title': 'Technical Ecosystem & Battle-Tested Tooling',
    'skills.subtitle': 'Forged and refined across production platforms serving millions of active users daily.',
    'skills.all': 'All Skills',
    'skills.frontend': 'Frontend & UI Engineering',
    'skills.backend': 'Backend & Distributed Systems',
    'skills.cloud': 'Cloud & DevOps CI/CD',
    'skills.arch': 'Architecture & Leadership',
    'skills.proficiency': 'Proficiency Level',

    // Projects Section
    'projects.badge': 'Featured Engineering',
    'projects.title': 'Production Systems & Proven Case Studies',
    'projects.subtitle': 'Each project represents solved engineering challenges in latency, scale, and software elegance.',
    'projects.filterAll': 'All Projects',
    'projects.filterFullstack': 'Full-Stack',
    'projects.filterCloud': 'Cloud / Distributed',
    'projects.filterFrontend': 'Frontend / 3D',
    'projects.filterAi': 'AI & Tooling',
    'projects.viewCaseStudy': 'Read Case Study',
    'projects.liveDemo': 'Live Preview',
    'projects.sourceCode': 'GitHub Repo',
    'projects.allProjectsCta': 'Browse All Projects',
    'projects.searchPlaceholder': 'Search by tech stack, keywords...',
    'projects.noResults': 'No projects matched your search criteria.',

    // Experience Section
    'exp.badge': 'Career Milestones',
    'exp.title': 'Professional Track Record',
    'exp.subtitle': 'Proven history of scaling platforms from fast-growing startups to multinational tech enterprises.',

    // Testimonials
    'testimonials.badge': 'Endorsements',
    'testimonials.title': 'What Colleagues & Leaders Say',
    'testimonials.subtitle': 'Genuine feedback from Engineering Directors, Tech Leads, and CTOs I collaborated with.',

    // Blog
    'blog.badge': 'Engineering Insights',
    'blog.title': 'Articles, System Design & Architecture Notes',
    'blog.subtitle': 'Deep dives from real-world production incident triage, performance tuning, and distributed design.',
    'blog.readArticle': 'Read Article',
    'blog.readTime': 'min read',
    'blog.viewAll': 'View All Articles',
    'blog.backToList': 'Back to Articles',
    'blog.toc': 'Table of Contents',
    'blog.share': 'Share Article',
    'blog.copyLink': 'Copy Link',
    'blog.copied': 'Copied!',

    // Contact
    'contact.badge': 'Get in Touch',
    'contact.title': "Let's Build Something Impactful Together",
    'contact.subtitle': 'Always open to discussing technical architecture, complex product development, or senior engineering roles.',
    'contact.name': 'Your Full Name',
    'contact.namePlaceholder': 'John Doe',
    'contact.email': 'Email Address',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'e.g., Cloud Architecture Advisory / Project Inquiry',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Share details about your requirements, project scope, or ideas...',
    'contact.submit': 'Send Message',
    'contact.submitting': 'Sending Message...',
    'contact.success': 'Your message has been received! I will respond within 24 hours.',
    'contact.error': 'Failed to send message. Please try again or reach out directly via email.',
    'contact.directContact': 'Direct Contact Channels',
    'contact.location': 'Location',
    'contact.workingHours': 'Flexible Working Hours (UTC+7 / Remote Global)',
    'contact.scheduleCall': 'Schedule 30-min intro chat on Google Meet',

    // Resume
    'resume.title': 'Professional Curriculum Vitae',
    'resume.downloadPdf': 'Print / Download PDF',
    'resume.backHome': 'Return Home',
    'resume.objective': 'Career Objective',
    'resume.techStack': 'Technical Stack',
    'resume.education': 'Education & Degrees',
    'resume.certifications': 'Certifications & Honors',

    // Footer
    'footer.tagline': 'Designed & engineered with Senior Full-Stack craftsmanship. Clean architecture, high security, and sub-second load times.',
    'footer.quickLinks': 'Quick Navigation',
    'footer.socials': 'Social & Community',
    'footer.newsletterTitle': 'Engineering Newsletter',
    'footer.newsletterDesc': 'Receive deep-dive architectural analyses and performance engineering case studies.',
    'footer.subscribe': 'Subscribe',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved by Tran Khanh Huy.',
    'footer.backToTop': 'Back to Top',
    'footer.downloadSource': 'Download Full Source (.ZIP)',

    // Chatbot (Ask Huy AI)
    'chat.floatingBtn': 'Ask Huy AI',
    'chat.floatingSubtitle': 'Gemini 3.8 Flash',
    'chat.title': 'Ask about Tran Khanh Huy',
    'chat.status': 'Official AI Persona • Online',
    'chat.poweredBy': 'Powered by Gemini 3.8 Flash',
    'chat.inputPlaceholder': 'Ask about Huy\'s experience, projects, skills...',
    'chat.send': 'Send',
    'chat.clear': 'Clear chat',
    'chat.cleared': 'Conversation cleared',
    'chat.minimize': 'Minimize',
    'chat.close': 'Close (Esc)',
    'chat.copy': 'Copy',
    'chat.copied': 'Copied!',
    'chat.voiceInput': 'Voice input',
    'chat.listening': 'Listening to voice...',
    'chat.quickTopics': 'Quick explore topics:',
    'chat.topicProjects': '🚀 Key Projects',
    'chat.topicTechStack': '🛠️ Tech Stack & Skills',
    'chat.topicExperience': '💼 4+ Years Experience',
    'chat.topicBooking': '📅 Book 30-min Call',
    'chat.topicContact': '✉️ How to Contact',
    'chat.speakResponse': 'Read aloud',
    'chat.stopSpeaking': 'Stop reading',
    'chat.thinking': 'Huy AI is thinking...',
    'chat.disclaimer': 'AI Persona powered by official portfolio records & engineering case studies.',
    'chat.suggestionsTitle': 'Suggested prompts:',
    'chat.suggestion1': 'What is Huy\'s 4+ years experience?',
    'chat.suggestion2': 'Tell me about key projects (NexusCloud, FinTrack)?',
    'chat.suggestion3': 'What is Huy\'s primary tech stack?',
    'chat.suggestion4': 'How can I contact or schedule a call with Huy?',
    'chat.welcome': 'Hello! I am the official AI persona representing **Tran Khanh Huy** (Full-Stack Developer).\n\nFeel free to ask me anything about Huy\'s **background**, **featured projects**, **technical stack**, or **how to collaborate**. How can I help you today?',

    // Command palette
    'cmd.title': 'Command Palette / Quick Navigation',
    'cmd.placeholder': 'Type a command, project, or article...',
    'cmd.navigation': 'Navigation Pages',
    'cmd.projects': 'Projects',
    'cmd.articles': 'Technical Articles',
    'cmd.actions': 'Quick Actions',
    'cmd.toggleTheme': 'Toggle Dark / Light Theme',
    'cmd.toggleLang': 'Switch Language (VI / EN)',
    'cmd.close': 'Close (Esc)',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang') as Language;
      if (saved === 'vi' || saved === 'en') return saved;
      // Auto detect user browser preference
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang?.startsWith('vi')) return 'vi';
    }
    return 'vi'; // Default to Vietnamese per user prompt
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
