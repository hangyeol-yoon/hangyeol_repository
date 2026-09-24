import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  PhoneCall, 
  Mail, 
  Calculator, 
  Sparkles,
  ArrowRight,
  Globe
} from 'lucide-react';
import { NavCategory } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  currentCategory: NavCategory;
  currentSubSection: string;
  onNavigate: (category: NavCategory, subSection?: string) => void;
  onOpenSearch: () => void;
  onOpenQuoteModal: () => void;
}

export const NAV_ITEMS: {
  id: NavCategory;
  label: string;
  subSections: { id: string; label: string; desc: string }[];
}[] = [
  {
    id: 'home',
    label: 'HOME',
    subSections: []
  },
  {
    id: 'about',
    label: '회사소개',
    subSections: [
      { id: 'ceo', label: 'CEO 인사말', desc: '대표이사 신념 및 가치관' },
      { id: 'overview', label: '회사소개', desc: '기업 개요, 미션 및 핵심가치' },
      { id: 'vision', label: '비전', desc: 'Vision 2030 혁신 목표' },
      { id: 'history', label: '연혁', desc: '2021년 창립부터 현재까지 성장기' },
      { id: 'org', label: '조직도', desc: '체계적인 조직 구조 및 전문 연구소' }
    ]
  },
  {
    id: 'services',
    label: '서비스',
    subSections: [
      { id: 'overview', label: '서비스 소개', desc: 'B2B 엔터프라이즈 DX 핵심 서비스' },
      { id: 'features', label: '주요 기능', desc: '안정성, 확장성, 24/7 관제 스펙' },
      { id: 'cases', label: '구축 사례', desc: '산업별 시그니처 도입 리포트' },
      { id: 'pricing', label: '가격 안내(선택)', desc: '투명하고 합리적인 플랜 안내' }
    ]
  },
  {
    id: 'solutions',
    label: '솔루션',
    subSections: [
      { id: 'ai', label: 'AI 솔루션', desc: 'LLM Gateway, RAG, AI 에이전트' },
      { id: 'cloud', label: '클라우드', desc: '멀티클라우드 오케스트레이터 & FinOps' },
      { id: 'data', label: '데이터 분석', desc: '실시간 데이터 레이크하우스 & BI' },
      { id: 'custom', label: '맞춤 개발', desc: '고성능 마이크로서비스 웹/앱 프레임워크' }
    ]
  },
  {
    id: 'portfolio',
    label: '포트폴리오',
    subSections: [
      { id: 'projects', label: '프로젝트', desc: '산업별 혁신 프로젝트 레퍼런스' },
      { id: 'clients', label: '고객사', desc: '함께 성장하는 파트너십' },
      { id: 'success', label: '성공 사례', desc: 'ROI 및 질적 성과 집중 조명' }
    ]
  },
  {
    id: 'news',
    label: '뉴스',
    subSections: [
      { id: 'notice', label: '공지사항', desc: '중요 정책 및 기업 공식 안내' },
      { id: 'blog', label: '블로그', desc: '최신 AI & 클라우드 기술 인사이트' },
      { id: 'press', label: '보도자료', desc: '언론 속 넥스트이노베이션' },
      { id: 'careers', label: '채용', desc: '함께 비전을 만들어갈 인재 채용' }
    ]
  },
  {
    id: 'contact',
    label: '문의',
    subSections: [
      { id: 'consulting', label: '상담 신청', desc: '전문 컨설턴트 1:1 무상 방문/온라인 상담' },
      { id: 'quote', label: '견적 문의', desc: '인터랙티브 예상 견적 산출 계산기' },
      { id: 'location', label: '오시는 길', desc: '테헤란로 본사 오시는 길 & 주차 안내' }
    ]
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  currentSubSection,
  onNavigate,
  onOpenSearch,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<NavCategory | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<NavCategory | null>('about');
  const [lang, setLang] = useState<'KOR' | 'ENG'>('KOR');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>{COMPANY_INFO.tel}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{COMPANY_INFO.email}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-medium text-[11px] border border-blue-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Series B 180억 원 투자 유치 완료</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'KOR' ? 'ENG' : 'KOR')}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-semibold">{lang}</span>
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => onNavigate('contact', 'location')}
              className="hover:text-blue-400 transition-colors"
            >
              오시는 길
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => onNavigate('news', 'careers')}
              className="hover:text-blue-400 transition-colors"
            >
              인재채용
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Navbar */}
      <div 
        className={`w-full transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md border-slate-800 shadow-lg py-3' 
            : 'bg-slate-900 border-slate-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center space-x-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  NEXT
                </span>
                <span className="text-lg font-light tracking-wider text-slate-300">
                  INNOVATION
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-widest font-mono uppercase">
                Enterprise AI & Cloud
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentCategory === item.id;
              const hasSub = item.subSections.length > 0;

              return (
                <div 
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (item.subSections.length > 0) {
                        onNavigate(item.id, item.subSections[0].id);
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20 shadow-sm' 
                        : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSub && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Mega Dropdown Panel */}
                  {hasSub && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-slate-800 mb-1">
                        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                          {item.label} 메뉴
                        </span>
                      </div>
                      <div className="space-y-1">
                        {item.subSections.map((sub) => {
                          const isSubActive = isActive && currentSubSection === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                onNavigate(item.id, sub.id);
                                setActiveDropdown(null);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs flex flex-col justify-center ${
                                isSubActive
                                  ? 'bg-blue-600/20 text-blue-300 font-bold border-l-2 border-blue-500'
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <span className="text-sm font-medium">{sub.label}</span>
                              <span className="text-[11px] text-slate-400 font-normal mt-0.5 line-clamp-1">
                                {sub.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="통합 검색"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-600/20 transition-all hover:shadow-blue-500/30 active:scale-95"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>빠른 견적 문의</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-slate-950/95 backdrop-blur-xl z-40 overflow-y-auto border-t border-slate-800 p-4">
          <div className="space-y-3 pb-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                전체 서비스 네비게이션
              </span>
              <button 
                onClick={onOpenQuoteModal}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-md flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>견적 산출</span>
              </button>
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = currentCategory === item.id;
              const hasSub = item.subSections.length > 0;
              const isAccordionOpen = openMobileAccordion === item.id;

              return (
                <div key={item.id} className="bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden">
                  <div
                    onClick={() => {
                      if (hasSub) {
                        setOpenMobileAccordion(isAccordionOpen ? null : item.id);
                      } else {
                        onNavigate(item.id);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer ${
                      isActive ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-200'
                    }`}
                  >
                    <span className="text-base font-semibold">{item.label}</span>
                    {hasSub ? (
                      <ChevronDown className={`w-4 h-4 transition-transform ${isAccordionOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  {hasSub && isAccordionOpen && (
                    <div className="bg-slate-950/80 px-4 py-2 border-t border-slate-800/60 space-y-1">
                      {item.subSections.map((sub) => {
                        const isSubActive = isActive && currentSubSection === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              onNavigate(item.id, sub.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left py-2 px-3 rounded-lg text-xs flex justify-between items-center ${
                              isSubActive
                                ? 'bg-blue-600 text-white font-bold'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div>
                              <div className="text-sm font-medium">{sub.label}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{sub.desc}</div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
