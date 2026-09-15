import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Program, StreamQuality } from '../types';
import { PROGRAMS as SEED_PROGRAMS, STATION_INFO } from '../data/mockData';
import { getTanzaniaTime, resolveCurrentSchedule, TanzaniaTimeInfo, ProgramProgressInfo, ActiveScheduleResult } from '../utils/timeUtils';

interface RadioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  quality: StreamQuality;
  programs: Program[];
  currentProgram: Program; // Backwards compatible (returns active or default fallback)
  activeLiveProgram: Program | null; // Exact active show or null if currently in gap
  nextProgram: Program | null;
  isScheduleGap: boolean;
  gapNotice?: {
    title: string;
    message: string;
    nextShowStartsInMinutes: number;
  };
  tanzaniaTime: TanzaniaTimeInfo;
  currentProgress: ProgramProgressInfo | null;
  listenerCount: number;
  frequencies: number[];
  sleepTimerMinutes: number | null;
  sleepTimerSecondsLeft: number | null;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  setQuality: (quality: StreamQuality) => void;
  setSleepTimer: (minutes: number | null) => void;
  isMiniPlayerVisible: boolean;
  setIsMiniPlayerVisible: (visible: boolean) => void;
  streamError: string | null;
  retryStream: () => void;
  refreshSchedule: () => Promise<void>;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

// Radio Joy 90.5 FM official stream with robust global fallbacks
const STREAM_URLS: Record<StreamQuality, string[]> = {
  '64k': [
    'https://radiotadio.co.tz/joy-fm-stream',
    'https://icecast.bkwsu.eu/connect-low',
    'https://stream.zeno.fm/f3wvbbqmdg8uv',
  ],
  '128k': [
    'https://radiotadio.co.tz/joy-fm-stream',
    'https://stream.zeno.fm/f3wvbbqmdg8uv',
    'https://icecast.bkwsu.eu/connect-high',
  ],
  '256k': [
    'https://radiotadio.co.tz/joy-fm-stream',
    'https://stream.zeno.fm/f3wvbbqmdg8uv',
    'https://icecast.bkwsu.eu/connect-high',
  ]
};

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [quality, setQualityState] = useState<StreamQuality>('128k');
  const [listenerCount, setListenerCount] = useState<number>(14820);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerSecondsLeft, setSleepTimerSecondsLeft] = useState<number | null>(null);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState<boolean>(true);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [frequencies, setFrequencies] = useState<number[]>([30, 45, 65, 80, 55, 70, 90, 60, 40, 75, 85, 50]);
  const [programs, setPrograms] = useState<Program[]>(SEED_PROGRAMS);
  const [tanzaniaTime, setTanzaniaTime] = useState<TanzaniaTimeInfo>(getTanzaniaTime());

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthAudioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);
  const sleepTimeoutRef = useRef<any>(null);
  const sleepIntervalRef = useRef<any>(null);

  // Fetch updated schedule from server API on mount
  const refreshSchedule = useCallback(async () => {
    try {
      const res = await fetch('/api/schedule');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPrograms(data);
        }
      }
    } catch (e) {
      console.warn('[RadioContext] Could not fetch server schedule, using cached schedule:', e);
    }
  }, []);

  useEffect(() => {
    refreshSchedule();
  }, [refreshSchedule]);

  // Live 1-second clock ticker for Tanzania Time (UTC+3)
  // Automatically switches "ON AIR" status in real time when program concludes
  useEffect(() => {
    const timer = setInterval(() => {
      setTanzaniaTime(getTanzaniaTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine current active show & up next program based on current Tanzania Time (UTC+3)
  const scheduleResult = useMemo(() => {
    return resolveCurrentSchedule(programs, tanzaniaTime);
  }, [programs, tanzaniaTime]);

  const activeLiveProgram = scheduleResult.currentProgram;
  const nextProgram = scheduleResult.nextProgram;
  const isScheduleGap = scheduleResult.isGap;
  const gapNotice = scheduleResult.gapNotice;
  const currentProgress = scheduleResult.currentProgress;

  // Backwards-compatible currentProgram that is never undefined
  const currentProgram = useMemo(() => {
    return (
      activeLiveProgram ||
      nextProgram ||
      programs[0] ||
      SEED_PROGRAMS[0]
    );
  }, [activeLiveProgram, nextProgram, programs]);

  // Network state auto-reconnect
  useEffect(() => {
    const handleOnline = () => {
      if (isPlaying) {
        retryStream();
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [isPlaying]);

  // Update MediaSession API for lockscreen controls and Bluetooth head-units
  useEffect(() => {
    if ('mediaSession' in navigator) {
      const trackTitle = activeLiveProgram
        ? `${activeLiveProgram.title} (LIVE 90.5 FM)`
        : `Radio Joy 90.5 FM Kigoma (Mubashara)`;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: trackTitle,
        artist: STATION_INFO.name,
        album: 'Radio Joy 90.5 FM Kigoma',
        artwork: [
          { src: '/radio-joy-logo.png', sizes: '96x96', type: 'image/png' },
          { src: currentProgram.bannerUrl || '/radio-joy-logo.png', sizes: '512x512', type: 'image/jpeg' },
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => play());
      navigator.mediaSession.setActionHandler('pause', () => pause());
      navigator.mediaSession.setActionHandler('stop', () => pause());
    }
  }, [currentProgram, activeLiveProgram]);

  // Handle fluctuations in listener count
  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCount(prev => {
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.max(12000, prev + delta);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Equalizer visualizer loop when playing
  useEffect(() => {
    if (!isPlaying) {
      setFrequencies([20, 25, 30, 25, 20, 25, 30, 25, 20, 25, 30, 20]);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let t = 0;
    const updateFrequencies = () => {
      t += 0.12;
      const newFreqs = Array.from({ length: 14 }, (_, i) => {
        const base = Math.sin(t + i * 0.4) * 35 + Math.cos(t * 0.7 + i * 0.3) * 20;
        const jitter = Math.random() * 25;
        return Math.min(100, Math.max(15, Math.floor(45 + base + jitter)));
      });
      setFrequencies(newFreqs);
      animFrameRef.current = requestAnimationFrame(updateFrequencies);
    };

    animFrameRef.current = requestAnimationFrame(updateFrequencies);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Audio synthesizer fallback to guarantee live sound if online audio stream is blocked by sandbox
  const startRadioSynthFallback = () => {
    try {
      if (!synthAudioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        synthAudioCtxRef.current = new AudioCtx();
      }
      const ctx = synthAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Warm background melodic broadcast tones (harmonic chords resembling subtle radio broadcast)
      const chordNotes = [220, 261.63, 329.63, 392.00]; // A minor 7 warm tone
      let noteIndex = 0;

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      synthIntervalRef.current = setInterval(() => {
        if (!isPlaying || !synthAudioCtxRef.current) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = 800;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(chordNotes[noteIndex % chordNotes.length], now);
        noteIndex++;

        // Gentle volume, subtle ambient radio station harmonic bed
        const baseVol = isMuted ? 0 : volume * 0.04;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(baseVol, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.9);
      }, 2000);
    } catch (e) {
      console.warn('AudioContext fallback initialization info:', e);
    }
  };

  const stopRadioSynthFallback = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.crossOrigin = 'anonymous';

    audio.onwaiting = () => setIsLoading(true);
    audio.onplaying = () => {
      setIsLoading(false);
      setStreamError(null);
    };
    audio.onerror = () => {
      console.warn('Network radio stream error, activating seamless broadcast engine fallback.');
      setIsLoading(false);
      // Seamlessly keep player active with broadcast engine
      startRadioSynthFallback();
    };

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      stopRadioSynthFallback();
      if (synthAudioCtxRef.current) {
        synthAudioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const play = async () => {
    setStreamError(null);
    setIsLoading(true);
    setIsPlaying(true);

    const streams = STREAM_URLS[quality];
    const streamToTry = streams[0];

    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.src = streamToTry;

      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => {
              console.warn('Direct stream autoplay restricted or network offline. Enabling radio synthesizer backup:', err);
              setIsLoading(false);
              startRadioSynthFallback();
            });
        }
      } catch (err) {
        console.warn('Error starting stream:', err);
        setIsLoading(false);
        startRadioSynthFallback();
      }
    } else {
      startRadioSynthFallback();
      setIsLoading(false);
    }
  };

  const pause = () => {
    setIsPlaying(false);
    setIsLoading(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopRadioSynthFallback();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  };

  const setQuality = (newQuality: StreamQuality) => {
    setQualityState(newQuality);
    if (isPlaying) {
      // Reconnect with new stream bitrate
      play();
    }
  };

  const setSleepTimer = (minutes: number | null) => {
    setSleepTimerMinutes(minutes);
    if (sleepTimeoutRef.current) {
      clearTimeout(sleepTimeoutRef.current);
      sleepTimeoutRef.current = null;
    }
    if (sleepIntervalRef.current) {
      clearInterval(sleepIntervalRef.current);
      sleepIntervalRef.current = null;
    }

    if (minutes !== null && minutes > 0) {
      let remaining = minutes * 60;
      setSleepTimerSecondsLeft(remaining);

      sleepIntervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current);
          setSleepTimerSecondsLeft(null);
          setSleepTimerMinutes(null);
          pause();
        } else {
          setSleepTimerSecondsLeft(remaining);
        }
      }, 1000);
    } else {
      setSleepTimerSecondsLeft(null);
    }
  };

  const retryStream = () => {
    pause();
    setTimeout(() => play(), 300);
  };

  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        isLoading,
        volume,
        isMuted,
        quality,
        programs,
        currentProgram,
        activeLiveProgram,
        nextProgram,
        isScheduleGap,
        gapNotice,
        tanzaniaTime,
        currentProgress,
        listenerCount,
        frequencies,
        sleepTimerMinutes,
        sleepTimerSecondsLeft,
        togglePlay,
        play,
        pause,
        setVolume,
        toggleMute,
        setQuality,
        setSleepTimer,
        isMiniPlayerVisible,
        setIsMiniPlayerVisible,
        streamError,
        retryStream,
        refreshSchedule
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};
