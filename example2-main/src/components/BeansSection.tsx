import React, { useState } from 'react';
import { Coffee, ShoppingBag, CheckCircle2, Award, Sparkles, X } from 'lucide-react';
import { BEAN_ORIGINS } from '../data/cafeData';
import { BeanOrigin } from '../types';

interface BeansSectionProps {
  onOrderBeans: (bean: BeanOrigin, weight: '200g' | '500g') => void;
}

export const BeansSection: React.FC<BeansSectionProps> = ({ onOrderBeans }) => {
  const [selectedBeanForModal, setSelectedBeanForModal] = useState<BeanOrigin | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<'200g' | '500g'>('200g');

  const handleConfirmBeanOrder = () => {
    if (!selectedBeanForModal) return;
    onOrderBeans(selectedBeanForModal, selectedWeight);
    setSelectedBeanForModal(null);
  };

  return (
    <section id="beans" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase bg-[#F5EAD8] px-3 py-1 rounded-full inline-block mb-3">
            Specialty Bean Lineup
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#1F1815]">
            매일 아침 직화 로스팅 원두
          </h2>
          <p className="text-sm sm:text-base text-[#7A6859] mt-2 leading-relaxed">
            세계 각국의 스페셜티 농장에서 직접 직수입한 생두를 루미에르만의 최적 배전도로 볶아냅니다.
          </p>
        </div>

        {/* Beans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BEAN_ORIGINS.map((bean) => (
            <div
              key={bean.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DEC8] hover:border-[#D8BFA8] shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col sm:flex-row gap-6 text-left"
              id={`bean-card-${bean.id}`}
            >
              {/* Image */}
              <div className="sm:w-2/5 aspect-square bg-[#F3ECE2] rounded-2xl overflow-hidden relative shrink-0">
                <img
                  src={bean.image}
                  alt={bean.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#3D2C27] text-[#E8D0B3] text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {bean.roastLevel} Roast
                </span>
              </div>

              {/* Info */}
              <div className="sm:w-3/5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-[#C86D51] tracking-wider uppercase block">
                    {bean.origin} • {bean.process}
                  </span>
                  <h3 className="font-serif-kr text-lg font-bold text-[#1F1815] mt-0.5">
                    {bean.name}
                  </h3>
                  <p className="text-xs text-[#7A6859] mt-2 leading-relaxed">{bean.description}</p>

                  {/* Cup notes */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {bean.cupNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-[#F5EAD8] text-[#3D2C27] px-2.5 py-0.5 rounded-full border border-[#E8DEC8]"
                      >
                        #{note}
                      </span>
                    ))}
                  </div>

                  {/* Profile Ratings */}
                  <div className="mt-4 pt-3 border-t border-[#F0E6D8] grid grid-cols-3 gap-2 text-[10px] text-[#5C4A3E]">
                    <div>
                      <span className="block text-[#8C7A6B]">산미</span>
                      <strong className="text-[#C86D51]">{'★'.repeat(bean.acidityScore)}</strong>
                    </div>
                    <div>
                      <span className="block text-[#8C7A6B]">바디감</span>
                      <strong className="text-[#3D2C27]">{'★'.repeat(bean.bodyScore)}</strong>
                    </div>
                    <div>
                      <span className="block text-[#8C7A6B]">밸런스</span>
                      <strong className="text-[#D4AF37]">{'★'.repeat(bean.balanceScore)}</strong>
                    </div>
                  </div>
                </div>

                {/* Price & Order Action */}
                <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C7A6B] block">200g 기분</span>
                    <strong className="font-serif-kr text-base font-bold text-[#1F1815]">
                      {bean.price200g.toLocaleString()}원
                    </strong>
                  </div>

                  <button
                    onClick={() => setSelectedBeanForModal(bean)}
                    className="px-4 py-2 bg-[#3D2C27] hover:bg-[#2A1E1B] text-[#FAF7F2] font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
                    id={`order-bean-btn-${bean.id}`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E8D0B3]" />
                    <span>원두 구매하기</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bean Order Modal */}
        {selectedBeanForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DEC8] text-left relative space-y-5">
              <button
                onClick={() => setSelectedBeanForModal(null)}
                className="absolute top-4 right-4 p-2 text-[#7A6859] hover:bg-[#FAF7F2] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] font-bold text-[#C86D51] uppercase">SPECIALTY BEAN</span>
                <h3 className="font-serif-kr text-xl font-bold text-[#1F1815]">
                  {selectedBeanForModal.name}
                </h3>
                <p className="text-xs text-[#7A6859] mt-1">{selectedBeanForModal.origin}</p>
              </div>

              {/* Weight selection */}
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-2">용량 선택</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedWeight('200g')}
                    className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer ${
                      selectedWeight === '200g'
                        ? 'bg-[#3D2C27] text-white border-[#3D2C27]'
                        : 'bg-[#FAF7F2] text-[#5C4A3E] border-[#E0D0C0]'
                    }`}
                  >
                    200g ({selectedBeanForModal.price200g.toLocaleString()}원)
                  </button>

                  <button
                    onClick={() => setSelectedWeight('500g')}
                    className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer ${
                      selectedWeight === '500g'
                        ? 'bg-[#3D2C27] text-white border-[#3D2C27]'
                        : 'bg-[#FAF7F2] text-[#5C4A3E] border-[#E0D0C0]'
                    }`}
                  >
                    500g ({selectedBeanForModal.price500g.toLocaleString()}원)
                  </button>
                </div>
              </div>

              <button
                onClick={handleConfirmBeanOrder}
                className="w-full py-3.5 bg-[#C86D51] hover:bg-[#B55A3F] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md cursor-pointer"
              >
                장바구니에 원두 추가하기
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
