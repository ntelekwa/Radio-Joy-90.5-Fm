import React, { useState } from 'react';
import { Play, Pause, Radio, Volume2, VolumeX, Users, Sparkles, MessageCircle, Phone, Clock, Send, ThumbsUp, RadioTower, Wifi, Moon, Share2, Check, AlertCircle } from 'lucide-react';
import { useRadio } from '../context/RadioContext';
import { STATION_INFO, PROGRAMS, INITIAL_SHOUTOUTS, FREQUENCIES } from '../data/mockData';
import { ShoutoutMessage, StreamQuality, ActiveTab } from '../types';

interface LiveRadioViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const LiveRadioView: React.FC<LiveRadioViewProps> = ({ setActiveTab }) => {
  const {
    isPlaying,
    isLoading,
    togglePlay,
    currentProgram,
    nextProgram,
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
    streamError,
    retryStream,
  } = useRadio();

  const [shoutouts, setShoutouts] = useState<ShoutoutMessage[]>(INITIAL_SHOUTOUTS);
  const [senderName, setSenderName] = useState('');
  const [senderLocation, setSenderLocation] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [shoutoutSuccess, setShoutoutSuccess] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSendShoutout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;

    const newShoutout: ShoutoutMessage = {
      id: `sh-${Date.now()}`,
      senderName: senderName.trim(),
      location: senderLocation.trim() || 'Dar es Salaam',
      message: senderMessage.trim(),
      timestamp: 'Muda mfupi uliopita',
      likes: 1,
      programTitle: currentProgram.title,
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setSenderName('');
    setSenderLocation('');
    setSenderMessage('');
    setShoutoutSuccess(true);
    setTimeout(() => setShoutoutSuccess(false), 4000);
  };

  const handleLikeShoutout = (id: string) => {
    setShoutouts(shoutouts.map(s => (s.id === id ? { ...s, likes: s.likes + 1 } : s)));
  };

  const handleShareRadio = async () => {
    const text = `Sikiliza Radio Joy 90.5 FM Moja kwa Moja sasa! Kipindi: ${currentProgram.title}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Radio Joy 90.5 FM Live',
          text,
          url: window.location.href,
        });
      } catch (e) {
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Studio Header Stage */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a2544] via-[#071d36] to-[#041021] border border-yellow-400/30 p-6 sm:p-10 shadow-2xl">
        {/* Glow ambient lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          {/* Live Badge & Station Identity */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/60 px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-black text-red-400 uppercase tracking-widest">
                HEWANI MOJA KWA MOJA
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0b2442] border border-blue-800/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-200">
              <Users className="w-3.5 h-3.5 text-yellow-400" />
              <span>{listenerCount.toLocaleString()} Wanasikiliza Sasa</span>
            </div>
          </div>

          {/* Station Brand */}
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 flex-shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
                {STATION_INFO.name}
              </h1>
              <span className="bg-yellow-400 text-blue-950 text-sm font-black px-2.5 py-1 rounded-lg shadow-sm">
                {STATION_INFO.frequency}
              </span>
            </div>
            <p className="text-sm text-blue-200/80">
              Kigoma & Tanzania Nzima • 90.5 MHz
            </p>
          </div>

          {/* Current Program Card */}
          <div className="w-full bg-[#0b2442]/90 border border-blue-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-yellow-400/10 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 shadow-md">
                  <Radio className="w-10 h-10" />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  ON AIR
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
                  {currentProgram.timeSlot} • {currentProgram.genre}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
                  {currentProgram.title}
                </h2>
                <p className="text-xs text-yellow-300/90 mt-1.5 italic">
                  Mada ya Leo: "{currentProgram.currentTopic}"
                </p>
              </div>
            </div>

            {/* Live Audio Visualizer Equalizer */}
            <div className="pt-3 border-t border-blue-900/60 flex flex-col items-center gap-2">
              <div className="flex items-end justify-center gap-1.5 h-16 w-full max-w-md px-4 py-2 bg-[#051528] rounded-xl border border-blue-900/80">
                {frequencies.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t-sm transition-all duration-100 ${
                      isPlaying
                        ? 'bg-gradient-to-t from-yellow-400 via-amber-400 to-red-500'
                        : 'bg-blue-900/50 h-2'
                    }`}
                    style={{ height: isPlaying ? `${Math.max(10, (val / 100) * 54)}px` : '4px' }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-blue-300/70 font-mono tracking-widest uppercase">
                {isPlaying ? 'AUDIO SPECTRUM • LIVE BROADCAST STREAM' : 'BONYEZA PLAY KUWASHA REDIO'}
              </span>
            </div>
          </div>

          {/* Stream Error Notice if applicable */}
          {streamError && (
            <div className="w-full bg-red-950/60 border border-red-500/40 rounded-xl p-3 text-xs text-red-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{streamError}</span>
              </div>
              <button
                onClick={retryStream}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
              >
                Jaribu Tena
              </button>
            </div>
          )}

          {/* Giant Studio Play/Pause Controller */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <button
              id="studio-main-play-btn"
              onClick={togglePlay}
              disabled={isLoading}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none ${
                isPlaying
                  ? 'bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 text-white shadow-red-500/50 scale-105 ring-8 ring-red-500/20'
                  : 'bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-500 text-blue-950 shadow-yellow-400/40 hover:scale-105 active:scale-95 ring-8 ring-yellow-400/20'
              }`}
              title={isPlaying ? 'Sitisha' : 'Sikiliza Moja kwa Moja'}
            >
              {isLoading ? (
                <div className="w-10 h-10 border-4 border-blue-950 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-12 h-12 sm:w-14 sm:h-14 fill-current" />
              ) : (
                <Play className="w-12 h-12 sm:w-14 sm:h-14 fill-current ml-2" />
              )}
            </button>
          </div>

          {/* Sound Controls Toolstrip */}
          <div className="flex flex-wrap items-center justify-center gap-4 bg-[#051528]/90 p-3 rounded-2xl border border-blue-900/60 text-xs w-full">
            {/* Bitrate */}
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">Ubora wa Sauti:</span>
              <div className="flex items-center bg-[#0b2442] p-1 rounded-lg border border-blue-800/80">
                {(['64k', '128k', '256k'] as StreamQuality[]).map((q) => (
                  <button
                    key={q}
                    id={`radio-view-quality-${q}`}
                    onClick={() => setQuality(q)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                      quality === q
                        ? 'bg-yellow-400 text-blue-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {q === '64k' ? '64k (Bando)' : q === '128k' ? '128k' : '256k HD'}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900/60 transition-colors"
                title={isMuted ? 'Washa Sauti' : 'Zima Sauti'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-yellow-400 cursor-pointer h-1.5 bg-blue-950 rounded-lg"
              />
            </div>

            {/* Sleep Timer */}
            <button
              onClick={() => setShowSleepMenu(!showSleepMenu)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                sleepTimerMinutes
                  ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40'
                  : 'bg-[#0b2442] border-blue-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{sleepTimerMinutes ? `Zima (${sleepTimerMinutes}m)` : 'Sleep Timer'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShareRadio}
              className="px-3 py-1.5 rounded-xl bg-[#0b2442] border border-blue-800/80 hover:border-blue-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Imenakiliwa' : 'Shiriki Redio'}</span>
            </button>
          </div>

          {/* Quick Studio Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
            <a
              id="radio-whatsapp-btn"
              href={STATION_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Studio ({STATION_INFO.whatsapp})</span>
            </a>

            <a
              id="radio-phone-btn"
              href={`tel:${STATION_INFO.phoneStudio.replace(/\s+/g, '')}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#0b2442] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl border border-blue-800/80 shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>Piga Simu Studio ({STATION_INFO.phoneStudio})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Live Shoutouts / Comments & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Shoutouts Feed */}
        <div className="lg:col-span-7 bg-[#071d36] border border-blue-900/60 rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Salamu za Wasikilizaji (Live Shoutouts)
              </h3>
              <p className="text-xs text-blue-200/70">
                Tuma ujumbe au omba wimbo wako uchezwe hewani sasa
              </p>
            </div>
            <span className="bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full border border-yellow-400/20">
              Live Feed
            </span>
          </div>

          {/* Form to submit shoutout */}
          <form onSubmit={handleSendShoutout} className="bg-[#051528] p-4 rounded-2xl border border-blue-900/60 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400">
              Tuma Ujumbe Moja kwa Moja Studio:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Jina Lako (mf. Juma Mwita)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
                className="bg-[#0b2442] border border-blue-800/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="text"
                placeholder="Eneo / Mkoa (mf. Kasulu au Kigoma Mjini)"
                value={senderLocation}
                onChange={(e) => setSenderLocation(e.target.value)}
                className="bg-[#0b2442] border border-blue-800/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <textarea
              placeholder="Andika ujumbe wako au ombi la wimbo hapa..."
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
              required
              rows={2}
              className="w-full bg-[#0b2442] border border-blue-800/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-blue-200/70">
                Ujumbe utatumwa kwenye skrini ya mtangazaji studio
              </span>
              <button
                type="submit"
                id="submit-shoutout-btn"
                className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Tuma Studio</span>
              </button>
            </div>

            {shoutoutSuccess && (
              <div className="bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs p-2.5 rounded-xl text-center font-semibold animate-in fade-in">
                ✓ Ujumbe wako umetumwa kikamilifu studio! Utasomwa hewani muda mfupi ujao.
              </div>
            )}
          </form>

          {/* List of shoutouts */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {shoutouts.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#051528] border border-blue-900/60 space-y-1.5 hover:border-blue-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{item.senderName}</span>
                    <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
                      {item.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  "{item.message}"
                </p>

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                  <span className="italic text-blue-300/60">Kipindi: {item.programTitle}</span>
                  <button
                    onClick={() => handleLikeShoutout(item.id)}
                    className="flex items-center gap-1 hover:text-yellow-400 text-slate-300 transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Full 24/7 Today's Schedule & Frequency Tower */}
        <div className="lg:col-span-5 space-y-6">
          {/* Schedule */}
          <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-black text-white tracking-tight">
                  Ratiba ya Leo Masaa 24
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('programs')}
                className="text-xs font-bold text-yellow-400 hover:underline"
              >
                Vipindi Vyote
              </button>
            </div>

            <div className="space-y-2.5">
              {PROGRAMS.map((prog) => {
                const isCurrent = prog.id === currentProgram.id;
                return (
                  <div
                    key={prog.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-yellow-400/10 border-yellow-400/50 shadow-md ring-1 ring-yellow-400/20'
                        : 'bg-[#051528] border-blue-900/60 hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-yellow-400">
                        {prog.timeSlot}
                      </span>
                      {isCurrent && (
                        <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                          ON AIR SASA
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1">
                      {prog.title}
                    </h4>
                    <p className="text-[11px] text-blue-200/70">
                      {prog.genre}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Masafa / Frequencies Card */}
          <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <RadioTower className="w-4 h-4 text-yellow-400" />
              <h4 className="text-sm font-bold text-white">Usikivu & Masafa Yetu (90.5 FM)</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {FREQUENCIES.map((f) => (
                <div key={f.city} className="bg-[#051528] p-2.5 rounded-xl border border-blue-900/60">
                  <p className="text-[11px] text-slate-300 font-medium truncate">{f.city.split('&')[0]}</p>
                  <p className="text-sm font-black text-yellow-400 font-mono mt-0.5">{f.frequency}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
