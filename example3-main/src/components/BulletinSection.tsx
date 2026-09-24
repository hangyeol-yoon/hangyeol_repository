import React, { useState } from 'react';
import { FileText, Printer, BookOpen, Calendar, ChevronLeft, ChevronRight, Share2, Heart, Download, Info } from 'lucide-react';
import { CURRENT_BULLETIN, CHURCH_INFO } from '../data/churchData';

interface BulletinSectionProps {
  onOpenNewFamily: () => void;
  onOpenOffering: () => void;
}

export const BulletinSection: React.FC<BulletinSectionProps> = ({ onOpenNewFamily, onOpenOffering }) => {
  const [activeTab, setActiveTab] = useState<'order' | 'news' | 'column' | 'readings'>('order');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
          WEEKLY BULLETIN
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          온라인 주보
        </h2>
        <p className="text-stone-600 text-sm">
          {CURRENT_BULLETIN.issueNumber} | {CURRENT_BULLETIN.date}
        </p>
      </div>

      {/* Main Paper Bulletin Card */}
      <div className="bg-amber-50/60 rounded-3xl border-2 border-amber-200/80 shadow-lg overflow-hidden">
        
        {/* Paper Cover Header Banner */}
        <div className="bg-amber-900 text-amber-50 p-6 sm:p-8 text-center relative">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
              {CHURCH_INFO.name} 주보
            </h3>
            <p className="text-amber-200 text-xs sm:text-sm font-medium">
              "{CURRENT_BULLETIN.weeklyVerse.text}" ({CURRENT_BULLETIN.weeklyVerse.reference})
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-amber-800/80 flex flex-wrap items-center justify-between text-xs text-amber-200/90 gap-2">
            <span>담임목사: {CHURCH_INFO.seniorPastor}</span>
            <span>금주의 말씀: {CURRENT_BULLETIN.sermonInfo.title}</span>
            <span>본문: {CURRENT_BULLETIN.sermonInfo.scripture}</span>
          </div>
        </div>

        {/* Tab Control */}
        <div className="bg-amber-100/80 border-b border-amber-200 p-2 grid grid-cols-2 sm:grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('order')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'order'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-200/60'
            }`}
          >
            1. 예배 순서
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'news'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-200/60'
            }`}
          >
            2. 교회 소식 ({CURRENT_BULLETIN.churchNews.length})
          </button>

          <button
            onClick={() => setActiveTab('column')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'column'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-200/60'
            }`}
          >
            3. 목회 칼럼
          </button>

          <button
            onClick={() => setActiveTab('readings')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'readings'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-amber-200/60'
            }`}
          >
            4. 성경읽기 & 교우소식
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 min-h-[400px]">
          
          {/* TAB 1: Order of Worship (예배 순서) */}
          {activeTab === 'order' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-800" /> 주일 대예배 순서
                </h4>
                <span className="text-xs text-stone-500 font-medium">인도자: 김진수 담임목사</span>
              </div>

              <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-amber-100/60 text-stone-800 font-semibold border-b border-amber-200">
                    <tr>
                      <th className="py-3 px-4 w-1/4">순서</th>
                      <th className="py-3 px-4 w-1/2">내용</th>
                      <th className="py-3 px-4 w-1/4 text-right">담당</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 text-stone-800">
                    {CURRENT_BULLETIN.orderOfWorship.map((item, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-amber-950">{item.step}</td>
                        <td className="py-3 px-4 font-medium text-stone-900">
                          {item.content}
                          {item.title && <span className="text-stone-400 text-xs font-normal block sm:inline sm:ml-2">({item.title})</span>}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-amber-900">{item.performer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-100/50 p-4 rounded-xl text-xs text-stone-700 flex items-center justify-between">
                <span>* 표시는 일어서서 찬양과 기도로 드립니다.</span>
                <button onClick={onOpenOffering} className="text-amber-900 font-semibold underline">
                  온라인 헌금 안내 계좌 →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Church News (교회 소식) */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-800" /> 교회 소식 & 알림
                </h4>
                <span className="text-xs text-stone-500">{CURRENT_BULLETIN.date}</span>
              </div>

              <div className="space-y-4">
                {CURRENT_BULLETIN.churchNews.map((news) => (
                  <div key={news.id} className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${
                        news.isImportant ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {news.category}
                      </span>
                      {news.isImportant && <span className="text-[11px] font-bold text-red-600">중요</span>}
                    </div>
                    <h5 className="font-semibold text-stone-900 text-base">{news.title}</h5>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{news.content}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-amber-200 flex items-center justify-between">
                <button
                  onClick={onOpenNewFamily}
                  className="px-4 py-2 bg-amber-800 text-white text-xs font-semibold rounded-lg hover:bg-amber-900 transition-colors"
                >
                  ✨ 새가족 등록 온라인 신청
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Pastoral Column (목회 칼럼) */}
          {activeTab === 'column' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-stone-200 pb-3">
                <h4 className="font-serif font-bold text-xl text-stone-900">
                  {CURRENT_BULLETIN.pastoralColumn.title}
                </h4>
                <p className="text-xs text-amber-800 font-semibold mt-1">
                  글: {CURRENT_BULLETIN.pastoralColumn.author}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-amber-200/80 text-stone-800 leading-relaxed text-sm sm:text-base space-y-4 font-serif whitespace-pre-line shadow-xs">
                {CURRENT_BULLETIN.pastoralColumn.content}
              </div>
            </div>
          )}

          {/* TAB 4: Readings & Member Updates */}
          {activeTab === 'readings' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Readings */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900 border-b border-stone-200 pb-2">
                  📖 이번 주 매일 성경 읽기표
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CURRENT_BULLETIN.weeklyReadings.map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
                      <span className="font-semibold text-stone-800">{item.day}</span>
                      <span className="text-amber-900 font-medium">{item.passage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Member Updates */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900 border-b border-stone-200 pb-2">
                  💒 교우 소식
                </h4>
                <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
                  {CURRENT_BULLETIN.memberUpdates.map((item, idx) => (
                    <div key={idx} className="text-xs flex items-center gap-3 border-b border-stone-100 last:border-none pb-2 last:pb-0">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[11px] shrink-0">
                        {item.type}
                      </span>
                      <span className="text-stone-700">{item.content}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteers */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900 border-b border-stone-200 pb-2">
                  🤝 봉사 위원
                </h4>
                <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2 text-xs">
                  {CURRENT_BULLETIN.volunteers.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-stone-100 last:border-none pb-1">
                      <span className="font-semibold text-stone-800">{item.role}</span>
                      <span className="text-stone-600">{item.names}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bulletin Actions Footer */}
        <div className="bg-amber-100/80 p-4 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 bg-white hover:bg-stone-50 border border-amber-300 rounded-lg text-stone-800 font-medium flex items-center gap-1.5 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? '주보 링크 복사완료!' : '주보 공유하기'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-white hover:bg-stone-50 border border-amber-300 rounded-lg text-stone-800 font-medium flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>주보 인쇄하기</span>
            </button>
          </div>

          <div className="text-stone-600 text-right">
            온라인 주보는 매주 주일 오전 6시에 새로 업데이트됩니다.
          </div>
        </div>

      </div>

    </div>
  );
};
