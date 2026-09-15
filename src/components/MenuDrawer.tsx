import React from 'react';
import { X, Home, Radio, Newspaper, Grid, Calendar, Info, Phone, Bookmark, Bell, RadioTower, MessageCircle, ChevronRight, ExternalLink, Globe, Lock, Sun, Moon, BookOpen, Sparkles, Sliders, LayoutGrid } from 'lucide-react';
import { ActiveTab } from '../types';
import { STATION_INFO, FREQUENCIES } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNotifications: () => void;
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
  onOpenWebsiteIntegration?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onOpenNotifications,
  bookmarkedCount,
  onOpenBookmarks,
  onOpenWebsiteIntegration,
}) => {
  const { theme, setTheme, viewMode, setViewMode, setIsThemeSettingsOpen } = useTheme();

  if (!isOpen) return null;

  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xs sm:max-w-sm bg-[#071d36] border-l border-blue-900/80 h-full flex flex-col justify-between p-5 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 flex-shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-['Cabinet_Grotesk']">
                  RADIO JOY FM
                </h3>
                <p className="text-[10px] text-yellow-400 font-extrabold uppercase">
                  90.5 MHz • Kigoma
                </p>
              </div>
            </div>
            <button
              id="menu-drawer-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-300/60 px-3 pb-1">
              Sehemu Kuu
            </p>

            <button
              id="drawer-nav-home"
              onClick={() => navigateTo('home')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'home' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Nyumbani (Home)</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'home' ? 'text-blue-950' : 'text-blue-400/60'}`} />
            </button>

            <button
              id="drawer-nav-radio"
              onClick={() => navigateTo('radio')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'radio' ? 'bg-red-500 text-white font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Redio Live 24/7</span>
              </div>
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                LIVE
              </span>
            </button>

            <button
              id="drawer-nav-news"
              onClick={() => navigateTo('news')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'news' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-4 h-4" />
                <span>Habari & Makala</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'news' ? 'text-blue-950' : 'text-blue-400/60'}`} />
            </button>

            <button
              id="drawer-nav-categories"
              onClick={() => navigateTo('categories')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'categories' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Grid className="w-4 h-4" />
                <span>Vitengo vya Habari</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'categories' ? 'text-blue-950' : 'text-blue-400/60'}`} />
            </button>

            <button
              id="drawer-nav-programs"
              onClick={() => navigateTo('programs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'programs' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Ratiba ya Vipindi</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'programs' ? 'text-blue-950' : 'text-blue-400/60'}`} />
            </button>

            <button
              id="drawer-nav-about"
              onClick={() => navigateTo('about')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'about' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4" />
                <span>Kuhusu Sisi (About Us)</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'about' ? 'text-blue-950' : 'text-blue-400/60'}`} />
            </button>

            <button
              id="drawer-nav-contact"
              onClick={() => navigateTo('contact')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'contact' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>Wasiliana Nasi (Contact)</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'contact' ? 'text-blue-950' : 'text-blue-400/60'}`} />
            </button>
          </div>

          {/* Theme & View Mode Settings */}
          <div className="pt-2 border-t border-blue-900/60 space-y-2.5">
            <div className="flex items-center justify-between px-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-300/70">
                Mwonekano & Mandhari
              </p>
              <button
                onClick={() => {
                  setIsThemeSettingsOpen(true);
                  onClose();
                }}
                className="text-[10px] text-yellow-400 hover:underline flex items-center gap-1 font-bold"
              >
                <Sliders className="w-3 h-3" />
                <span>Mipangilio</span>
              </button>
            </div>

            {/* View Mode Pill Switcher */}
            <div className="grid grid-cols-2 gap-1.5 px-2">
              <button
                onClick={() => setViewMode('simple')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  viewMode === 'simple'
                    ? 'bg-yellow-400 text-blue-950 font-black shadow-sm'
                    : 'bg-[#051528] text-slate-300 border border-blue-900/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rahisi</span>
              </button>
              <button
                onClick={() => setViewMode('standard')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  viewMode === 'standard'
                    ? 'bg-yellow-400 text-blue-950 font-black shadow-sm'
                    : 'bg-[#051528] text-slate-300 border border-blue-900/60 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Kamili</span>
              </button>
            </div>

            {/* Themes 4-Pill Selector */}
            <div className="grid grid-cols-4 gap-1 px-2">
              <button
                onClick={() => setTheme('dark')}
                className={`py-1.5 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                  theme === 'dark'
                    ? 'bg-[#0b2442] text-yellow-400 border border-yellow-400'
                    : 'bg-[#051528] text-slate-400 border border-blue-900/40'
                }`}
                title="Giza la Redio (Dark)"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Giza</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`py-1.5 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                  theme === 'light'
                    ? 'bg-white text-blue-950 border border-yellow-400 shadow-sm'
                    : 'bg-[#051528] text-slate-400 border border-blue-900/40'
                }`}
                title="Mwanga Safi (Light)"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Mwanga</span>
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`py-1.5 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                  theme === 'sepia'
                    ? 'bg-[#ede3d2] text-amber-950 border border-amber-600'
                    : 'bg-[#051528] text-slate-400 border border-blue-900/40'
                }`}
                title="Hali ya Kusoma (Sepia)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Sepia</span>
              </button>
              <button
                onClick={() => setTheme('contrast')}
                className={`py-1.5 rounded-lg text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                  theme === 'contrast'
                    ? 'bg-black text-yellow-400 border-2 border-white'
                    : 'bg-[#051528] text-slate-400 border border-blue-900/40'
                }`}
                title="Mkazo wa Juu (High Contrast)"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mkazo</span>
              </button>
            </div>
          </div>

          {/* Quick Actions: Bookmarks & Notifications */}
          <div className="pt-2 border-t border-blue-900/60 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-300/60 px-3 pb-1">
              Huduma Zako
            </p>

            <button
              id="drawer-nav-bookmarks"
              onClick={() => {
                onOpenBookmarks();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-200 hover:bg-blue-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-yellow-400" />
                <span>Habari Ulizohifadhi</span>
              </div>
              {bookmarkedCount > 0 && (
                <span className="bg-yellow-400 text-blue-950 text-xs font-black px-2 py-0.5 rounded-full">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            <button
              id="drawer-nav-notifications"
              onClick={() => {
                onOpenNotifications();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-200 hover:bg-blue-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-yellow-400" />
                <span>Arifa za Simu (Push Alerts)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400/60" />
            </button>

            <button
              id="drawer-nav-website-sync"
              onClick={() => {
                onOpenWebsiteIntegration?.();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-200 hover:bg-blue-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-yellow-400" />
                <span className="flex items-center gap-1.5">
                  <span>Tovuti radiojoyfm.co.tz</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">SYNC</span>
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400/60" />
            </button>

            <button
              id="drawer-nav-admin"
              onClick={() => navigateTo('admin')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                activeTab === 'admin' ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-yellow-400 font-bold hover:bg-blue-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4" />
                <span>Control Panel (Jopo la Udhibiti)</span>
              </div>
              <span className="text-[10px] font-black bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-2 py-0.5 rounded-full uppercase">
                STUDIO
              </span>
            </button>
          </div>

          {/* Frequencies quick preview */}
          <div className="pt-2 border-t border-blue-900/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 px-3 mb-2">
              <RadioTower className="w-3.5 h-3.5 text-yellow-400" />
              <span>Usikivu & Maeneo Yetu:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {FREQUENCIES.slice(0, 6).map((f) => (
                <div key={f.city} className="bg-[#0b2442] p-2 rounded-xl border border-blue-900/60">
                  <p className="text-[10px] text-slate-300 truncate font-medium">{f.city.split('&')[0]}</p>
                  <p className="text-xs font-black text-yellow-400">{f.frequency}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Contact links */}
        <div className="pt-6 border-t border-blue-900/60 space-y-3">
          <a
            href={STATION_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat na Studio WhatsApp</span>
          </a>

          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              © {new Date().getFullYear()} Radio Joy 90.5 FM • Haki Zote Zimehifadhiwa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
