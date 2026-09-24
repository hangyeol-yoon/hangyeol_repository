import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Search, 
  X, 
  TrendingUp, 
  Filter, 
  ExternalLink,
  Award,
  ChevronRight
} from 'lucide-react';
import { PortfolioSubSection, PortfolioProject } from '../../types';
import { PORTFOLIO_PROJECTS, CLIENT_PARTNERS } from '../../data/companyData';

interface PortfolioViewProps {
  initialSubSection?: string;
  onNavigate: (category: any, subSection?: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ initialSubSection = 'projects', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<PortfolioSubSection>(
    (initialSubSection as PortfolioSubSection) || 'projects'
  );

  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    const matchesIndustry = industryFilter === 'all' || p.industry === industryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  const tabs: { id: PortfolioSubSection; label: string }[] = [
    { id: 'projects', label: '프로젝트' },
    { id: 'clients', label: '고객사' },
    { id: 'success', label: '성공 사례' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            OUR PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            포트폴리오 & 구축 실적
          </h1>
          <p className="text-sm text-slate-400">
            주요 산업군별 성공적인 디지털 전환(DX) 레퍼런스
          </p>
        </div>

        {/* Sub Navigation Bar */}
        <div className="max-w-xl mx-auto mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
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
        {/* 1. 프로젝트 Filterable Grid */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
                <Filter className="w-4 h-4 text-blue-400 shrink-0 ml-2" />
                {[
                  { id: 'all', label: '전체' },
                  { id: 'finance', label: '금융/증권' },
                  { id: 'manufacturing', label: '제조/스마트팩토리' },
                  { id: 'healthcare', label: '의료/바이오' },
                  { id: 'commerce', label: '유통/커머스' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setIndustryFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      industryFilter === f.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="프로젝트 / 고객사 / 기술 태그 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-700 text-blue-400 font-bold text-[10px] px-2.5 py-1 rounded-full">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-1">{proj.client} · {proj.duration}</div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {proj.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                      {proj.results.map((r, i) => (
                        <div key={i} className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                          <div className="text-sm font-extrabold text-cyan-400">{r.metric}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. 고객사 */}
        {activeTab === 'clients' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-3xl font-extrabold text-white">함께 혁신을 만드는 파트너</h2>
              <p className="text-xs text-slate-400">넥스트이노베이션은 주요 대기업 및 스타트업과 장기적인 기술 신뢰 파트너십을 맺고 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLIENT_PARTNERS.map((cp, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{cp.name}</span>
                    <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">
                      {cp.industry}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. 성공 사례 */}
        {activeTab === 'success' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {PORTFOLIO_PROJECTS.slice(0, 2).map((proj, idx) => (
              <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">SUCCESS CASE STUDY 0{idx + 1}</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{proj.title}</h2>
                  <p className="text-xs text-slate-400">고객사: {proj.client} | 프로젝트 기간: {proj.duration}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-red-500/20 space-y-2">
                    <span className="text-xs font-bold text-red-400 uppercase">Challenge (도전 과제)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.challenge}</p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/20 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase">Solution & Innovation (해결책)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.solution}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-blue-400 uppercase block mb-4">측정 가능한 정량적 성과 (ROI)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {proj.results.map((r, i) => (
                      <div key={i} className="bg-slate-900 p-4 rounded-xl text-center border border-slate-800">
                        <div className="text-2xl font-black text-white">{r.metric}</div>
                        <div className="text-xs text-slate-400 mt-1">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-blue-400 font-bold">{selectedProject.client}</span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedProject.summary}</p>

            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-1">도전 과제</span>
                <p className="text-xs text-slate-300">{selectedProject.challenge}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-1">기술적 해결책</span>
                <p className="text-xs text-slate-300">{selectedProject.solution}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
