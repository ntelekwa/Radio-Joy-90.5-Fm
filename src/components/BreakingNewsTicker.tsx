import React from 'react';
import { AlertCircle, ChevronRight, Flame } from 'lucide-react';
import { Article } from '../types';

interface BreakingNewsTickerProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  article,
  onSelectArticle,
}) => {
  return (
    <div
      id="breaking-news-ticker"
      className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-2xl p-1 shadow-lg shadow-red-950/40 cursor-pointer group"
      onClick={() => onSelectArticle(article)}
    >
      <div className="bg-slate-950/90 rounded-[14px] px-3.5 py-2.5 flex items-center justify-between gap-3 group-hover:bg-slate-950/70 transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1 bg-red-600 text-white text-[11px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0 animate-pulse">
            <Flame className="w-3.5 h-3.5" />
            <span>HIVI PUNDE</span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
            {article.title}
          </p>
        </div>

        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold flex-shrink-0">
          <span className="hidden sm:inline">Soma Zaidi</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
