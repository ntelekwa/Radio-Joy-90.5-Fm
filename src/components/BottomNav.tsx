import React from 'react';
import { Home, Radio, Newspaper, Calendar, Grid, Phone, MoreHorizontal } from 'lucide-react';
import { ActiveTab } from '../types';
import { useRadio } from '../context/RadioContext';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenMenuDrawer: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenMenuDrawer,
}) => {
  const { isPlaying } = useRadio();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#06182c]/95 backdrop-blur-xl border-t border-blue-900/80 px-2 py-1.5 shadow-[0_-8px_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Home */}
        <button
          id="bottom-nav-home-btn"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-yellow-400 font-bold scale-105'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Nyumbani</span>
        </button>

        {/* News */}
        <button
          id="bottom-nav-news-btn"
          onClick={() => setActiveTab('news')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'news'
              ? 'text-yellow-400 font-bold scale-105'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Newspaper className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Habari</span>
        </button>

        {/* Elevated Live Radio Center Button */}
        <button
          id="bottom-nav-radio-center-btn"
          onClick={() => setActiveTab('radio')}
          className="relative -top-4 flex flex-col items-center focus:outline-none group"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${
              isPlaying
                ? 'bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 shadow-red-500/40 ring-4 ring-red-500/20'
                : 'bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-500 shadow-yellow-400/30 ring-4 ring-yellow-400/20'
            }`}
          >
            <Radio className={`w-7 h-7 ${isPlaying ? 'text-white' : 'text-blue-950'}`} />
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping pointer-events-none opacity-60" />
            )}
          </div>
          <span className="text-[10px] font-extrabold uppercase mt-1 tracking-wider text-white flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-yellow-400'}`} />
            Live
          </span>
        </button>

        {/* Programs */}
        <button
          id="bottom-nav-programs-btn"
          onClick={() => setActiveTab('programs')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'programs'
              ? 'text-yellow-400 font-bold scale-105'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Vipindi</span>
        </button>

        {/* More / Menu Drawer */}
        <button
          id="bottom-nav-menu-btn"
          onClick={onOpenMenuDrawer}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'categories' || activeTab === 'about' || activeTab === 'contact'
              ? 'text-yellow-400 font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Zaidi</span>
        </button>
      </div>
    </div>
  );
};
