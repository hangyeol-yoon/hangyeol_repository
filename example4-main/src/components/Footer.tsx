import React from 'react';
import { Building2, Phone, Mail, MapPin, ArrowUpRight, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { NavCategory } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { NAV_ITEMS } from './Navbar';

interface FooterProps {
  onNavigate: (category: NavCategory, subSection?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 pb-12 border-b border-slate-800">
          {NAV_ITEMS.map((cat) => (
            <div key={cat.id} className="space-y-3">
              <button
                onClick={() => onNavigate(cat.id)}
                className="text-sm font-bold text-white hover:text-blue-400 transition-colors uppercase tracking-wider block"
              >
                {cat.label}
              </button>
              {cat.subSections.length > 0 && (
                <ul className="space-y-1.5 text-xs">
                  {cat.subSections.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => onNavigate(cat.id, sub.id)}
                        className="hover:text-blue-300 transition-colors text-slate-400"
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Middle Section - Corporate Info & Newsletter */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-800/80">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {COMPANY_INFO.name}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {COMPANY_INFO.nameEng}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              (주)넥스트이노베이션은 차세대 B2B Enterprise AI 파이프라인, 멀티 클라우드 오케스트레이션, 초고속 데이터 레이크하우스 및 맞춤형 SW 엔지니어링 솔루션을 제공하는 혁신 스타트업입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>대표전화: {COMPANY_INFO.tel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>이메일: {COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>사업자등록번호: {COMPANY_INFO.businessNo} (대표: {COMPANY_INFO.ceo})</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>NEXT Tech Insight 뉴스레터 구독</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-normal">
                월 2회 발행
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              최신 엔터프라이즈 AI 트렌드, 클라우드 비용 절감(FinOps) 가이드 및 개발 리포트를 이메일로 받아보세요.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('뉴스레터 구독 신청이 완료되었습니다.'); }} className="flex gap-2">
              <input 
                type="email" 
                required 
                placeholder="company@email.com" 
                className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 flex-1 focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <span>구독 신청</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2021-{new Date().getFullYear()} {COMPANY_INFO.nameEng} All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => alert('개인정보처리방침: (주)넥스트이노베이션은 개인정보보호법에 따라 이용자의 개인정보 및 권익을 보호합니다.')} className="hover:text-slate-300">
              개인정보처리방침
            </button>
            <button onClick={() => alert('이용약관: 서비스를 제공함에 있어서 표준 이용약관을 준수합니다.')} className="hover:text-slate-300">
              이용약관
            </button>
            <button onClick={() => onNavigate('contact', 'location')} className="hover:text-slate-300">
              오시는 길
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
