import React, { useState } from 'react';
import { X, Share2, Bookmark, BookmarkCheck, Clock, Calendar, Volume2, VolumeX, Eye, ArrowLeft, ThumbsUp, MessageSquare, Play, Pause, ExternalLink, Globe } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES, CATEGORIES } from '../data/mockData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenShare: (article: Article) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  onOpenShare,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudioReport, setIsPlayingAudioReport] = useState(false);
  const [audioProgress, setAudioProgress] = useState(30);

  if (!article) return null;

  const isBookmarked = bookmarkedIds.includes(article.id);
  const categoryInfo = CATEGORIES.find(c => c.id === article.category);

  // Related articles from same category
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="min-h-screen flex flex-col justify-between max-w-4xl mx-auto px-4 py-4 sm:py-6">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#051528]/95 backdrop-blur-md py-3 border-b border-blue-900/60 flex items-center justify-between gap-4">
          <button
            id="article-modal-back-btn"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-yellow-400 bg-[#071d36] hover:bg-blue-900/50 px-3 py-2 rounded-xl transition-colors border border-blue-900/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Rudi kwenye Habari</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Font size adjustments */}
            <div className="flex items-center bg-[#071d36] p-1 rounded-xl border border-blue-900/60 text-xs font-bold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'normal' ? 'bg-yellow-400 text-blue-950' : 'text-slate-400'}`}
                title="Ukubwa wa Kawaida"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-lg text-sm ${fontSize === 'large' ? 'bg-yellow-400 text-blue-950' : 'text-slate-400'}`}
                title="Ukubwa Kubwa"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded-lg text-base ${fontSize === 'xlarge' ? 'bg-yellow-400 text-blue-950' : 'text-slate-400'}`}
                title="Ukubwa Mkubwa Zaidi"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              id="article-bookmark-toggle-btn"
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40'
                  : 'bg-[#071d36] text-slate-400 border-blue-900/60 hover:text-white'
              }`}
              title={isBookmarked ? 'Ondoa kwenye Habari Ulizohifadhi' : 'Hifadhi Habari Hii'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-yellow-400" /> : <Bookmark className="w-5 h-5" />}
            </button>

            {/* Share button */}
            <button
              id="article-modal-share-btn"
              onClick={() => onOpenShare(article)}
              className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Shiriki</span>
            </button>

            {/* Close */}
            <button
              id="article-modal-close-icon-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#071d36] text-slate-400 hover:text-white transition-colors border border-blue-900/60"
              aria-label="Funga Habari"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <article className="py-6 space-y-6 max-w-3xl mx-auto w-full">
          {/* Category & Timestamp */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${categoryInfo?.accentBg || 'bg-amber-500/10 text-amber-400'}`}>
              {categoryInfo?.nameSwahili || article.category}
            </span>

            {article.isBreaking && (
              <span className="bg-red-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full animate-pulse">
                BREAKING NEWS
              </span>
            )}

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedAt}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTimeMinutes} dakika za kusoma</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight font-['Cabinet_Grotesk']">
            {article.title}
          </h1>

          {/* Author info & Read time */}
          <div className="flex items-center justify-between border-y border-blue-900/60 py-3">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-blue-800"
              />
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {article.author.name}
                </h4>
                <p className="text-xs text-blue-200/70">
                  {article.author.role} • Radio Joy 90.5 FM Desk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-200/70">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>{article.viewsCount.toLocaleString()} Wasomaji</span>
            </div>
          </div>

          {/* Hero Image */}
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-2xl border border-blue-900/60 bg-[#051528]">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto max-h-[460px] object-cover"
              />
            </div>
            {article.caption && (
              <figcaption className="text-xs text-slate-400 italic px-1">
                {article.caption}
              </figcaption>
            )}
          </figure>

          {/* Audio Report Player (Listen to news clip broadcast) */}
          {article.hasAudioReport && (
            <div className="bg-gradient-to-r from-[#071d36] via-[#051528] to-[#071d36] border border-yellow-400/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudioReport(!isPlayingAudioReport)}
                  className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-300 text-blue-950 flex items-center justify-center font-bold shadow-md flex-shrink-0 transition-transform hover:scale-105"
                  title={isPlayingAudioReport ? 'Sitisha Ripoti' : 'Sikiliza Ripoti ya Sauti'}
                >
                  {isPlayingAudioReport ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                      Ripoti ya Sauti ya Redio ({article.audioDuration})
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Sikiliza ufafanuzi wa taarifa hii kutoka studio
                  </h4>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>01:12</span>
                <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                    style={{ width: isPlayingAudioReport ? '65%' : '20%' }}
                  />
                </div>
                <span>{article.audioDuration}</span>
              </div>
            </div>
          )}

          {/* Summary Quote */}
          <div className="border-l-4 border-yellow-400 pl-4 py-1 text-base sm:text-lg font-medium text-yellow-200/90 italic bg-yellow-400/5 rounded-r-xl">
            "{article.summary}"
          </div>

          {/* Article Paragraphs */}
          <div className={`space-y-4 text-slate-200 font-normal ${getFontSizeClass()}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-blue-900/60">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Vpindi vya radio:
            </h5>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#071d36] hover:bg-[#0c2a4d] border border-blue-900/60 text-slate-300 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Original Website Source & Link */}
          {article.originalUrl && (
            <div className="bg-[#071d36]/90 border border-blue-900/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-bold block">
                    Chanzo: Tovuti Rasmi ya Habari
                  </span>
                  <span className="text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md block">
                    {article.originalUrl}
                  </span>
                </div>
              </div>

              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#051528] hover:bg-blue-900/40 text-yellow-300 hover:text-yellow-200 rounded-xl font-bold transition-colors border border-blue-900/60 whitespace-nowrap"
              >
                <span>Fungua Kwenye Tovuti</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Share Article Bottom Banner */}
          <div className="bg-[#071d36] border border-blue-900/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Umeipenda habari hii?</h4>
              <p className="text-xs text-blue-200/70">
                Wajulishe marafiki na jamaa zako kupitia mitandao ya kijamii.
              </p>
            </div>
            <button
              id="article-bottom-share-btn"
              onClick={() => onOpenShare(article)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 font-bold px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              <Share2 className="w-4 h-4" />
              <span>Shiriki Kwenye WhatsApp & Mitandao</span>
            </button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-blue-900/60 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Habari Nyingine za {categoryInfo?.nameSwahili}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#071d36] border border-blue-900/60 hover:border-yellow-400/40 rounded-2xl p-3 cursor-pointer group transition-all"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-32 object-cover rounded-xl mb-2.5 group-hover:scale-102 transition-transform"
                    />
                    <span className="text-[10px] font-bold text-yellow-400 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 mt-1 group-hover:text-yellow-300 transition-colors">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      {rel.publishedAt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
