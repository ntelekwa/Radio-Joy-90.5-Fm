import React, { useState } from 'react';
import { X, Bell, BellRing, CheckCheck, Flame, Radio, Trophy, Sparkles, ShieldCheck } from 'lucide-react';
import { PushNotification, Article } from '../types';

interface NotificationModalProps {
  notifications: PushNotification[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectNotification: (notif: PushNotification) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );

  const [settings, setSettings] = useState({
    breaking: true,
    radio: true,
    sports: true,
    daily: false,
  });

  const [testSent, setTestSent] = useState(false);

  const requestNativePermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermissionStatus(result);
        if (result === 'granted') {
          new Notification('Radio Joy 90.5 FM', {
            body: 'Asante! Utapokea taarifa za matukio muhimu na habari motomoto kutoka Kigoma.',
            icon: '/favicon.ico',
          });
        }
      } catch (e) {
        console.warn('Notification permission error:', e);
      }
    }
  };

  const handleSendTestNotification = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#071d36] border border-blue-900/80 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Arifa na Taarifa (Push Alerts)</h3>
              <p className="text-xs text-blue-200/70">Habari za hivi punde na vipindi vya Radio Joy</p>
            </div>
          </div>
          <button
            id="notif-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#051528] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 space-y-5 pr-1">
          {/* Permission Prompt Card */}
          <div className="bg-gradient-to-br from-[#0c2a4d] to-[#051528] border border-yellow-400/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase text-yellow-400">
                  Arifa za Simu (Push Notifications)
                </h4>
              </div>
              <p className="text-xs text-slate-200 mt-1">
                {permissionStatus === 'granted'
                  ? 'Arifa zimeruhusiwa kikamilifu kwenye kifaa chako.'
                  : 'Ruhusu taarifa ili usipitwe na matukio makubwa nchini.'}
              </p>
            </div>

            {permissionStatus !== 'granted' ? (
              <button
                id="enable-push-permission-btn"
                onClick={requestNativePermission}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs shadow-md transition-colors flex-shrink-0"
              >
                Washa Arifa
              </button>
            ) : (
              <button
                id="test-push-notification-btn"
                onClick={handleSendTestNotification}
                className="px-3 py-1.5 rounded-lg bg-[#051528] hover:bg-blue-900/40 text-slate-300 text-xs font-medium border border-blue-900/60"
              >
                {testSent ? 'Imetumwa!' : 'Jaribu Arifa'}
              </button>
            )}
          </div>

          {/* Preferences Toggles */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Aina za Arifa Unazopendelea:
            </h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#051528] border border-blue-900/60 cursor-pointer hover:border-blue-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-red-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Habari za Hivi Punde (Breaking)</p>
                    <p className="text-[11px] text-blue-200/60">Matukio makubwa ya kitaifa na kimataifa</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.breaking}
                  onChange={(e) => setSettings({ ...settings, breaking: e.target.checked })}
                  className="w-4 h-4 accent-yellow-400 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#051528] border border-blue-900/60 cursor-pointer hover:border-blue-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Vipindi Maalum vya Redio</p>
                    <p className="text-[11px] text-blue-200/60">Wakati vipindi vyako unavyovipenda vinapoanza</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.radio}
                  onChange={(e) => setSettings({ ...settings, radio: e.target.checked })}
                  className="w-4 h-4 accent-yellow-400 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#051528] border border-blue-900/60 cursor-pointer hover:border-blue-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Matokeo ya Michezo & Derby</p>
                    <p className="text-[11px] text-blue-200/60">Magoli ya NBC Premier League na Taifa Stars</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.sports}
                  onChange={(e) => setSettings({ ...settings, sports: e.target.checked })}
                  className="w-4 h-4 accent-yellow-400 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Recent Alerts List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Arifa za Hivi Karibuni ({notifications.length})
              </h4>
              <button
                id="mark-all-read-btn"
                onClick={onMarkAllRead}
                className="text-xs text-yellow-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Weka Zote Zimesomwa</span>
              </button>
            </div>

            <div className="space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onSelectNotification(notif)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    notif.isRead
                      ? 'bg-[#051528]/80 border-blue-900/40 hover:bg-[#051528]'
                      : 'bg-[#051528] border-yellow-400/40 shadow-sm hover:bg-[#0c2a4d]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                      )}
                      <h5 className="text-xs font-bold text-white">{notif.title}</h5>
                    </div>
                    <span className="text-[10px] text-blue-200/60 flex-shrink-0">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 pl-4">{notif.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
