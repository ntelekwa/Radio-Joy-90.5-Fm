import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Radio,
  Bell,
  BellRing,
  Sparkles,
  MessageCircle,
  Play,
  User,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Timer,
  Volume2
} from 'lucide-react';
import { Program, ActiveTab, ProgramPeriod } from '../types';
import { useRadio } from '../context/RadioContext';
import { calculateProgramProgress, formatProgramTimeRange } from '../utils/timeUtils';
import { ProgramScheduleSection } from '../components/ProgramScheduleSection';

interface ProgramsViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ setActiveTab }) => {
  const {
    programs,
    activeLiveProgram,
    nextProgram,
    isScheduleGap,
    gapNotice,
    tanzaniaTime,
    currentProgress,
    isPlaying,
    play,
    togglePlay,
  } = useRadio();

  const [selectedDay, setSelectedDay] = useState<string>('Kila Siku');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reminders, setReminders] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const DAYS = ['Kila Siku', 'Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'];
  const PERIODS = ['All', 'Morning', 'Afternoon', 'Evening', 'Night'];

  const toggleReminder = (programId: string, programTitle: string) => {
    if (reminders.includes(programId)) {
      setReminders(reminders.filter((id) => id !== programId));
      showToast(`Kikumbusho cha kipindi cha "${programTitle}" kimeondolewa.`);
    } else {
      setReminders([...reminders, programId]);
      showToast(`✓ Umeweka kikumbusho cha "${programTitle}"! Utajulishwa kinapoanza.`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter programs by day, period, and search query
  const filteredPrograms = programs.filter((p) => {
    // Day match
    const matchesDay =
      selectedDay === 'Kila Siku' ||
      p.days.includes(selectedDay) ||
      p.days.includes('Kila Siku');

    // Period match
    const matchesPeriod =
      selectedPeriod === 'All' || p.period.toLowerCase() === selectedPeriod.toLowerCase();

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.hostName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.genre.toLowerCase().includes(q);

    return matchesDay && matchesPeriod && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-yellow-400 text-blue-950 px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <BellRing className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Timezone Notice & Admin Link */}
      <div className="border-b border-blue-900/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
              <Calendar className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
              Ratiba ya Vipindi (Radio Program Schedule)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
            Masaa ya Tanzania (East Africa Time, EAT / UTC+3) • Radio Joy 90.5 FM Kigoma
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#071d36] border border-blue-800 px-3.5 py-2 rounded-xl text-right">
            <div className="text-xs font-mono font-black text-yellow-400">
              {tanzaniaTime.formattedTime24} EAT
            </div>
            <div className="text-[10px] text-blue-200/60 font-medium">
              {tanzaniaTime.daySwahili}, {tanzaniaTime.formattedTime12}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('admin')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#082344] hover:bg-[#0c2f5a] border border-blue-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            title="Ingia kwenye Dashibodi ya Utawala kuhariri ratiba"
          >
            <Lock className="w-3.5 h-3.5 text-yellow-400" />
            <span>Admin Schedule</span>
          </button>
        </div>
      </div>

      {/* NOW ON AIR & UP NEXT HERO BANNER */}
      <ProgramScheduleSection
        onOpenLiveRadio={() => setActiveTab('radio')}
        showFullTimeline={false}
      />

      {/* Interactive Filters: Search, Days, Periods */}
      <div className="space-y-3 bg-[#071d36]/60 p-4 sm:p-5 rounded-3xl border border-blue-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tafuta kipindi, mtangazaji au mada..."
              className="w-full bg-[#041224] border border-blue-900/80 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Period Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PERIODS.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  selectedPeriod === period
                    ? 'bg-yellow-400 text-blue-950 font-black shadow-sm'
                    : 'bg-[#041224] text-slate-300 hover:bg-[#092242] border border-blue-900/60'
                }`}
              >
                {period === 'All' ? 'Nyakati Zote' : period}
              </button>
            ))}
          </div>
        </div>

        {/* Days Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-blue-900/40">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
            Siku:
          </span>
          {DAYS.map((day) => (
            <button
              key={day}
              id={`prog-day-${day}`}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                selectedDay === day
                  ? 'bg-yellow-400 text-blue-950 shadow-md shadow-yellow-400/20'
                  : 'bg-[#041224] text-slate-300 hover:bg-[#092242] border border-blue-900/60'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Schedule List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Orodha ya Vipindi ({filteredPrograms.length}):
          </h3>
          <span className="text-xs text-blue-300 font-mono">
            {selectedDay} • {selectedPeriod}
          </span>
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="p-8 text-center bg-[#071d36]/40 rounded-3xl border border-blue-900/60">
            <p className="text-sm text-slate-300">Hakuna kipindi kilichopatikana kwa vigezo hivi.</p>
            <button
              onClick={() => {
                setSelectedDay('Kila Siku');
                setSelectedPeriod('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-yellow-400 underline"
            >
              Ondoa vichujio vyote
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrograms.map((program) => {
              const progInfo = calculateProgramProgress(program, tanzaniaTime);
              const isLive = progInfo.isOnAir;
              const hasReminder = reminders.includes(program.id);

              return (
                <div
                  key={program.id}
                  id={`program-row-${program.id}`}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all ${
                    isLive
                      ? 'bg-gradient-to-r from-[#0d2a4d] to-[#071d36] border-yellow-400 shadow-xl ring-2 ring-yellow-400/30'
                      : 'bg-[#071d36]/60 border-blue-900/60 hover:border-blue-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Time & Details */}
                    <div className="flex items-start gap-4">
                      <img
                        src={program.hostAvatar}
                        alt={program.hostName}
                        className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-blue-800/80 shadow-md"
                      />

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/20 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{program.timeSlot}</span>
                          </span>

                          <span className="text-xs text-blue-200/80 font-semibold bg-[#041224] px-2 py-0.5 rounded-md border border-blue-900/50">
                            {program.period}
                          </span>

                          <span className="text-xs text-blue-200/70 font-semibold">
                            {program.genre}
                          </span>

                          {isLive && (
                            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>HEWANI SASA (ON AIR)</span>
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-black text-white flex items-center gap-1.5">
                          <span>🎙️ {program.title}</span>
                        </h4>

                        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                          {program.description}
                        </p>

                        <p className="text-xs text-slate-400 pt-1">
                          Mtangazaji: <span className="text-yellow-400 font-medium">{program.hostName}</span> ({program.hostRole})
                        </p>

                        {/* Progress Bar for Current Show */}
                        {isLive && (
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

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                      <button
                        id={`reminder-btn-${program.id}`}
                        onClick={() => toggleReminder(program.id, program.title)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          hasReminder
                            ? 'bg-yellow-400 text-blue-950 border-yellow-300 font-black'
                            : 'bg-[#051528] text-slate-300 border-blue-900/60 hover:text-white'
                        }`}
                        title={hasReminder ? 'Ondoa Kikumbusho' : 'Weka Kikumbusho'}
                      >
                        {hasReminder ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4 text-yellow-400" />}
                        <span className="hidden sm:inline">{hasReminder ? 'Kikumbusho Kimewekwa' : 'Kikumbusho'}</span>
                      </button>

                      {isLive ? (
                        <button
                          onClick={() => {
                            setActiveTab('radio');
                            if (!isPlaying) play();
                          }}
                          className="p-2.5 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 font-black text-xs flex items-center gap-1.5 transition-colors shadow-md hover:scale-105"
                        >
                          <Radio className="w-4 h-4" />
                          <span>Sikiliza Sasa Live</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('contact')}
                          className="p-2.5 rounded-xl bg-[#051528] border border-blue-900/60 hover:border-blue-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-yellow-400" />
                          <span className="hidden sm:inline">Ujumbe kwa Show</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
