import React, { useState } from 'react';
import {
  X,
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Server,
  Zap,
  ExternalLink,
  Code,
  Shield,
  Layers,
  Database,
  Sliders,
  Check,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { NewsSourceType } from '../types';

interface WebsiteIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebsiteIntegrationModal: React.FC<WebsiteIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    sourceStatus,
    config,
    saveConfig,
    testConnection,
    syncWithWebsite,
    isSyncing,
    syncToast,
  } = useNews();

  const [activeTab, setActiveTab] = useState<'status' | 'configure' | 'env'>('status');

  // Form states for test & configure
  const [selectedType, setSelectedType] = useState<NewsSourceType>(config?.type || 'wordpress');
  const [targetUrl, setTargetUrl] = useState<string>(config?.url || 'https://radiojoyfm.co.tz');
  const [apiKey, setApiKey] = useState<string>(config?.apiKey || '');
  const [cacheTtl, setCacheTtl] = useState<number>(config?.cacheTtlSeconds || 300);

  // Testing status
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    count: number;
    sample?: any;
  } | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testConnection(selectedType, targetUrl, apiKey);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Hitilafu ya kupima muunganisho',
        count: 0,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveAndSync = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const ok = await saveConfig({
        type: selectedType,
        url: targetUrl,
        apiKey,
        cacheTtlSeconds: cacheTtl,
      });
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Muunganisho wa Tovuti ya Habari
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                  Kiotomatiki
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Vuta habari kiotomatiki kutoka kwenye tovuti ya WordPress, RSS au REST API yako
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title="Funga"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-5 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'status'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            Hali ya Sasa & Usawazishaji
          </button>

          <button
            onClick={() => setActiveTab('configure')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'configure'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Weka / Pima Tovuti Yako
          </button>

          <button
            onClick={() => setActiveTab('env')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'env'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            Environment (.env)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          {/* TAB 1: STATUS & SYNC */}
          {activeTab === 'status' && (
            <div className="space-y-5">
              {/* Connection Status Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Hali ya Muunganisho
                  </span>
                  {sourceStatus?.status === 'connected' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Kimeunganishwa na Tovuti
                    </span>
                  ) : sourceStatus?.status === 'syncing' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full font-bold">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Inasawazisha...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full font-bold">
                      <Database className="w-3 h-3" />
                      Akiba ya Ndani (Cache Imara)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-0.5">Mfumo wa Tovuti</span>
                    <span className="font-bold text-white uppercase text-xs">
                      {sourceStatus?.sourceType || config?.type || 'WordPress REST API'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-0.5">URL ya Tovuti</span>
                    <span className="font-mono text-xs text-amber-300 truncate block">
                      {sourceStatus?.sourceUrl || config?.url || 'https://mwangazafm.co.tz'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-0.5">Habari Zilizopo Kwenye Akiba</span>
                    <span className="font-bold text-white text-xs">
                      Makala {sourceStatus?.totalCached || 0} zimehifadhiwa
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-0.5">Mwisho Kusawazishwa</span>
                    <span className="font-bold text-slate-200 text-xs">
                      {sourceStatus?.lastSyncedAt || 'Hivi punde'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sync Action Button */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Umechapisha habari mpya kwenye tovuti?
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bofya kitufe hiki ili kupata habari za hivi punde moja kwa moja kwenye programu ya simu bila kusubiri.
                  </p>
                </div>

                <button
                  onClick={() => syncWithWebsite()}
                  disabled={isSyncing}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Inasawazisha...' : 'Sawazisha Habari Sasa'}
                </button>
              </div>

              {/* Toast / status message */}
              {syncToast && (
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-amber-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{syncToast}</span>
                </div>
              )}

              {/* Caching Explanatory Box */}
              <div className="text-xs text-slate-400 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Uthabiti na Kasi ya Programu (Fast Caching)
                </div>
                <p>
                  Programu inatumia teknolojia ya tabaka mbili za akiba (Server-Side Memory Cache na Browser Storage).
                  Hii inamaanisha:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  <li>Habari zinafunguka mara moja ndani ya sekunde 0.</li>
                  <li>Wasikilizaji wenye mtandao wa polepole au wakiwa bila bando wanaweza kuendelea kusoma habari zilizopita.</li>
                  <li>Tovuti yako hailemewi na maelfu ya maombi (requests) ya mara kwa mara.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: CONFIGURE & TEST */}
          {activeTab === 'configure' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Badilisha au unganisha URL ya tovuti yako halisi ya habari. Unaweza kupima kwanza kabla ya kuhifadhi.
              </p>

              {/* Source Type Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Mfumo wa Habari (Source Adapter)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('editorial');
                      setTargetUrl('');
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedType === 'editorial'
                        ? 'bg-amber-500/15 border-amber-500/50 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-bold text-amber-400 mb-0.5">Dawati la Habari</span>
                    <span className="text-[10px] text-slate-400">Editorial Newsroom (Imara & 0ms)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('wordpress')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedType === 'wordpress'
                        ? 'bg-amber-500/15 border-amber-500/50 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-bold text-amber-400 mb-0.5">WordPress REST</span>
                    <span className="text-[10px] text-slate-400">/wp-json/wp/v2/posts ya tovuti</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('rss')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedType === 'rss'
                        ? 'bg-amber-500/15 border-amber-500/50 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-bold text-amber-400 mb-0.5">RSS / Atom</span>
                    <span className="text-[10px] text-slate-400">/feed au /rss.xml ya blogu/tovuti</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('json')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedType === 'json'
                        ? 'bg-amber-500/15 border-amber-500/50 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-bold text-amber-400 mb-0.5">Custom JSON</span>
                    <span className="text-[10px] text-slate-400">REST API maalum ya habari</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Chaguo za Haraka (Presets):
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('editorial');
                      setTargetUrl('');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-yellow-300 border border-slate-700 transition-colors"
                  >
                    📻 Dawati la Radio Joy 90.5 FM (Ndani)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('wordpress');
                      setTargetUrl('https://radiojoyfm.co.tz');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-yellow-400 border border-slate-700 transition-colors"
                  >
                    🌐 Tovuti Rasmi (radiojoyfm.co.tz)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('rss');
                      setTargetUrl('https://news.google.com/rss?hl=sw&gl=TZ&ceid=TZ:sw');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-emerald-300 border border-slate-700 transition-colors"
                  >
                    📡 Habari za Moja kwa Moja (Live RSS)
                  </button>
                </div>
              </div>

              {/* Website URL Input */}
              {selectedType !== 'editorial' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    URL ya Tovuti ya Habari
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://tovutiyako.com au https://tovutiyako.com/feed"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Kwa WordPress, weka anwani ya msingi (mfano: <code>https://tovutiyako.com</code>). Mfumo utashughulikia <code>/wp-json/wp/v2/posts</code>.
                  </p>
                </div>
              )}

              {/* Optional API Key */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>API Key / Bearer Token</span>
                  <span className="text-[10px] text-slate-400 font-normal">Sio lazima (Optional)</span>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Kwa tovuti zenye ulinzi maalum tu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              {/* Cache TTL Slider / Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Muda wa Akiba (Cache TTL)</span>
                  <span className="text-xs text-amber-400 font-bold">{Math.round(cacheTtl / 60)} Dakika</span>
                </label>
                <input
                  type="range"
                  min="60"
                  max="1800"
                  step="60"
                  value={cacheTtl}
                  onChange={(e) => setCacheTtl(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Dakika 1 (Haraka zaidi)</span>
                  <span>Dakika 5 (Chaguo bora)</span>
                  <span>Dakika 30 (Kupunguza bandwidth)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleRunTest}
                  disabled={isTesting || (selectedType !== 'editorial' && !targetUrl)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                  {isTesting ? 'Inapima...' : 'Pima Muunganisho (Test Connection)'}
                </button>

                <button
                  type="button"
                  onClick={handleSaveAndSync}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-amber-500/20"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Imehifadhiwa na Kusawazishwa!</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>{isSaving ? 'Inahifadhi...' : 'Hifadhi na Sawazisha Tovuti'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Test Results Card */}
              {testResult && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in ${
                    testResult.success
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{testResult.message}</span>
                  </div>

                  {testResult.sample && (
                    <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 mt-2 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        Mfano wa Habari Iliyopatikana:
                      </span>
                      <p className="font-bold text-white text-xs truncate">{testResult.sample.title}</p>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{testResult.sample.summary}</p>
                      <div className="flex items-center gap-3 pt-1 text-[10px] text-amber-400">
                        <span>Kitengo: {testResult.sample.category}</span>
                        <span>Mwandishi: {testResult.sample.author?.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCTION ENVIRONMENT (.ENV) */}
          {activeTab === 'env' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Ili kuweka muunganisho huu kudumu katika seva ya uzalishaji (Cloud Run, Docker au VPS),
                ongeza vigezo hivi kwenye faili lako la <code className="text-amber-400 font-mono">.env</code>:
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 space-y-2 overflow-x-auto">
                <p className="text-slate-400"># Mipangilio ya Tovuti ya Habari ya Mwangaza FM</p>
                <p>NEWS_SOURCE_TYPE="{selectedType}"</p>
                <p>NEWS_SOURCE_URL="{targetUrl}"</p>
                {apiKey ? (
                  <p>NEWS_API_KEY="{apiKey}"</p>
                ) : (
                  <p className="text-slate-400"># NEWS_API_KEY="optional-bearer-token"</p>
                )}
                <p>NEWS_CACHE_TTL_SECONDS="{cacheTtl}"</p>
              </div>

              <div className="text-xs text-slate-400 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-amber-400" />
                  Mambo Muhimu Kuhusu WordPress na RSS
                </div>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  <li>
                    <strong className="text-slate-200">WordPress:</strong> Hakikisha REST API imewashwa kwenye WordPress yako (inakuja ikiwa imewashwa tayari tangu WordPress 4.7).
                  </li>
                  <li>
                    <strong className="text-slate-200">RSS Feed:</strong> Tovuti nyingi za habari huwa na feed kwenye <code>/feed</code> au <code>/rss</code>.
                  </li>
                  <li>
                    <strong className="text-slate-200">CORS:</strong> Programu hii inatumia Express Server-Side Proxy (`/api/news`), hivyo huwezi kupata hitilafu za CORS za kivinjari!
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Radio Joy 90.5 FM Media Engine • Kigoma, Tanzania
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Funga
          </button>
        </div>
      </div>
    </div>
  );
};
