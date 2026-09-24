import React, { useState } from 'react';
import { Church, Menu, X, Play, FileText, HeartHandshake, CreditCard, Search, MapPin, Phone, Bell } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLiveStream: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
  onOpenOffering: () => void;
  onOpenSearch: () => void;
  onOpenNewFamily: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveStream,
  onOpenBulletin,
  onOpenPrayer,
  onOpenOffering,
  onOpenSearch,
  onOpenNewFamily,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '교회소개' },
    { id: 'worship', label: '예배 및 모임' },
    { id: 'sermons', label: '말씀과 찬양' },
    { id: 'bulletin', label: '온라인 주보' },
    { id: 'community', label: '교제와 기도' },
    { id: 'location', label: '오시는 길' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      {/* Top Banner */}
      <div className="bg-amber-900 text-amber-50 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-amber-700 text-amber-100 font-semibold px-2 py-0.5 rounded text-[11px]">교회 알림</span>
            <span className="truncate">2026년 교회 표어: {CHURCH_INFO.motto}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-amber-200 text-xs">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {CHURCH_INFO.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> 서초구 반포동</span>
            <button onClick={onOpenNewFamily} className="text-amber-100 hover:underline font-medium">새가족 안내</button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-800 flex items-center justify-center text-amber-50 shadow-md group-hover:bg-amber-900 transition-colors">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif font-bold text-xl sm:text-2xl text-stone-900 tracking-tight flex items-center gap-2">
                {CHURCH_INFO.name}
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                {CHURCH_INFO.englishName}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-800 text-white font-semibold shadow-xs'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-amber-100/70 rounded-full transition-colors"
              title="검색"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenLiveStream}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>생방송 예배</span>
            </button>

            <button
              onClick={onOpenBulletin}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium rounded-lg shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>주보</span>
            </button>

            <button
              onClick={onOpenOffering}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium rounded-lg shadow-xs transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>온라인 헌금</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:bg-amber-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-stone-700 hover:text-stone-900 rounded-xl bg-amber-100/80 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-50/98 border-b border-amber-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-amber-200/80">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLiveStream(); }}
              className="flex items-center justify-center gap-2 p-2.5 bg-red-600 text-white text-xs font-medium rounded-lg"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              생방송 예배
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBulletin(); }}
              className="flex items-center justify-center gap-2 p-2.5 bg-stone-800 text-white text-xs font-medium rounded-lg"
            >
              <FileText className="w-3.5 h-3.5" />
              온라인 주보
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenPrayer(); }}
              className="flex items-center justify-center gap-2 p-2.5 bg-amber-800 text-white text-xs font-medium rounded-lg"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              기도 요청
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOffering(); }}
              className="flex items-center justify-center gap-2 p-2.5 bg-emerald-700 text-white text-xs font-medium rounded-lg"
            >
              <CreditCard className="w-3.5 h-3.5" />
              온라인 헌금
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-amber-800 text-white font-semibold'
                    : 'text-stone-800 hover:bg-amber-100/80'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-60">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-amber-200 flex items-center justify-between text-xs text-stone-600 px-2">
            <button onClick={() => { setMobileMenuOpen(false); onOpenNewFamily(); }} className="font-semibold text-amber-900">
              ✨ 새가족 등록 안내
            </button>
            <span>전화: {CHURCH_INFO.phone}</span>
          </div>
        </div>
      )}
    </header>
  );
};
