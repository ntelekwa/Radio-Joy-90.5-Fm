import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Radio, X } from 'lucide-react';
import { useRadio } from '../context/RadioContext';
import { STATION_INFO } from '../data/mockData';
import { ActiveTab } from '../types';

interface MiniPlayerProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({ activeTab, setActiveTab }) => {
  const {
    isPlaying,
    isLoading,
    togglePlay,
    currentProgram,
    isMuted,
    toggleMute,
    frequencies,
    isMiniPlayerVisible,
    setIsMiniPlayerVisible,
  } = useRadio();

  // If on the dedicated 'radio' tab, hide the mini player to avoid redundancy
  if (activeTab === 'radio' || !isMiniPlayerVisible) {
    return null;
  }

  return (
    <div
      id="persistent-mini-player"
      className="fixed z-40 bottom-16 md:bottom-5 left-3 right-3 md:left-auto md:right-6 md:w-96 bg-[#071d36]/95 backdrop-blur-md border border-yellow-400/40 rounded-2xl p-2.5 shadow-2xl shadow-black/80 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Thumbnail & Show Info (Click to open full radio) */}
        <div
          onClick={() => setActiveTab('radio')}
          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 group"
          role="button"
          tabIndex={0}
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-[#0b2442] border border-blue-800/80 flex items-center justify-center">
            <Radio className="w-5 h-5 text-yellow-400" />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-yellow-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                  <span className="w-1 bg-yellow-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-4" />
                  <span className="w-1 bg-yellow-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2" />
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] uppercase font-black text-red-400 tracking-wider">
                LIVE • 90.5 FM
              </span>
            </div>
            <h4 className="text-xs font-bold text-white truncate leading-tight group-hover:text-yellow-400 transition-colors">
              {currentProgram.title}
            </h4>
            <p className="text-[11px] text-blue-200/70 truncate">
              {currentProgram.timeSlot}
            </p>
          </div>
        </div>

        {/* Right Controls: Play/Pause, Mute, Fullscreen, Dismiss */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            id="mini-player-mute-btn"
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900/60 transition-colors"
            title={isMuted ? 'Washa Sauti' : 'Zima Sauti'}
            aria-label="Toggle Sauti"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            id="mini-player-play-btn"
            onClick={togglePlay}
            disabled={isLoading}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 font-black flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            title={isPlaying ? 'Sitisha' : 'Sikiliza Moja kwa Moja'}
            aria-label="Play/Pause"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-blue-950 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            id="mini-player-expand-btn"
            onClick={() => setActiveTab('radio')}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900/60 transition-colors hidden sm:block"
            title="Fungua Redio Kamili"
            aria-label="Fungua Redio Kamili"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            id="mini-player-close-btn"
            onClick={() => setIsMiniPlayerVisible(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900/60 transition-colors"
            title="Funga Player"
            aria-label="Funga Player"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
