import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share2, Send } from 'lucide-react';
import { Article } from '../types';

interface ShareModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${article.title} - Radio Joy 90.5 FM`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: currentUrl,
        });
        onClose();
      } catch (err) {
        // user cancelled or failed
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#071d36] border border-blue-900/80 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Shiriki Habari Hii</h3>
          </div>
          <button
            id="share-modal-close-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#051528] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Summary preview */}
        <div className="bg-[#051528] p-3 rounded-xl border border-blue-900/60 flex items-center gap-3">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
              {article.title}
            </h4>
            <span className="text-[10px] text-yellow-400 font-semibold uppercase mt-1 inline-block">
              {article.category}
            </span>
          </div>
        </div>

        {/* Share Channels Grid */}
        <div className="grid grid-cols-4 gap-3 text-center">
          {/* WhatsApp */}
          <a
            id="share-whatsapp-btn"
            href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-slate-200">WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            id="share-facebook-btn"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-blue-950/60 border border-blue-800/60 hover:bg-blue-900/60 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform font-bold text-lg">
              f
            </div>
            <span className="text-xs font-semibold text-slate-200">Facebook</span>
          </a>

          {/* X / Twitter */}
          <a
            id="share-x-twitter-btn"
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=radiojoyfmtz`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#051528] border border-blue-900/60 hover:bg-blue-900/40 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-black border border-slate-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform font-black text-base">
              𝕏
            </div>
            <span className="text-xs font-semibold text-slate-200">X / Twitter</span>
          </a>

          {/* Telegram */}
          <a
            id="share-telegram-btn"
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-sky-950/60 border border-sky-800/60 hover:bg-sky-900/60 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-600/30 group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5 ml-0.5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Telegram</span>
          </a>
        </div>

        {/* Copy Link & Native Share */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 bg-[#051528] border border-blue-900/60 rounded-xl p-1.5 pl-3">
            <span className="text-xs text-blue-200/70 truncate flex-1 font-mono">
              {currentUrl}
            </span>
            <button
              id="copy-article-link-btn"
              onClick={handleCopyLink}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-blue-950'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Imenakiliwa!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Nakili Link</span>
                </>
              )}
            </button>
          </div>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              id="native-device-share-btn"
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl bg-[#051528] hover:bg-blue-900/40 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-blue-900/60"
            >
              <Share2 className="w-4 h-4 text-yellow-400" />
              <span>Chaguo Zaidi za Simu (Device Share)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
