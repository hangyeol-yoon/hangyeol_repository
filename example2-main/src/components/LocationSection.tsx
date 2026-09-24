import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Car, Wifi, ChevronDown, ChevronUp, Phone, ZoomIn, ZoomOut, Compass, ExternalLink, Layers } from 'lucide-react';
import { CAFE_FAQS } from '../data/cafeData';

export const LocationSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-[#F3ECE2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase bg-[#E8DEC8] px-3 py-1 rounded-full inline-block mb-3">
            Location & Information
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#1F1815]">
            오시는 길 & 매장 안내
          </h2>
          <p className="text-sm sm:text-base text-[#7A6859] mt-2 leading-relaxed">
            연남동 경의선 숲길 도보 5분 거리에 위치한 Café Lumière를 방문해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Custom Interactive Map Section */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-kr text-lg font-bold text-[#1F1815] flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#C86D51]" />
                  <span>연남동 본점 (Main Store)</span>
                </h3>
                <p className="text-xs text-[#7A6859] mt-1 font-medium">
                  서울 마포구 연남로 12 (홍대입구역 3번 출구 도보 350m)
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href="https://map.naver.com/p/search/%EC%97%B0%EB%82%A8%EB%A1%9C%2012?c=16.08,0,0,0,dh"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#2DB400] hover:bg-[#259800] text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
                  id="naver-map-link"
                >
                  <span>네이버 지도 길찾기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Real Map Illustration View for Yeonnam-ro 12 */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-[#E8E2D5] border border-[#D5C9B3] shadow-md select-none group">
              <div 
                className="w-full h-full relative transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src="/yeonnam12_map.svg"
                  alt="연남로 12 오시는 길 약도 (Café Lumière)"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Map UI Controls Overlay */}
              <div className="absolute bottom-3 right-3 flex flex-col space-y-1.5 z-30">
                <button
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 1.6))}
                  className="p-2 bg-white/90 hover:bg-white text-[#3D2C27] rounded-xl shadow-md border border-[#E8DEC8] transition-colors cursor-pointer backdrop-blur-xs"
                  title="확대"
                  id="map-zoom-in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
                  className="p-2 bg-white/90 hover:bg-white text-[#3D2C27] rounded-xl shadow-md border border-[#E8DEC8] transition-colors cursor-pointer backdrop-blur-xs"
                  title="축소"
                  id="map-zoom-out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-2 bg-[#3D2C27]/90 hover:bg-[#3D2C27] text-white rounded-xl shadow-md border border-[#3D2C27] transition-colors cursor-pointer backdrop-blur-xs"
                  title="위치 재설정"
                  id="map-reset"
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>

              {/* Address Overlay Badge Top-Left */}
              <div className="absolute top-3 left-3 bg-[#1F1815]/90 backdrop-blur-md text-white text-[11px] px-3.5 py-2 rounded-xl border border-white/20 shadow-lg flex items-center space-x-2 z-30">
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                <span className="font-bold">연남로 12</span>
                <span className="text-[10px] text-[#E8D0B3]">(서울 마포구 연남동)</span>
              </div>
            </div>

            {/* Transport Directions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#5C4A3E]">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <strong className="text-[#3D2C27] block mb-0.5 font-bold flex items-center space-x-1">
                  <Navigation className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>지하철 이용</span>
                </strong>
                <span>2호선/공항철도 홍대입구역 3번 출구에서 연남로 방향 도보 5분</span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <strong className="text-[#3D2C27] block mb-0.5 font-bold flex items-center space-x-1">
                  <Car className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>주차 안내</span>
                </strong>
                <span>연남로 12 매장 후면 전용 5대 주차 (만차 시 공영주차장 쿠폰 제공)</span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <strong className="text-[#3D2C27] block mb-0.5 font-bold flex items-center space-x-1">
                  <Wifi className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>매장 편의</span>
                </strong>
                <span>무료 초고속 Wi-Fi (lumiere_guest / pw: coffee1234)</span>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DEC8] shadow-sm text-left space-y-6">
            <div>
              <h3 className="font-serif-kr text-lg font-bold text-[#1F1815] flex items-center space-x-2 mb-1">
                <Clock className="w-5 h-5 text-[#C86D51]" />
                <span>영업 시간 안내</span>
              </h3>
              <p className="text-xs text-[#7A6859]">매일 신선한 커피와 베이커리를 준비합니다.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC8] flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#3D2C27] block">평일 (월 ~ 금요일)</span>
                  <span className="text-[11px] text-[#7A6859]">모닝 로스팅 08:00 시작</span>
                </div>
                <strong className="text-[#1F1815] text-sm">08:00 ~ 22:00</strong>
              </div>

              <div className="p-3.5 bg-[#F5EAD8] rounded-2xl border border-[#E8DEC8] flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#3D2C27] block">주말 (토 ~ 일요일 / 공휴일)</span>
                  <span className="text-[11px] text-[#C86D51]">야외 테라스 풀오픈</span>
                </div>
                <strong className="text-[#C86D51] text-sm">09:00 ~ 22:30</strong>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-[11px] text-[#7A6859]">
                * 드립 및 에스프레소 마감: <strong>21:30</strong> <br />
                * 휴무일: 연중무휴 (설/추석 당일 제외) <br />
                * 매장 주소: <strong>서울 마포구 연남로 12 (연남동 본점)</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0E6D8] space-y-2">
              <div className="flex items-center space-x-2 text-xs text-[#3D2C27]">
                <Phone className="w-4 h-4 text-[#C86D51]" />
                <span>대표 단체 예약 문의: <strong>02-332-8492</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm max-w-4xl mx-auto text-left">
          <h3 className="font-serif-kr text-xl font-bold text-[#1F1815] mb-6">
            자주 묻는 질문 (FAQ)
          </h3>

          <div className="space-y-3">
            {CAFE_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#E8DEC8] rounded-2xl overflow-hidden bg-[#FAF7F2]"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#2D2421] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                  id={`faq-toggle-${idx}`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-[#C86D51] font-serif-kr text-base">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#C86D51]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8C7A6B]" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="p-4 pt-1 bg-white text-xs sm:text-sm text-[#5C4A3E] leading-relaxed border-t border-[#E8DEC8]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

