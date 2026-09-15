import React from 'react';
import { X, Sun, Moon, BookOpen, Eye, LayoutGrid, Check, Sparkles, Sliders, Type } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AppTheme, ViewMode, TextScale } from '../types';

export const ThemeSettingsModal: React.FC = () => {
  const {
    theme,
    setTheme,
    viewMode,
    setViewMode,
    textScale,
    setTextScale,
    isThemeSettingsOpen,
    setIsThemeSettingsOpen,
  } = useTheme();

  if (!isThemeSettingsOpen) return null;

  const themes: {
    id: AppTheme;
    nameSwahili: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgPreview: string;
    borderPreview: string;
  }[] = [
    {
      id: 'dark',
      nameSwahili: 'Giza la Redio (Midnight)',
      description: 'Mtindo asilia wa studio ya Radio Joy. Navy iliyotulia na dhahabu.',
      icon: Moon,
      accentColor: 'bg-yellow-400 text-blue-950',
      bgPreview: 'bg-[#071d36]',
      borderPreview: 'border-blue-800',
    },
    {
      id: 'light',
      nameSwahili: 'Mwanga Safi (Light)',
      description: 'Nuru nyangavu na usomaji safi wakati wa mchana.',
      icon: Sun,
      accentColor: 'bg-blue-600 text-white',
      bgPreview: 'bg-white',
      borderPreview: 'border-slate-300',
    },
    {
      id: 'sepia',
      nameSwahili: 'Kusoma / Sepia (Eye-Care)',
      description: 'Karatasi ya joto isiyochosha macho wakati wa kusoma habari ndefu.',
      icon: BookOpen,
      accentColor: 'bg-amber-700 text-white',
      bgPreview: 'bg-[#f5eedf]',
      borderPreview: 'border-amber-200',
    },
    {
      id: 'contrast',
      nameSwahili: 'Mkazo wa Juu (Contrast)',
      description: 'Rangi nyeusi na nyeupe zenye mkazo mkubwa kwa usomaji wazi kabisa.',
      icon: Eye,
      accentColor: 'bg-yellow-400 text-black',
      bgPreview: 'bg-black',
      borderPreview: 'border-white',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsThemeSettingsOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-[#071d36] rounded-3xl border border-blue-900 shadow-2xl p-6 sm:p-7 overflow-hidden space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Mandhari & Mwonekano
              </h3>
              <p className="text-xs text-slate-300">
                Badilisha mwonekano wa app kulingana na upendeleo wako
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsThemeSettingsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-blue-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: VIEW MODE (Simple vs Standard) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-yellow-400" />
              Mtindo wa Mwonekano (View Mode)
            </span>
            <span className="text-[11px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
              {viewMode === 'simple' ? 'Rahisi (Simple Mode)' : 'Kamili (Standard Mode)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Simple View Button */}
            <button
              id="theme-select-simple-view-btn"
              onClick={() => setViewMode('simple')}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                viewMode === 'simple'
                  ? 'bg-yellow-400/15 border-yellow-400 shadow-md shadow-yellow-400/10 ring-2 ring-yellow-400/30'
                  : 'bg-[#051528] border-blue-900/60 hover:border-yellow-400/40 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-black text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Mwonekano Rahisi
                </span>
                {viewMode === 'simple' && (
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-blue-950 flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Muundo safi bila mambo mengi: Redio kubwa, orodha fupi ya habari safi na ratiba rahisi.
              </p>
            </button>

            {/* Standard View Button */}
            <button
              id="theme-select-standard-view-btn"
              onClick={() => setViewMode('standard')}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                viewMode === 'standard'
                  ? 'bg-yellow-400/15 border-yellow-400 shadow-md shadow-yellow-400/10 ring-2 ring-yellow-400/30'
                  : 'bg-[#051528] border-blue-900/60 hover:border-yellow-400/40 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-black text-white flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-yellow-400" />
                  Mwonekano Kamili
                </span>
                {viewMode === 'standard' && (
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-blue-950 flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vipengele vyote: Equalizer ya sauti, habari za hivi punde, gridi ya picha, na jopo la maoni.
              </p>
            </button>
          </div>
        </div>

        {/* Section 2: THEMES (Dark, Light, Sepia, Contrast) */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
            Chagua Mandhari (Color Theme)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  id={`theme-btn-${t.id}`}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-yellow-400/15 border-yellow-400 ring-2 ring-yellow-400/30'
                      : 'bg-[#051528] border-blue-900/60 hover:border-yellow-400/40'
                  }`}
                >
                  <div className={`p-2 rounded-xl flex-shrink-0 ${t.accentColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">
                        {t.nameSwahili}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {t.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: TEXT SCALE (Usomaji wa Maandishi) */}
        <div className="space-y-2 pt-2 border-t border-blue-900/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-yellow-400" />
              Ukubwa wa Maandishi (Text Size)
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              {textScale === 'normal' ? 'Kawaida (100%)' : textScale === 'large' ? 'Kubwa (110%)' : 'Kubwa Zaidi (122%)'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              id="text-scale-normal-btn"
              onClick={() => setTextScale('normal')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                textScale === 'normal'
                  ? 'bg-yellow-400 text-blue-950 border-yellow-400 font-black'
                  : 'bg-[#051528] border-blue-900/60 text-slate-300 hover:text-white'
              }`}
            >
              A (Kawaida)
            </button>
            <button
              id="text-scale-large-btn"
              onClick={() => setTextScale('large')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                textScale === 'large'
                  ? 'bg-yellow-400 text-blue-950 border-yellow-400 font-black'
                  : 'bg-[#051528] border-blue-900/60 text-slate-300 hover:text-white'
              }`}
            >
              A+ (Kubwa)
            </button>
            <button
              id="text-scale-xlarge-btn"
              onClick={() => setTextScale('xlarge')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                textScale === 'xlarge'
                  ? 'bg-yellow-400 text-blue-950 border-yellow-400 font-black'
                  : 'bg-[#051528] border-blue-900/60 text-slate-300 hover:text-white'
              }`}
            >
              A++ (Kubwa Sana)
            </button>
          </div>
        </div>

        {/* Done Button */}
        <button
          id="theme-settings-done-btn"
          onClick={() => setIsThemeSettingsOpen(false)}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black text-sm rounded-xl shadow-lg transition-colors text-center"
        >
          Hifadhi & Endelea
        </button>
      </div>
    </div>
  );
};
