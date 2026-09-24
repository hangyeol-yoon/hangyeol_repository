import React, { useState } from 'react';
import { X, Flame, Snowflake, ShoppingBag, Check, ShieldAlert, Sparkles, Coffee } from 'lucide-react';
import { MenuItem, CustomizationSelections } from '../types';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selections: CustomizationSelections, quantity: number) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'HOT' | 'ICE'>(item.defaultTemp);
  const [milkType, setMilkType] = useState<'standard' | 'oat' | 'almond' | 'lowfat'>('standard');
  const [syrupType, setSyrupType] = useState<'none' | 'vanilla' | 'hazelnut' | 'caramel'>('none');
  const [extraShots, setExtraShots] = useState(0);
  const [iceLevel, setIceLevel] = useState<'less' | 'normal' | 'extra'>('normal');
  const [sweetnessLevel, setSweetnessLevel] = useState<'30' | '50' | '70' | '100'>('100');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Extras calculation
  let extraCost = 0;
  if (milkType === 'oat' || milkType === 'almond') extraCost += 500;
  if (syrupType !== 'none') extraCost += 500;
  extraCost += extraShots * 500;

  const unitPrice = item.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(
      item,
      {
        temperature,
        milkType,
        syrupType,
        extraShots,
        iceLevel,
        sweetnessLevel,
        specialInstructions,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto" id="menu-item-modal">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8DEC8] my-8 text-left animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header Image */}
        <div className="relative aspect-16/9 bg-[#F3ECE2] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {item.isSignature && (
              <span className="bg-[#C86D51] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>SIGNATURE</span>
              </span>
            )}
            {item.isDecaf && (
              <span className="bg-[#2E6B2E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                DECAF
              </span>
            )}
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Description */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9A8B7E]">
              {item.nameEng}
            </span>
            <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-[#1F1815] mt-0.5">
              {item.name}
            </h2>
            <p className="text-sm text-[#5C4A3E] mt-2 leading-relaxed">{item.description}</p>
          </div>

          {/* Taste & Nutrition info box */}
          {(item.tasteProfile || item.nutrition) && (
            <div className="p-4 rounded-2xl bg-[#F9F5EF] border border-[#E8DEC8] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {item.tasteProfile && (
                <div>
                  <h4 className="font-semibold text-[#3D2C27] mb-2 flex items-center space-x-1">
                    <Coffee className="w-3.5 h-3.5 text-[#C86D51]" />
                    <span>원두 향미 프로필</span>
                  </h4>
                  <div className="space-y-1 text-[#5C4A3E]">
                    <div className="flex justify-between">
                      <span>산미(Acidity):</span>
                      <span className="font-bold text-[#C86D51]">{'★'.repeat(item.tasteProfile.acidity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>바디감(Body):</span>
                      <span className="font-bold text-[#3D2C27]">{'★'.repeat(item.tasteProfile.body)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>단맛(Sweetness):</span>
                      <span className="font-bold text-[#D4AF37]">{'★'.repeat(item.tasteProfile.sweetness)}</span>
                    </div>
                  </div>
                </div>
              )}

              {item.nutrition && (
                <div>
                  <h4 className="font-semibold text-[#3D2C27] mb-2 flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#C86D51]" />
                    <span>영양 정보 & 알레르기</span>
                  </h4>
                  <p className="text-[#5C4A3E]">
                    칼로리: <strong className="text-[#1F1815]">{item.nutrition.calories} kcal</strong> <br />
                    {item.nutrition.caffeineMg !== undefined && (
                      <>카페인 함량: <strong>{item.nutrition.caffeineMg} mg</strong><br /></>
                    )}
                    {item.allergens && item.allergens.length > 0 && (
                      <span className="text-[#C86D51]">알레르기: {item.allergens.join(', ')}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Customization Options */}
          <div className="space-y-5 pt-2 border-t border-[#F0E6D8]">
            
            {/* 1. Temperature selection */}
            {item.temperatureOptions === 'BOTH' ? (
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-2">온도 선택</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTemperature('HOT')}
                    className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
                      temperature === 'HOT'
                        ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-xs'
                        : 'bg-white text-[#5C4A3E] border-[#E0D0C0] hover:bg-[#F9F5EF]'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    <span>따뜻하게 (HOT)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemperature('ICE')}
                    className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
                      temperature === 'ICE'
                        ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-xs'
                        : 'bg-white text-[#5C4A3E] border-[#E0D0C0] hover:bg-[#F9F5EF]'
                    }`}
                  >
                    <Snowflake className="w-4 h-4" />
                    <span>시원하게 (ICE)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-1">온도</label>
                <span className="inline-block px-3 py-1 bg-[#F3ECE2] text-[#3D2C27] text-xs font-semibold rounded-lg">
                  {item.temperatureOptions} 전용
                </span>
              </div>
            )}

            {/* 2. Milk Customization */}
            {item.customizableMilk && (
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-2">우유 종류 선택</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'standard', name: '일반 우유', extra: 0 },
                    { id: 'oat', name: '오트 우유', extra: 500 },
                    { id: 'almond', name: '아몬드 밀크', extra: 500 },
                    { id: 'lowfat', name: '저지방 우유', extra: 0 },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilkType(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        milkType === m.id
                          ? 'bg-[#3D2C27] text-white border-[#3D2C27] font-semibold'
                          : 'bg-white text-[#5C4A3E] border-[#E0D0C0] hover:bg-[#F9F5EF]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{m.name}</span>
                        {m.extra > 0 && (
                          <span className={milkType === m.id ? 'text-[#E8D0B3]' : 'text-[#C86D51]'}>
                            +{m.extra}원
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Extra Shots */}
            {item.customizableShots && (
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-2">에스프레소 샷 추가</label>
                <div className="flex items-center space-x-3 text-xs">
                  {[0, 1, 2].map((shots) => (
                    <button
                      key={shots}
                      type="button"
                      onClick={() => setExtraShots(shots)}
                      className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                        extraShots === shots
                          ? 'bg-[#3D2C27] text-white border-[#3D2C27] font-semibold'
                          : 'bg-white text-[#5C4A3E] border-[#E0D0C0]'
                      }`}
                    >
                      {shots === 0 ? '기본 샷' : `+${shots}샷 (+${shots * 500}원)`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Syrup Options */}
            {item.customizableSyrup && (
              <div>
                <label className="block text-xs font-bold text-[#3D2C27] mb-2">수제 시럽 추가 (+500원)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'none', name: '시럽 없음' },
                    { id: 'vanilla', name: '바닐라빈 시럽' },
                    { id: 'hazelnut', name: '헤이즐넛 시럽' },
                    { id: 'caramel', name: '솔티드 카라멜' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSyrupType(s.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        syrupType === s.id
                          ? 'bg-[#3D2C27] text-white border-[#3D2C27] font-semibold'
                          : 'bg-white text-[#5C4A3E] border-[#E0D0C0]'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#3D2C27] mb-1">
                기타 요청 사항 (텀블러 지참 등)
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="예: 얼음 조금만 부탁드려요, 텀블러 할인 요청"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E0D0C0] rounded-xl text-xs text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
              />
            </div>

          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-[#E8DEC8] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3 bg-[#F3ECE2] p-1.5 rounded-2xl border border-[#E3D4C2]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white text-[#3D2C27] font-bold text-sm hover:bg-[#E8DDD0] flex items-center justify-center cursor-pointer shadow-2xs"
              >
                -
              </button>
              <span className="font-bold text-sm text-[#2D2421] w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-[#3D2C27] text-white font-bold text-sm hover:bg-[#2A1E1B] flex items-center justify-center cursor-pointer shadow-2xs"
              >
                +
              </button>
            </div>

            {/* Total Price & Add Button */}
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
              <div className="text-right">
                <span className="text-[11px] text-[#8C7A6B] block">총 결제금액</span>
                <span className="font-serif-kr text-xl font-bold text-[#1F1815]">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-initial px-6 py-3.5 bg-[#C86D51] hover:bg-[#B55A3F] text-white font-bold text-sm rounded-full transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                id="modal-add-to-cart-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>장바구니 담기</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
