import React, { useState } from 'react';
import { Play, Search, Calendar, User, BookOpen, Volume2, Share2, Download, Filter, FileText, Check } from 'lucide-react';
import { Sermon } from '../types';
import { SERMON_LIST } from '../data/churchData';

interface SermonSectionProps {
  onOpenSermonModal: (sermonId: string) => void;
}

export const SermonSection: React.FC<SermonSectionProps> = ({ onOpenSermonModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('전체');
  const [selectedSeries, setSelectedSeries] = useState('전체');

  const speakers = ['전체', '김진수 담임목사', '박성민 목사'];
  const seriesList = ['전체', '골로새서 강해 시리즈', '여호수아 강해', '지혜의 서 잠언', '시편의 노래'];

  const filteredSermons = SERMON_LIST.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeaker = selectedSpeaker === '전체' || sermon.speaker === selectedSpeaker;
    const matchesSeries = selectedSeries === '전체' || sermon.series === selectedSeries;
    return matchesSearch && matchesSpeaker && matchesSeries;
  });

  const featuredSermon = SERMON_LIST[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
          SERMON & MEDIA
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          말씀과 찬양
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          매주 선포되는 생명의 말씀과 찬양으로 하나님의 깊은 은혜를 경험하세요.
        </p>
      </div>

      {/* Featured Main Sermon Hero Card */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-xl text-white mb-12 border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Thumbnail / Video Preview Box */}
          <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] group cursor-pointer" onClick={() => onOpenSermonModal(featuredSermon.id)}>
            <img
              src={featuredSermon.thumbnailUrl}
              alt={featuredSermon.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-600/90 group-hover:bg-amber-500 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all border-2 border-amber-300">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-amber-800/90 text-amber-100 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs">
              이번 주 최근 설교
            </div>
            
            <div className="absolute bottom-4 right-4 bg-stone-900/80 text-stone-300 text-xs px-2.5 py-1 rounded-md font-mono">
              {featuredSermon.duration}
            </div>
          </div>

          {/* Sermon Information */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <Calendar className="w-3.5 h-3.5" /> {featuredSermon.date}
                <span>•</span>
                <BookOpen className="w-3.5 h-3.5" /> {featuredSermon.scripture}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight hover:text-amber-300 cursor-pointer" onClick={() => onOpenSermonModal(featuredSermon.id)}>
                {featuredSermon.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-stone-300 font-medium">
                <User className="w-4 h-4 text-amber-400" />
                <span>{featuredSermon.speaker}</span>
                <span className="text-stone-500">|</span>
                <span className="text-stone-400 text-xs">{featuredSermon.series}</span>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                {featuredSermon.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
              <button
                onClick={() => onOpenSermonModal(featuredSermon.id)}
                className="flex-1 py-3 px-4 bg-amber-700 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold rounded-xl text-center transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>설교 영상 시청하기</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-amber-100/50 p-4 sm:p-6 rounded-2xl border border-amber-200/80 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="설교 제목, 본문, 내용으로 검색..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Speaker Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="전체">설교자: 전체</option>
              {speakers.filter(s => s !== '전체').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Series Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="전체">시리즈: 전체</option>
              {seriesList.filter(s => s !== '전체').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Sermon List Grid */}
      {filteredSermons.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <p className="text-stone-600 font-medium">검색 결과와 일치하는 설교가 없습니다.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedSpeaker('전체'); setSelectedSeries('전체'); }}
            className="mt-3 text-xs font-semibold text-amber-800 underline"
          >
            검색 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              onClick={() => onOpenSermonModal(sermon.id)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-stone-900">
                <img
                  src={sermon.thumbnailUrl}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {sermon.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-amber-700/90 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {sermon.date}
                    </span>
                    <span>{sermon.speaker}</span>
                  </div>

                  <h4 className="font-serif font-bold text-stone-900 text-lg group-hover:text-amber-900 transition-colors line-clamp-1">
                    {sermon.title}
                  </h4>

                  <p className="text-xs font-semibold text-amber-900/90 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {sermon.scripture}
                  </p>

                  <p className="text-stone-600 text-xs line-clamp-2 pt-1 leading-relaxed">
                    {sermon.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>{sermon.series || '주간 메시지'}</span>
                  <span className="text-amber-800 font-semibold group-hover:underline flex items-center gap-0.5">
                    보기 <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
