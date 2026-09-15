import React, { useState } from 'react';
import { Play, Pause, Radio, Volume2, MessageCircle, Phone, Sparkles, Sun, Moon, BookOpen, Clock, ChevronRight, Share2, VolumeX, Sliders } from 'lucide-react';
import { Article, CategoryId, ActiveTab } from '../types';
import { CATEGORIES, PROGRAMS, STATION_INFO } from '../data/mockData';
import { useRadio } from '../context/RadioContext';
import { useNews } from '../context/NewsContext';
import { useTheme } from '../context/ThemeContext';

interface SimpleHomeViewProps {
  onSelectArticle: (article: Article) => void;
  onOpenShare: (article: Article) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedCategory: (catId: CategoryId | 'all') => void;
}

export const SimpleHomeView: React.FC<SimpleHomeViewProps> = ({
  onSelectArticle,
  onOpenShare,
  setActiveTab,
  setSelectedCategory,
}) => {
  const {
    isPlaying,
    isLoading,
    togglePlay,
    currentProgram,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    quality,
    setQuality,
    listenerCount,
  } = useRadio();

  const { articles } = useNews();
  const { theme, setTheme, viewMode, setViewMode, setIsThemeSettingsOpen } = useTheme();

  const [activeFilter, setActiveFilter] = useState<CategoryId | 'all'>('all');

  const filteredArticles = activeFilter === 'all'
    ? articles.slice(0, 6)
    : articles.filter(a => a.category === activeFilter).slice(0, 6);

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner: Mode & Theme Quick Switcher */}
      <div className="bg-[#071d36] border border-blue-900/60 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-yellow-400">
            Mwonekano Rahisi (Simple View)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick theme toggles */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'sepia' : 'dark')}
            className="px-3 py-1.5 rounded-xl bg-[#051528] hover:bg-blue-900/50 text-xs font-bold text-slate-200 border border-blue-900/60 flex items-center gap-1.5 transition-colors"
            title="Badili Mandhari ya Rangi"
          >
            {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-yellow-400" />}
            {theme === 'light' && <Sun className="w-3.5 h-3.5 text-amber-500" />}
            {theme === 'sepia' && <BookOpen className="w-3.5 h-3.5 text-amber-700" />}
            {theme === 'contrast' && <Sparkles className="w-3.5 h-3.5 text-yellow-400" />}
            <span>Mandhari: {theme === 'dark' ? 'Giza' : theme === 'light' ? 'Mwanga' : theme === 'sepia' ? 'Sepia' : 'Mkazo'}</span>
          </button>

          {/* Switch back to standard view */}
          <button
            onClick={() => setViewMode('standard')}
            className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-950 text-xs font-black transition-colors"
          >
            Mwonekano Kamili
          </button>

          <button
            onClick={() => setIsThemeSettingsOpen(true)}
            className="p-1.5 rounded-xl bg-[#051528] text-slate-300 hover:text-white border border-blue-900/60"
            title="Mipangilio Yote ya Mwonekano"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. SIMPLE GIANT LIVE RADIO PLAYER */}
      <section className="bg-gradient-to-b from-[#0a2544] to-[#071d36] rounded-3xl border-2 border-yellow-400/50 p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Frequency & Live status */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white" />
            HEWANI MOJA KWA MOJA
          </span>
          <span className="bg-yellow-400 text-blue-950 text-xs font-black px-3 py-1 rounded-full">
            RADIO JOY 90.5 FM • KIGOMA
          </span>
          <span className="text-xs text-slate-300">
            {listenerCount.toLocaleString()} Wasikilizaji
          </span>
        </div>

        {/* Current Program Details */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">
            {currentProgram.timeSlot} • {currentProgram.genre}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {currentProgram.title}
          </h1>
          {currentProgram.currentTopic && (
            <p className="text-xs sm:text-sm text-yellow-200/90 italic bg-[#051528] py-2 px-4 rounded-xl inline-block max-w-xl border border-blue-900/60">
              Mada: "{currentProgram.currentTopic}"
            </p>
          )}
        </div>

        {/* Big One-Tap Play / Pause Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            id="simple-radio-play-btn"
            onClick={togglePlay}
            disabled={isLoading}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isPlaying
                ? 'bg-red-600 text-white ring-8 ring-red-600/30 shadow-red-600/50 scale-105'
                : 'bg-yellow-400 text-blue-950 ring-8 ring-yellow-400/30 shadow-yellow-400/50 hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-12 h-12 fill-current" />
            ) : (
              <Play className="w-12 h-12 fill-current translate-x-1" />
            )}
          </button>
          <span className="text-sm font-black text-white">
            {isPlaying ? 'BONYEZA KUSIMAMISHA REDIO' : 'BONYEZA KUSIKILIZA MOJA KWA MOJA'}
          </span>
        </div>

        {/* Volume & Quality Control */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 border-t border-blue-900/60 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-slate-300 hover:text-white p-1 rounded-lg"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-red-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-yellow-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#051528] px-2.5 py-1 rounded-xl border border-blue-900/60 text-xs">
            <span className="text-slate-400 font-bold">Ubora:</span>
            <button
              onClick={() => setQuality('64k')}
              className={`px-2 py-0.5 rounded font-bold ${
                quality === '64k' ? 'bg-yellow-400 text-blue-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              64k (Bando Nafuu)
            </button>
            <button
              onClick={() => setQuality('128k')}
              className={`px-2 py-0.5 rounded font-bold ${
                quality === '128k' ? 'bg-yellow-400 text-blue-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              128k (HD)
            </button>
          </div>
        </div>

        {/* Quick Studio Call & WhatsApp Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
          <a
            href={STATION_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl shadow-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Studio</span>
          </a>

          <a
            href={`tel:${STATION_INFO.phoneStudio}`}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-2xl shadow-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Piga Hotline ({STATION_INFO.phoneStudio})</span>
          </a>
        </div>
      </section>

      {/* 2. SIMPLE NEWS HEADLINES */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-white">
              Habari za Hivi Punde
            </h2>
            <p className="text-xs text-slate-300">
              Soma habari za uhakika kutoka Dawati la Habari la Radio Joy
            </p>
          </div>

          <button
            onClick={() => setActiveTab('news')}
            className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1"
          >
            <span>Tazama Habari Zote</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Simple Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
              activeFilter === 'all'
                ? 'bg-yellow-400 text-blue-950 font-black shadow'
                : 'bg-[#071d36] text-slate-300 border border-blue-900/60'
            }`}
          >
            Zote
          </button>
          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                activeFilter === cat.id
                  ? 'bg-yellow-400 text-blue-950 font-black shadow'
                  : 'bg-[#071d36] text-slate-300 border border-blue-900/60 hover:text-white'
              }`}
            >
              {cat.nameSwahili}
            </button>
          ))}
        </div>

        {/* Clean Article List */}
        <div className="space-y-3">
          {filteredArticles.map((article) => {
            const cat = CATEGORIES.find(c => c.id === article.category);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-[#071d36] border border-blue-900/60 hover:border-yellow-400/40 rounded-2xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 group shadow-md"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full sm:w-28 h-28 sm:h-24 rounded-xl object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md border border-yellow-400/20">
                      {cat?.nameSwahili || article.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {article.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-yellow-400 group-hover:underline flex items-center gap-1">
                      Soma Habari Kamili <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenShare(article);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-yellow-400"
                      title="Shiriki"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SIMPLE PROGRAM SCHEDULE */}
      <section className="bg-[#071d36] rounded-3xl border border-blue-900/60 p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-black text-white">
              Ratiba ya Vipindi Leo (Radio Joy)
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('programs')}
            className="text-xs font-bold text-yellow-400 hover:underline"
          >
            Tazama Vipindi Vyote
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="p-3.5 rounded-xl bg-[#051528] border border-blue-900/60 flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-xs font-mono font-bold text-yellow-400 block">
                  {prog.timeSlot}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {prog.title}
                </h4>
                <p className="text-xs text-slate-300">
                  {prog.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
