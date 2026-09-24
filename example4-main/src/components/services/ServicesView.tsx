import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Cloud, 
  Database, 
  Code2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  ArrowRight,
  Sparkles,
  Calculator
} from 'lucide-react';
import { ServicesSubSection } from '../../types';
import { SERVICES_DATA, PRICING_PLANS, PORTFOLIO_PROJECTS } from '../../data/companyData';

interface ServicesViewProps {
  initialSubSection?: string;
  onNavigate: (category: any, subSection?: string) => void;
  onOpenQuoteModal: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ 
  initialSubSection = 'overview', 
  onNavigate,
  onOpenQuoteModal 
}) => {
  const [activeTab, setActiveTab] = useState<ServicesSubSection>(
    (initialSubSection as ServicesSubSection) || 'overview'
  );
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tabs: { id: ServicesSubSection; label: string }[] = [
    { id: 'overview', label: '서비스 소개' },
    { id: 'features', label: '주요 기능' },
    { id: 'cases', label: '구축 사례' },
    { id: 'pricing', label: '가격 안내(선택)' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            OUR SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            엔터프라이즈 DX 핵심 서비스
          </h1>
          <p className="text-sm text-slate-400">
            AI, 멀티 클라우드, 빅데이터 및 고성능 커스텀 SW 개발 전문 서비스
          </p>
        </div>

        {/* Sub Navigation Bar */}
        <div className="max-w-2xl mx-auto mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* 1. 서비스 소개 */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {SERVICES_DATA.map((srv, idx) => (
              <div 
                key={srv.id}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <span>SERVICE 0{idx + 1}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{srv.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{srv.description}</p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">주요 제공 기능</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {srv.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase">기대 효과 (ROI)</span>
                    <p className="text-xs text-slate-300">{srv.benefits.join(' · ')}</p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-64 object-cover rounded-2xl border border-slate-700 shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. 주요 기능 */}
        {activeTab === 'features' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-white">엔터프라이즈급 플랫폼 스펙</h2>
              <p className="text-xs text-slate-400">
                넥스트이노베이션 모든 서비스는 최고 수준의 가용성과 보안, 성능 규격을 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">금융/공공급 완벽 보안</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  개인식별정보(PII) 자동 마스킹, AES-256 데이터 암호화, ISO 27001/27017 표준 준수 및 망분리 환경 연동을 지원합니다.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">99.99% 가용성 SLA</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  24/7/365 전담 SRE 팀의 무장애 관제 서비스와 자동 오토스케일링, 무중단 Zero-Downtime 배포 파이프라인을 운영합니다.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">모듈식 커스텀 확장</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  기존 ERP, CRM, 그룹웨어와 100% 호환되는 Open REST/GraphQL API를 기본 탑재하여 신속하게 시스템을 연동합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. 구축 사례 */}
        {activeTab === 'cases' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-3xl font-bold text-white">산업별 시그니처 구축 사례</h2>
              <p className="text-xs text-slate-400">실제 비즈니스 가치 창출을 증명한 대표 레퍼런스입니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PORTFOLIO_PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-blue-400">{proj.client}</span>
                    <span className="font-mono text-[10px]">{proj.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.summary}</p>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    {proj.results.map((r, i) => (
                      <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <div className="text-base font-extrabold text-cyan-400">{r.metric}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. 가격 안내 */}
        {activeTab === 'pricing' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Billing Cycle Switch */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>월간 결제</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 bg-slate-800 rounded-full p-1 border border-slate-700 relative transition-colors"
              >
                <div className={`w-6 h-6 rounded-full bg-blue-500 transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>연간 결제</span>
                <span className="text-[10px] font-extrabold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">20% 할인</span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRICING_PLANS.map((plan) => {
                const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

                return (
                  <div 
                    key={plan.id}
                    className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                      plan.isPopular 
                        ? 'bg-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/10' 
                        : 'bg-slate-900/60 border border-slate-800'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                      </div>

                      <div className="border-b border-slate-800 pb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-white">
                            {(price / 10000).toLocaleString()}만원
                          </span>
                          <span className="text-xs text-slate-400 font-normal">/ 월</span>
                        </div>
                        {billingCycle === 'yearly' && (
                          <div className="text-[11px] text-blue-400 mt-1 font-mono">
                            연간 결제 시 20% 특별 할인가 적용
                          </div>
                        )}
                      </div>

                      <ul className="space-y-2.5 text-xs text-slate-300">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={onOpenQuoteModal}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          plan.isPopular
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        <Calculator className="w-4 h-4" />
                        <span>{plan.ctaText}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
