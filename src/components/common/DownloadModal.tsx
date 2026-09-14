import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  FileArchive,
  Check,
  Copy,
  Terminal,
  Settings,
  ShieldCheck,
  Loader2,
  AlertCircle,
  FolderDown,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setIsInIframe(window.self !== window.top);
      } catch {
        setIsInIframe(true);
      }
    }
  }, []);

  // Keyboard shortcut: Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const originUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const downloadUrl = `${originUrl}/tran_khanh_huy_portfolio_full_source.zip`;
  const curlCommand = `curl -L -O "${downloadUrl}"`;

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      // fallback
    }
  };

  // Direct Blob Download in Browser Memory
  const handleBlobDownload = async () => {
    setDownloadStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/download-source', {
        headers: {
          Accept: 'application/zip',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = 'tran_khanh_huy_portfolio_full_source.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (err: any) {
      console.warn('Blob download attempt:', err);
      // Try base64 fallback
      try {
        const base64Res = await fetch('/api/download-source/base64');
        const data = await base64Res.json();
        if (data && data.base64) {
          const byteCharacters = atob(data.base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const base64Blob = new Blob([byteArray], { type: 'application/zip' });
          const blobUrl = window.URL.createObjectURL(base64Blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = 'tran_khanh_huy_portfolio_full_source.zip';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
          setDownloadStatus('success');
          setTimeout(() => setDownloadStatus('idle'), 3000);
          return;
        }
      } catch (fallbackErr) {
        console.error('Base64 fallback failed:', fallbackErr);
      }

      setDownloadStatus('error');
      setErrorMessage(
        language === 'vi'
          ? 'Trình duyệt đang chặn tải file từ bên trong iFrame. Vui lòng sử dụng Cách 1 (Mở tab mới) hoặc Cách 3 (Export từ menu Settings).'
          : 'Browser sandbox prevented direct iframe download. Please use Option 1 (New Tab) or Option 3 (AI Studio Settings Export).'
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl ios-glass-card border border-white/40 dark:border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 z-10 my-auto"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FileArchive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                    <span>{language === 'vi' ? 'Tải Trọn Bộ Mã Nguồn' : 'Download Full Source Package'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold">
                      .ZIP (154 KB)
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {language === 'vi'
                      ? 'Toàn bộ mã nguồn React 19 + TypeScript + Express + Gemini 3.8'
                      : 'Complete full-stack React 19 + TypeScript + Express + Gemini 3.8'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Iframe Notice */}
              {isInIframe && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3 leading-relaxed">
                  <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5">
                      {language === 'vi' ? 'Lưu ý về bảo mật trình duyệt:' : 'Browser security notice:'}
                    </p>
                    <p className="text-amber-700/90 dark:text-amber-300/90">
                      {language === 'vi'
                        ? 'Khi xem ứng dụng trong cửa sổ Preview iFrame của Google AI Studio, trình duyệt bảo mật (Chrome/Edge/Safari) có thể chặn tải file tự động. Bạn nên sử dụng Cách 1 (Mở trong tab mới) hoặc Cách 3 (Export từ menu Settings).'
                        : 'Browsers block automated file downloads inside sandboxed iframes. Please use Method 1 (Open in new tab) or Method 3 (AI Studio Settings menu).'}
                    </p>
                  </div>
                </div>
              )}

              {/* Method 1: Open in New Tab (Recommended) */}
              <div className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {language === 'vi'
                          ? 'Mở liên kết tải trong Tab mới (Khuyên dùng - 100% Thành công)'
                          : 'Open Direct Download in New Tab (Recommended - 100% Reliable)'}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 pl-7 leading-relaxed">
                      {language === 'vi'
                        ? 'Mở link tải ngoài phạm vi iFrame sandbox để trình duyệt kích hoạt tiến trình download file .zip ngay lập tức.'
                        : 'Bypasses iframe sandbox restrictions by opening the direct file URL in a dedicated browser tab.'}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pl-7">
                  <a
                    id="modal-direct-tab-download-link"
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Mở tab mới để tải ngay (.ZIP)' : 'Open New Tab to Download (.ZIP)'}</span>
                  </a>
                </div>
              </div>

              {/* Method 2: In-browser Blob Stream Download */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {language === 'vi' ? 'Tải trực tiếp từ bộ nhớ trình duyệt (Blob Stream)' : 'In-Browser Memory Download (Blob Stream)'}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 pl-7">
                      {language === 'vi'
                        ? 'Gọi API backend, chuyển đổi nhị phân thành Blob và lưu file về máy.'
                        : 'Fetches raw binary stream from backend API and triggers local browser file saver.'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pl-7 flex items-center gap-3">
                  <button
                    onClick={handleBlobDownload}
                    disabled={downloadStatus === 'loading'}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs transition-colors disabled:opacity-50"
                  >
                    {downloadStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                        <span>{language === 'vi' ? 'Đang nén dữ liệu...' : 'Streaming binary...'}</span>
                      </>
                    ) : downloadStatus === 'success' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>{language === 'vi' ? 'Đã kích hoạt tải!' : 'Download triggered!'}</span>
                      </>
                    ) : (
                      <>
                        <FolderDown className="w-4 h-4" />
                        <span>{language === 'vi' ? 'Tải ngay (Blob)' : 'Download Now (Blob)'}</span>
                      </>
                    )}
                  </button>
                  {downloadStatus === 'success' && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {language === 'vi' ? 'Kiểm tra thư mục Downloads của bạn' : 'Check your Downloads folder'}
                    </span>
                  )}
                </div>

                {downloadStatus === 'error' && (
                  <div className="mt-2.5 pl-7 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Method 3: Native Google AI Studio Export */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <span>{language === 'vi' ? 'Tính năng xuất có sẵn của Google AI Studio' : 'Official Google AI Studio Export'}</span>
                    <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  </h4>
                </div>
                <div className="mt-2 pl-7 text-xs text-zinc-600 dark:text-zinc-400 space-y-1 leading-relaxed">
                  <p>
                    {language === 'vi'
                      ? 'Bạn có thể xuất trọn bộ dự án bất kỳ lúc nào trực tiếp từ giao diện AI Studio:'
                      : 'You can export the whole codebase at any moment via the AI Studio interface:'}
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-1 font-medium text-zinc-800 dark:text-zinc-300">
                    <li>
                      {language === 'vi'
                        ? 'Nhìn lên góc trên bên phải màn hình Google AI Studio.'
                        : 'Look at the top-right toolbar of Google AI Studio.'}
                    </li>
                    <li>
                      {language === 'vi'
                        ? 'Bấm vào biểu tượng Cài đặt ⚙️ (Settings) hoặc menu Tùy chọn (...).'
                        : 'Click the Settings ⚙️ icon or Options (...) menu.'}
                    </li>
                    <li>
                      {language === 'vi'
                        ? 'Chọn "Export to ZIP" (hoặc "Export to GitHub") để tải toàn bộ source code.'
                        : 'Select "Export to ZIP" (or "Export to GitHub") to download the entire codebase.'}
                    </li>
                  </ol>
                </div>
              </div>

              {/* Method 4: Terminal Command (cURL) */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{language === 'vi' ? 'Tải bằng dòng lệnh Terminal (cURL / Wget)' : 'Terminal Command (cURL / Wget)'}</span>
                  </h4>
                </div>
                <div className="pl-7">
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs border border-zinc-800">
                    <span className="truncate selection:bg-indigo-500 selection:text-white">
                      {curlCommand}
                    </span>
                    <button
                      onClick={handleCopyCommand}
                      className="shrink-0 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-mono text-[11px]">
                {language === 'vi' ? '45 files • ~154 KB • Đầy đủ docs & server' : '45 files • ~154 KB • Full docs & server'}
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
