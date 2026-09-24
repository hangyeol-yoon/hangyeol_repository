import React from 'react';
import { Church, MapPin, Phone, Mail, Clock, Heart, ArrowUp } from 'lucide-react';
import { CHURCH_INFO, WORSHIP_TIMES } from '../data/churchData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenOffering: () => void;
  onOpenNewFamily: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenOffering, onOpenNewFamily }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Col 1: Church Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-700 flex items-center justify-center text-white">
                <Church className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-100">{CHURCH_INFO.name}</h3>
                <p className="text-xs text-stone-400">{CHURCH_INFO.englishName}</p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              하나님의 말씀과 사랑으로 세상을 품고, 은혜와 평강이 흘러넘치는 따뜻한 영적 안식처입니다.
            </p>
            <div className="text-xs text-amber-400 font-serif italic pt-1">
              "{CHURCH_INFO.motto}"
            </div>
          </div>

          {/* Col 2: Worship Times Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-stone-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> 주요 예배 안내
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex justify-between border-b border-stone-800 pb-1">
                <span className="text-stone-200">주일 1부 예배</span>
                <span>오전 09:00</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-1">
                <span className="text-stone-200">주일 2부 예배 (생중계)</span>
                <span>오전 11:00</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-1">
                <span className="text-stone-200">청년부 예배</span>
                <span>주일 오후 02:00</span>
              </li>
              <li className="flex justify-between border-b border-stone-800 pb-1">
                <span className="text-stone-200">수요기도회</span>
                <span>수요일 오후 07:30</span>
              </li>
              <li className="flex justify-between">
                <span className="text-stone-200">금요 성령기도회</span>
                <span>금요일 오후 09:00</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-stone-100">빠른 링크</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors">
                  담임목사 인사말 및 교회 소개
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sermons')} className="hover:text-amber-400 transition-colors">
                  주일 설교 VOD 다시보기
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bulletin')} className="hover:text-amber-400 transition-colors">
                  온라인 주보 보기
                </button>
              </li>
              <li>
                <button onClick={onOpenNewFamily} className="hover:text-amber-400 transition-colors">
                  새가족 온라인 등록 신청
                </button>
              </li>
              <li>
                <button onClick={onOpenOffering} className="hover:text-amber-400 transition-colors">
                  온라인 헌금 계좌 안내
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('location')} className="hover:text-amber-400 transition-colors">
                  교회 오시는 길 (주차 및 대중교통)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-stone-100">교회 위치 및 연락처</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{CHURCH_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>전화: {CHURCH_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>이메일: {CHURCH_INFO.email}</span>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('location')}
                className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg text-center transition-colors border border-stone-700"
              >
                지도로 위치 확인하기 →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 {CHURCH_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-400">
              <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 사랑과 섬김의 공동체
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full transition-colors"
              title="맨 위로"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
