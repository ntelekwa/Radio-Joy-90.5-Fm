import React from 'react';
import { Info, Radio, RadioTower, ShieldCheck, Heart, Users, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { STATION_INFO, FREQUENCIES } from '../data/mockData';
import { ActiveTab } from '../types';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071d36] via-[#051528] to-[#0a274c] border border-yellow-400/30 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-1 flex-shrink-0 flex items-center justify-center text-yellow-400 shadow-xl">
            <Radio className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
                {STATION_INFO.name}
              </h1>
              <span className="bg-yellow-400 text-blue-950 text-sm font-black px-2.5 py-0.5 rounded-lg">
                {STATION_INFO.frequency}
              </span>
            </div>
            <p className="text-sm sm:text-base text-yellow-300 font-semibold">
              Kibirizi, Kigoma, Tanzania • 90.5 FM
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Kituo kikuu cha redio na habari cha kujitegemea nchini Tanzania, kinachorusha matangazo kutoka Kigoma na masafa kote nchini kwa masaa 24 kila siku.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Dira Yetu (Our Vision)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kuwa jukwaa namba moja la mawasiliano, habari za ukweli, na burudani yenye furaha na tija inayogusa na kuboresha maisha ya jamii ya Kitanzania.
          </p>
        </div>

        <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Dhamira Yetu (Our Mission)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kutoa sauti kwa jamii, kuelimisha, kueneza furaha, na kukuza utamaduni na amani kwa weledi na uadilifu wa hali ya juu.
          </p>
        </div>

        <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Maadili Yetu (Core Values)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ukweli, furaha ya jamii, uhuru wa uhariri, uzalendo, na heshima kwa lugha yetu adhimu ya Kiswahili na maendeleo ya taifa.
          </p>
        </div>
      </div>

      {/* Broadcast Frequencies Section */}
      <div className="bg-[#071d36] border border-blue-900/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
              <RadioTower className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Usikivu Wetu & Masafa (Frequencies)</h2>
              <p className="text-xs text-blue-200/70">Tupate hewani kwenye masafa yafuatayo popote ulipo:</p>
            </div>
          </div>
          <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 self-start sm:self-center">
            Kigoma, Kasulu, Uvinza, Kibondo & Buhigwe
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FREQUENCIES.map((freq) => (
            <div
              key={freq.city}
              className="p-4 rounded-2xl bg-[#051528] border border-blue-900/60 hover:border-yellow-400/40 transition-colors space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {freq.region}
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">
                {freq.city}
              </h4>
              <p className="text-xl font-black text-yellow-400 font-mono pt-1">
                {freq.frequency}
              </p>
              <p className="text-[10px] text-slate-400 pt-0.5">
                {freq.transmitter}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Location & Contact Banner */}
      <div className="bg-gradient-to-r from-[#071d36] to-[#051528] border border-blue-900/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-yellow-400/10 text-yellow-400 flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Studio Kuu za Radio Joy 90.5 FM</h4>
            <p className="text-xs text-blue-200/70">{STATION_INFO.address}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('contact')}
          className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          Mawasiliano Kamili
        </button>
      </div>
    </div>
  );
};
