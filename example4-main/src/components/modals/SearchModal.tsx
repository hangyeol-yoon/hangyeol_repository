import React, { useState } from 'react';
import { Search, X, ArrowRight, Building2, BrainCircuit, Cloud, FileText } from 'lucide-react';
import { NavCategory } from '../../types';
import { NAV_ITEMS } from '../Navbar';
import { SERVICES_DATA, SOLUTIONS_DATA, PORTFOLIO_PROJECTS, NEWS_POSTS } from '../../data/companyData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (category: NavCategory, subSection?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = {
    services: SERVICES_DATA.filter(s => s.title.includes(query) || s.description.includes(query)),
    solutions: SOLUTIONS_DATA.filter(s => s.title.includes(query) || s.description.includes(query)),
    portfolio: PORTFOLIO_PROJECTS.filter(p => p.title.includes(query) || p.summary.includes(query)),
    news: NEWS_POSTS.filter(n => n.title.includes(query) || n.summary.includes(query))
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3 flex-1 mr-4">
            <Search className="w-5 h-5 text-blue-400 shrink-0" />
            <input 
              type="text" 
              autoFocus
              placeholder="검색어를 입력하세요 (예: AI, 클라우드, RAG, 견적, 채용...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none w-full"
            />
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!hasQuery ? (
          <div className="space-y-4 text-xs">
            <span className="text-slate-400 font-bold block">추천 인기 검색어</span>
            <div className="flex flex-wrap gap-2">
              {['Private LLM', 'RAG 시스템', '멀티 클라우드', 'FinOps 비용절감', '비전 AI', '상담 신청', '채용'].map((kw, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-slate-300 rounded-lg"
                >
                  #{kw}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto space-y-6 text-xs">
            {results.services.length > 0 && (
              <div className="space-y-2">
                <span className="text-blue-400 font-bold uppercase">서비스 검색 결과</span>
                {results.services.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => { onNavigate('services', 'overview'); onClose(); }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500/40 cursor-pointer"
                  >
                    <div className="font-bold text-white">{s.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{s.summary}</div>
                  </div>
                ))}
              </div>
            )}

            {results.solutions.length > 0 && (
              <div className="space-y-2">
                <span className="text-blue-400 font-bold uppercase">솔루션 검색 결과</span>
                {results.solutions.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => { onNavigate('solutions', s.category); onClose(); }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500/40 cursor-pointer"
                  >
                    <div className="font-bold text-white">{s.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{s.subtitle}</div>
                  </div>
                ))}
              </div>
            )}

            {results.portfolio.length > 0 && (
              <div className="space-y-2">
                <span className="text-blue-400 font-bold uppercase">포트폴리오 검색 결과</span>
                {results.portfolio.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => { onNavigate('portfolio', 'projects'); onClose(); }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500/40 cursor-pointer"
                  >
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{p.client}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
