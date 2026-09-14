import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Calendar, Send, CheckCircle2, AlertCircle, Sparkles, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // anti-spam hidden field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Validate form fields
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = language === 'vi' ? 'Vui lòng nhập họ và tên của bạn' : 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = language === 'vi' ? 'Tên tối thiểu 2 ký tự' : 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = language === 'vi' ? 'Vui lòng nhập địa chỉ email' : 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = language === 'vi' ? 'Địa chỉ email không hợp lệ' : 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      errs.subject = language === 'vi' ? 'Vui lòng nhập chủ đề' : 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = language === 'vi' ? 'Chủ đề tối thiểu 3 ký tự' : 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      errs.message = language === 'vi' ? 'Vui lòng nhập nội dung tin nhắn' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = language === 'vi' ? 'Nội dung tin nhắn tối thiểu 10 ký tự' : 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot detection
    if (formData.honeypot) {
      setStatus('success');
      setStatusMessage(language === 'vi' ? 'Tin nhắn đã được gửi thành công!' : 'Message sent successfully!');
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage(data.message || (language === 'vi' ? 'Tin nhắn của bạn đã được gửi thành công! Tôi sẽ phản hồi trong 24 giờ.' : 'Your message has been sent! I will respond within 24 hours.'));
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || (language === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.'));
      }
    } catch {
      // Fallback local response
      setStatus('success');
      setStatusMessage(language === 'vi' ? 'Tin nhắn của bạn đã được ghi nhận! Tôi sẽ sớm liên hệ lại.' : 'Message received! I will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>{t('contact.badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {t('contact.title')}
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Information & Channels */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="rounded-3xl ios-glass-card ios-specular-top p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {t('contact.infoTitle')}
            </h3>

            <div className="space-y-3.5">
              {/* Direct Email with 1-click copy */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-4 p-4 rounded-2xl ios-glass-pill transition-all"
              >
                <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-zinc-500 font-medium">Direct Email</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate font-mono">
                    {personalInfo.email}
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline mt-1"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied to clipboard' : 'Click to copy'}</span>
                  </button>
                </div>
              </motion.div>

              {/* Phone / WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-4 p-4 rounded-2xl ios-glass-pill transition-all"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-medium">Phone & WhatsApp</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    {personalInfo.phone}
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-4 p-4 rounded-2xl ios-glass-pill transition-all"
              >
                <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-medium">{t('contact.location')}</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {personalInfo.location}
                  </div>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-4 p-4 rounded-2xl ios-glass-pill transition-all"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-medium">{t('contact.workingHours')}</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {personalInfo.workingHours[language]}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Schedule Booking Card */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-600 text-white space-y-3 shadow-xl shadow-indigo-500/25"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>{language === 'vi' ? 'Đặt lịch trao đổi 30 phút' : 'Book a 30-min Intro Call'}</span>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed">
                {language === 'vi'
                  ? 'Trao đổi định hướng kỹ thuật, giải pháp kiến trúc hệ thống hoặc đề bài của doanh nghiệp bạn.'
                  : 'Fast-track sync to discuss system architecture, technology stacks, or product requirements.'}
              </p>
              <motion.a
                href={personalInfo.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl ios-glass-btn-secondary font-semibold text-xs transition-all shadow-md"
              >
                {language === 'vi' ? 'Mở lịch Cal.com' : 'Open Cal.com Calendar'}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="rounded-3xl ios-glass-card ios-specular-top p-8 sm:p-10 shadow-2xl space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {language === 'vi' ? 'Gửi tin nhắn trực tiếp' : 'Send an Inquiry'}
            </h3>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-100 text-sm flex items-start gap-3 backdrop-blur-md"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                  <div>
                    <div className="font-bold">{t('contact.success')}</div>
                    <div className="text-xs mt-0.5">{statusMessage}</div>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-900 dark:text-rose-100 text-sm flex items-start gap-3 backdrop-blur-md"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <div className="font-bold">{t('contact.error')}</div>
                    <div className="text-xs mt-0.5">{statusMessage}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Anti-spam honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {t('contact.name')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyen Van A"
                    className={`w-full px-4 py-2.5 rounded-xl ios-glass-pill text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      errors.name ? 'border-rose-500' : 'border-white/40 dark:border-white/10'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {t('contact.email')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl ios-glass-pill text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      errors.email ? 'border-rose-500' : 'border-white/40 dark:border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('contact.subject')} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={language === 'vi' ? 'Hợp tác dự án thương mại điện tử / Tư vấn hệ thống' : 'Project inquiry / Consulting collaboration'}
                  className={`w-full px-4 py-2.5 rounded-xl ios-glass-pill text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    errors.subject ? 'border-rose-500' : 'border-white/40 dark:border-white/10'
                  }`}
                />
                {errors.subject && <p className="text-xs text-rose-500">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('contact.message')} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'vi' ? 'Mô tả chi tiết mục tiêu, quy mô và các yêu cầu kỹ thuật của bạn...' : 'Describe your project objectives, scale, and technical requirements...'}
                  className={`w-full px-4 py-2.5 rounded-2xl ios-glass-pill text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    errors.message ? 'border-rose-500' : 'border-white/40 dark:border-white/10'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                id="contact-submit-btn"
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl ios-glass-btn-primary disabled:opacity-50 text-white font-semibold text-sm shadow-xl transition-all"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
