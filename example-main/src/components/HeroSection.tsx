import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Bot,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  UserCheck,
  Activity,
  HeartPulse,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onNavigateTab,
  onOpenBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const quickSymptoms = ['두통/어지럼증', '속쓰림/소화불량', '무릎/허리통증', '고열/아토피', '백내장/시력'];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-blue-950 text-white pt-10 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Light glow effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text & Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>2026 보건복지부 인증 종합병원 · 최첨단 3.0T MRI 보유</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
              환자 중심의 정밀 의료,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-200 to-indigo-200">
                당신의 건강한 내일
              </span>을 약속합니다.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              분야별 전담 전문의 협진 시스템과 24시간 응급의료센터를 바탕으로<br className="hidden sm:inline" />
              신속하고 정밀한 개인 맞춤형 진료 서비스를 제공합니다.
            </p>

            {/* Symptom & Doctor Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl shadow-slate-900/50">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="증상, 질환명, 진료과 또는 의사 이름을 검색해보세요 (예: 두통, 이수진)"
                  className="w-full px-3 py-2.5 text-slate-900 text-sm focus:outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition shadow-md shrink-0"
                >
                  검색
                </button>
              </div>

              {/* Quick Symptom Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-300">
                <span className="text-slate-400 font-medium">자주 찾는 증상:</span>
                {quickSymptoms.map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => {
                      setSearchQuery(sym.split('/')[0]);
                      onSearch(sym.split('/')[0]);
                    }}
                    className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 transition"
                  >
                    #{sym}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Right Hero Image Card & Quick Access */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-1">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200&h=800"
                  alt="서울대학교병원 첨단 외래 센터"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Status Pill */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  <span>오늘 당일 외래 접수 가능</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-teal-300 font-semibold">24/7 EMERGENCY CENTER</p>
                  <h3 className="text-lg font-bold">원스톱 첨단 수술 및 입원 케어</h3>
                  <p className="text-xs text-slate-300">내과·정형외과·신경외과 전문의 24시간 응급 대기</p>
                </div>
              </div>

              {/* Bottom Hospital Trust Badges */}
              <div className="grid grid-cols-3 gap-2 p-3 text-center text-xs">
                <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/40">
                  <p className="text-lg font-extrabold text-teal-300">12명</p>
                  <p className="text-slate-400 text-[11px]">대학병원 출신 전문의</p>
                </div>
                <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/40">
                  <p className="text-lg font-extrabold text-blue-300">3.0T MRI</p>
                  <p className="text-slate-400 text-[11px]">최첨단 정밀 영상장비</p>
                </div>
                <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/40">
                  <p className="text-lg font-extrabold text-emerald-300">99.2%</p>
                  <p className="text-slate-400 text-[11px]">환자 진료 만족도</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Service Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
          <button
            onClick={onOpenBooking}
            className="group p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-left transition shadow-lg shadow-blue-900/30 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-blue-200 uppercase">FAST BOOKING</span>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>빠른 진료 예약</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-blue-100/80 mt-1">의사별 일정을 확인하고 간편 예약</p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('ai-consult')}
            className="group p-4 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-left transition shadow-lg shadow-teal-900/30 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition">
              <Bot className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-teal-200 uppercase">AI AI SYMPTOM CHECK</span>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>AI 건강 증상 상담</span>
                <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-teal-100/80 mt-1">증상 입력 시 적절한 진료과 안내</p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('checkup')}
            className="group p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-left transition border border-slate-700/80 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">CHECKUP CENTER</span>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>종합 건강검진</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-1">맞춤형 정밀 검진 패키지 안내</p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('guide')}
            className="group p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-left transition border border-slate-700/80 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">HOSPITAL GUIDE</span>
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>진료시간 & 오시는길</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-1">층별 안내 및 무료 주차 시스템</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
