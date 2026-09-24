import React, { useState, useEffect } from 'react';
import { Heart, Plus, Lock, Globe, MessageSquare, Send, Check, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { PrayerRequest } from '../types';
import { INITIAL_PRAYER_REQUESTS } from '../data/churchData';

export const PrayerWall: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(INITIAL_PRAYER_REQUESTS);
  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState<'건강' | '가정' | '진로/학업' | '신앙' | '기타'>('신앙');
  const [isPrivate, setIsPrivate] = useState(false);
  const [content, setContent] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Fetch prayers from server on mount
  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const res = await fetch('/api/prayers');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setPrayers(json.data);
      }
    } catch (e) {
      console.log('Using default prayer list');
    }
  };

  const handlePrayClick = async (id: string) => {
    // Optimistic UI update
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, prayCount: p.prayCount + 1 } : p))
    );

    try {
      await fetch(`/api/prayers/${id}/pray`, { method: 'POST' });
    } catch (e) {
      // Ignore network errors
    }
  };

  const handleSubmitPrayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: authorName || '익명의 성도',
          isPrivate,
          category,
          content,
        }),
      });
      const json = await res.json();

      if (json.success) {
        setFormSuccess(true);
        setTimeout(() => {
          setFormSuccess(false);
          setShowFormModal(false);
          setContent('');
          setAuthorName('');
          setIsPrivate(false);
          fetchPrayers();
        }, 1200);
      }
    } catch (e) {
      // Fallback local state insertion
      const newLocalItem: PrayerRequest = {
        id: `local-${Date.now()}`,
        author: authorName || '성도',
        isPrivate,
        category,
        content,
        createdAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        prayCount: 1,
      };
      setPrayers([newLocalItem, ...prayers]);
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setShowFormModal(false);
        setContent('');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrayers = prayers.filter(
    (p) => activeCategory === '전체' || p.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
          PRAYER WALL
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          온라인 기도의 벽
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          함께 마음을 모아 기도할 때 하나님의 능력이 임합니다. 당신의 기도제목을 나눠주세요.
        </p>
      </div>

      {/* Action Banner */}
      <div className="bg-amber-900 text-amber-50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
            "두세 사람이 내 이름으로 모인 곳에는 나도 그들 중에 있느니라"
          </h3>
          <p className="text-amber-200 text-xs sm:text-sm">
            비공개 요청 시 목회자에게만 전달되며 엄격히 비밀이 보장됩니다.
          </p>
        </div>

        <button
          onClick={() => setShowFormModal(true)}
          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-lg shrink-0 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>기도제목 올리기</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {['전체', '건강', '가정', '진로/학업', '신앙', '기타'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-amber-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prayer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrayers.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {item.category}
                  </span>
                  {item.isPrivate ? (
                    <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> 목회자 전용
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> 공개 기도
                    </span>
                  )}
                </div>
                <span className="text-xs text-stone-400">{item.createdAt}</span>
              </div>

              {item.isPrivate ? (
                <div className="bg-stone-50 p-4 rounded-xl border border-dashed border-stone-300 text-stone-500 text-xs italic">
                  비공개 기도제목입니다. 담임목사님과 중보기도팀이 기도로 섬기고 있습니다.
                </div>
              ) : (
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-line">
                  {item.content}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600">
                요청자: {item.author}
              </span>

              <button
                onClick={() => handlePrayClick(item.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all transform active:scale-95"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span>함께 기도했습니다</span>
                <span className="ml-1 bg-amber-200/80 px-2 py-0.5 rounded-full text-[11px] font-mono">
                  {item.prayCount}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-700" /> 기도제목 작성하기
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {formSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-stone-900 text-lg">기도제목이 등록되었습니다</h4>
                <p className="text-xs text-stone-500">성도들과 목회자가 한 마음으로 함께 기도하겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPrayer} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    이름 (선택)
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="이름 (미입력 시 '익명의 성도')"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      카테고리
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="신앙">신앙</option>
                      <option value="건강">건강</option>
                      <option value="가정">가정</option>
                      <option value="진로/학업">진로/학업</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      공개 여부
                    </label>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="privateToggle"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="w-4 h-4 accent-amber-800 rounded"
                      />
                      <label htmlFor="privateToggle" className="text-xs font-medium text-stone-700 cursor-pointer">
                        비공개 (목회자 전용)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    기도제목 내용 *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="하나님 앞에 나눌 기도의 제목을 정성껏 작성해주세요."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>등록하기</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
