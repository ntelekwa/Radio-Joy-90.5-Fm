import React, { useState } from 'react';
import {
  Newspaper,
  Search,
  Bookmark,
  Share2,
  ArrowUpDown,
  RefreshCw,
  Sliders,
  Globe,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Database,
  Layers,
} from 'lucide-react';
import { Article, CategoryId } from '../types';
import { CATEGORIES } from '../data/mockData';
import { useNews } from '../context/NewsContext';

interface NewsViewProps {
  onSelectArticle: (article: Article) => void;
  onOpenShare: (article: Article) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  bookmarkedIds: string[];
  onToggleBookmark: (articleId: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  onSelectArticle,
  onOpenShare,
  selectedCategory,
  setSelectedCategory,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const {
    articles,
    allArticles,
    pagination,
    sourceStatus,
    isLoading,
    isLoadingMore,
    isSyncing,
    syncToast,
    dismissSyncToast,
    syncWithWebsite,
    loadMore,
    setIsConfigModalOpen,
  } = useNews();

  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'views'>('newest');

  // Filter articles based on local criteria
  const currentList = selectedCategory === 'all' && !searchQuery ? articles : (articles.length > 0 ? articles : allArticles);

  const filteredArticles = currentList.filter((art) => {
    if (showOnlyBookmarked && !bookmarkedIds.includes(art.id)) {
      return false;
    }
    if (selectedCategory !== 'all' && art.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.tags?.some(t => t.toLowerCase().includes(q)) ||
        art.author?.name.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'views') {
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    }
    return 0; // default newest
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
              <Newspaper className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
              Habari & Makala (News & Insights)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
            Zinazovutwa kiotomatiki kutoka kwenye tovuti ya Radio Joy 90.5 FM (radiojoyfm.co.tz), waandishi mikoani na makao makuu Kigoma
          </p>
        </div>

        {/* Search Input Bar & Sort */}
        <div className="flex items-center gap-2 max-w-md w-full md:w-80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="news-search-input"
              type="text"
              placeholder="Tafuta habari au mada..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#071d36] border border-blue-900/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <button
            id="sort-toggle-btn"
            onClick={() => setSortBy(sortBy === 'newest' ? 'views' : 'newest')}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors flex-shrink-0 ${
              sortBy === 'views'
                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40'
                : 'bg-[#071d36] text-slate-300 border-blue-900/60 hover:text-white'
            }`}
            title={sortBy === 'views' ? 'Imepangwa kwa Wasomaji Wengi' : 'Imepangwa kwa Habari Mpya'}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">{sortBy === 'views' ? 'Maarufu' : 'Mpya'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Website Sync & Integration Bar */}
      <div className="bg-[#071d36]/90 border border-blue-900/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 flex items-center justify-center flex-shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                Chanzo cha Habari
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  {sourceStatus?.sourceType === 'editorial' ? 'Dawati la Habari (Editorial Desk)' : (sourceStatus?.sourceType || 'WordPress REST')}
                </span>
              </span>
              <span className="text-[11px] text-blue-200/70 flex items-center gap-1">
                • {sourceStatus?.sourceType === 'editorial' ? 'Makala Zilizothibitishwa (0ms)' : (sourceStatus?.isCached ? 'Imepakiwa toka Akiba (Cache)' : 'Imesawazishwa Moja kwa Moja')}
                {sourceStatus?.lastSyncedAt && ` (${sourceStatus.lastSyncedAt})`}
              </span>
            </div>
            <p className="text-[11px] text-blue-200/60 mt-0.5 truncate max-w-sm sm:max-w-md">
              {sourceStatus?.sourceType === 'editorial' ? 'Chumba cha Habari cha Ndani cha Radio Joy 90.5 FM' : (sourceStatus?.sourceUrl || 'https://radiojoyfm.co.tz')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            id="news-sync-website-btn"
            onClick={() => syncWithWebsite()}
            disabled={isSyncing}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-yellow-400/10 disabled:opacity-50 cursor-pointer"
            title="Sawazisha habari mpya kutoka kwenye tovuti yako sasa"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Inasawazisha...' : 'Sawazisha na Tovuti'}</span>
          </button>

          <button
            id="news-configure-website-btn"
            onClick={() => setIsConfigModalOpen(true)}
            className="px-3 py-2 bg-[#051528] hover:bg-blue-900/50 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-900/60"
            title="Mipangilio ya kuunganisha tovuti yako ya habari (WordPress, RSS, JSON API)"
          >
            <Sliders className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden sm:inline">Mipangilio</span>
          </button>
        </div>
      </div>

      {/* Sync Toast alert */}
      {syncToast && (
        <div className="p-3.5 rounded-xl bg-[#071d36] border border-yellow-400/40 text-xs text-yellow-300 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{syncToast}</span>
          </div>
          <button
            onClick={dismissSyncToast}
            className="text-slate-400 hover:text-white font-bold text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Category Pills & Bookmarked Toggle */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          id="news-cat-all"
          onClick={() => {
            setSelectedCategory('all');
            setShowOnlyBookmarked(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex-shrink-0 ${
            selectedCategory === 'all' && !showOnlyBookmarked
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#0b2442] text-slate-300 hover:bg-[#0f3258] border border-blue-900/60'
          }`}
        >
          Habari Zote
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            id={`news-cat-${cat.id}`}
            onClick={() => {
              setSelectedCategory(cat.id);
              setShowOnlyBookmarked(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex-shrink-0 flex items-center gap-1.5 ${
              selectedCategory === cat.id && !showOnlyBookmarked
                ? 'bg-yellow-400 text-blue-950 shadow-md'
                : 'bg-[#0b2442] text-slate-300 hover:bg-[#0f3258] border border-blue-900/60'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.color}`} />
            <span>{cat.nameSwahili}</span>
          </button>
        ))}

        {/* Bookmarks Tab Button */}
        <button
          id="news-saved-filter-btn"
          onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex-shrink-0 flex items-center gap-1.5 ${
            showOnlyBookmarked
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#0b2442] text-slate-300 hover:bg-[#0f3258] border border-blue-900/60'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Zilizohifadhiwa ({bookmarkedIds.length})</span>
        </button>
      </div>

      {/* Loading Skeleton if initial loading */}
      {isLoading && filteredArticles.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-4 space-y-4 animate-pulse">
              <div className="w-full aspect-[16/10] bg-slate-800 rounded-2xl" />
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800 rounded w-full" />
              <div className="h-3 bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state if no results */}
      {!isLoading && filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-[#071d36]/50 border border-blue-900/60 rounded-3xl p-8 space-y-3">
          <Newspaper className="w-12 h-12 text-blue-400/50 mx-auto" />
          <h3 className="text-base font-bold text-white">Hakuna Habari Zilizopatikana</h3>
          <p className="text-xs text-blue-200/70 max-w-sm mx-auto">
            Hakuna taarifa zinazolingana na utafutaji wako au kitengo hiki kwa sasa.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setShowOnlyBookmarked(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-yellow-400 text-blue-950 font-bold text-xs rounded-xl"
            >
              Onyesha Habari Zote
            </button>
            <button
              onClick={() => syncWithWebsite()}
              className="px-4 py-2 bg-[#051528] hover:bg-blue-900/50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 border border-blue-900/60"
            >
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              Sawazisha na Tovuti
            </button>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isBookmarked = bookmarkedIds.includes(article.id);
          const cat = CATEGORIES.find(c => c.id === article.category);

          return (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-[#071d36] border border-blue-900/60 hover:border-yellow-400/50 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-yellow-400/5"
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10] bg-[#051528]">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071d36] via-transparent to-transparent opacity-70" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${cat?.accentBg || 'bg-yellow-400 text-blue-950'}`}>
                      {cat?.nameSwahili || article.category}
                    </span>
                    {article.isBreaking && (
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                        Breaking
                      </span>
                    )}
                    {article.sourceType && article.sourceType !== 'editorial' && (
                      <span className="bg-[#051528]/90 text-yellow-400 border border-yellow-400/30 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full">
                        {article.sourceType}
                      </span>
                    )}
                  </div>

                  {/* Bookmark quick button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                      isBookmarked
                        ? 'bg-yellow-400 text-blue-950'
                        : 'bg-black/60 text-white hover:bg-black/90'
                    }`}
                    title={isBookmarked ? 'Ondoa' : 'Hifadhi'}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs text-blue-200/70">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'}
                    alt={article.author?.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="truncate max-w-[110px] font-medium text-slate-200">{article.author?.name}</span>
                  <span>•</span>
                  <span>{article.publishedAt?.split('•')[0]}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenShare(article);
                    }}
                    className="p-1.5 rounded-lg text-blue-200/70 hover:text-yellow-400 hover:bg-blue-900/40 transition-colors"
                    title="Shiriki Habari"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination / Infinite Scroll & Load More Controls */}
      {selectedCategory === 'all' && !searchQuery && !showOnlyBookmarked && pagination.total > 0 && (
        <div className="pt-6 border-t border-blue-900/60 flex flex-col items-center justify-center gap-3">
          <div className="text-xs text-blue-200/70 font-medium">
            Inaonyesha <strong className="text-white">{filteredArticles.length}</strong> kati ya <strong className="text-white">{pagination.total}</strong> habari kwenye mfumo
          </div>

          {pagination.hasMore ? (
            <button
              id="news-load-more-btn"
              onClick={() => loadMore()}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-[#071d36] hover:bg-[#0f3258] text-white border border-blue-900/80 hover:border-yellow-400/50 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isLoadingMore ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
                  <span>Inapakia habari za ziada...</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 text-yellow-400" />
                  <span>Pakia Habari Zaidi (Load More News)</span>
                </>
              )}
            </button>
          ) : (
            <div className="text-xs text-blue-300/70 font-medium italic flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Umesoma habari zote zilizopo kwa sasa.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
