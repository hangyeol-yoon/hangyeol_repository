import React from 'react';
import { Play, Calendar, User, BookOpen, Share2, FileText, Volume2, Download, Check } from 'lucide-react';
import { Sermon } from '../types';
import { SERMON_LIST } from '../data/churchData';

interface SermonModalProps {
  sermonId: string | null;
  onClose: () => void;
}

export const SermonModal: React.FC<SermonModalProps> = ({ sermonId, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!sermonId) return null;

  const sermon = SERMON_LIST.find((s) => s.id === sermonId) || SERMON_LIST[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 text-stone-100 rounded-3xl max-w-4xl w-full border border-stone-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs text-amber-400 font-semibold">{sermon.series || '주일 설교'}</span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white truncate max-w-lg">{sermon.title}</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white font-bold text-xl p-2">
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Simulated Video Player */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-stone-800 flex items-center justify-center group">
            <img
              src={sermon.thumbnailUrl}
              alt={sermon.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 bg-stone-950/80 p-3 rounded-xl backdrop-blur-md">
              <span>{sermon.speaker} | {sermon.scripture}</span>
              <span className="font-mono">{sermon.duration}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-amber-200">설교 요약</h4>
                <p className="text-stone-300 text-sm leading-relaxed">{sermon.summary}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-800">
                <h4 className="font-serif font-bold text-base text-amber-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-500" /> 설교 본문 및 노트
                </h4>
                <div className="bg-stone-950 p-4 rounded-xl text-xs text-stone-300 leading-relaxed font-serif whitespace-pre-line border border-stone-800 max-h-48 overflow-y-auto">
                  {sermon.transcript}
                </div>
              </div>
            </div>

            {/* Sidebar Meta Info */}
            <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4 text-xs h-fit">
              <div className="space-y-2">
                <div className="flex justify-between text-stone-400">
                  <span>설교자</span>
                  <span className="text-stone-200 font-semibold">{sermon.speaker}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>성경 본문</span>
                  <span className="text-amber-400 font-semibold">{sermon.scripture}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>선포 일자</span>
                  <span className="text-stone-200">{sermon.date}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>조회수</span>
                  <span className="text-stone-200">{sermon.viewCount.toLocaleString()}회</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? '링크 복사됨' : '설교 공유하기'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
