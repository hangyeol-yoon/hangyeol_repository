import React from 'react';
import { Play, FileText, HeartHandshake, Sparkles, Clock, Calendar, ArrowRight, UserPlus, MapPin } from 'lucide-react';
import { CHURCH_INFO, SERMON_LIST } from '../data/churchData';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  onOpenLiveStream: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
  onOpenNewFamily: () => void;
  onOpenSermonModal: (sermonId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  setActiveTab,
  onOpenLiveStream,
  onOpenBulletin,
  onOpenPrayer,
  onOpenNewFamily,
  onOpenSermonModal,
}) => {
  const latestSermon = SERMON_LIST[0];

  return (
    <div className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Image - Hands Raised in Praise & Worship with Warm Golden Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000"
          alt="Hands Raised in Praise and Worship"
          className="w-full h-full object-cover object-center brightness-110 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Transparent gradient to ensure text readability while keeping image completely visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        
        {/* Annual Motto Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{CHURCH_INFO.mottoYear}: {CHURCH_INFO.motto}</span>
          <span className="text-amber-200/90 hidden sm:inline">{CHURCH_INFO.mottoScripture}</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
            하나님의 은혜와 평강이 <br className="hidden sm:block" />
            <span className="text-amber-300">당신의 삶에</span> 가득하기를 소망합니다
          </h1>
          <p className="text-stone-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl drop-shadow-md">
            은혜와 평강교회는 말씀을 통하여 예수 그리스도의 제자로 바로 서고, 사랑과 교제로 서로를 돌보는 따뜻한 신앙 공동체입니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenLiveStream}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>생방송 예배 입장</span>
          </button>

          <button
            onClick={onOpenBulletin}
            className="flex items-center gap-2 px-5 py-3.5 bg-black/60 hover:bg-black/80 text-amber-100 border border-amber-400/40 font-medium text-sm rounded-xl backdrop-blur-md transition-all shadow-md"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>이번주 온라인 주보</span>
          </button>

          <button
            onClick={onOpenNewFamily}
            className="flex items-center gap-2 px-5 py-3.5 bg-amber-600/90 hover:bg-amber-600 text-white font-medium text-sm rounded-xl backdrop-blur-md transition-all shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            <span>새가족 등록 안내</span>
          </button>
        </div>

        {/* Quick Feature Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Sunday Worship Times */}
          <div 
            onClick={() => setActiveTab('worship')}
            className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 p-5 rounded-2xl cursor-pointer transition-all hover:border-amber-400/60 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                상세보기 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1">주일 예배 시간</h3>
            <p className="text-xs text-stone-200 leading-normal">
              1부 09:00 / 2부 11:00 <br />
              청년부 14:00 (대예배실)
            </p>
          </div>

          {/* Card 2: Latest Sermon Highlight */}
          <div 
            onClick={() => onOpenSermonModal(latestSermon.id)}
            className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 p-5 rounded-2xl cursor-pointer transition-all hover:border-amber-400/60 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                설교 듣기 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1 truncate">{latestSermon.title}</h3>
            <p className="text-xs text-stone-200 truncate">
              {latestSermon.speaker} | {latestSermon.scripture}
            </p>
          </div>

          {/* Card 3: Online Prayer Request */}
          <div 
            onClick={onOpenPrayer}
            className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 p-5 rounded-2xl cursor-pointer transition-all hover:border-amber-400/60 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                기도함으로 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1">온라인 기도 요청</h3>
            <p className="text-xs text-stone-200">
              함께 기도제목을 나누고 마음을 모아 중보합니다.
            </p>
          </div>

          {/* Card 4: Location & Directions */}
          <div 
            onClick={() => setActiveTab('location')}
            className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 p-5 rounded-2xl cursor-pointer transition-all hover:border-amber-400/60 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-900 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                오시는 길 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1">교회 오시는 길</h3>
            <p className="text-xs text-stone-200 truncate">
              서초구 반포동 123 (주차 및 대중교통)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
