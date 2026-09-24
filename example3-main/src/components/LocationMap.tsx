import React, { useState } from 'react';
import { MapPin, Bus, Train, Car, Phone, Copy, Check, Navigation, Clock, ShieldAlert } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const LocationMap: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CHURCH_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
          LOCATION & DIRECTIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          오시는 길
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          은혜와 평강교회로 오시는 길을 상세히 안내해 드립니다.
        </p>
      </div>

      {/* Main Map Box & Address Summary */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
        
        {/* Interactive Map Visual */}
        <div className="lg:col-span-7 bg-stone-100 relative min-h-[340px] flex items-center justify-center overflow-hidden">
          {/* Visual Map Background Canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
          
          <div className="relative z-10 text-center space-y-3 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-lg max-w-md mx-4">
            <div className="w-12 h-12 rounded-full bg-amber-800 text-white flex items-center justify-center mx-auto shadow-md">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">{CHURCH_INFO.name}</h3>
            <p className="text-xs text-stone-600 font-medium">{CHURCH_INFO.address}</p>
            
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '주소 복사완료' : '주소 복사하기'}</span>
              </button>

              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(CHURCH_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>지도 앱 연결</span>
              </a>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-amber-50/40 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900 border-b border-amber-200 pb-3">
              교회 주소 및 기본정보
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">도로명 주소:</strong> {CHURCH_INFO.address}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">대표 전화:</strong> {CHURCH_INFO.phone} (팩스: {CHURCH_INFO.fax})</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900">사무실 운영시간:</strong> 화~토요일 09:00 ~ 17:00</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-amber-900 block">💡 주일 주차 안내</span>
            <p className="text-stone-600">
              교회 지하 1~2층 주차장 및 주일 인근 반포 초등학교 운동장 야외 주차장(무료) 이용이 가능합니다.
            </p>
          </div>
        </div>

      </div>

      {/* Transit Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Subway */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Train className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-stone-900 text-lg">지하철 이용 시</h4>
          <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
            <li>• <strong className="text-stone-900">9호선 사평역:</strong> 2번 출구 도보 5분 (약 350m)</li>
            <li>• <strong className="text-stone-900">3/7/9호선 고속터미널역:</strong> 3번 출구 마을버스 서초02번 탑승 후 2정거장</li>
          </ul>
        </div>

        {/* Bus */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Bus className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-stone-900 text-lg">버스 이용 시</h4>
          <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
            <li>• <strong className="text-stone-900">간선버스 (파랑):</strong> 142, 360, 401, 640번</li>
            <li>• <strong className="text-stone-900">지선버스 (초록):</strong> 3414, 3422, 4318번</li>
            <li>• <strong className="text-stone-900">정류장명:</strong> '은혜와평강교회·사평역' 하차</li>
          </ul>
        </div>

        {/* Car / Parking */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Car className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-stone-900 text-lg">자차 및 주차 안내</h4>
          <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
            <li>• 네비게이션 검색: '은혜와평강교회' 또는 도로명 주소</li>
            <li>• 교회 건물 지하 1~2층 주차장 무료 이용</li>
            <li>• 주차 봉사위원의 안내에 따라 서행해 주시기 바랍니다.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};
