import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { SermonSection } from './components/SermonSection';
import { BulletinSection } from './components/BulletinSection';
import { WorshipSchedule } from './components/WorshipSchedule';
import { ChurchInfo } from './components/ChurchInfo';
import { PrayerWall } from './components/PrayerWall';
import { LocationMap } from './components/LocationMap';
import { AiMeditationCard } from './components/AiMeditationCard';
import { NewFamilyModal } from './components/NewFamilyModal';
import { OfferingModal } from './components/OfferingModal';
import { LiveStreamModal } from './components/LiveStreamModal';
import { SearchModal } from './components/SearchModal';
import { SermonModal } from './components/SermonModal';
import { CHURCH_INFO, SERMON_LIST } from './data/churchData';
import { Play, FileText, HeartHandshake, UserPlus, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const [isNewFamilyOpen, setIsNewFamilyOpen] = useState(false);
  const [isOfferingOpen, setIsOfferingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSermonId, setSelectedSermonId] = useState<string | null>(null);

  const handleOpenSermon = (id: string) => {
    setSelectedSermonId(id);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col selection:bg-amber-200 selection:text-amber-950">
      
      {/* Sticky Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveStream={() => setIsLiveStreamOpen(true)}
        onOpenBulletin={() => setActiveTab('bulletin')}
        onOpenPrayer={() => setActiveTab('community')}
        onOpenOffering={() => setIsOfferingOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNewFamily={() => setIsNewFamilyOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-16">
            
            {/* Hero Banner */}
            <Hero
              setActiveTab={setActiveTab}
              onOpenLiveStream={() => setIsLiveStreamOpen(true)}
              onOpenBulletin={() => setActiveTab('bulletin')}
              onOpenPrayer={() => setActiveTab('community')}
              onOpenNewFamily={() => setIsNewFamilyOpen(true)}
              onOpenSermonModal={handleOpenSermon}
            />

            {/* AI Scripture Devotional Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AiMeditationCard />
            </div>

            {/* Recent Sermon Highlight Section */}
            <div className="bg-amber-50/50 py-12 border-y border-amber-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
                      RECENT SERMONS
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
                      이번 달 말씀과 찬양
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('sermons')}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group"
                  >
                    <span>모든 설교 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SERMON_LIST.slice(0, 3).map((sermon) => (
                    <div
                      key={sermon.id}
                      onClick={() => handleOpenSermon(sermon.id)}
                      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative aspect-video bg-stone-900 overflow-hidden">
                        <img
                          src={sermon.thumbnailUrl}
                          alt={sermon.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10" />
                        <div className="absolute bottom-2 right-2 bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                          {sermon.duration}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-md">
                            <Play className="w-6 h-6 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-amber-800 font-semibold">{sermon.date} | {sermon.speaker}</p>
                          <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors line-clamp-1">
                            {sermon.title}
                          </h3>
                          <p className="text-xs text-stone-500 font-medium">{sermon.scripture}</p>
                        </div>
                        <span className="text-xs text-amber-800 font-semibold flex items-center gap-0.5 pt-2 border-t border-stone-100">
                          말씀 듣기 <Play className="w-3 h-3 fill-current" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Worship Times & New Family Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-amber-800/40">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 따뜻한 환영과 교제
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-4xl text-white leading-tight">
                    은혜와 평강교회에 처음 오셨나요?
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    새가족 등록 안내와 함께 온라인으로 편리하게 사전 신청하실 수 있습니다. 교역자가 친절하게 안내해 드립니다.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsNewFamilyOpen(true)}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md"
                    >
                      새가족 온라인 등록 신청 →
                    </button>
                    <button
                      onClick={() => setActiveTab('about')}
                      className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-sm rounded-xl transition-colors"
                    >
                      교회 비전 및 인사말
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-stone-800/90 p-6 rounded-2xl border border-stone-700/80 space-y-3">
                  <h4 className="font-serif font-bold text-lg text-amber-300 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" /> 주일 대표 예배 시간
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-300">
                    <li className="flex justify-between border-b border-stone-700 pb-1.5">
                      <span className="font-semibold text-stone-100">주일 1부 대예배</span>
                      <span>오전 09:00</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-700 pb-1.5">
                      <span className="font-semibold text-stone-100">주일 2부 대예배 (생중계)</span>
                      <span>오전 11:00</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-700 pb-1.5">
                      <span className="font-semibold text-stone-100">청년부 예배 (비전홀)</span>
                      <span>주일 오후 02:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold text-stone-100">다음세대 (영유아/초등/중고등)</span>
                      <span>오전 09:00 / 11:00</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setActiveTab('worship')}
                    className="w-full pt-2 text-center text-xs font-semibold text-amber-400 hover:underline block"
                  >
                    전체 예배 일정 및 장소 보기 →
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: ABOUT */}
        {activeTab === 'about' && <ChurchInfo />}

        {/* VIEW 3: WORSHIP */}
        {activeTab === 'worship' && (
          <WorshipSchedule
            onOpenLiveStream={() => setIsLiveStreamOpen(true)}
            onOpenNewFamily={() => setIsNewFamilyOpen(true)}
          />
        )}

        {/* VIEW 4: SERMONS */}
        {activeTab === 'sermons' && (
          <div className="space-y-12 pb-16">
            <SermonSection onOpenSermonModal={handleOpenSermon} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AiMeditationCard />
            </div>
          </div>
        )}

        {/* VIEW 5: BULLETIN */}
        {activeTab === 'bulletin' && (
          <BulletinSection
            onOpenNewFamily={() => setIsNewFamilyOpen(true)}
            onOpenOffering={() => setIsOfferingOpen(true)}
          />
        )}

        {/* VIEW 6: COMMUNITY */}
        {activeTab === 'community' && <PrayerWall />}

        {/* VIEW 7: LOCATION */}
        {activeTab === 'location' && <LocationMap />}

      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenOffering={() => setIsOfferingOpen(true)}
        onOpenNewFamily={() => setIsNewFamilyOpen(true)}
      />

      {/* Global Modals */}
      <LiveStreamModal
        isOpen={isLiveStreamOpen}
        onClose={() => setIsLiveStreamOpen(false)}
        onOpenOffering={() => setIsOfferingOpen(true)}
      />

      <NewFamilyModal
        isOpen={isNewFamilyOpen}
        onClose={() => setIsNewFamilyOpen(false)}
      />

      <OfferingModal
        isOpen={isOfferingOpen}
        onClose={() => setIsOfferingOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSermon={handleOpenSermon}
        setActiveTab={setActiveTab}
      />

      <SermonModal
        sermonId={selectedSermonId}
        onClose={() => setSelectedSermonId(null)}
      />

    </div>
  );
}
