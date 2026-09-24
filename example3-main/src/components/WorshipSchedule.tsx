import React, { useState } from 'react';
import { Clock, MapPin, Users, Heart, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { WORSHIP_TIMES, MINISTRIES } from '../data/churchData';

interface WorshipScheduleProps {
  onOpenLiveStream: () => void;
  onOpenNewFamily: () => void;
}

export const WorshipSchedule: React.FC<WorshipScheduleProps> = ({ onOpenLiveStream, onOpenNewFamily }) => {
  const [activeCategory, setActiveCategory] = useState<'전체' | '주일예배' | '주중예배' | '다음세대'>('전체');

  const filteredWorships = WORSHIP_TIMES.filter(
    (w) => activeCategory === '전체' || w.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
          WORSHIP & MINISTRIES
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          예배 및 부서 안내
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          온 마음과 정성을 다해 드리는 예배와 세대별 모임으로 여러분을 초대합니다.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {(['전체', '주일예배', '주중예배', '다음세대'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-amber-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Worship Schedule Table/Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorships.map((worship) => (
          <div
            key={worship.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">
                  {worship.category}
                </span>
                {worship.name.includes('생중계') && (
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    온라인 방송
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-xl text-stone-900">
                {worship.name}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start gap-2 text-stone-800 font-semibold">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>{worship.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>장소: {worship.location}</span>
                </div>
                {worship.target && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span>대상: {worship.target}</span>
                  </div>
                )}
              </div>

              <p className="text-stone-600 text-xs pt-2 border-t border-stone-100 leading-relaxed">
                {worship.description}
              </p>
            </div>

            {worship.name.includes('생중계') && (
              <button
                onClick={onOpenLiveStream}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
              >
                생방송 예배 참여하기 →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Generation & Ministry Department Showcase */}
      <div className="pt-10 border-t border-stone-200 space-y-10">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            다음세대 및 부서 안내
          </h3>
          <p className="text-stone-600 text-sm">
            영유아부터 장년까지 세대별 맞춤 말씀과 따뜻한 공동체 모임이 준비되어 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MINISTRIES.map((min) => (
            <div
              key={min.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 sm:grid-cols-12"
            >
              <div className="sm:col-span-5 relative min-h-[180px]">
                <img
                  src={min.imageUrl}
                  alt={min.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-7 p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl text-stone-900">{min.name}</h4>
                  <p className="text-xs text-amber-800 font-semibold">
                    대상: {min.target} | 담당: {min.leader}
                  </p>
                  <p className="text-stone-600 text-xs leading-relaxed">{min.description}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-stone-100">
                  {min.features.map((feat, idx) => (
                    <div key={idx} className="text-[11px] text-stone-600 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-100/60 p-8 rounded-3xl border border-amber-200 text-center max-w-3xl mx-auto space-y-4">
          <h4 className="font-serif font-bold text-xl text-stone-900">
            처음 방문하셨나요?
          </h4>
          <p className="text-stone-600 text-sm">
            은혜와 평강교회는 새가족 여러분을 진심으로 환영합니다. 온라인으로 사전에 등록하시면 교역자가 따뜻하게 안내해 드립니다.
          </p>
          <button
            onClick={onOpenNewFamily}
            className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>새가족 온라인 등록 신청하기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
