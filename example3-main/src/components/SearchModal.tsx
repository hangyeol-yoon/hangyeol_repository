import React, { useState } from 'react';
import { Search, BookOpen, Calendar, Clock, X, ArrowRight } from 'lucide-react';
import { SERMON_LIST, CURRENT_BULLETIN, WORSHIP_TIMES } from '../data/churchData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSermon: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSermon,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedSermons = query.trim()
    ? SERMON_LIST.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.scripture.toLowerCase().includes(query.toLowerCase()) ||
          s.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedNews = query.trim()
    ? CURRENT_BULLETIN.churchNews.filter(
        (n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedWorships = query.trim()
    ? WORSHIP_TIMES.filter(
        (w) =>
          w.name.toLowerCase().includes(query.toLowerCase()) ||
          w.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-16 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in slide-in-from-top-4">
        
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="교회 통합 검색 (설교, 주보 소식, 예배 시간...)"
            className="w-full pl-12 pr-10 py-3.5 bg-stone-100 border border-stone-200 rounded-2xl text-base focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
          />
          <button
            onClick={onClose}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 text-sm">
          {!query.trim() ? (
            <div className="py-8 text-center text-stone-400 text-xs space-y-2">
              <Search className="w-8 h-8 mx-auto text-stone-300" />
              <p>검색어를 입력하시면 관련 설교 VOD, 주보 소식, 예배 안내를 찾아드립니다.</p>
              <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
                {['골로새서', '수련회', '주일예배', '청년부', '평강'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold hover:bg-amber-100"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : matchedSermons.length === 0 && matchedNews.length === 0 && matchedWorships.length === 0 ? (
            <div className="py-8 text-center text-stone-500 text-sm">
              "{query}"에 대한 검색 결과가 없습니다.
            </div>
          ) : (
            <>
              {/* Sermons Match */}
              {matchedSermons.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                    <BookOpen className="w-4 h-4" /> 설교 VOD ({matchedSermons.length})
                  </h4>
                  <div className="space-y-2">
                    {matchedSermons.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onClose();
                          onSelectSermon(s.id);
                        }}
                        className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-stone-900">{s.title}</p>
                          <p className="text-xs text-stone-500">{s.speaker} | {s.scripture} ({s.date})</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News Match */}
              {matchedNews.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                    <Calendar className="w-4 h-4" /> 주보 교회 소식 ({matchedNews.length})
                  </h4>
                  <div className="space-y-2">
                    {matchedNews.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onClose();
                          setActiveTab('bulletin');
                        }}
                        className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer transition-colors"
                      >
                        <p className="font-bold text-stone-900">{n.title}</p>
                        <p className="text-xs text-stone-500 line-clamp-1">{n.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Worship Schedule Match */}
              {matchedWorships.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                    <Clock className="w-4 h-4" /> 예배 안내 ({matchedWorships.length})
                  </h4>
                  <div className="space-y-2">
                    {matchedWorships.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          onClose();
                          setActiveTab('worship');
                        }}
                        className="p-3 bg-stone-50 hover:bg-amber-50 rounded-xl border border-stone-200 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-stone-900">{w.name}</p>
                          <p className="text-xs text-stone-500">{w.time} ({w.location})</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
