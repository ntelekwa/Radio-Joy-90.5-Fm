import React from 'react';
import { Sparkles, TrendingUp, Calendar, ChevronRight, Share2, ArrowRight, Radio, Volume2, MessageSquare, Flame, RefreshCw, Globe } from 'lucide-react';
import { Article, CategoryId, ActiveTab } from '../types';
import { CATEGORIES, PROGRAMS, STATION_INFO } from '../data/mockData';
import { LiveRadioHero } from '../components/LiveRadioHero';
import { BreakingNewsTicker } from '../components/BreakingNewsTicker';
import { ProgramScheduleSection } from '../components/ProgramScheduleSection';
import { useNews } from '../context/NewsContext';

interface HomeViewProps {
  onSelectArticle: (article: Article) => void;
  onOpenShare: (article: Article) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedCategory: (catId: CategoryId | 'all') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectArticle,
  onOpenShare,
  setActiveTab,
  setSelectedCategory,
}) => {
  const {
    articles,
    breakingNews,
    trendingArticles,
    sourceStatus,
    isSyncing,
    syncWithWebsite,
  } = useNews();

  const breakingArticle = breakingNews || articles[0];
  const activeTrending = trendingArticles.length > 0 ? trendingArticles : articles.slice(1, 4);
  const latestArticles = articles.slice(0, 6);

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('news');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. PROMINENT LIVE RADIO FEATURE (Required as most prominent feature on Home) */}
      <section aria-label="Redio Live Hewani">
        <LiveRadioHero
          onOpenContact={() => setActiveTab('contact')}
          onOpenPrograms={() => setActiveTab('programs')}
        />
      </section>

      {/* 2. RADIO PROGRAM SCHEDULE SECTION (EAT Tanzania Time, Now On Air & Up Next) */}
      <section id="home-program-schedule-section" aria-label="Ratiba ya Vipindi vya Redio">
        <ProgramScheduleSection
          onOpenLiveRadio={() => setActiveTab('radio')}
          showFullTimeline={true}
        />
      </section>

      {/* 3. Breaking News Live Ticker */}
      {breakingArticle && (
        <section aria-label="Habari za Hivi Punde">
          <BreakingNewsTicker
            article={breakingArticle}
            onSelectArticle={onSelectArticle}
          />
        </section>
      )}

      {/* 3. Category Filter Pills */}
      <section aria-label="Vitengo vya Habari">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
            Gundua Habari kwa Vitengo
          </h3>
          <button
            id="home-view-all-categories-btn"
            onClick={() => setActiveTab('categories')}
            className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1"
          >
            <span>Vitengo Vyote</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex items-center gap-2 bg-[#071d36] hover:bg-[#0c2a4d] border border-blue-900/60 hover:border-yellow-400/40 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 transition-all flex-shrink-0 group"
            >
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.color}`} />
              <span>{cat.nameSwahili}</span>
              <span className="text-[10px] text-slate-400 bg-[#051528] px-1.5 py-0.5 rounded-full group-hover:text-yellow-400">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Latest News Headline Grid */}
      <section aria-label="Habari za Hivi Karibuni">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Flame className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
              Habari za Hivi Karibuni
            </h2>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
              {sourceStatus?.sourceType === 'editorial' ? 'Dawati la Habari la Radio Joy 90.5 FM' : `Kutoka Tovuti (${sourceStatus?.sourceType || 'Moja kwa Moja'})`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => syncWithWebsite()}
              disabled={isSyncing}
              className="text-xs font-bold text-slate-300 hover:text-yellow-400 flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              title="Sawazisha habari mpya toka tovuti"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-yellow-400' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? 'Inasawazisha...' : 'Sawazisha Tovuti'}</span>
            </button>

            <button
              id="home-more-news-btn"
              onClick={() => {
                setSelectedCategory('all');
                setActiveTab('news');
              }}
              className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
            >
              <span>Habari Zote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestArticles.map((article, idx) => {
            const cat = CATEGORIES.find(c => c.id === article.category);
            return (
              <article
                key={article.id}
                id={`article-card-${article.id}`}
                onClick={() => onSelectArticle(article)}
                className={`bg-[#071d36]/90 border border-blue-900/60 hover:border-yellow-400/40 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-yellow-400/5 ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="relative overflow-hidden aspect-[16/9] bg-[#051528]">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071d36] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${cat?.accentBg || 'bg-yellow-400 text-blue-950'}`}>
                        {cat?.nameSwahili || article.category}
                      </span>
                      {article.hasAudioReport && (
                        <span className="bg-[#051528]/80 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-400/30 flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          <span>Sauti</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className={`font-bold text-white group-hover:text-yellow-300 transition-colors leading-tight ${
                      idx === 0 ? 'text-lg sm:text-2xl font-black' : 'text-base'
                    }`}>
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-blue-900/60 flex items-center justify-between text-xs text-blue-200/70">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="truncate max-w-[120px] font-medium text-slate-200">{article.author.name}</span>
                    <span>•</span>
                    <span>{article.readTimeMinutes} min</span>
                  </div>

                  <button
                    id={`share-btn-${article.id}`}
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
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Trending & Today's Schedule Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Trending News List */}
        <div className="lg:col-span-7 bg-[#071d36]/80 border border-blue-900/60 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-black text-white tracking-tight">
                Habari Zinazosomwa Zaidi (Trending)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Top 3
            </span>
          </div>

          <div className="space-y-3">
            {trendingArticles.slice(0, 3).map((art, index) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#051528]/80 hover:bg-[#051528] border border-blue-900/60 cursor-pointer group transition-all"
              >
                <span className="text-2xl font-black text-yellow-400/40 group-hover:text-yellow-400 w-6 text-center font-mono">
                  {index + 1}
                </span>
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-yellow-400 font-bold uppercase">
                    {art.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {art.publishedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Today's Schedule Snapshot */}
        <div className="lg:col-span-5 bg-[#071d36]/80 border border-blue-900/60 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-black text-white tracking-tight">
                Ratiba ya Vipindi Leo
              </h3>
            </div>
            <button
              id="home-view-full-schedule-btn"
              onClick={() => setActiveTab('programs')}
              className="text-xs font-bold text-yellow-400 hover:underline"
            >
              Yote
            </button>
          </div>

          <div className="space-y-2.5">
            {PROGRAMS.slice(0, 4).map((prog) => (
              <div
                key={prog.id}
                onClick={() => setActiveTab('programs')}
                className="p-3 rounded-2xl bg-[#051528]/80 border border-blue-900/60 flex items-center justify-between gap-3 cursor-pointer hover:border-yellow-400/30 transition-colors"
              >
                <div className="min-w-0">
                  <span className="text-[10px] text-yellow-400 font-mono font-bold block">
                    {prog.timeSlot}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">
                    {prog.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {prog.hostName}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Studio Direct Shoutout Banner */}
      <section className="bg-gradient-to-r from-emerald-950/40 via-[#071d36] to-blue-950/40 border border-emerald-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black text-white">
              Tuma Ujumbe au Omba Wimbo Studio
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Mtangazaji wetu hewani anasoma jumbe zako moja kwa moja redioni.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            id="home-banner-whatsapp-link"
            href={STATION_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors text-center"
          >
            WhatsApp Studio
          </a>
          <button
            id="home-banner-contact-btn"
            onClick={() => setActiveTab('contact')}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#051528] hover:bg-blue-900/50 text-slate-200 font-bold text-xs rounded-xl border border-blue-900/60 transition-colors text-center"
          >
            Wasiliana Nasi
          </button>
        </div>
      </section>
    </div>
  );
};
