import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Trash2,
  Minimize2,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  Calendar,
  Mail,
  FolderGit2,
  FileText,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { useLanguage } from '../../context/LanguageContext';
import { ChatMessage } from '../../types';
import { personalInfo } from '../../data/portfolioData';

interface GeminiChatbotProps {
  onNavigate?: (path: string) => void;
  defaultOpen?: boolean;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTopics, setShowTopics] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('portfolio_chat_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        text: t('chat.welcome'),
        timestamp: Date.now(),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setHasVoiceSupport(true);
      }
    }
  }, []);

  // Keyboard shortcut: Close on ESC & custom open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        stopSpeaking();
        if (isListening && recognitionRef.current) {
          recognitionRef.current.stop();
        }
      }
    };
    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-gemini-chat', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-gemini-chat', handleCustomOpen);
    };
  }, [isOpen, isListening]);

  // Sync welcome message if language changes and only initial message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome-msg') {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'model',
          text: t('chat.welcome'),
          timestamp: Date.now(),
        },
      ]);
    }
  }, [language, t]);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('portfolio_chat_history', JSON.stringify(messages));
      } catch {
        // ignore
      }
    }
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      stopSpeaking();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isLoading]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  // Text-to-Speech (TTS)
  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
  };

  const speakMessage = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === id) {
      stopSpeaking();
      return;
    }

    stopSpeaking();
    // Strip markdown formatting for cleaner speech output
    const cleanText = text
      .replace(/[*#_`~\[\]\(\)]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text (STT) Voice Input
  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'vi' ? 'vi-VN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    stopSpeaking();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'user',
      text: query,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          language,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.reply) {
        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          role: 'model',
          text: data.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'model',
          text:
            language === 'vi'
              ? 'Rất tiếc đã có lỗi kết nối tạm thời. Bạn có thể gửi câu hỏi qua email hoặc thử lại.'
              : 'Apologies, a temporary connection hiccup occurred. Feel free to reach out via email or try again.',
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch {
      const fallbackMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text:
          language === 'vi'
            ? 'Không thể kết nối đến máy chủ. Vui lòng thử lại hoặc liên hệ trực tiếp qua khanhhuyy0912@gmail.com.'
            : 'Unable to reach the server. Please try again or email directly at khanhhuyy0912@gmail.com.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    stopSpeaking();
    const freshWelcome: ChatMessage = {
      id: 'welcome-msg',
      role: 'model',
      text: t('chat.welcome'),
      timestamp: Date.now(),
    };
    setMessages([freshWelcome]);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('portfolio_chat_history');
      } catch {
        // ignore
      }
    }
  };

  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const quickTopics = [
    {
      label: t('chat.topicProjects'),
      query:
        language === 'vi'
          ? 'Kể chi tiết về các dự án tiêu biểu như NexusCloud, FinTrack AI, ShopPulse của Huy?'
          : 'Tell me details about key projects like NexusCloud, FinTrack AI, ShopPulse by Huy?',
    },
    {
      label: t('chat.topicTechStack'),
      query:
        language === 'vi'
          ? 'Tech stack chuyên sâu & năng lực kỹ thuật chính của Huy là gì?'
          : 'What is Huy’s deep tech stack and primary engineering proficiencies?',
    },
    {
      label: t('chat.topicExperience'),
      query:
        language === 'vi'
          ? 'Huy có bao nhiêu năm kinh nghiệm và đã từng đảm nhiệm các vị trí nào?'
          : 'How many years of experience does Huy have and what roles has he held?',
    },
    {
      label: t('chat.topicBooking'),
      query:
        language === 'vi'
          ? 'Tôi muốn đặt lịch trao đổi công việc hoặc tư vấn kiến trúc với Huy thì làm thế nào?'
          : 'How can I schedule a 30-minute introductory call or architecture advisory with Huy?',
    },
    {
      label: t('chat.topicContact'),
      query:
        language === 'vi'
          ? 'Các kênh liên lạc trực tiếp, email và mạng xã hội của Huy?'
          : 'What are Huy’s direct contact channels, email, and professional social profiles?',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 sm:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="open-gemini-chat-btn"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              aria-label={t('chat.floatingBtn')}
              className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full ios-glass-card border border-white/40 dark:border-white/20 shadow-2xl text-zinc-900 dark:text-zinc-100 backdrop-blur-xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10 hover:shadow-indigo-500/20"
            >
              {/* Outer specular glow animation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity pointer-events-none" />

              {/* Avatar with pulse ring */}
              <div className="relative shrink-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full animate-pulse" />
              </div>

              {/* Text info */}
              <div className="text-left pr-1 hidden sm:block">
                <div className="text-xs sm:text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <span>{t('chat.floatingBtn')}</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-medium">
                  {t('chat.floatingSubtitle')}
                </div>
              </div>

              {/* Mobile icon */}
              <div className="block sm:hidden">
                <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating iOS Liquid Glass Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="gemini-chat-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 sm:w-[440px] h-[600px] sm:h-[640px] max-h-[88vh] flex flex-col rounded-3xl ios-glass-card ios-specular-top border border-white/40 dark:border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-4 py-3 sm:px-5 sm:py-3.5 border-b border-white/20 dark:border-white/10 flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50 shadow-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <span>{personalInfo.fullNameVi}</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                      AI Persona
                    </span>
                  </h3>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{t('chat.status')}</span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title={t('chat.clear')}
                  aria-label={t('chat.clear')}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title={t('chat.minimize')}
                  aria-label={t('chat.minimize')}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title={t('chat.close')}
                  aria-label={t('chat.close')}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Links Sub-bar */}
            <div className="px-4 py-2 bg-indigo-50/60 dark:bg-indigo-950/30 border-b border-indigo-100/60 dark:border-indigo-900/30 flex items-center justify-between text-[11px] text-indigo-700 dark:text-indigo-300 shrink-0 font-medium">
              <span className="flex items-center gap-1.5 font-mono text-[10px]">
                <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                {t('chat.poweredBy')}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    onNavigate?.('/projects');
                    setIsOpen(false);
                  }}
                  className="hover:underline flex items-center gap-1"
                >
                  <FolderGit2 className="w-3 h-3" />
                  <span>{language === 'vi' ? 'Dự án' : 'Projects'}</span>
                </button>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <button
                  onClick={() => {
                    onNavigate?.('/resume');
                    setIsOpen(false);
                  }}
                  className="hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>{language === 'vi' ? 'CV' : 'Resume'}</span>
                </button>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <button
                  onClick={() => {
                    onNavigate?.('/contact');
                    setIsOpen(false);
                  }}
                  className="hover:underline flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>{language === 'vi' ? 'Liên hệ' : 'Contact'}</span>
                </button>
              </div>
            </div>

            {/* Message Thread Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Model Avatar */}
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm group relative ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-600 to-sky-600 text-white rounded-tr-xs shadow-indigo-500/20'
                        : 'ios-glass-card border border-white/40 dark:border-white/10 text-zinc-800 dark:text-zinc-200 rounded-tl-xs backdrop-blur-xl'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="markdown-body space-y-2">
                        <Markdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 leading-relaxed text-zinc-800 dark:text-zinc-200">
                                {children}
                              </p>
                            ),
                            h3: ({ children }) => (
                              <h3 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 mt-2 mb-1">
                                {children}
                              </h3>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold text-indigo-950 dark:text-indigo-200">
                                {children}
                              </strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 space-y-1 my-1.5">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 space-y-1 my-1.5">{children}</ol>
                            ),
                            li: ({ children }) => <li className="leading-snug">{children}</li>,
                            hr: () => (
                              <hr className="my-2 border-zinc-200/60 dark:border-zinc-700/60" />
                            ),
                            a: ({ href, children }) => {
                              if (href?.startsWith('/')) {
                                return (
                                  <button
                                    onClick={() => {
                                      if (href) {
                                        onNavigate?.(href);
                                        setIsOpen(false);
                                      }
                                    }}
                                    className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center gap-0.5"
                                  >
                                    <span>{children}</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                );
                              }
                              return (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center gap-0.5"
                                >
                                  <span>{children}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              );
                            },
                            code: ({ children }) => (
                              <code className="px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800/80 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {msg.text}
                        </Markdown>

                        {/* Interactive Context Action Chips */}
                        {msg.role === 'model' && (
                          <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50 flex flex-wrap gap-1.5 mt-2">
                            {msg.text.includes('/projects') && (
                              <button
                                onClick={() => {
                                  onNavigate?.('/projects');
                                  setIsOpen(false);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20 transition-colors"
                              >
                                <FolderGit2 className="w-3 h-3" />
                                <span>{language === 'vi' ? 'Xem các dự án' : 'Explore Projects'}</span>
                              </button>
                            )}
                            {msg.text.includes('/resume') && (
                              <button
                                onClick={() => {
                                  onNavigate?.('/resume');
                                  setIsOpen(false);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                              >
                                <FileText className="w-3 h-3" />
                                <span>{language === 'vi' ? 'Xem CV chi tiết' : 'View Full Resume'}</span>
                              </button>
                            )}
                            {msg.text.includes('/contact') && (
                              <button
                                onClick={() => {
                                  onNavigate?.('/contact');
                                  setIsOpen(false);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500/20 transition-colors"
                              >
                                <Mail className="w-3 h-3" />
                                <span>{language === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}</span>
                              </button>
                            )}
                            {msg.text.includes('cal.com') && (
                              <a
                                href="https://cal.com/hoangtuphowall"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors"
                              >
                                <Calendar className="w-3 h-3" />
                                <span>{language === 'vi' ? 'Đặt lịch 30p' : 'Book 30-min Call'}</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom action row: Timestamp + Copy + TTS */}
                    <div
                      className={`text-[10px] mt-2 flex items-center justify-between font-mono ${
                        msg.role === 'user' ? 'text-indigo-100/70' : 'text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {msg.role === 'model' && (
                          <>
                            <button
                              onClick={() => handleCopyText(msg.id, msg.text)}
                              title={t('chat.copy')}
                              aria-label={t('chat.copy')}
                              className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-emerald-500 font-sans">{t('chat.copied')}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span className="font-sans hidden sm:inline">{t('chat.copy')}</span>
                                </>
                              )}
                            </button>

                            {typeof window !== 'undefined' && 'speechSynthesis' in window && (
                              <button
                                onClick={() => speakMessage(msg.id, msg.text)}
                                title={
                                  speakingMsgId === msg.id
                                    ? t('chat.stopSpeaking')
                                    : t('chat.speakResponse')
                                }
                                aria-label="Speech audio"
                                className={`transition-colors inline-flex items-center gap-1 ${
                                  speakingMsgId === msg.id
                                    ? 'text-indigo-600 dark:text-indigo-400 animate-pulse'
                                    : 'hover:text-indigo-600 dark:hover:text-indigo-300'
                                }`}
                              >
                                {speakingMsgId === msg.id ? (
                                  <>
                                    <VolumeX className="w-3 h-3 text-rose-500" />
                                    <span className="font-sans text-rose-500 hidden sm:inline">
                                      {t('chat.stopSpeaking')}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3 h-3" />
                                    <span className="font-sans hidden sm:inline">
                                      {t('chat.speakResponse')}
                                    </span>
                                  </>
                                )}
                              </button>
                            )}
                          </>
                        )}
                      </div>

                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* User Avatar */}
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shrink-0 shadow-sm mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="ios-glass-card border border-white/40 dark:border-white/10 rounded-2xl rounded-tl-xs p-3.5 shadow-sm text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    </div>
                    <span>{t('chat.thinking')}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Explore Topics (Collapsible, always available) */}
            <div className="border-t border-white/20 dark:border-white/10 bg-white/30 dark:bg-zinc-900/30 shrink-0">
              <div className="px-4 py-1.5 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold">{t('chat.quickTopics')}</span>
                <button
                  onClick={() => setShowTopics(!showTopics)}
                  className="p-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Toggle quick topics"
                >
                  {showTopics ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {showTopics && (
                <div className="px-4 pb-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
                  {quickTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(topic.query)}
                      disabled={isLoading}
                      className="text-left text-[11px] px-2.5 py-1 rounded-full ios-glass-pill text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-white/40 dark:border-white/10 transition-all shadow-xs whitespace-nowrap shrink-0 hover:border-indigo-500/40"
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Form with Voice & Keyboard support */}
            <div className="p-3 sm:p-4 border-t border-white/20 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md shrink-0">
              {isListening && (
                <div className="mb-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center justify-between animate-pulse">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    {t('chat.listening')}
                  </span>
                  <button
                    onClick={toggleVoiceInput}
                    className="text-[11px] underline hover:no-underline font-semibold"
                  >
                    Dừng
                  </button>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-end gap-2"
              >
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={t('chat.inputPlaceholder')}
                    disabled={isLoading}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-2xl ios-glass-pill text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none max-h-24 min-h-[42px] border border-white/40 dark:border-white/10 leading-relaxed"
                  />

                  {/* Speech-to-Text Microphone Button inside input */}
                  {hasVoiceSupport && (
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      title={t('chat.voiceInput')}
                      aria-label={t('chat.voiceInput')}
                      className={`absolute right-2.5 bottom-2.5 p-1 rounded-lg transition-colors ${
                        isListening
                          ? 'text-rose-500 bg-rose-500/20 animate-pulse'
                          : 'text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/20 transition-all shrink-0 flex items-center justify-center min-w-[42px] min-h-[42px]"
                  title={t('chat.send')}
                  aria-label={t('chat.send')}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Footnote disclaimer */}
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-2 px-1">
                <span>{t('chat.disclaimer')}</span>
                <span className="hidden sm:inline font-mono text-[9px] text-zinc-400/80">
                  Esc để đóng
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
