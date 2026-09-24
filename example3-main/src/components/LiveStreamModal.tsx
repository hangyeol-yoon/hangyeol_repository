import React, { useState } from 'react';
import { Play, Volume2, Users, Send, MessageSquare, BookOpen, Heart, Radio, Share2 } from 'lucide-react';
import { CHURCH_INFO, SERMON_LIST } from '../data/churchData';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOffering: () => void;
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ isOpen, onClose, onOpenOffering }) => {
  const [chatMessages, setChatMessages] = useState<Array<{ name: string; text: string; time: string }>>([
    { name: '김*은 집사', text: '할렐루야! 오늘도 은혜로운 예배 기대합니다.', time: '10:55' },
    { name: '이*수 성도', text: '온라인으로 함께 예배드릴 수 있어 감사합니다.', time: '10:57' },
    { name: '박*혜 권사', text: '시온 찬양대의 찬양이 너무 은혜롭네요. 아멘!', time: '11:02' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [likedCount, setLikedCount] = useState(142);

  if (!isOpen) return null;

  const currentSermon = SERMON_LIST[0];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      name: '성도',
      text: inputMsg,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 text-stone-100 rounded-3xl max-w-5xl w-full border border-stone-800 shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Top Title Bar */}
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-full animate-pulse">
              <Radio className="w-3.5 h-3.5" /> LIVE
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">{CHURCH_INFO.name} 주일 대예배 생중계</h3>
              <p className="text-xs text-stone-400">실시간 참여 성도: 약 285명</p>
            </div>
          </div>

          <button onClick={onClose} className="text-stone-400 hover:text-white font-bold text-lg p-2">
            ✕
          </button>
        </div>

        {/* Video & Chat Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
          
          {/* Main Video Stage */}
          <div className="lg:col-span-8 bg-black relative flex flex-col justify-between">
            <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center group bg-stone-950">
              <img
                src={currentSermon.thumbnailUrl}
                alt="Live Stream Worship"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              {/* Simulated Video Player Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs">
                  <Play className="w-10 h-10 fill-current translate-x-0.5" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 bg-stone-950/80 p-3 rounded-xl backdrop-blur-md">
                <span className="font-semibold text-amber-300">설교: {currentSermon.title} ({currentSermon.speaker})</span>
                <span className="font-mono text-stone-400">본문: {currentSermon.scripture}</span>
              </div>
            </div>

            {/* Stage Bar */}
            <div className="p-4 bg-stone-900 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLikedCount(prev => prev + 1)}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>은혜의 아멘 ({likedCount})</span>
                </button>

                <button
                  onClick={onOpenOffering}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded-lg transition-colors"
                >
                  온라인 헌금 안내
                </button>
              </div>

              <span className="text-stone-400">주일 오전 11:00 생방송 진행 중</span>
            </div>
          </div>

          {/* Right Live Chat Sidebar */}
          <div className="lg:col-span-4 bg-stone-950 border-l border-stone-800 flex flex-col justify-between h-full min-h-[300px]">
            <div className="p-3 bg-stone-900 border-b border-stone-800 font-semibold text-xs text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-500" /> 실시간 은혜 나눔 (채팅)
              </span>
              <span className="text-[11px] text-stone-500">따뜻한 언어로 교제해 주세요</span>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 overflow-y-auto max-h-[300px] lg:max-h-[380px] text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between text-stone-400 text-[11px]">
                    <span className="font-semibold text-amber-400">{msg.name}</span>
                    <span className="font-mono text-[10px]">{msg.time}</span>
                  </div>
                  <p className="text-stone-200 leading-normal">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Send Chat Form */}
            <form onSubmit={handleSendChat} className="p-3 bg-stone-900 border-t border-stone-800 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="은혜의 언어나 '아멘'으로 나눔..."
                className="flex-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-700 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
