import React, { useState } from 'react';
import { Search, Sparkles, Flame, Snowflake, SlidersHorizontal, Plus, Info, Coffee } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onSelectItem,
  onQuickAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tempFilter, setTempFilter] = useState<'all' | 'HOT' | 'ICE'>('all');
  const [decafOnly, setDecafOnly] = useState(false);
  const [signatureOnly, setSignatureOnly] = useState(false);

  const categories: { id: MenuCategory; label: string; count?: number }[] = [
    { id: 'all', label: '전체 메뉴' },
    { id: 'signature', label: '시그니처 음료' },
    { id: 'espresso', label: '에스프레소 & 드립' },
    { id: 'beverage', label: '논커피 & 블렌딩 티' },
    { id: 'dessert', label: '수제 디저트' },
    { id: 'beans', label: '스페셜티 원두' },
  ];

  const filteredItems = menuItems.filter((item) => {
    // Category check
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchEng = item.nameEng.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchEng && !matchDesc) return false;
    }
    // Temp filter
    if (tempFilter === 'HOT' && item.temperatureOptions === 'ICE') return false;
    if (tempFilter === 'ICE' && item.temperatureOptions === 'HOT') return false;
    // Decaf filter
    if (decafOnly && !item.isDecaf) return false;
    // Signature filter
    if (signatureOnly && !item.isSignature) return false;

    return true;
  });

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase bg-[#F5EAD8] px-3 py-1 rounded-full inline-block mb-3">
            Handcrafted Menu
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#1F1815]">
            루미에르의 정성이 담긴 메뉴
          </h2>
          <p className="text-sm sm:text-base text-[#7A6859] mt-2 leading-relaxed">
            매일 아침 직접 로스팅한 원두와 최상급 프랑스 발효버터로 만드는 디저트를 만나보세요.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#3D2C27] text-[#FAF7F2] shadow-sm'
                  : 'bg-[#F3ECE2] text-[#5C4A3E] hover:bg-[#E8DDD0] hover:text-[#2D2421]'
              }`}
              id={`category-tab-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar & Filter Options */}
        <div className="bg-[#F3ECE2] p-4 rounded-2xl border border-[#E3D4C2] mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="메뉴 이름, 원두 노트, 디저트 검색..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-xs sm:text-sm text-[#2D2421] placeholder-[#9A8B7E] border border-[#E0D0C0] focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
              id="menu-search-input"
            />
          </div>

          {/* Filters */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-2 text-xs">
            {/* Temp filter */}
            <div className="inline-flex rounded-xl bg-white p-1 border border-[#E0D0C0]">
              <button
                onClick={() => setTempFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  tempFilter === 'all' ? 'bg-[#3D2C27] text-white' : 'text-[#7A6859]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setTempFilter('HOT')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  tempFilter === 'HOT' ? 'bg-[#C86D51] text-white' : 'text-[#7A6859]'
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>HOT</span>
              </button>
              <button
                onClick={() => setTempFilter('ICE')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  tempFilter === 'ICE' ? 'bg-[#3B82F6] text-white' : 'text-[#7A6859]'
                }`}
              >
                <Snowflake className="w-3 h-3" />
                <span>ICE</span>
              </button>
            </div>

            {/* Signature toggle */}
            <button
              onClick={() => setSignatureOnly(!signatureOnly)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                signatureOnly
                  ? 'bg-[#C86D51] text-white border-[#C86D51] font-semibold'
                  : 'bg-white text-[#5C4A3E] border-[#E0D0C0]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>시그니처만</span>
            </button>

            {/* Decaf toggle */}
            <button
              onClick={() => setDecafOnly(!decafOnly)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                decafOnly
                  ? 'bg-[#2E6B2E] text-white border-[#2E6B2E] font-semibold'
                  : 'bg-white text-[#5C4A3E] border-[#E0D0C0]'
              }`}
            >
              <Coffee className="w-3 h-3" />
              <span>디카페인만</span>
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DEC8]">
            <Coffee className="w-12 h-12 text-[#D8C8B8] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#2D2421]">조건에 일치하는 메뉴가 없습니다.</h3>
            <p className="text-xs text-[#7A6859] mt-1">검색어나 필터 조건을 변경해보세요.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setTempFilter('all');
                setDecafOnly(false);
                setSignatureOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-[#F3ECE2] text-[#3D2C27] text-xs font-semibold rounded-lg hover:bg-[#E8DDD0]"
            >
              전체 필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#D8BFA8] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group"
                id={`menu-card-${item.id}`}
              >
                {/* Thumbnail Header */}
                <div
                  className="relative aspect-4/3 bg-[#F3ECE2] overflow-hidden cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {item.isSignature && (
                      <span className="bg-[#C86D51] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>SIGNATURE</span>
                      </span>
                    )}
                    {item.isPopular && !item.isSignature && (
                      <span className="bg-[#3D2C27] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        BEST
                      </span>
                    )}
                    {item.isNew && (
                      <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        NEW
                      </span>
                    )}
                    {item.isDecaf && (
                      <span className="bg-[#2E6B2E] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        DECAF
                      </span>
                    )}
                  </div>

                  {/* Temperature Available Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full flex items-center space-x-1">
                    {item.temperatureOptions === 'BOTH' ? (
                      <span>HOT / ICE</span>
                    ) : (
                      <span>{item.temperatureOptions} ONLY</span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] text-[#9A8B7E] uppercase font-semibold tracking-wider block">
                      {item.nameEng}
                    </span>
                    <h3
                      onClick={() => onSelectItem(item)}
                      className="font-serif-kr text-base font-bold text-[#1F1815] hover:text-[#C86D51] transition-colors cursor-pointer mt-0.5"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#7A6859] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Taste Profile Mini Score if coffee */}
                    {item.tasteProfile && (
                      <div className="mt-3 pt-2.5 border-t border-[#F3ECE2] grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-[#5C4A3E]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#8C7A6B]">산미</span>
                          <span className="font-semibold text-[#C86D51]">
                            {'★'.repeat(item.tasteProfile.acidity)}
                            <span className="text-gray-300">
                              {'★'.repeat(5 - item.tasteProfile.acidity)}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#8C7A6B]">바디감</span>
                          <span className="font-semibold text-[#3D2C27]">
                            {'★'.repeat(item.tasteProfile.body)}
                            <span className="text-gray-300">
                              {'★'.repeat(5 - item.tasteProfile.body)}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-4 pt-3 border-t border-[#F3ECE2] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8C7A6B] block">판매가</span>
                      <span className="font-serif-kr text-base font-bold text-[#1F1815]">
                        {item.price.toLocaleString()}원
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#F3ECE2] hover:bg-[#E8DDD0] text-[#3D2C27] text-xs font-semibold transition-colors flex items-center space-x-1"
                        title="옵션 및 상세정보"
                        id={`select-item-btn-${item.id}`}
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>옵션</span>
                      </button>

                      <button
                        onClick={() => onQuickAddToCart(item)}
                        className="p-1.5 rounded-lg bg-[#3D2C27] hover:bg-[#2A1E1B] text-white transition-colors cursor-pointer"
                        title="장바구니 퀵 담기"
                        id={`quick-add-btn-${item.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
