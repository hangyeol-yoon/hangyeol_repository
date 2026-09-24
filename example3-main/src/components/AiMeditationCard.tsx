import React, { useState } from 'react';
import { Sparkles, BookOpen, Heart, RefreshCw, Send, Check } from 'lucide-react';

interface DevotionalResult {
  passage: string;
  theme: string;
  reflection: string;
  prayer: string;
  keyAction: string;
}

export const AiMeditationCard: React.FC = () => {
  const [topic, setTopic] = useState('평안과 희망');
  const [loading, setLoading] = useState(false);
  const [devotional, setDevotional] = useState<DevotionalResult>({
    passage: '골로새서 3장 15절 - 그리스도의 평강이 너희 마음을 주장하게 하라',
    theme: '주님의 평강이 지배하는 삶',
    reflection: '세상은 외적인 여건이 잘 풀릴 때 평안을 주지만, 그리스도의 평강은 격랑 속에서도 우리 마음 중심을 붙들어 주십니다. 오늘 마주하는 일들에 흔들리기보다 내 안에서 역사하시는 하나님을 신뢰해 보세요.',
    prayer: '선하신 하나님, 오늘 제 마음의 왕좌에 주님의 평강을 모셔들이게 하소서. 예수님의 이름으로 기도합니다. 아멘.',
    keyAction: '오늘 감사한 일을 1가지 떠올려 가족이나 동료에게 전하기',
  });

  const presetTopics = ['평안과 희망', '위로와 회복', '지혜와 인도', '감사와 기쁨', '고난 극복'];

  const handleGenerate = async (selectedTopic?: string) => {
    const targetTopic = selectedTopic || topic;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/devotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: targetTopic }),
      });
      const json = await res.json();
      if (json.success && json.devotional) {
        setDevotional(json.devotional);
      }
    } catch (e) {
      console.log('Error fetching AI devotional');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 text-amber-50 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-amber-700/40">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold mb-2 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI 말씀 묵상 (QT)
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              오늘 나에게 주시는 말씀과 묵상
            </h3>
          </div>

          {/* Quick Topic Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {presetTopics.map((t) => (
              <button
                key={t}
                onClick={() => { setTopic(t); handleGenerate(t); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  topic === t
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content Result Card */}
        <div className="bg-stone-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-amber-500/20 space-y-5 shadow-lg">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> {devotional.passage}
            </span>
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-amber-100">
              "{devotional.theme}"
            </h4>
          </div>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-line">
            {devotional.reflection}
          </p>

          <div className="pt-4 border-t border-amber-900/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-800/50 space-y-1">
              <span className="font-bold text-amber-400 block">🙏 오늘의 한 줄 기도</span>
              <p className="text-stone-300 italic">{devotional.prayer}</p>
            </div>

            <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-800/50 space-y-1">
              <span className="font-bold text-amber-400 block">✨ 오늘 하루 실천 지침</span>
              <p className="text-stone-300">{devotional.keyAction}</p>
            </div>
          </div>

        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? '말씀 묵상 생성 중...' : '다른 말씀 묵상 생성하기'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
