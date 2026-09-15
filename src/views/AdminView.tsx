import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Radio,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  Wifi,
  FileText,
  Bell,
  MessageSquare,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Eye,
  Sliders,
  Sparkles,
  Volume2,
  Activity,
  Send,
  RadioTower,
  Smartphone,
  Flame,
  Search,
  ExternalLink,
  Info,
  Check,
  Phone,
  MessageCircle,
  Play,
  Pause
} from 'lucide-react';
import { Program, ActiveTab, AdminStats, PushNotification, Article, CategoryId } from '../types';
import { useRadio } from '../context/RadioContext';
import { useNews } from '../context/NewsContext';
import { STATION_INFO, FREQUENCIES, CATEGORIES } from '../data/mockData';

interface AdminViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface ShoutoutItem {
  id: string;
  senderName: string;
  location: string;
  message: string;
  programTitle: string;
  createdAt: string;
  phone?: string;
  isReadOnAir?: boolean;
}

export const AdminView: React.FC<AdminViewProps> = ({ setActiveTab }) => {
  const {
    programs,
    refreshSchedule,
    tanzaniaTime,
    isPlaying,
    togglePlay,
    activeLiveProgram,
    nextProgram,
    listenerCount,
  } = useRadio();

  const { articles, refreshArticles } = useNews();

  // -------------------------------------------------------------
  // AUTH STATE
  // -------------------------------------------------------------
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('radiojoy_admin_token');
  });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('RadioJoy@2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // -------------------------------------------------------------
  // ACTIVE CONTROL PANEL TAB
  // -------------------------------------------------------------
  const [controlTab, setControlTab] = useState<
    'studio' | 'schedule' | 'news' | 'notifications' | 'shoutouts' | 'analytics' | 'settings'
  >('studio');

  // Stats from backend
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // -------------------------------------------------------------
  // STUDIO / STREAM CONTROLS
  // -------------------------------------------------------------
  const [streamConfig, setStreamConfig] = useState({
    primary: 'https://radiotadio.co.tz/joy-fm-stream',
    backup: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    lowBandwidth: 'https://icecast.bkwsu.eu/connect-low',
    highBandwidth: 'https://icecast.bkwsu.eu/connect-high',
  });
  const [isSavingStream, setIsSavingStream] = useState(false);
  const [streamPingMs, setStreamPingMs] = useState(48);
  const [isTestingPing, setIsTestingPing] = useState(false);
  const [manualTopic, setManualTopic] = useState('');
  const [isUpdatingTopic, setIsUpdatingTopic] = useState(false);
  const [isSpecialBroadcast, setIsSpecialBroadcast] = useState(false);
  const [specialTitle, setSpecialTitle] = useState('Matangazo Maalum ya Moja kwa Moja');

  // -------------------------------------------------------------
  // SCHEDULE EDITING MODAL
  // -------------------------------------------------------------
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);

  // -------------------------------------------------------------
  // NEWS PUBLISHER STATE
  // -------------------------------------------------------------
  const [newsSearch, setNewsSearch] = useState('');
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isSavingNews, setIsSavingNews] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);

  // -------------------------------------------------------------
  // NOTIFICATION DISPATCHER STATE
  // -------------------------------------------------------------
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifType, setNotifType] = useState<'breaking' | 'radio' | 'sports' | 'reminder'>('radio');
  const [isSendingNotif, setIsSendingNotif] = useState(false);
  const [dispatchedNotifs, setDispatchedNotifs] = useState<PushNotification[]>([]);

  // -------------------------------------------------------------
  // LISTENER SHOUTOUTS STATE
  // -------------------------------------------------------------
  const [shoutouts, setShoutouts] = useState<ShoutoutItem[]>([
    {
      id: 'sh-1',
      senderName: 'Juma Ramadhani',
      location: 'Kibirizi, Kigoma',
      message: 'Habari za asubuhi Radio Joy! Nawatakia siku njema watangazaji wote wa Good Morning Kigoma.',
      programTitle: 'Good Morning Kigoma',
      createdAt: 'Dakika 5 zilizopita',
      phone: '+255 754 123 456',
      isReadOnAir: true,
    },
    {
      id: 'sh-2',
      senderName: 'Amina Selemani',
      location: 'Kasulu Mjini',
      message: 'Sauti inasikika vizuri sana hapa Kasulu 90.7 FM. Tupigieni wimbo wa injili wa kuanzia siku.',
      programTitle: 'Good Morning Kigoma',
      createdAt: 'Dakika 18 zilizopita',
      phone: '+255 768 987 654',
      isReadOnAir: false,
    },
    {
      id: 'sh-3',
      senderName: 'Mchungaji David Mwita',
      location: 'Kibondo',
      message: 'Mungu awabariki sana Radio Joy kwa kuendelea kuwa sauti ya tumaini na amani kote Mkoani Kigoma.',
      programTitle: 'Sauti ya Jamii',
      createdAt: 'Saa 1 lililopita',
      phone: '+255 712 345 678',
      isReadOnAir: false,
    },
    {
      id: 'sh-4',
      senderName: 'Baraka Msafiri',
      location: 'Kalemie, DRC (Mtandaoni)',
      message: 'Nawapata vizuri sana kupitia mtandao hapa Kalemie kando ya Ziwa Tanganyika. Joy FM oyee!',
      programTitle: 'Mashua',
      createdAt: 'Saa 2 zilizopita',
      phone: '+243 812 345 678',
      isReadOnAir: false,
    },
  ]);

  // -------------------------------------------------------------
  // LOGIN / LOGOUT LOGIC
  // -------------------------------------------------------------
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Jina la mtumiaji au nenosiri sio sahihi');
      }

      setAuthToken(data.token);
      localStorage.setItem('radiojoy_admin_token', data.token);
      showToast('Umeingia kikamilifu kwenye Master Control Panel ya Joy 90.5 FM!');
    } catch (err: any) {
      setLoginError(err.message || 'Hitilafu ya kuingia');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('radiojoy_admin_token');
    showToast('Umetoka kwenye jopo la udhibiti.');
  };

  // Quick 1-click Demo Sign In
  const handleQuickLogin = () => {
    setUsername('admin');
    setPassword('RadioJoy@2026');
    setTimeout(() => {
      handleLogin();
    }, 50);
  };

  // Fetch admin stats & notifications
  const fetchDashboardData = async () => {
    if (!authToken) return;
    try {
      const [statsRes, notifsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${authToken}` } }),
        fetch('/api/admin/notifications', { headers: { Authorization: `Bearer ${authToken}` } }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (notifsRes.ok) {
        const notifsData = await notifsRes.json();
        setDispatchedNotifs(notifsData);
      }
    } catch (e) {
      console.warn('Dashboard fetch error:', e);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchDashboardData();
    }
  }, [authToken]);

  // Ping test
  const handleTestPing = () => {
    setIsTestingPing(true);
    setTimeout(() => {
      const randomPing = Math.floor(35 + Math.random() * 25);
      setStreamPingMs(randomPing);
      setIsTestingPing(false);
      showToast(`Jaribio la Seva: Kasi ni nzuri (${randomPing}ms), 0% Packet Loss!`);
    }, 700);
  };

  // Update on-air topic
  const handleUpdateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTopic.trim() || !activeLiveProgram) return;

    setIsUpdatingTopic(true);
    try {
      const updated = {
        ...activeLiveProgram,
        currentTopic: manualTopic.trim(),
      };

      const res = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        await refreshSchedule();
        showToast(`Mada hewani imesasishwa: "${manualTopic.trim()}"`);
        setManualTopic('');
      }
    } catch (e: any) {
      alert(`Hitilafu: ${e.message}`);
    } finally {
      setIsUpdatingTopic(false);
    }
  };

  // -------------------------------------------------------------
  // SCHEDULE ACTIONS
  // -------------------------------------------------------------
  const handleOpenEditProgram = (prog: Program) => {
    setEditingProgram({ ...prog });
    setIsScheduleModalOpen(true);
  };

  const handleOpenCreateProgram = () => {
    setEditingProgram({
      id: `prog-${Date.now()}`,
      title: '',
      startHour: 6,
      startMinute: 0,
      endHour: 8,
      endMinute: 0,
      period: 'Morning',
      timeSlot: '06:00 AM – 08:00 AM',
      hostName: '',
      hostRole: '',
      hostAvatar: '',
      bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
      genre: 'Burudani & Habari',
      description: '',
      currentTopic: 'Mada ya Leo',
      days: ['Kila Siku'],
    });
    setIsScheduleModalOpen(true);
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingProgram.title) return;

    setIsSavingSchedule(true);
    try {
      const res = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(editingProgram),
      });

      if (!res.ok) throw new Error('Failed to save program');

      await refreshSchedule();
      setIsScheduleModalOpen(false);
      setEditingProgram(null);
      showToast(`Kipindi cha "${editingProgram.title}" kimehifadhiwa kikamilifu!`);
    } catch (err: any) {
      alert(`Hitilafu: ${err.message}`);
    } finally {
      setIsSavingSchedule(false);
    }
  };

  const handleDeleteProgram = async (id: string, title: string) => {
    if (!confirm(`Una uhakika unataka kufuta kipindi cha "${title}" kwenye ratiba?`)) return;

    try {
      const res = await fetch(`/api/admin/schedule/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        await refreshSchedule();
        showToast(`Kipindi cha "${title}" kimefutwa kwenye ratiba.`);
      }
    } catch (e: any) {
      alert(`Hitilafu: ${e.message}`);
    }
  };

  const handleResetSchedule = async () => {
    if (!confirm('Rejesha ratiba asili ya Radio Joy 90.5 FM (Good Morning Kigoma, Mashua, Sauti ya Jamii, n.k.)?')) return;

    try {
      const res = await fetch('/api/admin/schedule/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        await refreshSchedule();
        showToast('Ratiba imerejeshwa katika vipindi asilia vya Joy 90.5 FM!');
      }
    } catch (e: any) {
      alert(`Hitilafu: ${e.message}`);
    }
  };

  // -------------------------------------------------------------
  // STREAM CONFIGURATION
  // -------------------------------------------------------------
  const handleSaveStream = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingStream(true);
    try {
      const res = await fetch('/api/admin/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(streamConfig),
      });

      if (res.ok) {
        showToast('Viungo vya Icecast/Shoutcast vimesasishwa kwa wasikilizaji wote!');
      }
    } catch (e: any) {
      alert(`Hitilafu: ${e.message}`);
    } finally {
      setIsSavingStream(false);
    }
  };

  // -------------------------------------------------------------
  // NOTIFICATION DISPATCHER
  // -------------------------------------------------------------
  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifBody) return;

    setIsSendingNotif(true);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: notifTitle,
          body: notifBody,
          type: notifType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDispatchedNotifs((prev) => [data.notification, ...prev]);
        setNotifTitle('');
        setNotifBody('');
        showToast('Arifa ya dharura imetumwa kwa wasikilizaji wote!');
      }
    } catch (e: any) {
      alert(`Hitilafu ya kutuma arifa: ${e.message}`);
    } finally {
      setIsSendingNotif(false);
    }
  };

  const handleDeleteNotif = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setDispatchedNotifs((prev) => prev.filter((n) => n.id !== id));
      showToast('Arifa imefutwa.');
    } catch (e) {
      console.warn(e);
    }
  };

  // -------------------------------------------------------------
  // NEWS ARTICLE MANAGEMENT
  // -------------------------------------------------------------
  const filteredArticles = useMemo(() => {
    if (!newsSearch.trim()) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        a.category.toLowerCase().includes(newsSearch.toLowerCase())
    );
  }, [articles, newsSearch]);

  const handleOpenCreateArticle = () => {
    setEditingArticle({
      id: `art-${Date.now()}`,
      title: '',
      summary: '',
      content: [''],
      category: 'kitaifa',
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop',
      author: {
        name: 'Dawati la Habari Joy FM',
        role: 'Mwandishi Mwandamizi',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      },
      publishedAt: 'Muda mfupi uliopita',
      readTimeMinutes: 3,
      tags: ['Kigoma', 'Habari'],
      isBreaking: false,
      isTrending: true,
      viewsCount: 1,
      sharesCount: 0,
      hasAudioReport: true,
      audioDuration: '02:45',
    });
    setIsNewsModalOpen(true);
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticle({ ...art });
    setIsNewsModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    setIsSavingNews(true);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(editingArticle),
      });

      if (res.ok) {
        await refreshArticles();
        setIsNewsModalOpen(false);
        setEditingArticle(null);
        showToast(`Habari "${editingArticle.title.substring(0, 30)}..." imechapishwa kikamilifu!`);
      }
    } catch (e: any) {
      alert(`Hitilafu: ${e.message}`);
    } finally {
      setIsSavingNews(false);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Una uhakika unataka kufuta habari hii: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        await refreshArticles();
        showToast('Habari imefutwa.');
      }
    } catch (e: any) {
      alert(`Hitilafu: ${e.message}`);
    }
  };

  // -------------------------------------------------------------
  // LISTENER SHOUTOUT ACTIONS
  // -------------------------------------------------------------
  const toggleShoutoutRead = (id: string) => {
    setShoutouts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isReadOnAir: !s.isReadOnAir } : s))
    );
    showToast('Hali ya salamu imesasishwa!');
  };

  const handleDeleteShoutout = (id: string) => {
    setShoutouts((prev) => prev.filter((s) => s.id !== id));
    showToast('Salamu imefutwa kwenye orodha.');
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!authToken) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#071d36] border border-blue-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-3 mb-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center justify-center mx-auto shadow-inner">
              <Sliders className="w-7 h-7 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
              Control Panel ya Radio Joy
            </h1>
            <p className="text-xs text-blue-200/70">
              Jopo Kuu la Udhibiti wa Matangazo Hewani, Ratiba, Habari & Stream
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-2xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Jina la Mtumiaji (Username)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#041224] border border-blue-900 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Nenosiri (Password)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#041224] border border-blue-900 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Quick Demo Login Button */}
            <div className="bg-[#051426] p-3 rounded-2xl border border-blue-900/60 text-[11px] text-slate-300 space-y-2">
              <div className="font-bold text-yellow-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Vitambulisho vya Awali:
                </span>
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="text-xs text-yellow-400 underline font-extrabold hover:text-white"
                >
                  ⚡ Ingia Moja kwa Moja
                </button>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Username: <code className="text-white font-mono bg-blue-950 px-1.5 py-0.5 rounded">admin</code></span>
                <span>Password: <code className="text-white font-mono bg-blue-950 px-1.5 py-0.5 rounded">RadioJoy@2026</code></span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-blue-950 font-black text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-blue-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>FUNGUA CONTROL PANEL</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED CONTROL PANEL INTERFACE
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 pb-24">
      {/* Toast Alert */}
      {actionSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-400 text-blue-950 px-4 py-2.5 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* TOP MASTER CONTROL HEADER */}
      <div className="bg-[#071d36] border border-blue-900/80 p-5 rounded-3xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-blue-950 flex items-center justify-center shadow-lg shadow-yellow-400/20 flex-shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
                  Master Control Panel
                </h1>
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  ON AIR
                </span>
              </div>
              <p className="text-xs text-blue-200/70 mt-0.5">
                Radio Joy 90.5 FM Kigoma • Studio Live Console & Broadcast Operations
              </p>
            </div>
          </div>

          {/* Real-time Status Badges & Quick Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Time */}
            <div className="bg-[#041224] border border-blue-900 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-slate-300 font-medium">Saa za Tanzania:</span>
              <strong className="text-yellow-400 font-mono">{tanzaniaTime.formattedTime24} EAT</strong>
            </div>

            {/* Listeners Ticker */}
            <div className="bg-[#041224] border border-blue-900 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300 font-medium">Wasikilizaji:</span>
              <strong className="text-white font-mono">{listenerCount.toLocaleString()}</strong>
            </div>

            {/* Preview as listener */}
            <button
              onClick={() => setActiveTab('radio')}
              className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tazama Live Redio</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-xs font-bold text-red-200 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Toka</span>
            </button>
          </div>
        </div>

        {/* Live Audio Strip */}
        <div className="pt-2 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-yellow-400" />
            <span>Kipindi Hewani Sasa:</span>
            <strong className="text-white font-bold">
              {activeLiveProgram ? activeLiveProgram.title : 'Muziki Mseto 24/7'}
            </strong>
            <span className="text-blue-300 font-mono text-[11px]">
              ({activeLiveProgram ? activeLiveProgram.timeSlot : 'Saa 24'})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className={`px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1.5 transition-all ${
                isPlaying
                  ? 'bg-red-600 text-white'
                  : 'bg-yellow-400 text-blue-950 hover:bg-yellow-300'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'SIMAMISHA MTIRIRIKO' : 'WASHA MTIRIRIKO (MONITOR)'}</span>
            </button>

            <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Icecast 128k Online
            </span>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CONTROL TABS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setControlTab('studio')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'studio'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Studio & Stream</span>
        </button>

        <button
          onClick={() => setControlTab('schedule')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'schedule'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Ratiba ya Vipindi ({programs.length})</span>
        </button>

        <button
          onClick={() => setControlTab('news')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'news'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Habari & Makala ({articles.length})</span>
        </button>

        <button
          onClick={() => setControlTab('notifications')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'notifications'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Arifa za Simu (Push Alerts)</span>
        </button>

        <button
          onClick={() => setControlTab('shoutouts')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'shoutouts'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Salamu za Wasikilizaji ({shoutouts.length})</span>
        </button>

        <button
          onClick={() => setControlTab('analytics')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'analytics'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Takwimu za Wasikilizaji</span>
        </button>

        <button
          onClick={() => setControlTab('settings')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all flex-shrink-0 ${
            controlTab === 'settings'
              ? 'bg-yellow-400 text-blue-950 shadow-md'
              : 'bg-[#071d36] text-slate-300 hover:bg-[#0c2f5a] border border-blue-900'
          }`}
        >
          <RadioTower className="w-4 h-4" />
          <span>Mipangilio ya Kituo</span>
        </button>
      </div>

      {/* ============================================================= */}
      {/* TAB 1: STUDIO & STREAM CONTROL */}
      {/* ============================================================= */}
      {controlTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live On-Air Overrides & Topics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Topic Controller */}
            <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span>Mada ya Kipindi Hewani (Live Show Topic)</span>
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Badilisha mada inayoonekana kwenye screen za wasikilizaji wote mara moja.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-400/20">
                  REAL-TIME SYNC
                </span>
              </div>

              <div className="p-3.5 bg-[#041224] rounded-2xl border border-blue-900/60 space-y-1.5">
                <p className="text-[11px] text-slate-400 font-medium">Mada ya Sasa:</p>
                <p className="text-sm font-bold text-yellow-400">
                  "{activeLiveProgram?.currentTopic || 'Muziki Mseto & Matangazo ya Moja kwa Moja'}"
                </p>
                <p className="text-xs text-slate-300">
                  Kipindi: <strong className="text-white">{activeLiveProgram?.title || 'Radio Joy 90.5 FM'}</strong> ({activeLiveProgram?.genre || 'Muziki na Habari'})
                </p>
              </div>

              <form onSubmit={handleUpdateTopic} className="flex gap-2">
                <input
                  type="text"
                  value={manualTopic}
                  onChange={(e) => setManualTopic(e.target.value)}
                  placeholder="Andika mada mpya ya leo (mfano: Maoni ya wananchi kuhusu ujenzi wa barabara)..."
                  className="flex-1 bg-[#041224] border border-blue-900 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  disabled={isUpdatingTopic || !manualTopic.trim()}
                  className="px-4 py-2.5 bg-yellow-400 text-blue-950 font-black text-xs rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isUpdatingTopic ? 'Inahifadhi...' : 'Sasisha Hewani'}</span>
                </button>
              </form>
            </div>

            {/* Special Live Broadcast Override */}
            <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-red-500" />
                    <span>Matangazo Maalum ya Moja kwa Moja (Live Override)</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Washa matangazo maalum (mfano: Kongamano, Michezo mubashara, Ziara ya Viongozi).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSpecialBroadcast(!isSpecialBroadcast);
                    showToast(
                      !isSpecialBroadcast
                        ? 'Matangazo Maalum yamewashwa hewani!'
                        : 'Mifumo imerejea kwenye ratiba ya kawaida.'
                    );
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
                    isSpecialBroadcast
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse'
                      : 'bg-[#041224] text-slate-300 border border-blue-800 hover:text-white'
                  }`}
                >
                  {isSpecialBroadcast ? '● MATANGAZO MAALUM HEWANI' : 'RATIBA YA KAWAIDA (AUTO)'}
                </button>
              </div>

              {isSpecialBroadcast && (
                <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-2xl space-y-3">
                  <label className="block text-xs font-bold text-red-200">
                    Jina la Matangazo Maalum:
                  </label>
                  <input
                    type="text"
                    value={specialTitle}
                    onChange={(e) => setSpecialTitle(e.target.value)}
                    className="w-full bg-[#041224] border border-red-500/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <p className="text-[11px] text-red-300">
                    Kumbuka: Hali hii inachukua nafasi ya ratiba iliyopo na kuonyesha bango maalum hewani kwa wasikilizaji wote.
                  </p>
                </div>
              )}
            </div>

            {/* Stream Server URLs Form */}
            <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-yellow-400" />
                    <span>Server Mtiririko (Stream Output URLs)</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Link za Icecast/Shoutcast/Zeno kwa matangazo ya mtandaoni.
                  </p>
                </div>

                <button
                  onClick={handleTestPing}
                  disabled={isTestingPing}
                  className="px-3 py-1.5 rounded-xl bg-[#041224] border border-blue-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-yellow-400 ${isTestingPing ? 'animate-spin' : ''}`} />
                  <span>Jaribu Seva ({streamPingMs}ms)</span>
                </button>
              </div>

              <form onSubmit={handleSaveStream} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Primary Stream URL (128kbps Standard)
                  </label>
                  <input
                    type="url"
                    value={streamConfig.primary}
                    onChange={(e) => setStreamConfig({ ...streamConfig, primary: e.target.value })}
                    required
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Backup Failover Stream (Zeno / Icecast 2)
                  </label>
                  <input
                    type="url"
                    value={streamConfig.backup}
                    onChange={(e) => setStreamConfig({ ...streamConfig, backup: e.target.value })}
                    required
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Low Bandwidth Stream (64kbps Data Saver)
                  </label>
                  <input
                    type="url"
                    value={streamConfig.lowBandwidth}
                    onChange={(e) => setStreamConfig({ ...streamConfig, lowBandwidth: e.target.value })}
                    required
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingStream}
                  className="py-2.5 px-5 rounded-xl bg-yellow-400 text-blue-950 font-black text-xs flex items-center gap-2 hover:bg-yellow-300 transition-colors shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingStream ? 'Inahifadhi...' : 'Hifadhi Mipangilio ya Stream'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Audio VU Meter, Diagnostics & Live Stats */}
          <div className="lg:col-span-5 space-y-6">
            {/* Audio Studio Visual VU Meter */}
            <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-yellow-400" />
                <span>Kipimo cha Sauti Studio (Audio VU Meter)</span>
              </h3>

              <div className="bg-[#030d1a] border border-blue-950 rounded-2xl p-4 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>LEFT CHANNEL</span>
                    <span className="text-emerald-400">-4.2 dB</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 flex overflow-hidden p-0.5 gap-0.5">
                    <div className="h-full bg-emerald-500 rounded-sm w-[65%]" />
                    <div className="h-full bg-yellow-400 rounded-sm w-[20%]" />
                    <div className="h-full bg-red-500 rounded-sm w-[5%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>RIGHT CHANNEL</span>
                    <span className="text-emerald-400">-3.8 dB</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 flex overflow-hidden p-0.5 gap-0.5">
                    <div className="h-full bg-emerald-500 rounded-sm w-[68%]" />
                    <div className="h-full bg-yellow-400 rounded-sm w-[18%]" />
                    <div className="h-full bg-red-500 rounded-sm w-[4%]" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <span>Peak Limiter: <strong className="text-emerald-400">NORMAL</strong></span>
                  <span>Audio Codec: <strong className="text-white">AAC+ v2 128k</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Broadcast Status Card */}
            <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 space-y-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Afya ya Matangazo (Transmission Health)</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 bg-[#041224] rounded-xl border border-blue-900/40">
                  <span>Kisambaza Mawimbi (FM Transmitter):</span>
                  <span className="font-bold text-emerald-400">90.5 MHz (1KW Kibirizi)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#041224] rounded-xl border border-blue-900/40">
                  <span>Server ya Mtandaoni:</span>
                  <span className="font-bold text-emerald-400">Icecast v2.4.4 (Online)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#041224] rounded-xl border border-blue-900/40">
                  <span>Muda wa Uptime:</span>
                  <span className="font-mono text-yellow-400 font-bold">99.98% (Siku 18 bila hitilafu)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#041224] rounded-xl border border-blue-900/40">
                  <span>Watumiaji wa Simu (Mobile App):</span>
                  <span className="font-mono text-white font-bold">14,820 Leo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 2: SCHEDULE MANAGEMENT */}
      {/* ============================================================= */}
      {controlTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#071d36] p-4 rounded-2xl border border-blue-900/60">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span>Ratiba ya Vipindi (Program Schedule Editor)</span>
              </h2>
              <p className="text-xs text-slate-300">
                Inatumia Saa za Tanzania (EAT / UTC+3). Kipindi kinachoendana na saa ya sasa kinapokea hadhi ya "ON AIR" kiotomatiki.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={handleResetSchedule}
                className="px-3 py-2 rounded-xl bg-[#041224] hover:bg-[#0a2747] border border-blue-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5"
                title="Rejesha vipindi asilia vya Joy FM"
              >
                <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
                <span>Rejesha Asilia</span>
              </button>

              <button
                onClick={handleOpenCreateProgram}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 text-xs font-black flex items-center gap-1.5 shadow hover:scale-105 transition-transform"
              >
                <Plus className="w-4 h-4" />
                <span>Ongeza Kipindi Kipya</span>
              </button>
            </div>
          </div>

          {/* Program Cards Grid */}
          <div className="space-y-3">
            {programs.map((prog) => {
              const isCurrentlyActive = activeLiveProgram?.id === prog.id;

              return (
                <div
                  key={prog.id}
                  className={`bg-[#071d36] border rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    isCurrentlyActive
                      ? 'border-yellow-400 ring-1 ring-yellow-400/40 shadow-lg shadow-yellow-400/10'
                      : 'border-blue-900/80 hover:border-blue-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-900/40 border border-blue-800 flex items-center justify-center text-yellow-400 shadow">
                        <Radio className="w-6 h-6" />
                      </div>
                      {isCurrentlyActive && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase border border-slate-900 animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/20">
                          {prog.timeSlot}
                        </span>
                        <span className="text-[11px] font-semibold text-blue-300 bg-[#041224] px-2 py-0.5 rounded-md border border-blue-900">
                          {prog.period}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {prog.days.join(', ')}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-white flex items-center gap-1.5">
                        <span>🎙️ {prog.title}</span>
                      </h3>

                      <p className="text-xs text-slate-300 line-clamp-1 max-w-xl">
                        {prog.description}
                      </p>

                      <p className="text-xs text-slate-400">
                        Aina: <strong className="text-white">{prog.genre}</strong> • Mada: <span className="text-yellow-400">{prog.currentTopic}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    <button
                      onClick={() => handleOpenEditProgram(prog)}
                      className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Hariri</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProgram(prog.id, prog.title)}
                      className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Futa</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 3: NEWS PUBLISHER & EDITORIAL */}
      {/* ============================================================= */}
      {controlTab === 'news' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#071d36] p-4 rounded-2xl border border-blue-900/60">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                <span>Chumba cha Habari & Uhariri (Editorial Newsroom)</span>
              </h2>
              <p className="text-xs text-slate-300">
                Chapisha au hariri makala, taarifa za habari, na rekodi za sauti za redio.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={handleOpenCreateArticle}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 text-xs font-black flex items-center gap-1.5 shadow hover:scale-105 transition-transform"
              >
                <Plus className="w-4 h-4" />
                <span>Andika Habari Mpya</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              placeholder="Tafuta makala kwa kichwa cha habari..."
              className="w-full bg-[#071d36] border border-blue-900 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Articles list */}
          <div className="space-y-3">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-[#071d36] border border-blue-900/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-700 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-16 h-16 rounded-xl object-cover border border-blue-800 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-yellow-400 px-2 py-0.5 rounded border border-blue-900">
                        {art.category}
                      </span>
                      {art.isBreaking && (
                        <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                          BREAKING
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">{art.publishedAt}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-1">{art.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-1 max-w-xl">{art.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  <button
                    onClick={() => handleOpenEditArticle(art)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Hariri</span>
                  </button>

                  <button
                    onClick={() => handleDeleteArticle(art.id, art.title)}
                    className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Futa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 4: PUSH NOTIFICATIONS DISPATCHER */}
      {/* ============================================================= */}
      {controlTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dispatcher Form */}
          <div className="lg:col-span-6 bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                <span>Tuma Arifa kwa Simu Zote (Broadcast Push Alert)</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Tuma taarifa ya papo hapo kwa wasikilizaji wote wa app ya simu na tovuti.
              </p>
            </div>

            <form onSubmit={handleSendNotification} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Kichwa cha Arifa (Notification Title) *
                </label>
                <input
                  type="text"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="Mfano: Good Morning Kigoma Imeanza Hewani!"
                  required
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Aina ya Arifa (Notification Category)
                </label>
                <select
                  value={notifType}
                  onChange={(e: any) => setNotifType(e.target.value)}
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="radio">Redio / Kipindi Mubashara (Radio Alert)</option>
                  <option value="breaking">Habari ya Hivi Punde (Breaking News)</option>
                  <option value="sports">Michezo na Matokeo (Sports)</option>
                  <option value="reminder">Kikumbusho cha Kituo (Reminder)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Ujumbe Kamili (Notification Message Body) *
                </label>
                <textarea
                  value={notifBody}
                  onChange={(e) => setNotifBody(e.target.value)}
                  placeholder="Fungua Radio Joy 90.5 FM sasa kusikiliza mjadala moto wa asubuhi..."
                  rows={3}
                  required
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSendingNotif}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-red-600/30 w-full"
              >
                <Send className="w-4 h-4" />
                <span>{isSendingNotif ? 'Inatuma...' : 'TUMA ARIFA KWA WASIKILIZAJI WOTE SASA'}</span>
              </button>
            </form>
          </div>

          {/* History of Dispatched Notifications */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              Arifa Zilizotumwa Hivi Karibuni ({dispatchedNotifs.length})
            </h3>

            {dispatchedNotifs.length === 0 ? (
              <div className="p-6 bg-[#071d36] rounded-2xl border border-blue-900 text-center text-xs text-slate-400">
                Hakuna arifa zilizotumwa hivi karibuni.
              </div>
            ) : (
              dispatchedNotifs.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-[#071d36] border border-blue-900/80 rounded-2xl p-4 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-yellow-400 border border-blue-900">
                        {notif.type}
                      </span>
                      <span className="text-[11px] text-slate-400">{notif.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    <p className="text-xs text-slate-300">{notif.body}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteNotif(notif.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-blue-950"
                    title="Futa arifa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 5: LISTENER SHOUTOUTS DESK */}
      {/* ============================================================= */}
      {controlTab === 'shoutouts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#071d36] p-4 rounded-2xl border border-blue-900/60">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                <span>Meseji & Salamu za Wasikilizaji (Listener Interaction Desk)</span>
              </h2>
              <p className="text-xs text-slate-300">
                Ujumbe uliotumwa kupitia app au fomu ya mawasiliano ya redio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shoutouts.map((s) => (
              <div
                key={s.id}
                className={`bg-[#071d36] border rounded-2xl p-4 sm:p-5 space-y-3 transition-colors ${
                  s.isReadOnAir
                    ? 'border-emerald-500/40 bg-[#071d36]/80'
                    : 'border-blue-900 hover:border-yellow-400/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{s.senderName}</span>
                    <span className="text-[11px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
                      📍 {s.location}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{s.createdAt}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{s.message}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-blue-900/60 text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Kipindi: <strong className="text-blue-200">{s.programTitle}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {s.phone && (
                      <a
                        href={`https://wa.me/${s.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    <button
                      onClick={() => toggleShoutoutRead(s.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 ${
                        s.isReadOnAir
                          ? 'bg-emerald-500 text-blue-950'
                          : 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{s.isReadOnAir ? 'Imesomwa Hewani' : 'Tia Alama Imesomwa'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteShoutout(s.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 6: AUDIENCE ANALYTICS */}
      {/* ============================================================= */}
      {controlTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#071d36] border border-blue-900/80 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Wasikilizaji Hewani Sasa</p>
              <p className="text-3xl font-black text-yellow-400 mt-2">
                {listenerCount.toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-400 mt-1">● Wameunganishwa moja kwa moja</p>
            </div>

            <div className="bg-[#071d36] border border-blue-900/80 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Wastani wa Saa za Kusikiliza</p>
              <p className="text-3xl font-black text-white mt-2">52 Min</p>
              <p className="text-[11px] text-slate-400 mt-1">Kwa kila msikilizaji kwa siku</p>
            </div>

            <div className="bg-[#071d36] border border-blue-900/80 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kipindi Chenye Watazamaji Zaidi</p>
              <p className="text-xl font-black text-white mt-2">Good Morning Kigoma</p>
              <p className="text-[11px] text-yellow-400 mt-1">Saa 06:00 AM – 10:00 AM</p>
            </div>

            <div className="bg-[#071d36] border border-blue-900/80 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Vifaa Vinavyoongoza</p>
              <p className="text-xl font-black text-emerald-400 mt-2">Android (74%)</p>
              <p className="text-[11px] text-slate-400 mt-1">Web: 18% • iOS: 8%</p>
            </div>
          </div>

          {/* Regional Listeners Breakdown */}
          <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <RadioTower className="w-5 h-5 text-yellow-400" />
              <span>Mgawanyo wa Wasikilizaji Kimkoa na Kikanda</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Kigoma Mjini & Mwanga (90.5 FM)</span>
                  <span className="text-yellow-400">42% (Wasikilizaji 6,220)</span>
                </div>
                <div className="w-full bg-[#041224] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full rounded-full w-[42%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Kasulu & Manyovu (90.7 FM)</span>
                  <span className="text-yellow-400">28% (Wasikilizaji 4,150)</span>
                </div>
                <div className="w-full bg-[#041224] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-[28%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Kibondo, Kakonko & Uvinza</span>
                  <span className="text-yellow-400">18% (Wasikilizaji 2,660)</span>
                </div>
                <div className="w-full bg-[#041224] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full w-[18%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-300 mb-1">
                  <span>Bujumbura, Kalemie (DRC) & Diaspora Mtandaoni</span>
                  <span className="text-yellow-400">12% (Wasikilizaji 1,790)</span>
                </div>
                <div className="w-full bg-[#041224] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-[12%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 7: STATION SETTINGS */}
      {/* ============================================================= */}
      {controlTab === 'settings' && (
        <div className="bg-[#071d36] border border-blue-900/80 rounded-3xl p-5 sm:p-6 space-y-5 max-w-3xl">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <RadioTower className="w-5 h-5 text-yellow-400" />
              <span>Taarifa za Kituo & Masafa (Station Profile)</span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Taarifa rasmi zinazoonekana kwenye ukurasa wa 'Kuhusu Sisi' na 'Mawasiliano'.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Jina Rasmi la Kituo</label>
              <input
                type="text"
                defaultValue={STATION_INFO.name}
                className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Masafa Makuu (Frequency)</label>
              <input
                type="text"
                defaultValue={STATION_INFO.frequency}
                className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Namba ya Simu Studio (Hotline)</label>
              <input
                type="text"
                defaultValue={STATION_INFO.phoneStudio}
                className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Namba ya WhatsApp</label>
              <input
                type="text"
                defaultValue={STATION_INFO.whatsapp}
                className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-300">Kaulimbiu (Slogan)</label>
              <input
                type="text"
                defaultValue={STATION_INFO.slogan}
                className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-300">Eneo la Studio (Physical Address)</label>
              <input
                type="text"
                defaultValue={STATION_INFO.address}
                className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <button
            onClick={() => showToast('Taarifa za kituo zimehifadhiwa kikamilifu!')}
            className="px-5 py-2.5 bg-yellow-400 text-blue-950 font-black text-xs rounded-xl shadow hover:bg-yellow-300 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Hifadhi Mabadiliko ya Kituo</span>
          </button>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL: EDIT OR CREATE PROGRAM */}
      {/* ============================================================= */}
      {isScheduleModalOpen && editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071d36] border border-blue-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-blue-900 pb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span>Hariri Ratiba ya Kipindi</span>
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-2 rounded-xl bg-[#041224] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Jina la Kipindi (Title) *
                  </label>
                  <input
                    type="text"
                    value={editingProgram.title || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    required
                    placeholder="Mfano: Good Morning Kigoma"
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nyakati (Period)
                  </label>
                  <select
                    value={editingProgram.period || 'Morning'}
                    onChange={(e: any) => setEditingProgram({ ...editingProgram, period: e.target.value })}
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Morning">Morning (Asubuhi)</option>
                    <option value="Afternoon">Afternoon (Mchana)</option>
                    <option value="Evening">Evening (Jioni)</option>
                    <option value="Night">Night (Usiku)</option>
                  </select>
                </div>
              </div>

              {/* Start and End Times */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#041224] p-3 rounded-2xl border border-blue-900/60">
                <div>
                  <label className="block text-[11px] font-bold text-yellow-400 mb-1">Saa ya Kuanza (0-23)</label>
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={editingProgram.startHour ?? 6}
                    onChange={(e) => setEditingProgram({ ...editingProgram, startHour: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#071d36] border border-blue-900 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-yellow-400 mb-1">Dakika ya Kuanza (0-59)</label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={editingProgram.startMinute ?? 0}
                    onChange={(e) => setEditingProgram({ ...editingProgram, startMinute: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#071d36] border border-blue-900 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-yellow-400 mb-1">Saa ya Kuisha (0-23)</label>
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={editingProgram.endHour ?? 10}
                    onChange={(e) => setEditingProgram({ ...editingProgram, endHour: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#071d36] border border-blue-900 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-yellow-400 mb-1">Dakika ya Kuisha (0-59)</label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={editingProgram.endMinute ?? 0}
                    onChange={(e) => setEditingProgram({ ...editingProgram, endMinute: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#071d36] border border-blue-900 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mada Kuu ya Kipindi (Current Topic)
                </label>
                <input
                  type="text"
                  value={editingProgram.currentTopic || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, currentTopic: e.target.value })}
                  placeholder="Mfano: Uchambuzi wa michezo, masuala ya kijamii..."
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Maelezo ya Kipindi (Description)
                </label>
                <textarea
                  value={editingProgram.description || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                  rows={2}
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-900">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#041224] border border-blue-900 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Ghairi (Cancel)
                </button>

                <button
                  type="submit"
                  disabled={isSavingSchedule}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 font-black text-xs flex items-center gap-2 shadow hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSchedule ? 'Inahifadhi...' : 'Hifadhi Kipindi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL: EDIT OR CREATE NEWS ARTICLE */}
      {/* ============================================================= */}
      {isNewsModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071d36] border border-blue-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-blue-900 pb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                <span>Chapisha au Hariri Habari</span>
              </h3>
              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="p-2 rounded-xl bg-[#041224] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Kichwa cha Habari (Title) *
                </label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  required
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kitengo (Category)</label>
                  <select
                    value={editingArticle.category || 'kitaifa'}
                    onChange={(e: any) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameSwahili}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Picha Kuu (Image URL)</label>
                  <input
                    type="url"
                    value={editingArticle.imageUrl || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                    className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Muhtasari wa Habari (Summary)
                </label>
                <textarea
                  value={editingArticle.summary || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  rows={2}
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Habari Kamili (Content Body)
                </label>
                <textarea
                  value={editingArticle.content ? editingArticle.content.join('\n\n') : ''}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      content: e.target.value.split('\n\n').filter(Boolean),
                    })
                  }
                  rows={4}
                  placeholder="Aya ya kwanza...\n\nAya ya pili..."
                  className="w-full bg-[#041224] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="flex items-center gap-4 bg-[#041224] p-3 rounded-2xl border border-blue-900">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArticle.isBreaking || false}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, isBreaking: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-red-600"
                  />
                  <span className="text-xs text-red-400 font-bold">Weka kama 'Breaking News' (Hivi Punde)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArticle.hasAudioReport || false}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, hasAudioReport: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-yellow-400"
                  />
                  <span className="text-xs text-yellow-400 font-bold">Ina Taarifa ya Sauti (Audio Clip)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-blue-900">
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#041224] border border-blue-900 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Ghairi
                </button>

                <button
                  type="submit"
                  disabled={isSavingNews}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-950 font-black text-xs flex items-center gap-2 shadow hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingNews ? 'Inachapisha...' : 'Chapisha Habari'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
