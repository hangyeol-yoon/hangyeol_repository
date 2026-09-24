import React from 'react';
import { Building2, ShieldAlert, PhoneCall, MapPin, Clock, Lock, FileCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Emergency CTA Bar */}
        <div className="bg-gradient-to-r from-slate-900 to-rose-950/80 p-5 rounded-3xl border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">24시간 응급의료센터 상시 가동중</p>
              <p className="text-slate-400 text-xs">소화기내과, 정형외과, 신경외과 24시간 당직 응급 수술팀 대기</p>
            </div>
          </div>
          <a
            href="tel:02-1588-0000"
            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl transition shadow-lg shadow-rose-900/40 flex items-center gap-2 shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>응급센터 직통: 02-1588-0000</span>
          </a>
        </div>

        {/* Footer Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg font-serif">서울대학교병원</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              국립대학병원 법인 서울대학교병원<br />
              보건복지부 인증 상급종합병원 제 2026-1024호
            </p>
            <p className="text-slate-500 text-[11px]">
              주소: 서울특별시 종로구 대학로 101 (연건동)<br />
              대표자: 김영태 | 사업자등록번호: 214-82-00000
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-slate-200 font-bold text-sm">빠른 메뉴</p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('departments')} className="hover:text-white transition">
                  진료과 및 의료진 소개
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('booking')} className="hover:text-white transition">
                  스마트 진료 예약
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-consult')} className="hover:text-white transition text-teal-400">
                  AI 증상 상담 서비스
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('checkup')} className="hover:text-white transition">
                  종합건강증진센터
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-slate-200 font-bold text-sm">진료시간 안내</p>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>평일 외래: 08:30 - 17:30</li>
              <li>토요일 외래: 08:30 - 12:30</li>
              <li>점심 시간: 12:30 - 13:30</li>
              <li>응급의료센터: 365일 24시간 연중무휴</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-slate-200 font-bold text-sm">환자 권리 및 비급여 고지</p>
            <div className="space-y-1.5 text-[11px]">
              <a href="#notices" onClick={() => setActiveTab('notices')} className="block hover:text-white text-slate-400 underline">
                비급여 진료비용 고지 안내
              </a>
              <a href="#notices" onClick={() => setActiveTab('notices')} className="block hover:text-white text-slate-400 underline">
                환자의 권리와 의무 선언문
              </a>
              <p className="text-slate-500 pt-1">
                개인정보 처리방침 | 영상정보처리기기 운영방침
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 SEOUL NATIONAL UNIVERSITY HOSPITAL. All rights reserved.</p>
          <p>본 웹사이트에 수록된 모든 의료 정보는 의료법을 준수합니다.</p>
        </div>
      </div>
    </footer>
  );
};
