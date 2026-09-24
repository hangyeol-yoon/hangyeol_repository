import React, { useState } from 'react';
import { Coffee, Send, Instagram, Facebook, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1F1815] text-[#FAF7F2] pt-16 pb-12 text-left border-t border-[#3D2C27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Story */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#3D2C27] text-[#E8D0B3] flex items-center justify-center border border-[#5C4A3E]">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-kr text-xl font-bold tracking-tight block text-white">
                  Café Lumière
                </span>
                <span className="text-[10px] tracking-widest text-[#E8D0B3] uppercase font-medium block">
                  Specialty Coffee & Bakery
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D8C8B8] leading-relaxed max-w-sm">
              Café Lumière는 프랑스어로 '빛'을 뜻합니다. 아침을 밝히는 고소한 원두 향과 함께 손님 한 분 한 분의 일상에 깊고 따스한 한 잔의 온기를 전해드립니다.
            </p>

            <div className="text-xs text-[#9A8B7E] space-y-1 pt-2">
              <p>상호명: 카페 루미에르 (Café Lumière) | 대표: 김루미</p>
              <p>사업자등록번호: 214-88-94820 | 통신판매업신고: 2026-서울마포-0128</p>
              <p>주소: 서울특별시 마포구 연남로 12 (연남동 본점)</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-kr text-sm font-bold text-[#E8D0B3] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C8B8]">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  메뉴 & 음료 라인업
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('beans')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  스페셜티 원두 스토어
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  테이블 & 공간 예약
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  루미에르 공간 갤러리
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  오시는 길 & 매장 안내
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-kr text-sm font-bold text-[#E8D0B3] uppercase tracking-wider">
              10% 할인 쿠폰 받기
            </h4>
            <p className="text-xs text-[#D8C8B8]">
              이메일을 구독하시면 신메뉴 소식과 스마트 픽업 10% 쿠폰코드 (<strong>WELCOME10</strong>)를 바로 발송해 드립니다.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#2E6B2E]/20 border border-[#2E6B2E] text-[#BDE0BD] text-xs rounded-xl flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>구독 완료! 웰컴 쿠폰코드 <strong>WELCOME10</strong>이 적용 가능합니다.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="flex-1 px-3.5 py-2.5 bg-[#2A1E1B] border border-[#3D2C27] rounded-xl text-xs text-white placeholder-[#8C7A6B] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C86D51] hover:bg-[#B55A3F] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  구독
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A1E1B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-4">
          <p>© 2026 Café Lumière. All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-white cursor-pointer">이용약관</span>
            <span className="hover:text-white cursor-pointer">원두 납품 문의</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
