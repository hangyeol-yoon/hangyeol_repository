import React from 'react';
import { Coffee, Calendar, Sparkles, Clock, MapPin, Award, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigateMenu: () => void;
  onNavigateReservation: () => void;
  onOpenTasteQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateMenu,
  onNavigateReservation,
  onOpenTasteQuiz,
}) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FAF7F2]" id="hero-section">
      {/* Subtle Background Glow/Pattern */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#F2E3D0] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#E8D0B3] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Store Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D5] border border-[#D8C8B8] text-[#5C4A3E] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>영업 중 • 오늘 마감 22:00 (연남동 본점)</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-kr text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1F1815] leading-[1.2] tracking-tight">
              매일 아침 로스팅하는 <br />
              <span className="text-[#C86D51] underline decoration-[#E8C4B8] underline-offset-8">
                깊은 풍미의 스페셜티
              </span>{' '}
              커피
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5C4A3E] leading-relaxed max-w-2xl font-normal">
              엄선된 싱글 오리진 원두와 프랑스 발효 버터로 구워낸 수제 디저트.<br />
              자연광이 가득한 따스한 루미에르 라운지에서 특별한 휴식을 느껴보세요.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center">
              <button
                onClick={onNavigateMenu}
                className="px-6 py-3.5 rounded-full bg-[#3D2C27] hover:bg-[#2A1E1B] text-[#FAF7F2] font-semibold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer group"
                id="hero-menu-btn"
              >
                <Coffee className="w-4 h-4 text-[#E8D0B3]" />
                <span>시그니처 메뉴 보기</span>
                <ChevronRight className="w-4 h-4 text-[#E8D0B3] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onNavigateReservation}
                className="px-6 py-3.5 rounded-full bg-[#F3ECE2] hover:bg-[#E8DDD0] text-[#3D2C27] border border-[#D8C8B8] font-semibold text-sm transition-all flex items-center space-x-2 cursor-pointer"
                id="hero-reservation-btn"
              >
                <Calendar className="w-4 h-4 text-[#C86D51]" />
                <span>테이블 예약하기</span>
              </button>

              <button
                onClick={onOpenTasteQuiz}
                className="px-4 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#8C5E4A] border border-[#E3D4C2] font-medium text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                id="hero-quiz-btn"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>나에게 맞는 원두 추천</span>
              </button>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-[#E8DEC8] grid grid-cols-3 gap-4 max-w-xl text-left">
              <div>
                <div className="flex items-center space-x-1.5 text-[#3D2C27] font-semibold text-sm">
                  <Award className="w-4 h-4 text-[#C86D51]" />
                  <span>G1 스페셜티</span>
                </div>
                <p className="text-xs text-[#7A6859] mt-0.5">100% 최고급 원두</p>
              </div>
              <div>
                <div className="flex items-center space-x-1.5 text-[#3D2C27] font-semibold text-sm">
                  <Clock className="w-4 h-4 text-[#C86D51]" />
                  <span>스마트 픽업</span>
                </div>
                <p className="text-xs text-[#7A6859] mt-0.5">대기 없는 모바일 주문</p>
              </div>
              <div>
                <div className="flex items-center space-x-1.5 text-[#3D2C27] font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-[#C86D51]" />
                  <span>연남동 숲 테라스</span>
                </div>
                <p className="text-xs text-[#7A6859] mt-0.5">홍대입구역 도보 5분</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 bg-[#E8DEC8]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                  alt="Café Lumière Interior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                  <span className="text-[10px] tracking-wider uppercase font-semibold bg-[#C86D51] px-2.5 py-0.5 rounded-full text-white inline-block mb-1">
                    Specialty Coffee Lab
                  </span>
                  <h3 className="font-serif-kr text-lg font-bold">1층 따스한 햇살 라운지</h3>
                  <p className="text-xs text-white/80">통유리 넘어 연남동의 계절을 담은 공간</p>
                </div>
              </div>

              {/* Floating Accent Card 1 - Signature Drink */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-3.5 rounded-2xl shadow-lg border border-[#E8DEC8] flex items-center space-x-3 max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80"
                  alt="Signature Cream Latte"
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-bold text-[#C86D51] uppercase tracking-wide">
                    BEST SIGNATURE
                  </span>
                  <h4 className="text-xs font-bold text-[#2D2421]">루미에르 크림 라떼</h4>
                  <p className="text-[11px] text-[#7A6859]">수제 밤 크림 & 구운 아몬드</p>
                </div>
              </div>

              {/* Floating Accent Badge 2 - Fresh Bakery */}
              <div className="absolute -top-4 -right-4 z-20 bg-[#3D2C27] text-[#FAF7F2] p-3 rounded-2xl shadow-md border border-[#5C4A3E] text-center">
                <span className="text-xs block font-serif-kr font-bold text-[#E8D0B3]">매일 아침 08:30</span>
                <span className="text-[11px] font-medium text-white/90">수제 베이커리 갓 구움</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
