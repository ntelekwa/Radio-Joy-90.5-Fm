import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock, Share2, Globe, Radio } from 'lucide-react';
import { STATION_INFO } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Kigoma',
    type: 'salamu',
    message: '',
    songTitle: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        city: 'Kigoma',
        type: 'salamu',
        message: '',
        songTitle: '',
      });
    }, 4500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-blue-900/60 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
            <Phone className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
            Wasiliana Nasi (Contact Studio)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
          Tupo tayari kupokea maoni yako, maombi ya nyimbo, habari, na matangazo ya biashara
        </p>
      </div>

      {/* Direct Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* WhatsApp Card */}
        <a
          id="contact-card-whatsapp"
          href={STATION_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#071d36] border border-emerald-500/30 hover:border-emerald-500/60 rounded-3xl p-5 space-y-3 transition-all hover:scale-[1.02] shadow-lg group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Ujumbe wa Moja kwa Moja
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">WhatsApp Studio</h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">{STATION_INFO.whatsapp}</p>
          </div>
          <span className="inline-block text-xs font-bold text-emerald-400 group-hover:underline">
            Anzisha Chat Sasa →
          </span>
        </a>

        {/* Studio Phone Call */}
        <a
          id="contact-card-phone"
          href={`tel:${STATION_INFO.phoneStudio.replace(/\s+/g, '')}`}
          className="bg-[#071d36] border border-yellow-400/30 hover:border-yellow-400/60 rounded-3xl p-5 space-y-3 transition-all hover:scale-[1.02] shadow-lg group"
        >
          <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-blue-950 transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400">
              Piga Simu Hewani
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Hotline ya Studio</h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">{STATION_INFO.phoneStudio}</p>
          </div>
          <span className="inline-block text-xs font-bold text-yellow-400 group-hover:underline">
            Piga Simu Sasa →
          </span>
        </a>

        {/* Office Email */}
        <a
          id="contact-card-email"
          href={`mailto:${STATION_INFO.email}`}
          className="bg-[#071d36] border border-blue-900/60 hover:border-blue-700 rounded-3xl p-5 space-y-3 transition-all hover:scale-[1.02] shadow-lg group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
              Barua Pepe
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Studio & Matangazo</h3>
            <p className="text-xs text-slate-300 mt-1 truncate">{STATION_INFO.email}</p>
          </div>
          <span className="inline-block text-xs font-bold text-blue-300 group-hover:underline">
            Tuma Barua Pepe →
          </span>
        </a>

        {/* Studio Location */}
        <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-5 space-y-3 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              Makao Makuu
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Kigoma, Tanzania</h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">{STATION_INFO.address}</p>
          </div>
          <span className="inline-block text-xs text-blue-300/70">
            Fungua 24/7 Masaa 24
          </span>
        </div>
      </div>

      {/* Main Interactive Contact Form & Socials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact & Request Form */}
        <div className="lg:col-span-7 bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">
              Tuma Ujumbe, Ombi la Wimbo au Maoni
            </h2>
            <p className="text-xs text-blue-200/70">
              Ujumbe wako utapokelewa moja kwa moja kwenye meza kuu ya matangazo au ofisi ya habari.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Jina Lako Kamili *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mf. Hamisi Omari"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#051528] border border-blue-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Namba ya Simu / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+255 7..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#051528] border border-blue-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Mkoa / Eneo Ulilopo
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#051528] border border-blue-900/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Kigoma">Kigoma</option>
                  <option value="Kasulu">Kasulu</option>
                  <option value="Kibondo">Kibondo</option>
                  <option value="Uvinza">Uvinza</option>
                  <option value="Buhigwe">Buhigwe</option>
                  <option value="Dar es Salaam">Dar es Salaam</option>
                  <option value="Dodoma">Dodoma</option>
                  <option value="Mwanza">Mwanza</option>
                  <option value="Tabora">Tabora</option>
                  <option value="Mkoa Mwingine">Mkoa Mwingine</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Aina ya Ujumbe
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-[#051528] border border-blue-900/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="salamu">Salamu na Maoni kwa Kipindi</option>
                  <option value="wimbo">Ombi la Wimbo (Song Request)</option>
                  <option value="habari">Taarifa ya Habari / Tukio (News Tip)</option>
                  <option value="matangazo">Matangazo ya Biashara (Advertising)</option>
                </select>
              </div>
            </div>

            {formData.type === 'wimbo' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Jina la Wimbo na Msanii Unaomwomba
                </label>
                <input
                  type="text"
                  placeholder="Mf. Nani Kama Mama - Christian Bella"
                  value={formData.songTitle}
                  onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
                  className="w-full bg-[#051528] border border-blue-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Ujumbe Wako Kamili *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Andika ujumbe wako kwa mtangazaji au timu ya Radio Joy 90.5 FM..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#051528] border border-blue-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 resize-none"
              />
            </div>

            <button
              type="submit"
              id="contact-form-submit-btn"
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black text-xs sm:text-sm rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Tuma Ujumbe Sasa</span>
            </button>

            {isSubmitted && (
              <div className="bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                <span>
                  Asante sana! Ujumbe wako umepokelewa na timu yetu ya Radio Joy 90.5 FM. Tutawasiliana nawe hivi punde.
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Right: Social Media, Map & Advertising info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Social Media Channels */}
          <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              Tufuate Kwenye Mitandao ya Kijamii
            </h3>
            <p className="text-xs text-blue-200/70">
              Ungana na maelfu ya wafuasi wetu kwa habari za haraka na video za matukio
            </p>

            <div className="space-y-2.5">
              <a
                href={STATION_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#051528] hover:bg-blue-900/40 border border-blue-900/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                    IG
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Instagram</h4>
                    <p className="text-[10px] text-slate-400">@radiojoyfm</p>
                  </div>
                </div>
                <span className="text-xs text-yellow-400 font-bold">Fuata →</span>
              </a>

              <a
                href={STATION_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#051528] hover:bg-blue-900/40 border border-blue-900/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                    𝕏
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">X (Twitter)</h4>
                    <p className="text-[10px] text-slate-400">@radiojoyfm</p>
                  </div>
                </div>
                <span className="text-xs text-yellow-400 font-bold">Fuata →</span>
              </a>

              <a
                href={STATION_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#051528] hover:bg-blue-900/40 border border-blue-900/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xs">
                    YT
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">YouTube</h4>
                    <p className="text-[10px] text-slate-400">Radio Joy FM Online</p>
                  </div>
                </div>
                <span className="text-xs text-yellow-400 font-bold">Jiunge →</span>
              </a>

              <a
                href={STATION_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#051528] hover:bg-blue-900/40 border border-blue-900/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    FB
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Facebook</h4>
                    <p className="text-[10px] text-slate-400">Radio Joy 90.5 FM</p>
                  </div>
                </div>
                <span className="text-xs text-yellow-400 font-bold">Fuata →</span>
              </a>
            </div>
          </div>

          {/* Advertising & Business Desk */}
          <div className="bg-gradient-to-br from-[#0a2544] via-[#071d36] to-[#041021] border border-yellow-400/30 rounded-3xl p-6 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Tangaza Biashara Yako Redioni
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Fikia mamilioni ya wasikilizaji kote Tanzania kupitia matangazo ya sauti, vipindi maalum vya udhamini, na matangazo ya kidijitali kwenye tovuti na programu yetu ya Radio Joy 90.5 FM.
            </p>
            <div className="pt-2 text-xs space-y-1">
              <p className="text-slate-300">
                Simu ya Matangazo: <strong className="text-white font-mono">{STATION_INFO.phoneOffice}</strong>
              </p>
              <p className="text-slate-300">
                Barua Pepe: <strong className="text-yellow-400 font-mono">{STATION_INFO.emailInfo}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
