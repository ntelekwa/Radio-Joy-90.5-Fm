import React, { useState } from 'react';
import { Play, Pause, Radio, Volume2, VolumeX, Users, Sparkles, MessageCircle, Phone, Clock, Wifi, Moon, Share2, Check } from 'lucide-react';
import { useRadio } from '../context/RadioContext';
import { STATION_INFO } from '../data/mockData';
import { StreamQuality } from '../types';

interface LiveRadioHeroProps {
  onOpenContact: () => void;
  onOpenPrograms: () => void;
}

export const LiveRadioHero: React.FC<LiveRadioHeroProps> = ({ onOpenContact, onOpenPrograms }) => {
  const {
    isPlaying,
    isLoading,
    togglePlay,
    currentProgram,
    activeLiveProgram,
    nextProgram,
    isScheduleGap,
    gapNotice,
    tanzaniaTime,
    currentProgress,
    listenerCount,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    quality,
    setQuality,
    frequencies,
    sleepTimerMinutes,
    setSleepTimer,
  } = useRadio();

  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareStream = async () => {
    const text = `Sikiliza Radio Joy 90.5 FM Moja kwa Moja sasa! Kipindi: ${currentProgram.title} (${currentProgram.timeSlot})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Radio Joy 90.5 FM Live',
          text,
          url: window.location.href,
        });
      } catch (e) {
        // Fallback to copy
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="home-live-radio-hero"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2544] via-[#071d36] to-[#041021] border-2 border-yellow-400/30 p-5 sm:p-7 shadow-2xl shadow-black/70"
    >
      {/* Background visual glow rings */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar: Station logo, LIVE badge, and Active listeners */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-blue-900/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 flex-shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
                {STATION_INFO.name}
              </h2>
              <span className="bg-yellow-400 text-blue-950 text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                {STATION_INFO.frequency}
              </span>
            </div>
            <p className="text-xs text-blue-200/80 font-medium">
              Kibirizi, Kigoma • Masafa ya 90.5 MHz
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* LIVE indicator */}
          <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/50 px-3 py-1.5 rounded-full shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-black text-red-400 tracking-wider uppercase">
              LIVE HEWANI
            </span>
          </div>

          {/* Listener Count */}
          <div className="flex items-center gap-1.5 bg-[#0b2442] border border-blue-800/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200">
            <Users className="w-3.5 h-3.5 text-yellow-400" />
            <span>{listenerCount.toLocaleString()} Wasikilizaji</span>
          </div>
        </div>
      </div>

      {/* Main Feature: Now Playing Program & Giant Play Button */}
      <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Program details & Host avatar */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {activeLiveProgram
                  ? `KIPINDI CHA SASA • ${activeLiveProgram.timeSlot}`
                  : `MUZIKI MSETO • 24/7 LIVE`}
              </span>
            </div>

            <span className="text-[11px] font-mono text-blue-200/70 bg-[#06172b] px-2.5 py-0.5 rounded-full border border-blue-900/60">
              EAT {tanzaniaTime.formattedTime24} (UTC+3)
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {activeLiveProgram ? activeLiveProgram.title : 'Hakuna Kipindi Kilichopangwa Sasa'}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 line-clamp-2 leading-relaxed font-normal">
              {activeLiveProgram
                ? activeLiveProgram.description
                : 'Muziki mseto na habari za papo hapo za Radio Joy 90.5 FM Kigoma zinaendelea mubashara.'}
            </p>
          </div>

          {/* Progress Bar if active program */}
          {currentProgress && activeLiveProgram && (
            <div className="pt-1 max-w-lg space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="text-yellow-400 font-semibold">
                  Muda uliopita: {currentProgress.elapsedMinutes}m ({currentProgress.progressPercent}%)
                </span>
                <span className="text-slate-400">
                  Zimebaki: <strong>{currentProgress.remainingMinutes}m</strong>
                </span>
              </div>
              <div className="w-full bg-[#030d1a] rounded-full h-2 overflow-hidden border border-blue-900/80">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                  style={{ width: `${currentProgress.progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Program topic & broadcast info card */}
          {activeLiveProgram ? (
            <div className="flex items-center gap-3.5 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shadow-md flex-shrink-0">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-blue-200/70 font-medium">Mada ya Kipindi:</p>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {activeLiveProgram.currentTopic || activeLiveProgram.genre}
                </h4>
                <p className="text-xs text-yellow-400 font-semibold">
                  Masaa: {activeLiveProgram.timeSlot} • {activeLiveProgram.genre}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#05162a] rounded-2xl border border-blue-900/60 text-xs text-slate-300">
              Kipindi kinachofuata: <strong className="text-yellow-400">{nextProgram?.title}</strong> ({nextProgram?.timeSlot})
            </div>
          )}

          {/* Next Show Preview */}
          {nextProgram && (
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <Clock className="w-3.5 h-3.5 text-blue-300/60" />
              <span>Inayofuata:</span>
              <button
                onClick={onOpenPrograms}
                className="text-yellow-300 font-semibold hover:text-yellow-400 underline decoration-blue-700 underline-offset-4"
              >
                {nextProgram.title} ({nextProgram.timeSlot})
              </button>
            </div>
          )}
        </div>

        {/* Right: Giant Play/Pause Button & Visualizer */}
        <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative flex items-center justify-center">
            {/* Animated sound ripple rings */}
            {isPlaying && (
              <>
                <div className="absolute w-36 h-36 rounded-full border-2 border-yellow-400/20 animate-ping pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full border border-yellow-400/15 animate-pulse pointer-events-none" />
              </>
            )}

            {/* Giant Play/Pause Button */}
            <button
              id="hero-main-play-btn"
              onClick={togglePlay}
              disabled={isLoading}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none ${
                isPlaying
                  ? 'bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 text-white shadow-red-600/50 scale-105 ring-4 ring-red-500/30'
                  : 'bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-500 text-blue-950 shadow-yellow-400/40 hover:scale-105 active:scale-95 ring-4 ring-yellow-400/20'
              }`}
              title={isPlaying ? 'Sitisha Matangazo' : 'Sikiliza Moja kwa Moja Sasa'}
              aria-label="Play or pause live stream"
            >
              {isLoading ? (
                <div className="w-8 h-8 border-4 border-blue-950 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-10 h-10 sm:w-12 sm:h-12 fill-current" />
              ) : (
                <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-2" />
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs uppercase font-extrabold tracking-widest text-slate-300">
              {isPlaying ? 'UNASIKILIZA MOJA KWA MOJA' : 'BONYEZA HAPA KUSIKILIZA'}
            </p>
            <p className="text-xs text-blue-200/70 mt-0.5">
              Matangazo ya sauti safi bila kukatika masaa 24/7
            </p>
          </div>

          {/* Equalizer Bars */}
          <div className="flex items-end justify-center gap-1 h-10 w-48 px-2 py-1 bg-[#051528] rounded-xl border border-blue-900/60">
            {frequencies.slice(0, 12).map((val, idx) => (
              <div
                key={idx}
                className={`w-2 rounded-t-sm transition-all duration-100 ${
                  isPlaying ? 'bg-gradient-to-t from-yellow-400 to-amber-500' : 'bg-blue-900/60 h-2'
                }`}
                style={{ height: isPlaying ? `${Math.max(15, (val / 100) * 32)}px` : '4px' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Toolstrip: Audio Settings & Quick Studio WhatsApp Interaction */}
      <div className="pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Quality selector (64k data saver is essential for East Africa) */}
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-semibold flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-yellow-400" />
            Ubora:
          </span>
          <div className="flex items-center bg-[#051528] p-1 rounded-lg border border-blue-900/60">
            {(['64k', '128k', '256k'] as StreamQuality[]).map((q) => (
              <button
                key={q}
                id={`stream-quality-${q}`}
                onClick={() => setQuality(q)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  quality === q
                    ? 'bg-yellow-400 text-blue-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {q === '64k' ? '64k (Bando Nafuu)' : q === '128k' ? '128k (Kawaida)' : '256k (HD)'}
              </button>
            ))}
          </div>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-3">
          <button
            id="hero-mute-toggle-btn"
            onClick={toggleMute}
            className="p-2 rounded-lg bg-[#0b2442] border border-blue-800/80 text-slate-300 hover:text-white hover:border-blue-700 transition-colors"
            title={isMuted ? 'Washa Sauti' : 'Zima Sauti'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            id="hero-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 sm:w-28 accent-yellow-400 cursor-pointer h-1.5 bg-blue-950 rounded-lg"
            title={`Sauti: ${Math.round(volume * 100)}%`}
          />

          {/* Sleep Timer */}
          <div className="relative">
            <button
              id="hero-sleep-timer-btn"
              onClick={() => setShowSleepMenu(!showSleepMenu)}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                sleepTimerMinutes
                  ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40'
                  : 'bg-[#0b2442] border-blue-800/80 text-slate-300 hover:text-white'
              }`}
              title="Sleep Timer (Zima Baada ya Muda)"
            >
              <Moon className="w-3.5 h-3.5" />
              {sleepTimerMinutes && <span>{sleepTimerMinutes}m</span>}
            </button>

            {showSleepMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-[#0a2544] border border-blue-800 rounded-xl shadow-xl p-2 z-30 w-40 space-y-1">
                <p className="text-[11px] font-bold text-blue-200 px-2 py-1">Zima Redio Baada ya:</p>
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setSleepTimer(mins);
                      setShowSleepMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                      sleepTimerMinutes === mins ? 'bg-yellow-400 text-blue-950 font-bold' : 'text-slate-200 hover:bg-blue-900/60'
                    }`}
                  >
                    Dakika {mins}
                  </button>
                ))}
                {sleepTimerMinutes && (
                  <button
                    onClick={() => {
                      setSleepTimer(null);
                      setShowSleepMenu(false);
                    }}
                    className="w-full text-left px-2 py-1 rounded text-xs text-red-400 hover:bg-blue-900/60"
                  >
                    Ondoa Kipima Muda
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Share Stream button */}
          <button
            id="hero-share-stream-btn"
            onClick={handleShareStream}
            className="p-2 rounded-lg bg-[#0b2442] border border-blue-800/80 text-slate-300 hover:text-white hover:border-blue-700 transition-colors"
            title="Shiriki Matangazo ya Redio"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Studio WhatsApp / Contact Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            id="hero-whatsapp-studio-link"
            href={`https://wa.me/${STATION_INFO.whatsapp.replace(/\D/g, '')}?text=Habari%20Radio%20Joy%20FM,%20nasikiliza%20kipindi%20cha%20${encodeURIComponent(currentProgram.title)}...`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Studio</span>
          </a>

          <a
            id="hero-call-studio-link"
            href={`tel:${STATION_INFO.phoneStudio.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 bg-[#0b2442] hover:bg-blue-900 text-white font-bold px-3 py-1.5 rounded-xl border border-blue-800/80 transition-colors"
            title="Piga Simu Studio"
          >
            <Phone className="w-4 h-4 text-yellow-400" />
            <span className="hidden sm:inline">Piga Simu</span>
          </a>
        </div>
      </div>
    </div>
  );
};
