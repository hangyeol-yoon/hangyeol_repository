import React, { useState } from 'react';
import { 
  Building2, 
  Quote, 
  Target, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Calendar, 
  Award, 
  Users, 
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { AboutSubSection } from '../../types';
import { CEO_DATA, OVERVIEW_DATA, HISTORY_DATA, ORG_TREE, COMPANY_INFO } from '../../data/companyData';

interface AboutViewProps {
  initialSubSection?: string;
  onNavigate: (category: any, subSection?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ initialSubSection = 'overview', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AboutSubSection>(
    (initialSubSection as AboutSubSection) || 'overview'
  );

  const tabs: { id: AboutSubSection; label: string }[] = [
    { id: 'ceo', label: 'CEO 인사말' },
    { id: 'overview', label: '회사소개' },
    { id: 'vision', label: '비전' },
    { id: 'history', label: '연혁' },
    { id: 'org', label: '조직도' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            ABOUT NEXT INNOVATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            회사소개
          </h1>
          <p className="text-sm text-slate-400">
            기술로 세상을 이롭게 바꾸는 B2B 엔터프라이즈 AI & 클라우드 전문기업
          </p>
        </div>

        {/* Sub Navigation Bar */}
        <div className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
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
        {/* 1. CEO 인사말 */}
        {activeTab === 'ceo' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12">
              <div className="lg:col-span-5 space-y-4 text-center">
                <div className="relative inline-block">
                  <img 
                    src={CEO_DATA.image} 
                    alt={CEO_DATA.name} 
                    referrerPolicy="no-referrer"
                    className="w-64 h-80 object-cover rounded-2xl shadow-2xl border-2 border-slate-700 mx-auto"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-xl shadow-lg">
                    <Quote className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{CEO_DATA.name}</h3>
                  <p className="text-xs text-blue-400 font-medium mt-1">{CEO_DATA.title}</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">MESSAGE FROM CEO</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    "{CEO_DATA.quote}"
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  {CEO_DATA.greeting.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <p className="font-semibold text-slate-200">(주)넥스트이노베이션 대표이사</p>
                    <p>{COMPANY_INFO.nameEng}</p>
                  </div>
                  <div className="font-serif italic text-xl font-bold text-blue-400">
                    {CEO_DATA.signature}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. 회사소개 */}
        {activeTab === 'overview' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Overview Intro Grid */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">COMPANY OVERVIEW</span>
                <h2 className="text-3xl font-black text-white">
                  혁신을 거듭하는 AI & 클라우드 기술 선도기업
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {OVERVIEW_DATA.mission}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {OVERVIEW_DATA.stats.map((st, i) => (
                  <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                    <div className="text-3xl font-black text-white">
                      {st.value}<span className="text-sm font-normal text-blue-400 ml-1">{st.unit}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-300 mt-2">{st.label}</div>
                    {st.change && (
                      <div className="text-[11px] text-emerald-400 font-mono mt-1">{st.change}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">CORE VALUES</h3>
                <p className="text-xs text-slate-400">넥스트이노베이션 구성원이 추구하는 4가지 핵심 가치</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {OVERVIEW_DATA.coreValues.map((cv, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
                      0{i + 1}
                    </div>
                    <h4 className="text-base font-bold text-white">{cv.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{cv.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. 비전 */}
        {activeTab === 'vision' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">VISION 2030</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-snug">
                "{OVERVIEW_DATA.visionText}"
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                우리는 기술의 진보를 가속화하여 기업과 인류가 직면한 복잡한 문제를 해결하는 디지털 나침반이 됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">1. AI 파이프라인의 표준화</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  모든 기업이 5분 만에 사내 프라이빗 LLM을 안전하게 구축할 수 있도록 AI 인프라를 표준화합니다.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">2. 자율 클라우드 에이전트</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  인프라 장애 복구 및 비용 최적화(FinOps)가 인공지능 에이전트에 의해 자동 수행되는 미래를 만듭니다.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">3. 완벽한 엔터프라이즈 보안</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero Trust 보안 원칙과 PII 마스킹 기술로 데이터 주권을 철저히 수호합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. 연혁 */}
        {activeTab === 'history' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">COMPANY HISTORY</span>
              <h2 className="text-3xl font-extrabold text-white">넥스트이노베이션이 걸어온 길</h2>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-8 py-4">
              {HISTORY_DATA.map((item, idx) => (
                <div key={idx} className="relative pl-8 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:scale-125 transition-transform"></div>
                  
                  {/* Year Tag on desktop */}
                  <div className="hidden sm:block absolute -left-32 top-1 text-right w-24 text-sm font-black text-blue-400 font-mono">
                    {item.year} {item.quarter}
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-mono font-bold text-blue-400 text-xs">{item.year} {item.quarter}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. 조직도 */}
        {activeTab === 'org' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">ORGANIZATION CHART</span>
              <h2 className="text-3xl font-extrabold text-white">체계적인 조직 및 연구소 구조</h2>
              <p className="text-xs text-slate-400">각 영역별 최고 전문가들이 유기적으로 협력합니다.</p>
            </div>

            {/* Org Tree Rendering */}
            <div className="max-w-5xl mx-auto space-y-8">
              {/* CEO Box */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl text-center max-w-sm mx-auto shadow-xl shadow-blue-600/20">
                <h3 className="text-xl font-black">{ORG_TREE.title}</h3>
                <p className="text-xs font-bold text-blue-200 mt-1">{ORG_TREE.head}</p>
                <p className="text-xs text-blue-100/80 mt-2">{ORG_TREE.description}</p>
              </div>

              {/* Connector */}
              <div className="w-0.5 h-8 bg-blue-500/40 mx-auto"></div>

              {/* Department Children Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ORG_TREE.children?.map((dept, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </div>
                      <h4 className="text-base font-bold text-white">{dept.title}</h4>
                      <p className="text-xs text-blue-400 font-medium">{dept.head}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{dept.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">산하 전담 팀</span>
                      {dept.children?.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-xs">
                          <div className="font-semibold text-slate-200">{sub.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{sub.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
