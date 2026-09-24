import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem } from '../types';
import { Maximize2, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'interior' | 'terrace' | 'barista' | 'bakery'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'all', label: '전체 공간' },
    { id: 'interior', label: '1F & 2F 인테리어' },
    { id: 'terrace', label: '야외 가든 테라스' },
    { id: 'barista', label: '바리스타 & 로스팅' },
    { id: 'bakery', label: '수제 베이커리' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#F3ECE2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase bg-[#E8DEC8] px-3 py-1 rounded-full inline-block mb-3">
            Cafe Atmosphere
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#1F1815]">
            루미에르의 감성 공간 둘러보기
          </h2>
          <p className="text-sm sm:text-base text-[#7A6859] mt-2 leading-relaxed">
            햇살과 계절의 바람이 머무는 원목 공간에서 아늑한 여유를 느끼보세요.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#3D2C27] text-white shadow-xs'
                  : 'bg-white text-[#5C4A3E] hover:bg-[#E8DEC8]'
              }`}
              id={`gallery-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DEC8] group cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col text-left"
              id={`gallery-card-${item.id}`}
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#E8DEC8]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 p-2.5 rounded-full text-[#3D2C27]">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-[#3D2C27]/80 backdrop-blur-xs text-[#E8D0B3] text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {item.zoneName}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-serif-kr text-base font-bold text-[#1F1815]">{item.title}</h4>
                <p className="text-xs text-[#7A6859] mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left my-8">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-16/10 bg-black">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6">
                <span className="text-[10px] font-bold text-[#C86D51] uppercase">
                  {selectedPhoto.zoneName}
                </span>
                <h3 className="font-serif-kr text-xl font-bold text-[#1F1815] mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[#5C4A3E] mt-2 leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
