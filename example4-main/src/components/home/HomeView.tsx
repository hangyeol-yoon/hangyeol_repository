import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  Cloud, 
  Database, 
  Code2, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ChevronRight,
  Send,
  Zap,
  Building2,
  Users,
  Award,
  Play
} from 'lucide-react';
import { NavCategory } from '../../types';
import { COMPANY_INFO, OVERVIEW_DATA, SERVICES_DATA, SOLUTIONS_DATA, CLIENT_PARTNERS, NEWS_POSTS } from '../../data/companyData';

interface HomeViewProps {
  onNavigate: (category: NavCategory, subSection?: string) => void;
  onOpenQuoteModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenQuoteModal }) => {
  // Interactive Prompt Playground state
  const [demoPrompt, setDemoPrompt] = useState('금융사 사내 규정 문서에서 개인정보 유출 방지 가이드라인 요약해줘');
  const [demoOutput, setDemoOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunDemo = () => {
    setIsSimulating(true);
    setDemoOutput(null);
    setTimeout(() => {
      setDemoOutput(`[NEXT AI Gateway - Security Filtered Response]
✓ PII Masking: 감지된 주민번호/계좌번호 2건 자동 마스킹 완료
✓ VectorDB RAG: 사내 보안 규정 v4.2 문서 참조 완료

1. 개인식별정보(PII)의 외부 API 전송 전 자동 암호화 검증
2. 온프레미스 프라이빗 벡터 DB 내 RAG 기반 답변 생성
3. 환각(Hallucination) 지수: 0.02% (안전성 검증 통과)`);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="font-sans text-slate-100 bg-slate-950 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Background Glowing Graphic Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[96px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Series B 180억 유치 · 과기정통부 장관상 수상 AI 스타트업</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              차세대 <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Enterprise AI</span>와<br />
              클라우드 생태계를 연결합니다
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              (주)넥스트이노베이션은 완벽한 보안의 사내 Private LLM 파이프라인, 멀티클라우드 오케스트레이션, 초고속 데이터 레이크하우스를 구축하는 대표 B2B 테크 솔루션 파트너입니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('contact', 'consulting')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>무상 컨설팅 신청</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>예상 견적 계산기</span>
              </button>
            </div>

            {/* Key Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-extrabold text-white">150+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">엔터프라이즈 고객사</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-cyan-400">99.99%</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">SLA 가용성 보장</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-indigo-400">280+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">성공 프로젝트</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">NEXT-AI-Gateway-Live-Demo.v2</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold">
                  ONLINE
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">엔터프라이즈 AI 프롬프트 프론트엔드 시뮬레이터</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={demoPrompt}
                      onChange={(e) => setDemoPrompt(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg flex-1 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleRunDemo}
                      disabled={isSimulating}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      {isSimulating ? (
                        <span className="animate-spin">🌀</span>
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                      <span>실행</span>
                    </button>
                  </div>
                </div>

                {demoOutput && (
                  <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 text-slate-300 leading-relaxed space-y-2 animate-in fade-in duration-300">
                    <pre className="whitespace-pre-wrap font-mono text-[11px] text-cyan-300">
                      {demoOutput}
                    </pre>
                  </div>
                )}

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ISO 27001 / 27017 보안 규격 탑재</span>
                  </span>
                  <button 
                    onClick={() => onNavigate('solutions', 'ai')}
                    className="text-blue-400 hover:underline flex items-center gap-0.5 font-bold"
                  >
                    <span>상세보기</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Core Business Pillar Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold text-blue-400 tracking-widest uppercase">
            CORE SERVICES & SOLUTIONS
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            비즈니스 혁신을 견인하는 4대 기술 라인업
          </p>
          <p className="text-slate-400 text-sm">
            상호 연동 가능한 모듈식 아키텍처로 엔터프라이즈의 속도와 보안성을 동시에 보장합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((srv, idx) => {
            const icons = [BrainCircuit, Cloud, Database, Code2];
            const IconComp = icons[idx] || BrainCircuit;

            return (
              <div 
                key={srv.id}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.summary}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={() => onNavigate('services', 'overview')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>자세히 알아보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Clients & Partners Showcase */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <h3 className="text-xl font-bold text-white mt-1">
              대한민국 대표 금융, 제조, 의료, 유통 기업이 선택한 스타트업
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CLIENT_PARTNERS.map((cp, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500/40 transition-colors"
              >
                <div className="font-bold text-sm text-slate-200">{cp.name}</div>
                <div className="text-[10px] text-blue-400 font-mono mt-1">{cp.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Recent News & Blog Highlights */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-blue-400 tracking-widest uppercase">
              NEWS & INSIGHTS
            </h2>
            <p className="text-3xl font-extrabold text-white mt-2">
              최신 공지 및 기술 언론 보도
            </p>
          </div>
          <button
            onClick={() => onNavigate('news', 'notice')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>전체 소식 보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS_POSTS.slice(0, 3).map((post) => (
            <div 
              key={post.id}
              onClick={() => onNavigate('news', post.category)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 cursor-pointer hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-[10px]">
                    {post.category === 'press' ? '보도자료' : post.category === 'blog' ? '기술블로그' : '공지사항'}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-base font-bold text-white line-clamp-2 hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-blue-400 font-semibold flex items-center gap-1">
                <span>본문 읽기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom Consultation Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-900/60 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            지금 바로 엔터프라이즈 AI & 클라우드 도입을 시작하세요
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            무료 전문 기술 진단부터 커스텀 소스코드 산출, 비용 최적화 리포트까지 넥스트이노베이션 기술진이 1:1로 지원해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact', 'consulting')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
            >
              1:1 상담 신청하기
            </button>
            <button
              onClick={() => onNavigate('contact', 'location')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm border border-slate-700 transition-all"
            >
              테헤란로 본사 오시는 길
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
