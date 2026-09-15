import React from 'react';
import { Radio, Phone, Mail, MapPin, MessageCircle, Heart, Sliders, Sparkles, Sun, Moon } from 'lucide-react';
import { STATION_INFO, FREQUENCIES } from '../data/mockData';
import { ActiveTab } from '../types';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { theme, setTheme, viewMode, setViewMode, setIsThemeSettingsOpen } = useTheme();
  return (
    <footer className="bg-[#06182c] border-t border-blue-900/60 text-slate-300 text-xs mt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 flex-shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white font-['Cabinet_Grotesk']">
                  {STATION_INFO.name}
                </h3>
                <p className="text-[10px] font-black text-yellow-400 uppercase tracking-wider">
                  {STATION_INFO.frequency} • {STATION_INFO.broadcastHours}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Kituo cha jamii cha habari na elimu kilichopo Kibirizi Kigoma kando ya Ziwa Tanganyika. Huduma ya Joy in the Harvest kwa maendeleo ya watu wote.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              Kurasa Kuu
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Nyumbani (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('radio')}
                  className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Redio Live 24/7</span>
                  <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded">LIVE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('news')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Habari & Makala (News)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Vitengo vya Habari
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Ratiba ya Vipindi (Schedule)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Kuhusu Sisi (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Wasiliana Nasi (Contact)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="text-yellow-400/90 hover:text-yellow-400 transition-colors font-bold flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Control Panel (Admin)</span>
                </button>
              </li>
              <li className="pt-2 border-t border-blue-900/60">
                <button
                  onClick={() => setIsThemeSettingsOpen(true)}
                  className="text-slate-300 hover:text-yellow-400 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Badili Mandhari & Mwonekano</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Frequencies summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              Usikivu & Masafa Yetu
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {FREQUENCIES.map((f) => (
                <div key={f.city} className="bg-[#0b2442] p-1.5 rounded-lg border border-blue-900/60">
                  <p className="text-slate-300 truncate font-medium">{f.city.split('&')[0]}</p>
                  <p className="font-bold text-yellow-400 font-mono">{f.frequency}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              Mawasiliano ya Haraka
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${STATION_INFO.phoneStudio.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Simu Studio: {STATION_INFO.phoneStudio}</span>
              </a>

              <a
                href={STATION_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp: {STATION_INFO.whatsapp}</span>
              </a>

              <a
                href={`mailto:${STATION_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="truncate">{STATION_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-300 pt-1">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{STATION_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-blue-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {STATION_INFO.name} ({STATION_INFO.frequency}). Haki Zote Zimehifadhiwa.
          </p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Radio Joy 90.5 FM • Joy in the Harvest Kigoma</span>
            <Heart className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
