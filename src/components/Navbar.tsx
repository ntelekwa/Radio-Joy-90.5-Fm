import React, { useState, useEffect } from 'react';
import { Radio, Bell, Search, Menu, X, Volume2, ShieldCheck, Sliders, Sun, Moon, BookOpen, Sparkles, LayoutGrid, Palette } from 'lucide-react';
import { STATION_INFO } from '../data/mockData';
import { ActiveTab } from '../types';
import { useRadio } from '../context/RadioContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenMenuDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
  onOpenNotifications,
  onOpenSearch,
  onOpenMenuDrawer,
}) => {
  const { isPlaying, currentProgram } = useRadio();
  const { theme, setTheme, viewMode, toggleViewMode, setIsThemeSettingsOpen } = useTheme();
  const [currentTime, setCurrentTime] = useState<string>('');

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('sepia');
    else if (theme === 'sepia') setTheme('contrast');
    else setTheme('dark');
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${mins} EAT`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#071d36]/95 backdrop-blur-md border-b border-blue-900/60 shadow-lg">
      {/* Top micro bar for frequency & live status */}
      <div className="bg-yellow-400 px-4 py-1 text-blue-950 font-extrabold text-xs flex justify-between items-center tracking-wide shadow-inner">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="uppercase text-[11px] font-black tracking-wider">
            KIGOMA 90.5 FM • KASULU • UVINZA • KIBONDO • BUHIGWE • LIVE STREAM radiojoyfm.co.tz
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span className="font-bold">Kigoma, Tanzania</span>
          <span className="text-blue-950/40">|</span>
          <span className="font-mono bg-blue-950/10 px-1.5 py-0.5 rounded text-blue-950 font-black">{currentTime}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          id="nav-brand-logo-btn"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-slate-400 via-yellow-400 to-slate-300 shadow-md shadow-black/50 group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src="/radio-joy-logo.png"
              alt="Radio Joy 90.5 FM"
              className="w-full h-full object-cover rounded-full bg-black"
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#071d36]"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-white font-['Cabinet_Grotesk']">
                RADIO JOY
              </span>
              <span className="bg-yellow-400 text-blue-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                90.5 FM
              </span>
            </div>
            <p className="text-[10px] text-blue-200/80 font-medium tracking-tight truncate max-w-[140px] sm:max-w-[200px]">
              Kigoma, Tanzania • 90.5 FM
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            id="nav-desktop-home-btn"
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'home'
                ? 'bg-yellow-400 text-blue-950 font-bold shadow'
                : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            Nyumbani
          </button>

          <button
            id="nav-desktop-radio-btn"
            onClick={() => setActiveTab('radio')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'radio'
                ? 'bg-red-500 text-white font-bold shadow'
                : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Redio Live
          </button>

          <button
            id="nav-desktop-news-btn"
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'news'
                ? 'bg-yellow-400 text-blue-950 font-bold shadow'
                : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            Habari
          </button>

          <button
            id="nav-desktop-programs-btn"
            onClick={() => setActiveTab('programs')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'programs'
                ? 'bg-yellow-400 text-blue-950 font-bold shadow'
                : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            Ratiba ya Vipindi
          </button>

          <button
            id="nav-desktop-about-btn"
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'about'
                ? 'bg-yellow-400 text-blue-950 font-bold shadow'
                : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            Kuhusu Sisi
          </button>

          <button
            id="nav-desktop-contact-btn"
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'contact'
                ? 'bg-yellow-400 text-blue-950 font-bold shadow'
                : 'text-slate-200 hover:text-white hover:bg-blue-900/50'
            }`}
          >
            Mawasiliano
          </button>
        </nav>

        {/* Right Actions: Search, Notifications, Menu Drawer */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick View Mode Toggle (Rahisi / Kamili) */}
          <button
            id="nav-view-mode-toggle-btn"
            onClick={toggleViewMode}
            className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
              viewMode === 'simple'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black ring-1 ring-emerald-400'
                : 'bg-[#06182c] text-slate-300 hover:text-white border border-blue-900/60'
            }`}
            title={viewMode === 'simple' ? 'Unatumia Mwonekano Rahisi (Bofya kurudi Kamili)' : 'Bofya kubadili kwenda Mwonekano Rahisi (Simple View)'}
            aria-label="Badili Mwonekano"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span className="font-bold">
              {viewMode === 'simple' ? 'Rahisi' : 'Kamili'}
            </span>
          </button>

          {/* Theme Quick Toggle Button */}
          <button
            id="nav-theme-toggle-btn"
            onClick={cycleTheme}
            className="p-2 rounded-xl text-yellow-400 hover:text-yellow-300 hover:bg-blue-900/60 transition-colors relative cursor-pointer"
            title={`Mandhari: ${theme === 'dark' ? 'Giza (Dark)' : theme === 'light' ? 'Mwanga (Light)' : theme === 'sepia' ? 'Kusoma (Sepia)' : 'Mkazo (Contrast)'} - Bofya kubadili`}
            aria-label="Badili Mandhari ya Rangi"
          >
            {theme === 'dark' && <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />}
            {theme === 'light' && <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />}
            {theme === 'sepia' && <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />}
            {theme === 'contrast' && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />}
          </button>

          {/* Search Button */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors"
            title="Tafuta Habari"
            aria-label="Tafuta Habari"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <button
            id="nav-notifications-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors"
            title="Taarifa & Arifa"
            aria-label="Taarifa & Arifa"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-yellow-400 text-blue-950 text-[10px] font-black rounded-full flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Control Panel Button */}
          <button
            id="nav-control-panel-btn"
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-yellow-400 text-blue-950 shadow-md shadow-yellow-400/30 font-black'
                : 'bg-[#06182c] text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30'
            }`}
            title="Control Panel (Jopo la Udhibiti)"
            aria-label="Control Panel"
          >
            <Sliders className="w-4 h-4 text-yellow-400" />
            <span className="hidden sm:inline font-bold">Control Panel</span>
          </button>

          {/* Mobile Menu Drawer Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={onOpenMenuDrawer}
            className="md:hidden p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors"
            aria-label="Menyu Kuu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
