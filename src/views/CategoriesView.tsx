import React, { useState } from 'react';
import { Grid, ChevronRight, Newspaper, ArrowRight } from 'lucide-react';
import { Category, CategoryId, Article } from '../types';
import { CATEGORIES } from '../data/mockData';
import { useNews } from '../context/NewsContext';

interface CategoriesViewProps {
  onSelectArticle: (article: Article) => void;
  onOpenCategory: (catId: CategoryId) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectArticle,
  onOpenCategory,
}) => {
  const { allArticles, articles } = useNews();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('kitaifa');

  const pool = allArticles.length > 0 ? allArticles : articles;
  const currentCat = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  const categoryArticles = pool.filter(a => a.category === activeCategory);

  // Dynamic count map
  const categoryCounts: Record<string, number> = {};
  pool.forEach(a => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-blue-900/60 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
            <Grid className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
            Vitengo vya Habari (News Categories)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
          Chagua kitengo unachotaka kusoma habari za kina na uchambuzi maalum
        </p>
      </div>

      {/* Visual Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-28 group ${
                isActive
                  ? 'bg-[#071d36] border-yellow-400 ring-2 ring-yellow-400/30 shadow-lg shadow-yellow-400/10'
                  : 'bg-[#071d36]/60 border-blue-900/60 hover:border-blue-700 hover:bg-[#071d36]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`} />
                <span className="text-[11px] font-mono text-slate-300 font-bold bg-[#051528] px-2 py-0.5 rounded-full">
                  {categoryCounts[cat.id] !== undefined ? categoryCounts[cat.id] : cat.count}
                </span>
              </div>
              <div>
                <h3 className={`font-bold text-sm leading-tight transition-colors ${
                  isActive ? 'text-yellow-400' : 'text-white group-hover:text-yellow-300'
                }`}>
                  {cat.nameSwahili}
                </h3>
                <span className="text-[10px] text-slate-400">{cat.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Spotlight & Articles */}
      <div className="space-y-6">
        <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentCat.color}`} />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Habari za {currentCat.nameSwahili}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentCat.description}
            </p>
          </div>

          <button
            onClick={() => onOpenCategory(currentCat.id)}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-md flex-shrink-0"
          >
            <span>Fungua Kwenye Sehemu ya Habari</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Articles under this category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-[#071d36] border border-blue-900/60 hover:border-yellow-400/40 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10] bg-[#051528]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071d36] via-transparent to-transparent opacity-70" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-yellow-400/30">
                    {article.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-blue-900/60 flex items-center justify-between text-xs text-blue-200/70">
                <span>{article.author.name}</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Soma <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
