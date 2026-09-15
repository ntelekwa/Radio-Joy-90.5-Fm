import React, { useState } from 'react';
import {
  Clock,
  Radio,
  Play,
  Pause,
  Sparkles,
  Mic,
  Calendar,
  Volume2,
  ChevronRight,
  Bell,
  BellRing,
  CheckCircle2,
  AlertCircle,
  Timer
} from 'lucide-react';
import { useRadio } from '../context/RadioContext';
import { Program, ProgramPeriod } from '../types';
import { calculateProgramProgress, formatProgramTimeRange } from '../utils/timeUtils';

interface ProgramScheduleSectionProps {
  onOpenLiveRadio?: () => void;
  showFullTimeline?: boolean;
  compact?: boolean;
}

export const ProgramScheduleSection: React.FC<ProgramScheduleSectionProps> = ({
  onOpenLiveRadio,
  showFullTimeline = true,
  compact = false,
}) => {
  const {
    programs,
    activeLiveProgram,
    nextProgram,
    isScheduleGap,
    gapNotice,
    tanzaniaTime,
    currentProgress,
    isPlaying,
    isLoading,
    togglePlay,
    play,
  } = useRadio();

  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [reminders, setReminders] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleReminder = (progId: string, progTitle: string) => {
    if (reminders.includes(progId)) {
      setReminders(reminders.filter((id) => id !== progId));
      showToast(`Kikumbusho cha "${progTitle}" kimeondolewa.`);
    } else {
      setReminders([...reminders, progId]);
      showToast(`✓ Umeweka kikumbusho cha "${progTitle}"! Utajulishwa kinapoanza.`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter programs if period selected
  const filteredPrograms = programs.filter((p) => {
    if (selectedPeriod === 'All') return true;
    return p.period.toLowerCase() === selectedPeriod.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-yellow-400 text-blue-950 px-4 py-2.5 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <BellRing className="w-4 h-4 text-blue-950 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar with EAT Tanzania Local Time */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#071d36]/90 border border-blue-900/80 p-4 sm:p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex-shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Ratiba ya Vipindi (Program Schedule)</span>
            </h2>
            <p className="text-xs text-blue-200/70">
              Vipindi mubashara vya Joy 90.5 FM kwa saa za Tanzania (EAT / UTC+3)
            </p>
          </div>
        </div>

        {/* Live EAT Clock */}
        <div className="flex items-center gap-2.5 bg-[#041224] border border-blue-800/80 px-3.5 py-2 rounded-xl text-xs font-semibold self-start sm:self-center">
          <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
          <div className="text-right">
            <div className="font-mono text-xs sm:text-sm font-black text-yellow-400">
              {tanzaniaTime.formattedTime24} <span className="text-[10px] text-slate-300">EAT</span>
            </div>
            <div className="text-[10px] text-blue-200/60 font-medium">
              {tanzaniaTime.daySwahili}, {tanzaniaTime.formattedTime12}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Spotlight Cards: NOW ON AIR & UP NEXT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* NOW ON AIR Card (Larger) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0c2c54] via-[#08203e] to-[#041122] border-2 border-yellow-400/40 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-red-600/90 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>NOW ON AIR</span>
                </span>
                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
                  LIVE NOW
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-blue-200/80 bg-[#06172b] px-3 py-1 rounded-full border border-blue-900/60">
                Tanzania Time (UTC+3)
              </span>
            </div>

            {/* Active Program Details or Gap Display */}
            {activeLiveProgram ? (
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 flex-shrink-0 shadow-lg">
                    <Radio className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-yellow-400/90 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeLiveProgram.timeSlot}</span>
                      <span className="text-blue-300">• {activeLiveProgram.period}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight flex items-center gap-2">
                      <span>🎙️ {activeLiveProgram.title}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                      {activeLiveProgram.description}
                    </p>

                    <p className="text-xs text-yellow-400/90 pt-0.5 font-semibold">
                      Aina ya Kipindi: <span className="text-white">{activeLiveProgram.genre}</span>
                    </p>
                  </div>
                </div>

                {/* Progress Indicator */}
                {currentProgress && (
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-semibold flex items-center gap-1 text-yellow-400">
                        <Timer className="w-3.5 h-3.5" />
                        <span>Dakika {currentProgress.elapsedMinutes} zimepita ({currentProgress.progressPercent}%)</span>
                      </span>
                      <span className="text-slate-400">
                        Zimebaki: <strong>{currentProgress.remainingMinutes}m</strong>
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-[#030d1a] rounded-full h-2.5 overflow-hidden border border-blue-900/60 shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-1000"
                        style={{ width: `${currentProgress.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Gap handling: No scheduled program active right now */
              <div className="p-4 rounded-2xl bg-[#041426]/90 border border-blue-900/80 space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Hakuna Kipindi Kilichopangwa Sasa (No scheduled program)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Redio inaendelea kurusha matangazo na muziki mseto masaa 24. Unaweza kuendelea kusikiliza redio mubashara hapa chini!
                </p>
                {gapNotice && nextProgram && (
                  <div className="text-xs font-semibold text-blue-200/90 pt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" />
                    <span>
                      Kipindi kijacho cha <strong>{nextProgram.title}</strong> kitaanza saa <strong>{nextProgram.timeSlot}</strong>.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Footer: LISTEN LIVE button */}
          <div className="mt-5 pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <button
              id="schedule-listen-live-btn"
              onClick={() => {
                if (onOpenLiveRadio) onOpenLiveRadio();
                if (!isPlaying) play();
              }}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg hover:scale-105 active:scale-95 ${
                isPlaying
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-600/30 ring-2 ring-red-500/40'
                  : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-blue-950 shadow-yellow-400/30'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>UNASIKILIZA MOJA KWA MOJA (PLAYING)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>LISTEN LIVE (SIKILIZA LIVE)</span>
                </>
              )}
            </button>

            <span className="text-xs text-blue-200/70 font-medium flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-yellow-400" />
              <span>90.5 FM Kigoma & Mtandaoni</span>
            </span>
          </div>
        </div>

        {/* UP NEXT Card */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#071d36]/90 border border-blue-800/80 p-5 sm:p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-black uppercase px-3 py-1 rounded-full">
                UP NEXT (INAYOFUATA)
              </span>

              {nextProgram && (
                <span className="text-xs font-mono text-yellow-400 font-bold">
                  {nextProgram.timeSlot}
                </span>
              )}
            </div>

            {nextProgram ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-900/50 border border-blue-800 flex items-center justify-center text-yellow-400 flex-shrink-0">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                      {nextProgram.period} • {nextProgram.genre}
                    </span>
                    <h4 className="text-lg font-black text-white leading-snug">
                      {nextProgram.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {nextProgram.description}
                    </p>
                  </div>
                </div>

                <div className="bg-[#051528] rounded-2xl p-3 border border-blue-900/60 space-y-1">
                  <p className="text-xs text-blue-200/80">
                    Mada: <span className="text-white font-medium">{nextProgram.currentTopic}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Hakuna kipindi kingine kilichoorodheshwa leo.</p>
            )}
          </div>

          {nextProgram && (
            <div className="pt-4 mt-4 border-t border-blue-900/60 flex items-center justify-between">
              <button
                id={`remind-next-${nextProgram.id}`}
                onClick={() => toggleReminder(nextProgram.id, nextProgram.title)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  reminders.includes(nextProgram.id)
                    ? 'bg-yellow-400 text-blue-950 font-bold'
                    : 'bg-[#051528] hover:bg-[#0c2a4d] border border-blue-900 text-slate-300 hover:text-white'
                }`}
              >
                {reminders.includes(nextProgram.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kikumbusho Kimewekwa</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Niwekee Kikumbusho</span>
                  </>
                )}
              </button>

              <span className="text-xs text-slate-400">
                Inaanza: <strong className="text-white">{nextProgram.startTimeFormatted || nextProgram.timeSlot}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. FULL PROGRAM SCHEDULE TIMELINE (Required Layout) */}
      {showFullTimeline && (
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/60 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>Ratiba Kamili ya Vipindi (Full Daily Lineup)</span>
              </h3>
              <p className="text-xs text-blue-200/70">
                Vipindi vya kila siku kwa mpangilio wa masaa ya Tanzania (EAT)
              </p>
            </div>

            {/* Period Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Morning', 'Afternoon', 'Evening', 'Night'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                    selectedPeriod === period
                      ? 'bg-yellow-400 text-blue-950 font-black shadow'
                      : 'bg-[#06182c] text-slate-300 hover:bg-[#0a2747] border border-blue-900/60'
                  }`}
                >
                  {period === 'All' ? 'Vipindi Vyote' : period}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Cards Grid */}
          <div className="space-y-3.5">
            {filteredPrograms.map((prog, index) => {
              const progInfo = calculateProgramProgress(prog, tanzaniaTime);
              const isCurrent = progInfo.isOnAir;
              const isReminded = reminders.includes(prog.id);

              return (
                <div
                  key={prog.id}
                  id={`schedule-item-${prog.id}`}
                  className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#0d2a4d] to-[#071d36] border-yellow-400 shadow-xl ring-2 ring-yellow-400/30'
                      : 'bg-[#071d36]/70 border-blue-900/60 hover:border-blue-700/80'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Time & Information */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-900/40 border border-blue-800/70 flex items-center justify-center text-yellow-400 flex-shrink-0 shadow-sm">
                        <Radio className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        {/* Tags / Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-md border border-yellow-400/20 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{prog.timeSlot}</span>
                          </span>

                          <span className="text-[11px] font-semibold text-blue-300 bg-[#041222] px-2 py-0.5 rounded-md border border-blue-900/40">
                            {prog.period}
                          </span>

                          {isCurrent && (
                            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>ON AIR SASA</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Host */}
                        <h4 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                          <span>🎙️ {prog.title}</span>
                        </h4>

                        <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">
                          {prog.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-slate-400">
                          <span className="text-yellow-400/90 font-medium">{prog.genre}</span>
                        </div>

                        {/* Progress bar inside active item */}
                        {isCurrent && (
                          <div className="pt-2 max-w-md space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-300 font-semibold">
                              <span>Muda uliopita: {progInfo.elapsedMinutes}m ({progInfo.progressPercent}%)</span>
                              <span>Imebaki: {progInfo.remainingMinutes}m</span>
                            </div>
                            <div className="w-full bg-[#030d1a] rounded-full h-2 overflow-hidden border border-yellow-400/30">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                                style={{ width: `${progInfo.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2.5 self-end md:self-center flex-shrink-0">
                      <button
                        id={`schedule-remind-btn-${prog.id}`}
                        onClick={() => toggleReminder(prog.id, prog.title)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                          isReminded
                            ? 'bg-yellow-400 text-blue-950 border-yellow-300 font-bold'
                            : 'bg-[#051528] text-slate-300 border-blue-900 hover:text-white hover:border-blue-700'
                        }`}
                        title="Weka Kikumbusho"
                      >
                        {isReminded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5 text-yellow-400" />}
                        <span className="hidden sm:inline">{isReminded ? 'Kikumbusho Kimewekwa' : 'Kikumbusho'}</span>
                      </button>

                      {isCurrent ? (
                        <button
                          id={`schedule-play-now-${prog.id}`}
                          onClick={() => {
                            if (onOpenLiveRadio) onOpenLiveRadio();
                            if (!isPlaying) play();
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 font-black text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-transform"
                        >
                          <Radio className="w-3.5 h-3.5" />
                          <span>Sikiliza Sasa</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono hidden lg:inline">
                          {prog.startTimeFormatted} EAT
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
