import React, { useState } from 'react';
import {
  PhoneCall,
  Calendar,
  Bot,
  Search,
  Menu,
  X,
  Building2,
  Clock,
  ShieldAlert,
  UserCheck,
  FileText,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const navItems = [
    { id: 'departments', label: '진료과 · 의료진', icon: UserCheck },
    { id: 'ai-consult', label: 'AI 증상상담', icon: Bot, badge: 'AI' },
    { id: 'checkup', label: '건강검진센터', icon: Activity },
    { id: 'guide', label: '이용안내 · 오시는길', icon: Building2 },
    { id: 'notices', label: '병원소식 · 건강칼럼', icon: FileText },
  ];

  const toggleFontSize = () => {
    const newSize = fontSize === 'normal' ? 'large' : 'normal';
    setFontSize(newSize);
    if (newSize === 'large') {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Bar - Emergency & Accessibility */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-rose-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span>24시간 응급의료센터: <strong className="text-white text-sm font-bold">02-1588-0000</strong></span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>외래진료: 평일 08:30 - 17:30 (토요일 12:30까지)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFontSize}
              className="hover:text-white transition px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]"
              title="글자 크기 변경"
            >
              글자크기 {fontSize === 'normal' ? '크게 🔍+' : '원래대로'}
            </button>
            <a
              href="#guide"
              onClick={() => setActiveTab('guide')}
              className="hover:text-white transition hidden sm:inline"
            >
              주차안내
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href="#guide"
              onClick={() => setActiveTab('guide')}
              className="hover:text-white transition hidden sm:inline"
            >
              층별안내
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-serif">
                서울대학교<span className="text-blue-600">병원</span>
              </span>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-200 hidden sm:inline-block">
                보건복지부 인증
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 tracking-wider uppercase font-medium">
              SEOUL NATIONAL UNIVERSITY HOSPITAL
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-md animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-teal-700 transition active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>스마트 진료예약</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-xl">
          <div className="mb-3 p-3 bg-blue-50 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-semibold">간편하게 진료 일정을 선택하세요</p>
              <p className="text-sm font-bold text-blue-900">모바일 모바일 당일 예약 지원</p>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              예약하기
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-400 px-2 py-1">주요 메뉴</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
            <a href="tel:02-1588-0000" className="flex items-center gap-1 font-semibold text-rose-600">
              <PhoneCall className="w-4 h-4" /> 응급실 연결
            </a>
            <button
              onClick={() => {
                setActiveTab('guide');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-1 font-semibold text-slate-700"
            >
              <Building2 className="w-4 h-4" /> 오시는길
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
