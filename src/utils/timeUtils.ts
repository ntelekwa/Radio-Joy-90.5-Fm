import { Program, ProgramPeriod } from '../types';

export interface TanzaniaTimeInfo {
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number; // 0 - 1439
  dayName: string; // e.g. 'Monday', 'Tuesday'
  daySwahili: string; // 'Jumatatu', etc.
  formattedTime12: string; // e.g. '08:15 AM'
  formattedTime24: string; // e.g. '08:15:20'
  dateFormatted: string; // e.g. 'Jumatatu, 14 Septemba 2026'
}

const SWAHILI_DAYS: Record<string, string> = {
  Monday: 'Jumatatu',
  Tuesday: 'Jumanne',
  Wednesday: 'Jumatano',
  Thursday: 'Alhamisi',
  Friday: 'Ijumaa',
  Saturday: 'Jumamosi',
  Sunday: 'Jumapili',
};

/**
 * Returns the current time in East Africa Time (EAT / UTC+3) — Tanzania local time.
 * Works consistently in any browser timezone.
 */
export function getTanzaniaTime(): TanzaniaTimeInfo {
  const now = new Date();

  // Extract time parts explicitly in Africa/Dar_es_Salaam timezone (UTC+3)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Dar_es_Salaam',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: 'long',
  });

  const parts = formatter.formatToParts(now);
  const hourPart = parts.find((p) => p.type === 'hour')?.value || '0';
  const minPart = parts.find((p) => p.type === 'minute')?.value || '0';
  const secPart = parts.find((p) => p.type === 'second')?.value || '0';
  const dayName = parts.find((p) => p.type === 'weekday')?.value || 'Monday';

  const hours = parseInt(hourPart, 10);
  const minutes = parseInt(minPart, 10);
  const seconds = parseInt(secPart, 10);
  const totalMinutes = hours * 60 + minutes;

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const formattedTime12 = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  const formattedTime24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const daySwahili = SWAHILI_DAYS[dayName] || dayName;

  const dateFormatted = new Intl.DateTimeFormat('sw-TZ', {
    timeZone: 'Africa/Dar_es_Salaam',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  return {
    hours,
    minutes,
    seconds,
    totalMinutes,
    dayName,
    daySwahili,
    formattedTime12,
    formattedTime24,
    dateFormatted,
  };
}

/**
 * Formats hour and minute into 12-hour format e.g. 06:00 AM
 */
export function formatTime12Hour(hour: number, minute: number): string {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${ampm}`;
}

/**
 * Returns formatted time slot string like "06:00 AM – 10:00 AM"
 */
export function formatProgramTimeRange(
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): string {
  return `${formatTime12Hour(startHour, startMinute)} – ${formatTime12Hour(endHour, endMinute)}`;
}

export interface ProgramProgressInfo {
  isOnAir: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  progressPercent: number; // 0 to 100
  elapsedMinutes: number;
  totalDurationMinutes: number;
  remainingMinutes: number;
  remainingSeconds: number;
  startsInMinutes: number;
  timeSlotFormatted: string;
}

/**
 * Calculates progress, status, and elapsed duration for a program against current Tanzania time.
 */
export function calculateProgramProgress(
  program: Program,
  tanzaniaTime: TanzaniaTimeInfo
): ProgramProgressInfo {
  const currentTotal = tanzaniaTime.totalMinutes;
  const startTotal = program.startHour * 60 + program.startMinute;
  let endTotal = program.endHour * 60 + program.endMinute;

  // Handle midnight wrap (e.g. 22:00 to 06:00)
  if (endTotal <= startTotal) {
    endTotal += 24 * 60;
  }

  let adjustedCurrentTotal = currentTotal;
  if (adjustedCurrentTotal < startTotal && program.startHour > program.endHour) {
    adjustedCurrentTotal += 24 * 60;
  }

  const durationMinutes = Math.max(1, endTotal - startTotal);
  const timeSlotFormatted = formatProgramTimeRange(
    program.startHour,
    program.startMinute,
    program.endHour,
    program.endMinute
  );

  const isOnAir = adjustedCurrentTotal >= startTotal && adjustedCurrentTotal < endTotal;
  const isPast = adjustedCurrentTotal >= endTotal;
  const isUpcoming = adjustedCurrentTotal < startTotal;

  let elapsedMinutes = 0;
  let remainingMinutes = 0;
  let remainingSeconds = 0;
  let progressPercent = 0;
  let startsInMinutes = 0;

  if (isOnAir) {
    elapsedMinutes = adjustedCurrentTotal - startTotal;
    remainingMinutes = Math.max(0, endTotal - adjustedCurrentTotal);
    remainingSeconds = Math.max(0, remainingMinutes * 60 - tanzaniaTime.seconds);
    progressPercent = Math.min(100, Math.max(0, Math.round(((elapsedMinutes * 60 + tanzaniaTime.seconds) / (durationMinutes * 60)) * 100)));
  } else if (isUpcoming) {
    startsInMinutes = startTotal - adjustedCurrentTotal;
    if (startsInMinutes < 0) startsInMinutes += 24 * 60;
  }

  return {
    isOnAir,
    isUpcoming,
    isPast,
    progressPercent,
    elapsedMinutes,
    totalDurationMinutes: durationMinutes,
    remainingMinutes,
    remainingSeconds,
    startsInMinutes,
    timeSlotFormatted,
  };
}

export interface ActiveScheduleResult {
  currentProgram: Program | null;
  nextProgram: Program | null;
  currentProgress: ProgramProgressInfo | null;
  isGap: boolean;
  tanzaniaTime: TanzaniaTimeInfo;
  gapNotice?: {
    title: string;
    message: string;
    nextShowStartsInMinutes: number;
  };
}

/**
 * Finds which program is on air and which is next based on current Tanzania time.
 * If in a gap between scheduled programs, gracefully returns null for currentProgram and sets isGap: true.
 */
export function resolveCurrentSchedule(
  programs: Program[],
  tanzaniaTime: TanzaniaTimeInfo = getTanzaniaTime()
): ActiveScheduleResult {
  if (!programs || programs.length === 0) {
    return {
      currentProgram: null,
      nextProgram: null,
      currentProgress: null,
      isGap: true,
      tanzaniaTime,
    };
  }

  // Sort programs by start time in minutes
  const sorted = [...programs].sort((a, b) => {
    const aStart = a.startHour * 60 + a.startMinute;
    const bStart = b.startHour * 60 + b.startMinute;
    return aStart - bStart;
  });

  const currentTotal = tanzaniaTime.totalMinutes;

  let active: Program | null = null;
  let activeProgress: ProgramProgressInfo | null = null;

  for (const prog of sorted) {
    const progInfo = calculateProgramProgress(prog, tanzaniaTime);
    if (progInfo.isOnAir) {
      active = prog;
      activeProgress = progInfo;
      break;
    }
  }

  let next: Program | null = null;

  if (active) {
    // Find the next program following active
    const activeIdx = sorted.findIndex((p) => p.id === active?.id);
    next = sorted[(activeIdx + 1) % sorted.length];
  } else {
    // We are currently in a gap between programs!
    // Find the next upcoming program today whose startTotal > currentTotal
    for (const prog of sorted) {
      const startTotal = prog.startHour * 60 + prog.startMinute;
      if (startTotal > currentTotal) {
        next = prog;
        break;
      }
    }
    // If no program starts later today, the next one is the first program tomorrow morning (e.g. 06:00 AM)
    if (!next) {
      next = sorted[0];
    }
  }

  const isGap = !active;
  let gapNotice: ActiveScheduleResult['gapNotice'] = undefined;

  if (isGap && next) {
    const nextStartTotal = next.startHour * 60 + next.startMinute;
    let diff = nextStartTotal - currentTotal;
    if (diff < 0) diff += 24 * 60;

    gapNotice = {
      title: 'Muziki na Matangazo ya Moja kwa Moja',
      message: 'Hakuna kipindi kilichopangwa sasa (Kipindi kijacho kiko tayari kuanza). Redio inaendelea kupiga vibao bora 24/7.',
      nextShowStartsInMinutes: diff,
    };
  }

  return {
    currentProgram: active,
    nextProgram: next,
    currentProgress: activeProgress,
    isGap,
    tanzaniaTime,
    gapNotice,
  };
}
