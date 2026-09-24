import React, { useState } from 'react';
import { HOSPITAL_NOTICES } from '../data/hospitalData';
import { HospitalNotice } from '../types';
import {
  FileText,
  Search,
  Eye,
  Calendar,
  X,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const NoticeSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<HospitalNotice | null>(null);

  const categories = ['전체', '공지', '건강정보', '언론보도'];

  const filteredNotices = HOSPITAL_NOTICES.filter((notice) => {
    const matchesCat = selectedCategory === '전체' || notice.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q || notice.title.toLowerCase().includes(q) || notice.content.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-3.5 py-1 rounded-full mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>HOSPITAL NEWS & HEALTH TIPS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              병원소식 및 전문의 건강칼럼
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              서울대학교병원의 새로운 의료 장비 소식과 유용한 건강 정보를 전해드립니다.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목 및 내용 검색"
              className="w-full pl-9 pr-4 py-2 bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notice List */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="p-5 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        notice.category === '공지'
                          ? 'bg-rose-100 text-rose-800'
                          : notice.category === '건강정보'
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {notice.category}
                    </span>
                    {notice.important && (
                      <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.2 rounded-md animate-pulse">
                        중요
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition font-serif">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{notice.content}</p>
                </div>

                <div className="text-right text-xs text-slate-400 space-y-1 shrink-0 hidden sm:block">
                  <p className="font-mono text-slate-600 font-medium">{notice.date}</p>
                  <p className="flex items-center justify-end gap-1 text-[11px]">
                    <Eye className="w-3 h-3" /> {notice.views.toLocaleString()}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Notice Detail Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedNotice(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full">
                  {selectedNotice.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  {selectedNotice.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <span>작성일: {selectedNotice.date}</span>
                  <span>조회수: {selectedNotice.views}</span>
                </div>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl border border-slate-100 min-h-[160px]">
                {selectedNotice.content}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
                >
                  목록으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
