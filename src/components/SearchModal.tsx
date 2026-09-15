import React, { useState } from 'react';
import { X, Search, Calendar, ChevronRight, Tag } from 'lucide-react';
import { Article } from '../types';
import { useNews } from '../context/NewsContext';

interface SearchModalProps {
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectArticle }) => {
  const { allArticles, articles } = useNews();
  const [searchTerm, setSearchTerm] = useState('');

  const pool = allArticles.length > 0 ? allArticles : articles;

  const filtered = searchTerm.trim()
    ? pool.filter(a => {
        const query = searchTerm.toLowerCase();
        return (
          a.title.toLowerCase().includes(query) ||
          a.summary.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          a.tags?.some(t => t.toLowerCase().includes(query)) ||
          a.author?.name.toLowerCase().includes(query)
        );
      })
    : [];

  const popularTags = ['Radio Joy Kigoma', 'Habari za Kitaifa', 'Bunge', 'Kigoma', 'Ligi Kuu NBC', 'Burudani'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 shadow-2xl space-y-4">
        {/* Search input bar */}
        <div className="flex items-center gap-3 bg-[#051528] border border-blue-900/60 rounded-2xl px-4 py-3 focus-within:border-yellow-400 transition-colors">
          <Search className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <input
            id="site-search-input"
            type="text"
            placeholder="Tafuta habari, mada, au vipindi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-blue-300/40 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-white text-xs font-semibold p-1"
            >
              Futa
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-blue-200/70 font-medium">Maarufu:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-lg bg-[#051528] hover:bg-blue-900/40 border border-blue-900/60 text-slate-300 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
          {searchTerm.trim() && filtered.length === 0 && (
            <div className="text-center py-8 text-blue-200/60 text-xs">
              Hakuna habari iliyopatikana kwa utafutaji wa "{searchTerm}".
            </div>
          )}

          {filtered.map((article) => (
            <div
              key={article.id}
              onClick={() => {
                onSelectArticle(article);
                onClose();
              }}
              className="p-3 rounded-2xl bg-[#051528] hover:bg-[#0c2a4d] border border-blue-900/60 cursor-pointer flex items-center justify-between gap-3 group transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-yellow-400 font-bold uppercase">
                    {article.category}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-yellow-300 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">{article.publishedAt}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
